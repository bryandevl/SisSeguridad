import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { Pedido } from 'src/entities/pedido.entity';
//import { User } from 'src/entities/user.entity';
//import { getBasesByUserId } from 'src/utils';
import { Repository } from 'typeorm';

@Injectable()
export class PagosExportService {
	//@InjectRepository(User) private readonly userRepository: Repository<User>;
/*
	constructor(@InjectRepository(Pedido) private readonly pedidoRepository: Repository<Pedido>) {}

	async getPagos(anio: number, mes: number, usuario: number) {
		//console.log(anio, mes, usuario);

		// Obtener las bases por usuario
		//let bases = await getBasesByUserId(usuario);
		// console.log(bases);
		// return;

		// Subquery para obtener el último voucher por pedido
		const ultimoVoucherPedido = `
		SELECT vp.pedido_id AS pedido_id, MAX(v.fecha_voucher) AS max_fecha_deposito, v.correlativo AS correlativo
			FROM vouchers v
			INNER JOIN voucher_pedidos vp ON v.id = vp.voucher_id
			WHERE v.deleted_at IS NULL and vp.deleted_at IS NULL
			AND YEAR(vp.fecha_pedido) = ${anio}
			AND MONTH(vp.fecha_pedido) = ${mes}
			GROUP BY vp.pedido_id, v.correlativo
        `;

		// console.log(ultimoVoucherPedido);
		// Construcción de la consulta principal con QueryBuilder
		const queryBuilder = this.pedidoRepository
			.createQueryBuilder('pedidos')
			.innerJoin('detalle_pedidos', 'dp', 'pedidos.id = dp.pedido_id')
			.innerJoin('users', 'u', 'pedidos.user_clavepedido = u.clave_pedidos')
			.innerJoin('clientes', 'c', 'c.id = pedidos.cliente_id')
			.leftJoin(
                `(${ultimoVoucherPedido})`,
                'ultimovoucher_aggregated',
                'ultimovoucher_aggregated.pedido_id = pedidos.id'
            )
			.where('u.estado = :estado', { estado: 1 })
			.andWhere('c.tipo = :tipo', { tipo: 1 })
			// Ajustar YEAR y MONTH para ser parametrizados como cadenas de texto
			.andWhere('YEAR(pedidos.fecha_origen) = :anio', { anio: anio.toString() })
			.andWhere('MONTH(pedidos.fecha_origen) = :mes', { mes: mes.toString() })
			.andWhere('c.user_clavepedido NOT IN (:...asesores)', { asesores: ['B'] })
			.select([
				'c.celular as celular',
                'pedidos.id as pedido_id',
				'c.nombre AS nombre_cliente',
				'c.correlativo AS correlativo_cliente',
				'pedidos.codigo AS codigo_pedido',
				'pedidos.fecha_origen AS fecha_origen',
				'YEAR(pedidos.fecha_origen) AS fecha_origen_year',
				'MONTH(pedidos.fecha_origen) AS fecha_origen_month',
				'pedidos.correlativo AS correlativo_pedido',
				'pedidos.user_clavepedido AS user_clavepedido',
				'dp.ft AS ft',
				'dp.total AS total',
				'dp.saldo AS saldo',
				'pedidos.estado as estado',
				'pedidos.pendiente_anulacion',
				'pedidos.pagado as tipo',
                'ultimovoucher_aggregated.correlativo AS ultimo_voucher'
			]);

		// Aplicar filtro si hay bases específicas
		/*if (bases.length > 0) {
			queryBuilder.andWhere('pedidos.user_clavepedido IN (:bases)', { bases });
		}*/

		// Limitar resultados a solo 1 (si lo necesitas)
		//queryBuilder.limit(1);

		// Ejecutar la consulta/*
		//const results = await queryBuilder.getRawMany();

		// Transformar resultados para agregar valores legibles
		//results.forEach(result => {
		//	result.estado = result.estado === 1 ? 'ACTIVO' : 'INACTIVO';
		//	result.tipo =   result.pendiente_anulacion === 1 ? 'SOLIC. ANULACION' : (result.estado ===0 ? 'ANULADO': (result.tipo ==0 ? 'SIN PAGO':(result.tipo==1 ? 'ADELANTO': 'PAGADO' ) )) ;
		//	result.pendiente_anulacion = result.pendiente_anulacion === 1 ? 'PENDIENTE' : 'NO';
//});

	//	return results;
	//}*/

}