import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { Cliente } from 'src/entities/cliente.entity';
//import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
	constructor(
	//	@InjectRepository(Cliente) private readonly clienteRepository: Repository<Cliente>,
	//	@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {}

	// async getClienteCuatromesesDeben() {
	// 	console.log('getClienteCuatromesesDeben');

	// 	const fechaFin = new Date();
	// 	const fechaInicio = new Date(fechaFin);
	// 	fechaInicio.setMonth(fechaFin.getMonth() - 4);

	// 	// Convertir las fechas a formato de cadena 'YYYY-MM-DD'
	// 	const fechaInicioStr = fechaInicio.toISOString().split('T')[0];
	// 	const fechaFinStr = fechaFin.toISOString().split('T')[0];

	// 	console.log('getClienteCuatromesesDeben', fechaInicioStr, fechaFinStr);

	// 	const clientesdeudaSubquery = `
	// 		SELECT
	// 			p.cliente_id AS cliente_id,
	// 			COUNT(*) AS total_pedidos_deuda_4meses
	// 		FROM
	// 			pedidos p
	// 		WHERE
	// 			p.estado = 1
	// 			AND p.pagado IN (0, 1)
	// 			AND p.correccion IN (0, 3)
	// 			and p.cliente_id=10
	// 			AND cast(p.created_at as date) BETWEEN '${fechaInicioStr}' AND '${fechaFinStr}'
	// 		GROUP BY
	// 			p.cliente_id
	//   	`;

	// 	console.log(clientesdeudaSubquery);
	// 	const results1 = this.clienteRepository.query(clientesdeudaSubquery);
	// 	//return results1;

	// 	const porcentajesSubquery = `
	// 		WITH clientes_porcentajes AS (
	// 			${clientesdeudaSubquery}
	// 		)
	// 		SELECT
	// 			p.cliente_id AS cliente_id,
	// 			SUM(CASE WHEN p.cod_porcentaje = 'FSB' THEN p.porcentaje ELSE 0 END) AS FSB,
	// 			SUM(CASE WHEN p.cod_porcentaje = 'FCB' THEN p.porcentaje ELSE 0 END) AS FCB,
	// 			SUM(CASE WHEN p.cod_porcentaje = 'ESB' THEN p.porcentaje ELSE 0 END) AS ESB,
	// 			SUM(CASE WHEN p.cod_porcentaje = 'ECB' THEN p.porcentaje ELSE 0 END) AS ECB,
	// 			SUM(CASE WHEN p.cod_porcentaje = 'ECBD' THEN p.porcentaje ELSE 0 END) AS ECBD
	// 		FROM
	// 			porcentajes p
	// 			inner join clientes_porcentajes on clientes_porcentajes.cliente_id = p.cliente_id
	// 		WHERE
	// 			p.cod_porcentaje in ('FSB','FCB','ESB','ECB','ECBD')
	// 		GROUP BY
	// 			p.cliente_id
	// 	`;

	// 	console.log(porcentajesSubquery);
	// 	const results2 = this.clienteRepository.query(clientesdeudaSubquery);
	// 	//return results2;

	// 	const clientesrucsSubquery = `
	// 	WITH clientes_aggregated AS (
	// 		${clientesdeudaSubquery}
	// 	)
	// 		SELECT
	// 			r.cliente_id AS cliente_id,
	// 			group_concat(r.num_ruc) AS mis_rucs
	// 		FROM
	// 			rucs r
	// 			inner join clientes_aggregated on clientes_aggregated.cliente_id = r.cliente_id
	// 		WHERE
	// 			r.estado = 1
	// 		GROUP BY
	// 			r.cliente_id
	//   	`;

	// 	const queryBuilder = this.clienteRepository
	// 		.createQueryBuilder('cliente')
	// 		.innerJoin('users', 'u', 'cliente.user_clavepedido = u.clave_pedidos')
	// 		.innerJoin(
	// 			`(${clientesdeudaSubquery})`,
	// 			'clientes_aggregated',
	// 			'clientes_aggregated.cliente_id = cliente.id',
	// 		)
	// 		.leftJoin(
	// 			`(${clientesrucsSubquery})`,
	// 			'clientes_rucs_aggregated',
	// 			'clientes_rucs_aggregated.cliente_id = cliente.id',
	// 		)
	// 		.leftJoin(
	// 			`(${porcentajesSubquery})`,
	// 			'porcentajes_aggregated',
	// 			'porcentajes_aggregated.cliente_id = cliente.id',
	// 		)
	// 		.where('u.estado = :estado', { estado: 1 })
	// 		.andWhere('cliente.tipo = :tipo', { tipo: 1 })
	// 		.andWhere('cliente.user_clavepedido NOT IN (:asesores)', { asesores: ['B'] })
	// 		.select([
	// 			'cliente.id as item',
	// 			'cliente.user_clavepedido as asesor_identificador',
	// 			'CONVERT(cliente.celular, CHAR) as celular',
	// 			'clientes_aggregated.total_pedidos_deuda_4meses as deudas',
	// 			' "DEUDA" as deuda ',
	// 			'clientes_rucs_aggregated.mis_rucs as rucs',
	// 			'porcentajes_aggregated.FSB',
	// 			'porcentajes_aggregated.FCB',
	// 			'porcentajes_aggregated.ESB',
	// 			'porcentajes_aggregated.ECB',
	// 			'porcentajes_aggregated.ECBD',
	// 		]);
	// 	//.limit(1);

	// 	// Execute the query and return results
	// 	const results = await queryBuilder.getRawMany();
	// 	return results;
	// }
}
