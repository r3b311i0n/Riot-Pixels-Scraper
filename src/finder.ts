import * as cheerio from 'cheerio';
import {IncomingMessage} from 'http';
import {get} from 'request';

export default class Finder {
    constructor(url: string) {
        this.url = 'http://en.riotpixels.com/games/' + url.replace(/\W/, '-').toLowerCase();
    }

    private url: string;

    public scrape(): Promise<string> {
        return new Promise((resolve, reject) => {
            get(this.url, (err: boolean, response: IncomingMessage, body: any) => {
                if (err) {
                    reject(err);
                }

                const $ = cheerio.load(body.toString());

                resolve($('.title > h3').text());
            });
        });
    }
}
