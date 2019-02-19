const { Transport, ClientProxyFactory } = require('@nestjs/microservices');
const chai = require('chai');
chai.use(require('chai-as-promised'));

class TestClient {
    public client: any;
    constructor() {
        this.client = ClientProxyFactory.create({
        transport: Transport.TCP,
            options: {
                port: 5000,
            },
        });
    }
    
    async onModuleInit() {
        try {
            const m = await this.client.connect();
        } catch(e) {
            console.log(e)
        }
    }

    runCommand(cmd, playload) {
        const pattern = { cmd };
        const k = this.client.send(pattern, playload);
		return new Promise(reslove => {
            const t = k.subscribe({
                next: function(value) {
                    reslove(value);
                },
                error: function(error) {
                    console.log(error)
                },
                complete: () => {
                    t.unsubscribe();
                    // this.client.close();
                }
            });
        });
    }
}

const k = new TestClient();
describe('ixSpider input bookname should renturn book number', function() {
    this.timeout(15000);
    it('SpiderService input bookname should return book number', function(done) {
        k.runCommand('spider', {
            type: 'getBookNumber',
            playload: {
                bookName: '大道朝天'
            },
        }).then( data => {
            chai.expect(data[0].bookNumber).to.be.equal('/d/169/169208/');
            done();
        })
    });

    it('SpiderService input bookNumber should return book list', function(done) {
        k.runCommand('spider', {
            type: 'getBookList',
            playload: {
                bookNumber: '/d/169/169208/'
            },
        }).then( data => {
            chai.expect((<any>data).bookList).to.an.instanceof(Array);
            done();
        })
    });

    it('ixSpider input bookNumber should return book 某一章节', function(done) {
        k.runCommand('spider', {
            type: 'getBookData',
            playload: {
                bookNumber: '/d/169/169208/',
                bookHref: 'p2.html',
            },
        }).then(data => {
            chai.expect((<any>data).bookData).to.be.match(/[/s]*.*[/s]*/);
            done();
        })
    });
    after(() => {
        k.client.close();
    })
})