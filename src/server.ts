import {createServer, IncomingMessage, ServerResponse} from 'http';
import Company from './company';
import Game from './game';

const port = 3000;

const requestHandler = async (request: IncomingMessage, response: ServerResponse) => {
    const resource = sanitizeRequest(request.url);

    if (typeof resource === 'undefined') {
        response.writeHead(400, {
            'Content-Type': 'text/plain; charset=utf-8'
        });

        response.end('400 BAD REQUEST');
    }

    await resource.scrape().then((value) => {
        response.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });

        return response.write(JSON.stringify(value, undefined, 3));
    }).catch((error) => {
        response.writeHead(404, {
            'Content-Type': 'text/plain; charset=utf-8'
        });
        console.error(error);

        return response.write('404 What you seek cannot be found, perhaps it is within yourself.');
    });

    response.end();
};

const sanitizeRequest = (request: string) => {
    if (request.slice(1).startsWith('games/')) {
        return new Game(request.replace('/games/', ''));
    }
    else if (request.slice(1).startsWith('companies/')) {
        return new Company(request.replace('/companies/', ''));
    }
};

const server = createServer(requestHandler);

server.listen(port, (err: Error) => {
    (err) ? console.error(err) : console.log(`I\'m listening on ${port}`);
});
