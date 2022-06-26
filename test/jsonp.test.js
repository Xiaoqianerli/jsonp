const jsonp = require('../jsonp');

test('basic jsonp', () => {
    const obj = {
        name: 'amy',
        gender: 'female'
    }
    const searchParams = new URLSearchParams(obj);
    const queryString = searchParams.toString();
    jsonp(`http://127.0.0.1:8081/data.js?${queryString}`, {
        name: 'hello',
        success: (info) => {
            expect(info).toRqual(obj);
        },
        error: (error) => {
            console.log(error);
         },
        timeout: false
    })
    expect(1).toBe(2);
});

test('404', () => {
    const obj = {
        name: 'amy',
        gender: 'female'
    }
    const searchParams = new URLSearchParams(obj);
    const queryString = searchParams.toString();
    jsonp(`http://xxx?${queryString}`, {
        name: 'hello',
        success: (info) => {
            // No success
        },
        error: (error) => {
            console.log(error);
            expect(info).toBe('Can\'t get url');
         },
        timeout: false
    })
});

test('timeout', () => {
    const obj = {
        name: 'amy',
        gender: 'female',
        delay: 7
    }
    const searchParams = new URLSearchParams(obj);
    const queryString = searchParams.toString();
    jsonp(`http://xxx?${queryString}`, {
        name: 'hello',
        success: (info) => {
            // No success
        },
        error: (error) => {
            console.log(error);
            expect(info).toBe('timeout');
         }
    })
});

test('named callback', () => {
    const obj = {
        name: 'amy',
        gender: 'female'
    }
    const searchParams = new URLSearchParams(obj);
    const queryString = searchParams.toString();
    jsonp(`http://xxx?${queryString}`, {
        name: 'hello',
        callback: 'cb',
        success: (info) => {
            expect(info).toRqual(obj);
        },
        error: (error) => {
            //No error
         }
    })
}); 

test('cancel jsonp', () => {
    const obj = {
        name: 'amy',
        gender: 'female'
    }
    const searchParams = new URLSearchParams(obj);
    const queryString = searchParams.toString();
    const cancel = jsonp(`http://xxx?${queryString}`, {
        name: 'hello',
        callback: 'cb',
        success: (info) => {
            //No success
        },
        error: (error) => {
            //No error
         }
    })

    cancel();
}); 
