import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

export function generateDocumentacion(app) {
	/** Genera una documentacion para el modulo de PDF */
	const pdfMod = new DocumentBuilder()
		.setTitle('Exports')
		.setDescription('Exports')
		.setVersion(process.env.APP_VERSION)
		// .addTag('PDF')
		.build();
	const pdfDocument = SwaggerModule.createDocument(app, pdfMod, {
		include: [AppModule],
	});
	SwaggerModule.setup('docs/exports', app, pdfDocument);
}
