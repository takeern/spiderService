import { Injectable } from '@nestjs/common';
import IxSpider from '../../ixSpider/src/component/ixSpider';
import { IsearchConfig } from '../interface/ISearchConfig.interface';

const Rx = require('rxjs/Rx');

interface ISearchNumber {
    bookNumber: string;
}
interface IBookList {
    bookNumber: string;
    bookList: [];
}
interface IBookData {
    bookNumber: string;
    bookData: string;
}
interface IRes{
    type: string;
    data: any;
}
@Injectable()
export class SpiderService {
    public spider: any;
    public liveState: Array<any>;
    private package: Array<IRes>;
    constructor() {
        this.spider = new IxSpider();
    }
    async searchBook(config: IsearchConfig): Promise<ISearchNumber>{
        let bookNumber;
        try {
            bookNumber = await this.spider.searchBook(config);
        } catch(e) {
            return e.message;
        }
        return bookNumber;
    }
    async getBookList(config: IsearchConfig): Promise<IBookList> {
        const bookList = await this.spider.getBookList(config);
        return bookList;
    }
    async getBookData(config: IsearchConfig): Promise<IBookData> {
        const bookData = this.spider.getBookData(config);
        return bookData;
    }
    async getBookAllData(config: IsearchConfig) {
        // const allBookData = this.spider.getBookAllData(config);
        // console.log(allBookData);
        const k = this.spider.getBookAllData(config, config.bookList);
        return k;
        this.package = [];
        // return Rx.Observable.create(async (observer: any) => {
        //     k.subscribe({
        //         next: (res: IRes) => {
        //             const { type } = res;
        //             switch(type) {
        //                 case('bookData'): 
        //                     this.package.push(res);
        //                 break;
        //                 case('bookState'):
        //                     this.liveState = res.data;
        //                 break;
        //                 default:
        //                 break;
        //             }
        //         }
        //     })
        // })
    }
    handlePullBook(command: any) {

    }
}