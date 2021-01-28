//Site key: 6LcxZTwaAAAAADFAe64Jwf8Ox2rHAlj61iphlijY
//Secret key: 6LcxZTwaAAAAAMcVsKBwKLRYJNNzte1OBL8L7fXN

function showResult(text) {
    document.querySelector('#result').innerHTML = text;
}

function handleClick(token) {
    return function () {
        var data = {
            token: token
        };

        fetch('/signup', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(text => showResult(text))
            .catch(error => showResult(error));
    }
}

var verifyCallback = function (response) {
    alert(response);
};
var widgetId1;

var onloadCallback = function () {
    // Renders the HTML element with id 'example1' as a reCAPTCHA widget.
    // The id of the reCAPTCHA widget is assigned to 'widgetId1'.
    widgetId1 = grecaptcha.render('result', {
        'sitekey': '6LdLMj8aAAAAAGW2SUWdVFKCC94OBcc6A4KMM3DZ',
        'theme': 'light'
    });
};