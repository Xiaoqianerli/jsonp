const jsonp = require('../jsonp');

jsonp('http://127.0.0.1:8081/data.js?name=amy', {
    name: 'hello',
    success: (info) => {
        console.log(info);
    },
    error: (error) => {
        console.log(error)
    },
    timeout: false
});
