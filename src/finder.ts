import cheerio = require('cheerio');
import {IncomingMessage} from 'http';
import {get} from 'request';

export default class Finder {
    constructor(url: string) {
        this.url = 'http://en.riotpixels.com/games/' + url.replace(/\W/, '-').toLowerCase().slice(1);
    }

    private url: string;

    public scrape(): Promise<{ title: string, cover: string, developer: string, publisher: string }> {
        return new Promise((resolve, reject) => {
            get(this.url, (err: boolean, response: IncomingMessage, body: string) => {
                if (err) {
                    reject(err);
                }

                const $ = cheerio.load(body);

                const title = $('.title > h3').text().trim();
                const cover = $('.cover img').attr('src');
                const companies = $('.title > .links > span:first-child a');
                const developer = companies.filter((index, element) => $(element).attr('title') === 'Developer').text();
                const publisher = companies.filter((index, element) => $(element).attr('title') === 'Publisher').text();

                const game = {title, cover, developer, publisher};

                resolve(game);
            });
        });
    }
}
