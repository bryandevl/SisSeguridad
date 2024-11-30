import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, isBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ClienteDTO {
	@IsString()
	@ApiProperty()
	fechaA: string;

	@IsString()
	@ApiProperty()
	fechaB: string;

	@IsOptional()
	@IsBoolean()
	@ApiPropertyOptional({ default: false })
	deuda: boolean = false;

	@IsOptional()
	@IsNumber()
	@ApiPropertyOptional({ default: 0 })
	usuario: number = 0;
}
