import {createServer, IncomingMessage, ServerResponse} from 'http';
import Scraper from './scraper';

const port = 3000;

const requestHandler = async (request: IncomingMessage, response: ServerResponse) => {
    const scraper = new Scraper(request.url);

    await scraper.scrape().then((value) => {
        if (value !== 404) {
            response.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });

            return response.write(JSON.stringify(value, undefined, 3));
        }
        else {
            response.writeHead(404, {
                'Content-Type': 'text/plain; charset=utf-8'
            });

            return response.write('What you seek cannot be found, perhaps it is within yourself.');
        }
    }).catch((error) => console.error(error));

    response.end();
};

const server = createServer(requestHandler);

server.listen(port, (err: Error) => {
    (err) ? console.error(err) : console.log(`I\'m listening on ${port}`);
});
