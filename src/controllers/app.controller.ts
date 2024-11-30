import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ExcelDto, SchemaDto } from '../dtos/excel.dto';
import writeXlsxFile from 'write-excel-file/node';
import { customResponse } from '../common/response';
import { convertRows } from 'src/utils';

@Controller()
export class AppController {
	@Post('excel')
	@ApiOperation({ summary: 'Reporte de RUCs' })
	async getExcel(@Body() dto: ExcelDto) {
		const schema = convertRows(dto.schema);
		const data = dto.data;

		const buffer = await writeXlsxFile(data, {
			schema,
			buffer: true,
		});

		// convertir a base64
		return customResponse('excel', buffer.toString('base64'));
	}
}
