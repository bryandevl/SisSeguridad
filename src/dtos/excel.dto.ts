import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsOptional, IsNumber } from 'class-validator';

export class SchemaDto {
	@IsString()
	@ApiProperty()
	column: string;

	@IsString()
	@ApiProperty({ type: String })
	type: string | any;

	@IsOptional()
	@IsNumber()
	@ApiPropertyOptional()
	width: number;

	@IsOptional()
	@IsString()
	@ApiPropertyOptional()
	format?: string;

	@IsString()
	@ApiProperty()
	value: string;
}

export class ExcelDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => SchemaDto)
	@ApiProperty({ type: [SchemaDto] })
	schema: SchemaDto[];

	@IsArray()
	@Type(() => Object)
	@ApiProperty({ type: [Object] })
	data: any[];
}
