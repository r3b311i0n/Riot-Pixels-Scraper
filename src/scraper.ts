import cheerio = require('cheerio');
import {IncomingMessage} from 'http';
import {get} from 'request';

export default class Scraper {
    constructor(url: string) {
        this.url = 'http://en.riotpixels.com/games/' + url.replace(/\W/, '-').toLowerCase().slice(1);
    }

    private url: string;

    public scrape(): Promise<{ title: string, cover: string, developers: string[], publishers: string[] } | number> {
        return new Promise((resolve, reject) => {
            get(this.url, (err: boolean, response: IncomingMessage, body: string) => {
                if (err) {
                    reject(err);
                }

                const $ = cheerio.load(body);

                const title = $('.title > h3').text().trim();
                const cover = $('.cover img').attr('src');

                // Get companies.
                const companies = $('.title > .links > span:first-child a');
                const developers: string[] = [];
                const publishers: string[] = [];
                companies.filter((index, element) => {
                    if ($(element).attr('title') === 'Developer') {
                        developers.push($(element).text());

                        return true;
                    }
                    else if ($(element).attr('title') === 'Publisher') {
                        publishers.push($(element).text());

                        return true;
                    }
                    else {
                        return false;
                    }
                });

                // Return final game object.
                const game = (title !== '') ? {title, cover, developers, publishers} : 404;

                resolve(game);
            });
        });
    }
}
