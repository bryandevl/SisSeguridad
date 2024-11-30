import { Controller, Post, Body } from '@nestjs/common';
import { ChatGPTService } from 'src/services/chatgpt.service';
import { ChatGPTConversacionDto } from 'src/dtos/ChatGPTConversacion.dto';

@Controller('chatgpt')
export class ChatGPTController {
  constructor(private readonly chatGptService: ChatGPTService) {}

  @Post('enviar')
  async enviarMensaje(@Body() chatDto: ChatGPTConversacionDto) {
    // Llamar al servicio para interactuar con la API de ChatGPT
    return await this.chatGptService.enviarMensajeChatGPT(chatDto);
  }
}
