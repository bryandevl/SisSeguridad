import axios from 'axios';
import { SchemaDto } from './dtos/excel.dto';

export const convertRows = (schema: SchemaDto[]) => {
	const newData = [];

	schema.forEach(e => {
		const dd = {};
		for (const key in e) {
			if (Object.prototype.hasOwnProperty.call(e, key)) {
				if (key === 'value') {
					dd[key] = d => d[e[key]];
					continue;
				}

				if (key === 'type') {
					switch (e[key]) {
						case 'string':
							dd[key] = String;
							break;
						case 'date':
							dd[key] = Date;
							break;
						case 'number':
							dd[key] = Number;
							break;
						case 'boolean':
							dd[key] = Boolean;
							break;
						default:
							dd[key] = String;
							break;
					}
				} else {
					dd[key] = e[key];
				}
			}
		}
		newData.push(dd);
	});

	return newData;
};


export const HeadCorreo =[


	{
		column: 'DOCUMENTO',
		type: 'string',
		format: '',
		value: 'documento',
		width: 15,
	},


	{
		column: 'CORREO',
		type: 'string',
		format: '',
		value: 'correo',
		width: 50,
	},
	{
		column: 'VALIDADO',
		type: 'string',
		format: '',
		value: 'validado',
		width: 3,
	}



]












export const HeadFamiliar =[

	{
		column: 'DOCUMENTO',
		type: 'string',
		format: '',
		value: 'documento',
		width: 15,
	},


	{
		column: 'DOCUMENTO PARIENTE',
		type: 'string',
		format: '',
		value: 'doc_parent',
		width: 15,
	},
	{
		column: 'NOMBRE',
		type: 'string',
		format: '',
		value: 'nombre',
		width: 50,
	},

	{
		column: 'TIPO',
		type: 'string',
		format: '',
		value: 'tipo',
		width: 10,
	},



]


export const HeadMovistar = [
	{
		column: 'Documento',
		type: 'number',
		format: '',
		value: 'documento',
		width: 15,
	},

	{
		column: 'NOMBRE',
		type: 'number',
		format: '',
		value: 'nombre',
		width: 50,
	},


	{
		column: 'NUMERO',
		type: 'number',
		format: '',
		value: 'numero',
		width: 10,
	},

	{
		column: 'ORIGEN DATA',
		type: 'string',
		format: '',
		value: 'origen_data',
		width: 45,
	},

	{
		column: 'FECHA DATA',
		type: 'string',
		format: '',
		value: 'fecha_data',
		width: 15,
	},

	{
		column: 'WSP',
		type: 'number',
		format: '',
		value: 'with_whatsapp',
		width: 5,
	},



]

export const HeadEssalud = [

	{
		column: 'DOCUMENTO',
		type: 'number',
		format: '',
		value: 'documento',
		width: 10,
	},

	{
		column: 'EMPRESA',
		type: 'string',
		format: '',
		value: 'empresa',
		width: 60,
	},


	{
		column: 'PERIODO',
		type: 'string',
		format: '',
		value: 'periodo',
		width: 7,
	},

	{
		column: 'RUC',
		type: 'string',
		format: '',
		value: 'ruc',
		width: 13,
	},

	{
		column: 'CONDICION',
		type: 'string',
		format: '',
		value: 'condicion',
		width: 3,
	},


	{
		column: 'SUELDO',
		type: 'string',
		format: '',
		value: 'sueldo',
		width: 12,
	},






];


export const HeadSBSDetalle = [
    {
        column: 'DOCUMENTO',
        type: 'string', // Mantiene ceros a la izquierda
        format: '',
        value: 'documento', // Nombre de la propiedad en el objeto
        width: 15,
    },
    {
        column: 'FECHA REPORTE',
        type: 'string', // Usar 'string' porque es un código (podrías usar 'date' si tiene un formato de fecha válido)
        format: '',
        value: 'fecha_reporte', // Nombre de la propiedad en el objeto
        width: 15,
    },
    {
        column: 'RUC',
        type: 'string', // Puede ser vacío
        format: '',
        value: 'ruc', // Nombre de la propiedad en el objeto
        width: 15,
    },
    {
        column: 'CÓDIGO SBS',
        type: 'string',
        format: '',
        value: 'cod_sbs', // Nombre de la propiedad en el objeto
        width: 15,
    },
    {
        column: 'ENTIDAD',
        type: 'string',
        format: '',
        value: 'entidad', // Nombre de la propiedad en el objeto
        width: 25,
    },
    {
        column: 'TIPO CRÉDITO',
        type: 'string',
        format: '',
        value: 'tipo_credito', // Nombre de la propiedad en el objeto
        width: 25,
    },
    {
        column: 'CONDICIÓN',
        type: 'string',
        format: '',
        value: 'condicion', // Nombre de la propiedad en el objeto
        width: 15,
    },
    {
        column: 'SALDO',
        type: 'number', // Es un número
        format: '#,##0.00', // Formato para mostrar con dos decimales
        value: 'saldo', // Nombre de la propiedad en el objeto
        width: 15,
    },
    {
        column: 'DÍAS DE ATRASO',
        type: 'number', // Es un número
        format: '',
        value: 'dias_atraso', // Nombre de la propiedad en el objeto
        width: 15,
    },
];


export const HeadSBS = [
	{
		column: 'DOCUMENTO',
		type: 'string', // Si el documento puede tener ceros a la izquierda, mejor usar 'string'
		format: '',
		value: 'sbs_documento',
		width: 15,
	},
	{
		column: 'CÓDIGO SBS',
		type: 'string',
		format: '',
		value: 'sbs_cod_sbs',
		width: 15,
	},
	{
		column: 'FECHA REPORTE SBS',
		type: 'string',
		format: '',
		value: 'sbs_fecha_reporte_sbs',
		width: 20,
	},
	{
		column: 'RUC',
		type: 'string',
		format: '',
		value: 'sbs_ruc',
		width: 15,
	},
	{
		column: 'CANTIDAD DE EMPRESAS',
		type: 'number',
		format: '',
		value: 'sbs_cant_empresas',
		width: 20,
	},
	{
		column: 'CALIFICACIÓN NORMAL',
		type: 'number',
		format: '0.00', // Para mostrar dos decimales
		value: 'sbs_calificacion_normal',
		width: 20,
	},
	{
		column: 'CALIFICACIÓN CPP',
		type: 'number',
		format: '0.00',
		value: 'sbs_calificacion_cpp',
		width: 20,
	},
	{
		column: 'CALIFICACIÓN DEFICIENTE',
		type: 'number',
		format: '0.00',
		value: 'sbs_calificacion_deficiente',
		width: 20,
	},
	{
		column: 'CALIFICACIÓN DUDOSO',
		type: 'number',
		format: '0.00',
		value: 'sbs_calificacion_dudoso',
		width: 20,
	},
	{
		column: 'CALIFICACIÓN PÉRDIDA',
		type: 'number',
		format: '0.00',
		value: 'sbs_calificacion_perdida',
		width: 20,
	}
];




export const HeadReniec2018 = [


	{
		column: 'DOCUMENTO',
		type: 'number',
		format: '',
		value: 'reniec_2018_documento',
		width: 10,
	},

	{
		column: 'APELLIDO PATERNO',
		type: 'string',
		format: '',
		value: 'reniec_2018_apellido_pat',
		width: 20,
	},

		{
		column: 'APELLIDO MATERNO',
		type: 'string',
		format: '',
		value: 'reniec_2018_apellido_mat',
		width: 20,
	},
	

	{
		column: 'NOMBRE',
		type: 'string',
		format: '',
		value: 'reniec_2018_nombre',
		width: 20,
	},
	


	{
		column: 'FECHA NACIMIENTO',
		type: 'string',
		format: '',
		value: 'reniec_2018_fec_nac',
		width: 20,
	},
	


	{
		column: 'UBIGEO',
		type: 'string',
		format: '',
		value: 'reniec_2018_ubigeo',
		width: 10,
	},
	
	{
		column: 'UBIGEO DIRECCION',
		type: 'string',
		format: '',
		value: 'reniec_2018_ubigeo_dir',
		width: 30,
	},
	

{
	column: 'DIRECCION',
	type: 'string',
	format: '',
	value: 'reniec_2018_direccion',
	width: 45,
},

{
	column: 'SEXO',
	type: 'number',
	format: '',
	value: 'reniec_2018_sexo',
	width: 3,
},


{
	column: 'E.CIVIL',
	type: 'string',
	format: '',
	value: 'reniec_2018_edo_civil',
	width: 8,
},

{
	column: 'DIG.RUC',
	type: 'number',
	format: '',
	value: 'reniec_2018_dig_ruc',
	width: 3,
},


{
	column: 'NOM.MADRE',
	type: 'string',
	format: '',
	value: 'reniec_2018_nombre_mad',
	width: 15,
},


{
	column: 'NOM.PADRE',
	type: 'string',
	format: '',
	value: 'reniec_2018_nombre_pat',
	width: 15,
},












]