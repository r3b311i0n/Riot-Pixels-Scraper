import cheerio = require('cheerio');
import {IncomingMessage} from 'http';
import {get} from 'request';

export default class Scraper {
    constructor(url: string) {
        this.url = 'http://en.riotpixels.com/games/' + url.replace(/\W/, '-').toLowerCase().slice(1);
    }

    private url: string;

    public scrape(): Promise<{ title: string, cover: string, developers: string[], publishers: string[], platforms: string[] } | number> {
        return new Promise((resolve, reject) => {
            get(this.url, (err: object, response: IncomingMessage, body: string) => {
                if (response.statusCode > 399 || response.statusCode < 200) {
                    reject(err);
                }

                const $ = cheerio.load(body);

                const title = $('.title > h3').text().trim();
                const cover = $('.cover img').attr('src');

                // Get companies.
                const developers: string[] = [];
                const publishers: string[] = [];
                for (const obj of $('.title > .links > span:first-child a').toArray()) {
                    if ($(obj).attr('title') === 'Developer') {
                        developers.push($(obj).text());
                    }
                    else if ($(obj).attr('title') === 'Publisher') {
                        publishers.push($(obj).text());
                    }
                }

                // Get platforms.
                const platforms: string[] = [];
                for (const obj of $('.title > a:first-child').children().toArray()) {
                    platforms.push($(obj).attr('title'));
                }

                // Final game object.
                const game = {title, cover, developers, publishers, platforms};

                resolve(game);
            });
        });
    }
}
