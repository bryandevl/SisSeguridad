/*import { EssaludService } from 'src/services/essalud-export.service';
import { CorreoService } from 'src/services/correo.service';
import { SBSService } from 'src/services/sbs.service';
import { SbsDetalleService } from 'src/services/sbsDetalle-export.service';


import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { customResponse } from 'src/common/response';
import { EssaludDTO } from 'src/dtos/essalud.dto';
import { CorreoDTO } from 'src/dtos/correo.dto';
import { SbsDTO } from 'src/dtos/sbs.dto';
import { SbsDetalleDTO } from 'src/dtos/sbsDetalle.dto';TestController

*/
import { Body, Controller, Post, Res } from '@nestjs/common'; // Asegúrate de importar @Res
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import writeXlsxFile from 'write-excel-file/node';
import { convertRows, HeadMovistar } from 'src/utils';

@Controller('test')
@ApiTags('test')
export class TestController {
   constructor(/*
       private readonly EssaludExportsService: EssaludService,
        private readonly CorreoExportsService : CorreoService,
        private readonly SbsExportsService : SBSService ,
        private readonly SbsDetalleExportsService : SbsDetalleService,*/

 ) {}

   /* @Post('getSBS')
    @ApiOperation({ summary: 'getTest' })
    async getTest(@Body() data: SbsDTO) {
        // Usar el servicio inyectado correctamente
        const movistar = await this.SbsExportsService.findBySbs(
            data.documento,
        );

        return movistar;

 
    }

    @Post('getSBSDETALLE')
    @ApiOperation({ summary: 'getSBSDETALLE' })
    async getSBSDETALLE(@Body() data: SbsDetalleDTO) {
        // Usar el servicio inyectado correctamente
        const movistar = await this.SbsDetalleExportsService.findBySbsDetalle(
            data.documento,
        );

        return movistar;

 
    }
*/

    
}
