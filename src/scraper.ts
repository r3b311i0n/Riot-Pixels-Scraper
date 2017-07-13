import cheerio = require('cheerio');

export abstract class Scraper {
    constructor(url: string) {
        this.url = url;
    }

    protected readonly url: string;
    protected $: CheerioStatic;

    // Get platform info; some could be hidden inside a div with class name 'submenu'.
    protected getPlatforms(): string[] {
        const list: string[] = [];

        for (const obj of this.$('.title > a:first-child > i').toArray()) {
            list.push(this.$(obj).attr('title'));
        }
        for (const obj of this.$('.title > a:first-child > .submenu').children().toArray()) {
            list.push(this.$(obj).attr('title'));
        }

        return list;
    }

    public abstract scrape(): Promise<object | number>;
}
