/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateDocumentacion = void 0;
const swagger_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
function generateDocumentacion(app) {
    const pdfMod = new swagger_1.DocumentBuilder()
        .setTitle('Exports')
        .setDescription('Exports')
        .setVersion(process.env.APP_VERSION)
        .build();
    const pdfDocument = swagger_1.SwaggerModule.createDocument(app, pdfMod, {
        include: [app_module_1.AppModule],
    });
    swagger_1.SwaggerModule.setup('docs/exports', app, pdfDocument);
}
exports.generateDocumentacion = generateDocumentacion;


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const app_controller_1 = __webpack_require__(6);
const database_module_1 = __webpack_require__(13);
const config_1 = __webpack_require__(16);
const config_2 = __webpack_require__(15);
const Joi = __webpack_require__(17);
const cliente_controller_1 = __webpack_require__(18);
const test_controller_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(14);
const usuario_entity_1 = __webpack_require__(20);
const usuarios_service_1 = __webpack_require__(22);
const api_controller_1 = __webpack_require__(25);
const familiar_entity_1 = __webpack_require__(23);
const conversacion_chatgpt_entity_1 = __webpack_require__(28);
const chatgpt_controller_1 = __webpack_require__(29);
const chatgpt_service_1 = __webpack_require__(30);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, familiar_entity_1.Familiar, conversacion_chatgpt_entity_1.ConversacionChatGPT]),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                load: [config_2.default],
                validationSchema: Joi.object(config_2.validation),
            }),
            database_module_1.DatabaseModule,
        ],
        providers: [usuarios_service_1.UsuariosService, chatgpt_service_1.ChatGPTService],
        controllers: [app_controller_1.AppController, cliente_controller_1.ClienteController, test_controller_1.TestController, api_controller_1.UsuariosController, chatgpt_controller_1.ChatGPTController],
    })
], AppModule);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const excel_dto_1 = __webpack_require__(7);
const node_1 = __webpack_require__(10);
const response_1 = __webpack_require__(11);
const utils_1 = __webpack_require__(12);
let AppController = exports.AppController = class AppController {
    async getExcel(dto) {
        const schema = (0, utils_1.convertRows)(dto.schema);
        const data = dto.data;
        const buffer = await (0, node_1.default)(data, {
            schema,
            buffer: true,
        });
        return (0, response_1.customResponse)('excel', buffer.toString('base64'));
    }
};
__decorate([
    (0, common_1.Post)('excel'),
    (0, swagger_1.ApiOperation)({ summary: 'Reporte de RUCs' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof excel_dto_1.ExcelDto !== "undefined" && excel_dto_1.ExcelDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getExcel", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExcelDto = exports.SchemaDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(8);
const class_validator_1 = __webpack_require__(9);
class SchemaDto {
}
exports.SchemaDto = SchemaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SchemaDto.prototype, "column", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", Object)
], SchemaDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], SchemaDto.prototype, "width", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], SchemaDto.prototype, "format", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SchemaDto.prototype, "value", void 0);
class ExcelDto {
}
exports.ExcelDto = ExcelDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SchemaDto),
    (0, swagger_1.ApiProperty)({ type: [SchemaDto] }),
    __metadata("design:type", Array)
], ExcelDto.prototype, "schema", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Object),
    (0, swagger_1.ApiProperty)({ type: [Object] }),
    __metadata("design:type", Array)
], ExcelDto.prototype, "data", void 0);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("write-excel-file/node");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.customResponse = void 0;
const customResponse = (message = 'Operacion Exitosa', body = null, statusCode = 200) => {
    return {
        statusCode,
        message,
        body,
    };
};
exports.customResponse = customResponse;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeadReniec2018 = exports.HeadSBS = exports.HeadSBSDetalle = exports.HeadEssalud = exports.HeadMovistar = exports.HeadFamiliar = exports.HeadCorreo = exports.convertRows = void 0;
const convertRows = (schema) => {
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
                }
                else {
                    dd[key] = e[key];
                }
            }
        }
        newData.push(dd);
    });
    return newData;
};
exports.convertRows = convertRows;
exports.HeadCorreo = [
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
];
exports.HeadFamiliar = [
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
];
exports.HeadMovistar = [
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
];
exports.HeadEssalud = [
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
exports.HeadSBSDetalle = [
    {
        column: 'DOCUMENTO',
        type: 'string',
        format: '',
        value: 'documento',
        width: 15,
    },
    {
        column: 'FECHA REPORTE',
        type: 'string',
        format: '',
        value: 'fecha_reporte',
        width: 15,
    },
    {
        column: 'RUC',
        type: 'string',
        format: '',
        value: 'ruc',
        width: 15,
    },
    {
        column: 'CÓDIGO SBS',
        type: 'string',
        format: '',
        value: 'cod_sbs',
        width: 15,
    },
    {
        column: 'ENTIDAD',
        type: 'string',
        format: '',
        value: 'entidad',
        width: 25,
    },
    {
        column: 'TIPO CRÉDITO',
        type: 'string',
        format: '',
        value: 'tipo_credito',
        width: 25,
    },
    {
        column: 'CONDICIÓN',
        type: 'string',
        format: '',
        value: 'condicion',
        width: 15,
    },
    {
        column: 'SALDO',
        type: 'number',
        format: '#,##0.00',
        value: 'saldo',
        width: 15,
    },
    {
        column: 'DÍAS DE ATRASO',
        type: 'number',
        format: '',
        value: 'dias_atraso',
        width: 15,
    },
];
exports.HeadSBS = [
    {
        column: 'DOCUMENTO',
        type: 'string',
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
        format: '0.00',
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
exports.HeadReniec2018 = [
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
];


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const config_1 = __webpack_require__(15);
let DatabaseModule = exports.DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => {
                    return {
                        type: 'mariadb',
                        host: configService.host,
                        port: parseInt(configService.port_db),
                        username: configService.user_name,
                        password: configService.password,
                        database: configService.database,
                        autoLoadEntities: true,
                        synchronize: false,
                    };
                },
                inject: [config_1.default.KEY],
            }),
        ],
    })
], DatabaseModule);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validation = void 0;
const config_1 = __webpack_require__(16);
const Joi = __webpack_require__(17);
exports["default"] = (0, config_1.registerAs)('config', () => ({
    port: process.env.PORT,
    host: process.env.HOST,
    port_db: process.env.PORT_DB,
    user_name: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}));
exports.validation = {
    PORT: Joi.number().required(),
    HOST: Joi.string().required(),
    PORT_DB: Joi.number().required(),
    USER_NAME: Joi.string().required(),
    PASSWORD: Joi.string().required(),
    DATABASE: Joi.string().required(),
};


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("joi");

/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClienteController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
let ClienteController = exports.ClienteController = class ClienteController {
    constructor() { }
};
exports.ClienteController = ClienteController = __decorate([
    (0, common_1.Controller)('cliente'),
    (0, swagger_1.ApiTags)('cliente'),
    __metadata("design:paramtypes", [])
], ClienteController);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
let TestController = exports.TestController = class TestController {
    constructor() { }
};
exports.TestController = TestController = __decorate([
    (0, common_1.Controller)('test'),
    (0, swagger_1.ApiTags)('test'),
    __metadata("design:paramtypes", [])
], TestController);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Usuario = void 0;
const typeorm_1 = __webpack_require__(21);
let Usuario = exports.Usuario = class Usuario {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "correo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "contrase\u00F1a", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Usuario.prototype, "fecha_registro", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Usuario.prototype, "estado", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)('usuarios')
], Usuario);


/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsuariosService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(21);
const usuario_entity_1 = __webpack_require__(20);
const familiar_entity_1 = __webpack_require__(23);
const axios_1 = __webpack_require__(24);
let UsuariosService = exports.UsuariosService = class UsuariosService {
    constructor(usuariosRepository, familiaresRepository) {
        this.usuariosRepository = usuariosRepository;
        this.familiaresRepository = familiaresRepository;
    }
    async validarDni(dni) {
        try {
            const response = await axios_1.default.get('http://5.199.171.68/api/datos_personales', {
                params: {
                    user: 'api_search',
                    password: 'zHtdVZZn3RFt',
                    documento: dni,
                },
            });
            if (response.data && response.data.documento) {
                return true;
            }
            else {
                throw new common_1.HttpException('DNI no válido: no se encontró información', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.error('Error al hacer la solicitud al API:', error.response?.data || error.message);
            }
            else {
                console.error('Error al validar el DNI:', error.message);
            }
            throw new common_1.HttpException('Error al validar el DNI con el servicio externo', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(createUsuarioDto) {
        createUsuarioDto.documento = Number(createUsuarioDto.documento);
        const dniValido = await this.validarDni(createUsuarioDto.documento.toString());
        if (!dniValido) {
            throw new common_1.HttpException('DNI no válido', common_1.HttpStatus.BAD_REQUEST);
        }
        const usuario = this.usuariosRepository.create(createUsuarioDto);
        return this.usuariosRepository.save(usuario);
    }
    async vincularFamiliar(idFamiliarOrigen, idFamiliar, tipoRelacion) {
        const usuario = await this.usuariosRepository.findOne({ where: { id: idFamiliarOrigen } });
        if (!usuario) {
            throw new common_1.HttpException('Usuario no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const familiar = await this.usuariosRepository.findOne({ where: { id: idFamiliar } });
        if (!familiar) {
            throw new common_1.HttpException('Familiar no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const nuevoFamiliar = this.familiaresRepository.create({
            id_usuario: usuario,
            id_familiar: familiar,
            tipo_relacion: tipoRelacion,
        });
        await this.familiaresRepository.save(nuevoFamiliar);
        return { message: 'Familiar vinculado correctamente' };
    }
    async login(loginDto) {
        const { correo, contraseña } = loginDto;
        const usuario = await this.usuariosRepository.findOne({ where: { correo } });
        if (!usuario) {
            throw new common_1.HttpException('Usuario no registrado', common_1.HttpStatus.BAD_REQUEST);
        }
        const isPasswordValid = usuario.contraseña === contraseña;
        if (!isPasswordValid) {
            throw new common_1.HttpException('Contraseña incorrecta', common_1.HttpStatus.BAD_REQUEST);
        }
        return usuario;
    }
};
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(familiar_entity_1.Familiar)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], UsuariosService);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Familiar = void 0;
const typeorm_1 = __webpack_require__(21);
const usuario_entity_1 = __webpack_require__(20);
let Familiar = exports.Familiar = class Familiar {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Familiar.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.id),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", typeof (_a = typeof usuario_entity_1.Usuario !== "undefined" && usuario_entity_1.Usuario) === "function" ? _a : Object)
], Familiar.prototype, "id_usuario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.id),
    (0, typeorm_1.JoinColumn)({ name: 'id_familiar' }),
    __metadata("design:type", typeof (_b = typeof usuario_entity_1.Usuario !== "undefined" && usuario_entity_1.Usuario) === "function" ? _b : Object)
], Familiar.prototype, "id_familiar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['padre', 'madre', 'hermano', 'otro'],
    }),
    __metadata("design:type", String)
], Familiar.prototype, "tipo_relacion", void 0);
exports.Familiar = Familiar = __decorate([
    (0, typeorm_1.Entity)('familiares')
], Familiar);


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsuariosController = void 0;
const common_1 = __webpack_require__(2);
const usuarios_service_1 = __webpack_require__(22);
const usuario_dto_1 = __webpack_require__(26);
const login_dto_1 = __webpack_require__(27);
let UsuariosController = exports.UsuariosController = class UsuariosController {
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    async create(createUsuarioDto) {
        return this.usuariosService.create(createUsuarioDto);
    }
    async vincularFamiliar(body) {
        const { id_familiar_origen, id_familiar, tipo_relacion } = body;
        return this.usuariosService.vincularFamiliar(id_familiar_origen, id_familiar, tipo_relacion);
    }
    async login(loginDto) {
        return this.usuariosService.login(loginDto);
    }
};
__decorate([
    (0, common_1.Post)('create-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof usuario_dto_1.CreateUsuarioDto !== "undefined" && usuario_dto_1.CreateUsuarioDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UsuariosController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('vincular-familiar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "vincularFamiliar", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "login", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [typeof (_a = typeof usuarios_service_1.UsuariosService !== "undefined" && usuarios_service_1.UsuariosService) === "function" ? _a : Object])
], UsuariosController);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUsuarioDto = void 0;
const class_validator_1 = __webpack_require__(9);
class CreateUsuarioDto {
}
exports.CreateUsuarioDto = CreateUsuarioDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateUsuarioDto.prototype, "documento", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "correo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "telefono", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "contrase\u00F1a", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['vecino', 'admin']),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "rol", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['activo', 'inactivo']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateUsuarioDto.prototype, "fecha_registro", void 0);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(9);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "correo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "contrase\u00F1a", void 0);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConversacionChatGPT = void 0;
const typeorm_1 = __webpack_require__(21);
let ConversacionChatGPT = exports.ConversacionChatGPT = class ConversacionChatGPT {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ConversacionChatGPT.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ConversacionChatGPT.prototype, "id_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ConversacionChatGPT.prototype, "mensaje_usuario", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ConversacionChatGPT.prototype, "mensaje_chatgpt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ConversacionChatGPT.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ConversacionChatGPT.prototype, "contexto", void 0);
exports.ConversacionChatGPT = ConversacionChatGPT = __decorate([
    (0, typeorm_1.Entity)('conversaciones_chatgpt')
], ConversacionChatGPT);


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatGPTController = void 0;
const common_1 = __webpack_require__(2);
const chatgpt_service_1 = __webpack_require__(30);
const ChatGPTConversacion_dto_1 = __webpack_require__(31);
let ChatGPTController = exports.ChatGPTController = class ChatGPTController {
    constructor(chatGptService) {
        this.chatGptService = chatGptService;
    }
    async enviarMensaje(chatDto) {
        return await this.chatGptService.enviarMensajeChatGPT(chatDto);
    }
};
__decorate([
    (0, common_1.Post)('enviar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof ChatGPTConversacion_dto_1.ChatGPTConversacionDto !== "undefined" && ChatGPTConversacion_dto_1.ChatGPTConversacionDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ChatGPTController.prototype, "enviarMensaje", null);
exports.ChatGPTController = ChatGPTController = __decorate([
    (0, common_1.Controller)('chatgpt'),
    __metadata("design:paramtypes", [typeof (_a = typeof chatgpt_service_1.ChatGPTService !== "undefined" && chatgpt_service_1.ChatGPTService) === "function" ? _a : Object])
], ChatGPTController);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatGPTService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatGPTService = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(16);
const axios_1 = __webpack_require__(24);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(21);
const conversacion_chatgpt_entity_1 = __webpack_require__(28);
let ChatGPTService = exports.ChatGPTService = ChatGPTService_1 = class ChatGPTService {
    constructor(conversacionRepository, configService) {
        this.conversacionRepository = conversacionRepository;
        this.configService = configService;
        this.logger = new common_1.Logger(ChatGPTService_1.name);
        this.apiKey = this.configService.get('CHATGPT_API_KEY');
        if (!this.apiKey) {
            throw new common_1.HttpException('API key de OpenAI no configurada', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async retryRequest(request, retries = 5, delay = 2000) {
        let lastError;
        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                return await request();
            }
            catch (error) {
                lastError = error;
                if (error.response?.status === 429) {
                    this.logger.warn(`Límite de solicitudes alcanzado. Reintentando en ${delay / 1000} segundos...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                }
                else {
                    throw error;
                }
            }
        }
        this.logger.error(`Error tras ${retries} intentos: ${lastError.message}`);
        throw new common_1.HttpException(`Error al interactuar con la API de ChatGPT tras ${retries} intentos: ${lastError.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async enviarMensajeChatGPT(chatDto) {
        const { id_usuario, mensaje_usuario, contexto } = chatDto;
        try {
            const request = async () => {
                const response = await axios_1.default.post('https://api.openai.com/v1/chat/completions', {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: 'Eres un asistente útil.' },
                        { role: 'user', content: mensaje_usuario },
                    ],
                    temperature: 0.7,
                    max_tokens: 150,
                }, {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json',
                    },
                });
                return response;
            };
            const response = await this.retryRequest(request);
            const mensaje_chatgpt = response.data.choices[0].message.content;
            const nuevaConversacion = this.conversacionRepository.create({
                id_usuario,
                mensaje_usuario,
                mensaje_chatgpt,
                contexto,
            });
            await this.conversacionRepository.save(nuevaConversacion);
            return {
                mensaje_usuario,
                mensaje_chatgpt,
            };
        }
        catch (error) {
            this.logger.error('Error al interactuar con la API de ChatGPT', error.stack);
            throw new common_1.HttpException(`Error al interactuar con la API de ChatGPT: ${error.response?.data?.error?.message || error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ChatGPTService = ChatGPTService = ChatGPTService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(conversacion_chatgpt_entity_1.ConversacionChatGPT)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], ChatGPTService);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatGPTConversacionDto = void 0;
const class_validator_1 = __webpack_require__(9);
class ChatGPTConversacionDto {
}
exports.ChatGPTConversacionDto = ChatGPTConversacionDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ChatGPTConversacionDto.prototype, "id_usuario", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatGPTConversacionDto.prototype, "mensaje_usuario", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChatGPTConversacionDto.prototype, "contexto", void 0);


/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = require("body-parser");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const documentacion_1 = __webpack_require__(3);
const bodyParser = __webpack_require__(32);
const app_module_1 = __webpack_require__(5);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Main');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.enableCors();
    (0, documentacion_1.generateDocumentacion)(app);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    await app.listen(process.env.PORT || 3000, () => {
        logger.log(`Server running on port ${process.env.PORT || 3000}`);
        logger.log(`Modo ${process.env.NODE_ENV ? process.env.NODE_ENV : 'Desarrollo'}`);
        logger.log(__dirname);
    });
}
bootstrap();

})();

/******/ })()
;