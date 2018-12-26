import { Module } from '@nestjs/common';
import { SpiderController } from '../controller/spider.controller';
import { SpiderService } from '../services/spider.services';

@Module({
    imports: [],
    controllers: [SpiderController],
    providers: [SpiderService],
})
export class SpiderModule {}
