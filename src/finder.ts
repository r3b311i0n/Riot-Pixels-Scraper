import * as cheerio from 'cheerio';
import {IncomingMessage} from 'http';
import {get} from 'request';

export default class Finder {
    constructor(url: string) {
        this.url = 'http://en.riotpixels.com/games/' + url.replace(/\W/, '-').toLowerCase().slice(1);
    }

    private url: string;

    public scrape(): Promise<{ title: string, cover: string }> {
        return new Promise((resolve, reject) => {
            get(this.url, (err: boolean, response: IncomingMessage, body: string) => {
                if (err) {
                    reject(err);
                }

                const $ = cheerio.load(body);

                const title = $('.title > h3').text().trim();
                const cover = $('.cover img').attr('src');

                const game = {title, cover};

                resolve(game);
            });
        });
    }
}
