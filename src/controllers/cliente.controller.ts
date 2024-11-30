import { Body, Controller, Post, Res } from '@nestjs/common'; // Asegúrate de importar @Res
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Workbook } from 'exceljs'; 
import { Response } from 'express';  // Importar Response para enviar archivos
import { convertRows, HeadMovistar, HeadFamiliar, HeadReniec2018 ,HeadEssalud, HeadCorreo , HeadSBS, HeadSBSDetalle} from 'src/utils';
import * as JSZip from 'jszip'; // Importar la librería JSZip

@Controller('cliente')
@ApiTags('cliente')
export class ClienteController {
    constructor(
      /*  private readonly movistarExportsService: InfoCallService,
        private readonly FamiliarReniecExportsService: ReniecService,
        private readonly ReniecExportsService: ReniecService2018,
        private readonly EssaludExportsService: EssaludService,
        private readonly CorreoExportsService : CorreoService,
        private readonly SbsExportsService : SBSService,
        private readonly SbsDetalleExportsService : SbsDetalleService,*/
    ) {}
/*
    @Post('getOperadorAndFamiliar')
    @ApiOperation({ summary: 'getMovistarAndFamiliar' })
    async getOperadorAndFamiliar(@Body() data: InfocallDTO & familiaresDTO & RecniecDTO & EssaludDTO & CorreoDTO & SbsDTO & SbsDetalleDTO, @Res() res: Response) { // Inyectar 'res' con @Res()
        const results = [];
        const services = [
            this.movistarExportsService.getInfoByDocumento(data.documento),
            this.FamiliarReniecExportsService.getFamilyInfoByDocumento(data.documento),
            this.ReniecExportsService.findByDocumentos(data.documento),
            this.EssaludExportsService.findByEssalud(data.documento),
            this.CorreoExportsService.findByCorreo(data.documento),
            this.SbsExportsService.findBySbs(data.documento),
            this.SbsDetalleExportsService.findBySbsDetalle(data.documento),
        ];

        // Obtener datos de forma secuencial
        for (const service of services) {
            results.push(await service);
        }

        const [movistar, familiar, reniec_2018, essalud, correo, sbs, sbsDetalle] = results;

        // Crear un nuevo libro de trabajo (workbook)
        const workbook = new Workbook();

        // Función para escribir datos en las hojas
        const writeToExcel = async (data: any[], worksheet: any, headers: string[]) => {
            worksheet.addRow(headers); // Agregar encabezados
            for (const item of data) {
                worksheet.addRow(item); // Agregar filas
            }
        };

        // Hoja para Reniec 2018
        if (reniec_2018 && reniec_2018.length > 0) {
            const reniecesSheet = workbook.addWorksheet('DATOS PERSONALES');
            await writeToExcel(reniec_2018.map(item => [
                item.reniec_2018_documento,
                item.reniec_2018_apellido_pat,
                item.reniec_2018_apellido_mat,
                item.reniec_2018_nombre,
                item.reniec_2018_fec_nac,
                item.reniec_2018_ubigeo,
                item.reniec_2018_ubigeo_dir,
                item.reniec_2018_direccion,
                item.reniec_2018_sexo === 1 ? 'Masculino' : 'Femenino',
                item.reniec_2018_edo_civil,
                item.reniec_2018_dig_ruc,
                item.reniec_2018_nombre_mad,
                item.reniec_2018_nombre_pat,
            ]), reniecesSheet, HeadReniec2018.map(head => head.column));
        }

        // Hoja para Movistar
        if (movistar && movistar.length > 0) {
            const operadoresSheet = workbook.addWorksheet('OPERADORES');
            await writeToExcel(movistar.map(item => [
                item.documento,
                item.nombre,
                item.numero,
                item.origen_data,
                item.fecha_data,
                item.with_whatsapp === 1 ? 'SI' : 'NO',
            ]), operadoresSheet, HeadMovistar.map(head => head.column));
        }

        // Hoja para Familiar
        if (familiar && familiar.length > 0) {
            const familiarSheet = workbook.addWorksheet('FAMILIAR');
            await writeToExcel(familiar.map(item => [
                item.documento,
                item.doc_parent,
                item.nombre,
                item.tipo,
            ]), familiarSheet, HeadFamiliar.map(head => head.column));
        }

        // Hoja para ESSALUD
        if (essalud && essalud.length > 0) {
            const essaludSheet = workbook.addWorksheet('ESSALUD');
            await writeToExcel(essalud.map(item => [
                item.documento,
                item.empresa,
                item.periodo,
                item.ruc,
                item.condicion,
                item.sueldo,
            ]), essaludSheet, HeadEssalud.map(head => head.column));
        }

        // Hoja para CORREO
        if (correo && correo.length > 0) {
            const correoSheet = workbook.addWorksheet('CORREO');
            await writeToExcel(correo.map(item => [
                item.documento,
                item.correo,
                item.validado === '1' ? 'SI' : 'NO',
            ]), correoSheet, HeadCorreo.map(head => head.column));
        }

        // Hoja para SBS
        if (sbs && sbs.length > 0) {
            const sbsSheet = workbook.addWorksheet('SBS');
            await writeToExcel(sbs.map(item => [
                item.documento,
                item.cod_sbs,
                item.fecha_reporte_sbs,
                item.ruc,
                item.cant_empresas,
                item.calificacion_normal,
                item.calificacion_cpp,
                item.calificacion_deficiente,
                item.calificacion_dudoso,
                item.calificacion_perdida,
            ]), sbsSheet, HeadSBS.map(head => head.column));
        }

        // Hoja para SBSDETALLE
        if (sbsDetalle && sbsDetalle.length > 0) {
            const sbsDetalleSheet = workbook.addWorksheet('SBS DETALLE');
            await writeToExcel(sbsDetalle.map(item => [
                item.documento,
                item.fecha_reporte,
                item.ruc,
                item.cod_sbs,
                item.entidad,
                item.tipo_credito,
                item.condicion,
                item.saldo,
                item.dias_atraso,
            ]), sbsDetalleSheet, HeadSBSDetalle.map(head => head.column));
        }

        // Escribir el archivo Excel en un buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Crear un archivo ZIP con el archivo Excel usando JSZip
        const zip = new JSZip();
        zip.file('SERCHR.xlsx', buffer);  // Añadir el archivo Excel al ZIP

        // Generar el archivo ZIP como un buffer
        const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

        // Establecer las cabeceras para el archivo ZIP
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename=export.zip');
        res.setHeader('Content-Length', zipBuffer.length);

        // Enviar el archivo ZIP comprimido como respuesta
        res.end(zipBuffer);
    }*/
}
