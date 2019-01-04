import { Injectable } from '@nestjs/common';
import IxSpider from '../../../spider/src/component/ixSpider';
import { IsearchConfig } from '../interface/ISearchConfig.interface';

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
@Injectable()
export class SpiderService {
    public spider: any;
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
        const bookData = await this.spider.getBookData(config);
        return bookData;
    }
    async getBookAllData(config: IsearchConfig) {
        const allBookData = await this.spider.getBookAllData(config);
        return allBookData;
    }
}