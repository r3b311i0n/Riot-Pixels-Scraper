import cheerio = require('cheerio');
import {IncomingMessage} from 'http';
import {get} from 'request';
import {Scraper} from './scraper';

interface IGameObject {
    title: string;
    cover: string;
    developers: string[];
    publishers: string[];
    score: number;
    platforms: string[];
}

export default class Game extends Scraper {
    constructor(url: string) {
        super('http://en.riotpixels.com/games/' + url.replace(/\W/, '-').toLowerCase());
    }

    public scrape(): Promise<IGameObject | number> {
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
                // todo: Add genres.
                // Get platforms.
                const platforms: string[] = this.getPlatforms();

                // Game score
                const score = parseInt(this.$('#mark-right-users strong').text(), 10);

                // Final game object.
                const game = {title, cover, developers, publishers, score, platforms};

                resolve(game);
            });
        });
    }
}
