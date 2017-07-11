export abstract class Scraper {
    constructor(url: string) {
        this.url = url;
    }

    protected url: string;

    public abstract scrape(): Promise<object | number>;
}
