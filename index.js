const http = require('http');

const hostname = '127.0.0.1';
const port = 7070;

const server = http.createServer((request, res) => {
    const { headers, method, url } = request;
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        const data = { headers, method, url, body: Buffer.concat(body).toString()}
        console.log(data);
        resp(res, data);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const resp = (res, data) => {
    const { url, method } = data;

    if (url === '/hello' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Hello World' }));
        return;
    }

    if (url === '/oauth/authorization' && method === 'GET') {
        const response = {
            client_id: 'adf',
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
        console.log({ response, headers: res.getHeaders(), statusCode: res.statusCode });
        return;
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('mock not found');
}