import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // 设置swagger文档
    const config = new DocumentBuilder()
    .setTitle('用户模块后台接口文档')   
    .setDescription('用于用户模块单元的接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局注册验证器
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
