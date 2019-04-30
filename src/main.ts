import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SpiderModule } from './module/spider.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(SpiderModule, {
        transport: Transport.TCP,
        options: {
            port: 8083,
            host: '0.0.0.0'
        },
    });
    app.listen(() => console.log('spiderService is listening'));
}
bootstrap();
