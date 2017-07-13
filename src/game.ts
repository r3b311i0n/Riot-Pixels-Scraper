import cheerio = require('cheerio');
import {IncomingMessage} from 'http';
import {get} from 'request';
import {Scraper} from './scraper';

export default class Game extends Scraper {
    constructor(url: string) {
        super('http://en.riotpixels.com/games/' + url.replace(/\W/, '-').toLowerCase().slice(1));
    }

    public scrape(): Promise<{ title: string, cover: string, developers: string[], publishers: string[], platforms: string[] } | number> {
        return new Promise((resolve, reject) => {
            get(this.url, (err: object, response: IncomingMessage, body: string) => {
                if (response.statusCode > 399 || response.statusCode < 200) {
                    reject(err);
                }

                this.$ = cheerio.load(body);

                const title = this.$('.title > h3').text().trim();
                const cover = this.$('.cover img').attr('src');

                // Get companies.
                const developers: string[] = [];
                const publishers: string[] = [];
                for (const obj of this.$('.title > .links > span:first-child a').toArray()) {
                    if (this.$(obj).attr('title') === 'Developer') {
                        developers.push(this.$(obj).text());
                    }
                    else if (this.$(obj).attr('title') === 'Publisher') {
                        publishers.push(this.$(obj).text());
                    }
                }

                // todo: Add release dates.
                // Get platforms.
                const platforms: string[] = this.getPlatforms();

                // Final game object.
                const game = {title, cover, developers, publishers, platforms};

                resolve(game);
            });
        });
    }
}
