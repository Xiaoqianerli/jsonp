const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    //使用此回调处理每个单独的请求。
    const path = url.parse(req.url, true);
    res.end(path.query.callback + "({'name':'" + path.query.name + "'})");
})

const PORT = process.env.PORT || 8081

server.listen(PORT, console.log(`listening on PORT ${PORT}`))
