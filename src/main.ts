import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ApiConfigService } from './common/api.config.service';
import { PublicAppModule } from './public.app.module';

async function bootstrap() {
  const publicApp = await NestFactory.create(PublicAppModule);
  let apiConfigService = publicApp.get<ApiConfigService>(ApiConfigService);

  const description = readFileSync(join(__dirname, '..', 'docs', 'swagger.md'), 'utf8');

  let documentBuilder = new DocumentBuilder()
    .setTitle('Elrond Microservice API')
    .setDescription(description)
    .setVersion('1.0.0')
    .setExternalDoc('Elrond Docs', 'https://docs.elrond.com');

  let apiUrls = apiConfigService.getApiUrls();
  for (let apiUrl of apiUrls) {
    documentBuilder = documentBuilder.addServer(apiUrl);
  }

  const config = documentBuilder.build();

  const document = SwaggerModule.createDocument(publicApp, config);
  SwaggerModule.setup('docs', publicApp, document);
  SwaggerModule.setup('', publicApp, document);

  await publicApp.listen(3000);
}

bootstrap();
