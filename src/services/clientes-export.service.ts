import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { Cliente } from 'src/entities/cliente.entity';
//import { User } from 'src/entities/user.entity';
//import { getBasesByUserId } from 'src/utils';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesExportsService {
	constructor(
		//@InjectRepository(User) private readonly userRepository: Repository<User>,
		//@InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
	) {}

	async getClientesPedidos(fechaa: string, fechab: string, usuarioId: number) {
		//const bases = await getBasesByUserId(usuarioId);

		const porcentajesSubquery = `			
			SELECT
				p.cliente_id AS cliente_id,
				SUM(CASE WHEN p.cod_porcentaje = 'FSB' THEN p.porcentaje ELSE 0 END) AS FSB,
				SUM(CASE WHEN p.cod_porcentaje = 'FCB' THEN p.porcentaje ELSE 0 END) AS FCB,
				SUM(CASE WHEN p.cod_porcentaje = 'ESB' THEN p.porcentaje ELSE 0 END) AS ESB,
				SUM(CASE WHEN p.cod_porcentaje = 'ECB' THEN p.porcentaje ELSE 0 END) AS ECB,
				SUM(CASE WHEN p.cod_porcentaje = 'ECBD' THEN p.porcentaje ELSE 0 END) AS ECBD
			FROM
				porcentajes p
			WHERE
				p.cod_porcentaje in ('FSB','FCB','ESB','ECB','ECBD')
			GROUP BY
				p.cliente_id
		`;

		const pedidosSubquery = `
        SELECT
            p.cliente_id AS cliente_id,
            -- Columnas para cada mes de cada año en el rango
            SUM(CASE WHEN YEAR(p.created_at) = ${fechaa} AND MONTH(p.created_at) = 1 THEN 1 ELSE 0 END) AS enero_${fechaa},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechaa} AND MONTH(p.created_at) = 2 THEN 1 ELSE 0 END) AS febrero_${fechaa},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechaa} AND MONTH(p.created_at) = 3 THEN 1 ELSE 0 END) AS marzo_${fechaa},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechaa} AND MONTH(p.created_at) = 4 THEN 1 ELSE 0 END) AS abril_${fechaa},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechaa} AND MONTH(p.created_at) = 5 THEN 1 ELSE 0 END) AS mayo_${fechaa},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechaa} AND MONTH(p.created_at) = 6 THEN 1 ELSE 0 END) AS junio_${fechaa},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechaa} AND MONTH(p.created_at) = 7 THEN 1 ELSE 0 END) AS julio_${fechaa},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechaa} AND MONTH(p.created_at) = 8 THEN 1 ELSE 0 END) AS agosto_${fechaa},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechaa} AND MONTH(p.created_at) = 9 THEN 1 ELSE 0 END) AS septiembre_${fechaa},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechaa} AND MONTH(p.created_at) = 10 THEN 1 ELSE 0 END) AS octubre_${fechaa},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechaa} AND MONTH(p.created_at) = 11 THEN 1 ELSE 0 END) AS noviembre_${fechaa},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechaa} AND MONTH(p.created_at) = 12 THEN 1 ELSE 0 END) AS diciembre_${fechaa},
            
            SUM(CASE WHEN YEAR(p.created_at) = ${fechab} AND MONTH(p.created_at) = 1 THEN 1 ELSE 0 END) AS enero_${fechab},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechab} AND MONTH(p.created_at) = 2 THEN 1 ELSE 0 END) AS febrero_${fechab},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechab} AND MONTH(p.created_at) = 3 THEN 1 ELSE 0 END) AS marzo_${fechab},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechab} AND MONTH(p.created_at) = 4 THEN 1 ELSE 0 END) AS abril_${fechab},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechab} AND MONTH(p.created_at) = 5 THEN 1 ELSE 0 END) AS mayo_${fechab},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechab} AND MONTH(p.created_at) = 6 THEN 1 ELSE 0 END) AS junio_${fechab},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechab} AND MONTH(p.created_at) = 7 THEN 1 ELSE 0 END) AS julio_${fechab},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechab} AND MONTH(p.created_at) = 8 THEN 1 ELSE 0 END) AS agosto_${fechab},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechab} AND MONTH(p.created_at) = 9 THEN 1 ELSE 0 END) AS septiembre_${fechab},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechab} AND MONTH(p.created_at) = 10 THEN 1 ELSE 0 END) AS octubre_${fechab},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechab} AND MONTH(p.created_at) = 11 THEN 1 ELSE 0 END) AS noviembre_${fechab},
            SUM(CASE WHEN YEAR(p.created_at) = ${fechab} AND MONTH(p.created_at) = 12 THEN 1 ELSE 0 END) AS diciembre_${fechab}
        FROM
            pedidos p
        WHERE
            p.estado = 1
            AND YEAR(p.created_at) BETWEEN ${fechaa} AND ${fechab}
        GROUP BY
            p.cliente_id
    `;

	/*	//const queryBuilder = this.clienteRepository
		//	.createQueryBuilder('cliente')
		//	.innerJoin('users', 'u', 'cliente.user_clavepedido = u.clave_pedidos')
			.leftJoin(
				`(${pedidosSubquery})`,
				'pedidos_aggregated',
				'pedidos_aggregated.cliente_id = cliente.id',
			)
			.leftJoin(
				`(${porcentajesSubquery})`,
				'porcentajes_aggregated',
				'porcentajes_aggregated.cliente_id = cliente.id',
			)
			.where('u.estado = :estado', { estado: 1 })
			.andWhere('cliente.tipo = :tipo', { tipo: 1 })
			.andWhere('cliente.user_clavepedido NOT IN (:asesores)', { asesores: ['B'] })

			//.groupBy('cliente.id')
			.select([
				'cliente.correlativo AS correlativo',
				'CONVERT(cliente.tipo, CHAR) AS tipo',
				'cliente.user_clavepedido AS asesor',
				'cliente.nombre AS nombre',
				'cliente.dni AS dni',
				'cliente.icelular AS icelular',
				'CONVERT(cliente.celular, CHAR) AS celular',
				'cliente.provincia AS provincia',
				'cliente.distrito AS distrito',
				'cliente.direccion AS direccion',
				'cliente.referencia AS referencia',
				'porcentajes_aggregated.FSB AS porcentajefsb',
				'porcentajes_aggregated.FCB AS porcentajefb',
				'porcentajes_aggregated.ESB AS porcentajeesb',
				'porcentajes_aggregated.ECB AS porcentajeeb',
				'porcentajes_aggregated.ECBD AS porcentajeecbd',
				`COALESCE((CASE WHEN cliente.deuda = 1 THEN 'SI' ELSE 'NO' END), 'NO') AS deuda`,
				`COALESCE((CASE WHEN cliente.deuda = 1 THEN 'DEBE' ELSE 'CANCELADO' END), 'CANCELADO') AS deposito`,
				`(cliente.fecha_ultimopedido) AS fecha`,
				`DATE_FORMAT(cliente.fecha_ultimopedido, '%d') AS fechaultimopedido_dia`,
				`DATE_FORMAT(cliente.fecha_ultimopedido, '%m') AS fechaultimopedido_mes`,
				`DATE_FORMAT(cliente.fecha_ultimopedido, '%Y') AS fechaultimopedido_anio`,
				'cliente.codigo_ultimopedido AS codigo',
				'cliente.situacion AS situacion',
				`COALESCE(cliente.pagado_ultimopedido, 0) AS estadoultimopedido`,
				`COALESCE(cliente.estado, 0) AS estado`,
				`COALESCE(pedidos_aggregated.enero_${fechaa},0) AS eneroa`,
				`pedidos_aggregated.febrero_${fechaa} AS febreroa`,
				`pedidos_aggregated.marzo_${fechaa} AS marzoa`,
				`pedidos_aggregated.abril_${fechaa} AS abrila`,
				`pedidos_aggregated.mayo_${fechaa} AS mayoa`,
				`pedidos_aggregated.junio_${fechaa} AS junioa`,
				`pedidos_aggregated.julio_${fechaa} AS julioa`,
				`pedidos_aggregated.agosto_${fechaa} AS agostoa`,
				`COALESCE(pedidos_aggregated.septiembre_${fechaa},0) AS septiembrea`,
				`pedidos_aggregated.octubre_${fechaa} AS octubrea`,
				`pedidos_aggregated.noviembre_${fechaa} AS noviembrea`,
				`pedidos_aggregated.diciembre_${fechaa} AS diciembrea`,
				`pedidos_aggregated.enero_${fechab} AS enerob`,
				`pedidos_aggregated.febrero_${fechab} AS febrerob`,
				`pedidos_aggregated.marzo_${fechab} AS marzob`,
				`pedidos_aggregated.abril_${fechab} AS abrilb`,
				`pedidos_aggregated.mayo_${fechab} AS mayob`,
				`pedidos_aggregated.junio_${fechab} AS juniob`,
				`pedidos_aggregated.julio_${fechab} AS juliob`,
				`pedidos_aggregated.agosto_${fechab} AS agostob`,
				`COALESCE(pedidos_aggregated.septiembre_${fechab},0) AS septiembreb`,
				`pedidos_aggregated.octubre_${fechab} AS octubreb`,
				`pedidos_aggregated.noviembre_${fechab} AS noviembreb`,
				`pedidos_aggregated.diciembre_${fechab} AS diciembreb`,
			]);

		/*if (bases.length > 0) {
			queryBuilder.andWhere('cliente.user_clavepedido IN (:bases)', { bases: bases });
		}*/

		//queryBuilder.limit(5000);
/*
		const results = await queryBuilder.getRawMany();

		results.forEach(result => {
			result.porcentajefsb = result.porcentajefsb + '%';
			result.porcentajefb = result.porcentajefb + '%';
			result.porcentajeesb = result.porcentajeesb + '%';
			result.porcentajeeb = result.porcentajeeb + '%';
			result.porcentajeecbd = result.porcentajeecbd + '%';

			result.estado = result.estado === 1 ? 'ACTIVO' : 'INACTIVO';
			result.pidio = result.pidio === 0 ? 'DEUDA' : result.pidio === 1 ? 'ADELANTO' : 'CANCELADO';

			result.estadoultimopedido =
				result.estadoultimopedido === 0
					? 'DEUDA'
					: result.estadoultimopedido === 1
					? 'ADELANTO'
					: 'CANCELADO';
		});

		return results;
	}*/
	}
}
