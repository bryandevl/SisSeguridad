import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversacionChatGPT } from 'src/entities/conversacion-chatgpt.entity';
import { ChatGPTConversacionDto } from 'src/dtos/ChatGPTConversacion.dto';

@Injectable()
export class ChatGPTService {
  private readonly apiKey: string;
  private readonly logger = new Logger(ChatGPTService.name);

  constructor(
    @InjectRepository(ConversacionChatGPT)
    private readonly conversacionRepository: Repository<ConversacionChatGPT>,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('CHATGPT_API_KEY');
    if (!this.apiKey) {
      throw new HttpException('API key de OpenAI no configurada', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Función para reintentar las solicitudes cuando el límite de velocidad es alcanzado
  private async retryRequest(request: Function, retries: number = 5, delay: number = 2000): Promise<any> {
    let lastError: any;
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        return await request(); // Realiza la solicitud
      } catch (error) {
        lastError = error;
        if (error.response?.status === 429) {
          // Si el error es de límite de tasa, esperar un poco antes de reintentar
          this.logger.warn(`Límite de solicitudes alcanzado. Reintentando en ${delay / 1000} segundos...`);
          await new Promise(resolve => setTimeout(resolve, delay)); // Espera antes de reintentar
          delay *= 2; // Incrementar el tiempo de espera para los próximos intentos (backoff exponencial)
        } else {
          // Si el error no es de límite de tasa, lanzamos el error
          throw error;
        }
      }
    }
    // Si después de varios intentos aún falla, lanzamos el último error
    this.logger.error(`Error tras ${retries} intentos: ${lastError.message}`);
    throw new HttpException(
      `Error al interactuar con la API de ChatGPT tras ${retries} intentos: ${lastError.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  // Método para interactuar con la API de ChatGPT
  async enviarMensajeChatGPT(chatDto: ChatGPTConversacionDto): Promise<any> {
    const { id_usuario, mensaje_usuario, contexto } = chatDto;

    try {
      const request = async () => {
        const response: AxiosResponse = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo', // Puedes cambiar el modelo aquí según sea necesario
            messages: [
              { role: 'system', content: 'Eres un asistente útil.' },
              { role: 'user', content: mensaje_usuario },
            ],
            temperature: 0.7,
            max_tokens: 150,
          },
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`, // Se asegura que la API key está bien pasada
              'Content-Type': 'application/json',
            },
          }
        );

        return response;
      };

      // Intentar la solicitud con reintentos
      const response = await this.retryRequest(request);

      const mensaje_chatgpt = response.data.choices[0].message.content;

      // Guardar la conversación en la base de datos
      const nuevaConversacion = this.conversacionRepository.create({
        id_usuario,
        mensaje_usuario,
        mensaje_chatgpt,
        contexto,
      });

      await this.conversacionRepository.save(nuevaConversacion);

      return {
        mensaje_usuario,
        mensaje_chatgpt,
      };
    } catch (error) {
      this.logger.error('Error al interactuar con la API de ChatGPT', error.stack);
      throw new HttpException(
        `Error al interactuar con la API de ChatGPT: ${error.response?.data?.error?.message || error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
