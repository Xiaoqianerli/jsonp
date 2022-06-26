// hello({'name': 'amy'})

function jsonp(url, { name, success, error, timeout = 3000, parm = 'callback' }) {

    const script = document.createElement('script');
    const u = new URL(url);
    const params = new URLSearchParams(u.search);
    params.set(parm, name);
    script.src = u.origin + u.pathname + '?' + params.toString();

    let timer;
    if (timeout) {
        timer = setTimeout(function () {
            clearup();
            error('timeout');
        }, timeout)
    }

    function clearup() {
        window[name] = () => { };
        script.remove();
        clearTimeout(timer);

    }
    window[name] = (data) => {
        clearup();
        success(data);
     };

    script.onerror = () => {
        clearup();
        error('Can\'t get url');
    }



    document.body.append(script);
    return clearup;
}
module.exports = jsonp;


