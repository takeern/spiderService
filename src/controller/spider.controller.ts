import { Controller, Get } from '@nestjs/common';
import { SpiderService } from '../services/spider.services';
import { MessagePattern } from '@nestjs/microservices';
import { IspiderAction } from '../interface/ISearchConfig.interface'; 

@Controller()
export class SpiderController {
    constructor(private readonly spiderService: SpiderService) {}
    
    @MessagePattern({ cmd: 'spider' })
    async spiderAction(data: IspiderAction) {
        console.log('SPIDER CONTROLLER');
        switch (data.type) {
            case ('getBookNumber'): {
                return this.spiderService.searchBook(data.playload);
            }
            case ('getBookList'): {
                return this.spiderService.getBookList(data.playload);
            }
            case ('getBookData'): {
                return this.spiderService.getBookData(data.playload);
            }
            case ('getBookAllData'): {
                return this.spiderService.getBookAllData(data.playload);
            }
            default: throw new Error('undefiende action');
        }
    }
}
