import { Controller, Get } from '@nestjs/common';
import { SpiderService } from '../services/spider.services';
import { MessagePattern } from '@nestjs/microservices';
import { IspiderAction } from '../interface/ISearchConfig.interface'; 
const Rx = require('rxjs/Rx');

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
                console.log(bookData);
                // return Rx.Observable.create((observer: any) => {
                //     const { length } = bookData.bookData;
                //     const times = Math.floor(length / 600) + 1;
                //     let i = 0;
                //     while(i <= times) {
                //         const start = i * 600;
                //         const end = start + 600 > length ? length : start + 600
                //         observer.next(bookData.bookData.slice(start, end));
                //         i++;
                //         console.log(i);
                //     }
                //     observer.next(bookData.bookData.slice(i * 600));
                //     setTimeout(() => {
                //         observer.complete();
                //     }, 0)
                // })
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
