const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) => {
    console.log("Req for " + req.url + ' by method ' + req.method);
    if(req.method == 'GET') {
        var fileURl;
        if(req.url == '/')
            fileURl = '/index.html'
        else
            fileURl = req.url;

        var filePath = path.resolve('./public' + fileURl);
        const fileExt = path.extname(filePath);
        if(fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if(!exists) {
                    res.statusCode = 404
                    res.setHeader('Content-Type','text/html');
                    res.end('<html><body><h1>Error 404 ' + filePath + ' not found</h1></body></html>')

                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                fs.createReadStream(filePath).pipe(res);
            })
        }else{
            res.statusCode = 404
            res.setHeader('Content-Type','text/html');
            res.end('<html><body><h1>Error 404 ' + filePath + ' not HTML</h1></body></html>')

            return;
        }
    }else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + 
                ' not supported</h1></body></html>');
    }
})

server.listen(port,hostname,() => {
    console.log(`Server is running at http://${hostname}:${port}`)
})