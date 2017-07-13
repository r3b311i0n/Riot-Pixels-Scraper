import cheerio = require('cheerio');
import {IncomingMessage} from 'http';
import {get} from 'request';
import {Scraper} from './scraper';

interface ICompanyObject {
    title: string;
    cover: string;
    platforms: string[];
}

export default class Company extends Scraper {
    constructor(url: string) {
        super('http://en.riotpixels.com/companies/' + url.replace(/\W/, '-').toLowerCase());
    }

    public scrape(): Promise<ICompanyObject | number> {
        return new Promise((resolve, reject) => {
            get(this.url, (err: object, response: IncomingMessage, body: string) => {
                if (response.statusCode > 399 || response.statusCode < 200) {
                    reject(err);
                }

                this.$ = cheerio.load(body);

                const title = this.$('.company-title').text().trim();
                const cover = this.$('.company-logo img').attr('src');

                // Get platforms.
                const platforms: string[] = this.getPlatforms();

                // Final company object.
                const company = {title, cover, platforms};

                resolve(company);
            });
        });
    }
}
