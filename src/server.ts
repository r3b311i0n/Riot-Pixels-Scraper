import {createServer, IncomingMessage, ServerResponse} from 'http';
import Finder from './finder';

const port = 3000;

const requestHandler = async (request: IncomingMessage, response: ServerResponse) => {
    const finder = new Finder('Tekken 7');

    await finder.scrape().then((value) => response.end(value)).catch((error) => console.error(error));
};

const server = createServer(requestHandler);

server.listen(port, (err: Error) => {
    (err) ? console.error(err) : console.log(`I\'m listening on ${port}`);
});
