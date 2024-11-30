import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CobranzaDTO{
    @IsNumber()
    @ApiProperty()
    anio:number;
    
    @IsNumber()
    @ApiProperty()
    mes:number;

	@IsOptional()
	@IsNumber()
	@ApiPropertyOptional({ default: 0 })
	usuario: number = 0;
}