import cheerio = require('cheerio');
import {IncomingMessage} from 'http';
import {get} from 'request';
import {Scraper} from './scraper';

export default class Company extends Scraper {
    constructor(url: string) {
        super('http://en.riotpixels.com/companies/' + url.replace(/\W/, '-').toLowerCase().slice(1));
    }

    public scrape(): Promise<{} | number> {
        return new Promise((resolve, reject) => {
            get(this.url, (err: object, response: IncomingMessage, body: string) => {
                if (response.statusCode > 399 || response.statusCode < 200) {
                    reject(err);
                }

                const $ = cheerio.load(body);

                resolve();
            });
        });
    }
}
