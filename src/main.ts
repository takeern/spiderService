import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SpiderModule } from './module/spider.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(SpiderModule, {
        transport: Transport.TCP,
    });
    app.listen(8083, '0.0.0.0');
}
bootstrap();
