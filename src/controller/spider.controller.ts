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
                // console.log()
                const searchData = await this.spiderService.searchBook(data.playload);
                return searchData;
            }
            case ('getBookList'): {
                const bookList = await this.spiderService.getBookList(data.playload);
                return bookList;
            }
            case ('getBookData'): {
                const bookData = await this.spiderService.getBookData(data.playload);
                return bookData;
            }
            case ('getBookAllData'): {
                const allData = await this.spiderService.getBookAllData(data.playload);
                return allData;
            }
            default: throw new Error('undefiende action');
        }
    }
}
