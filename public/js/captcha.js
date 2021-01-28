//Site key: 6LcxZTwaAAAAADFAe64Jwf8Ox2rHAlj61iphlijY
//Secret key: 6LcxZTwaAAAAAMcVsKBwKLRYJNNzte1OBL8L7fXN

// function showResult(text) {
//     document.querySelector('#result').innerHTML = text;
// }

// function handleClick(token) {
//     return function () {
//         var data = {
//             token: token
//         };

//         fetch('/signup', {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             method: 'post',
//             body: JSON.stringify(data)
//         })
//             .then(response => response.text())
//             .then(text => showResult(text))
//             .catch(error => showResult(error));
//     }
// }

// grecaptcha.ready(function () {
//     grecaptcha.execute('6LcxZTwaAAAAADFAe64Jwf8Ox2rHAlj61iphlijY', { action: 'demo' })
//         .then(function (token) {
//             document.querySelector('#submitBtn').addEventListener('click', handleClick(token));
//         });
// });
let cap = document.getElementById('g-recaptcha-response');
let register = document.getElementById('register');

function onClick(e) {
    e.preventDefault();
    grecaptcha.ready(function() {
        grecaptcha.execute('reCAPTCHA_site_key', {action: 'submit'}).then(token => {
            cap.value = token;
        });
        cap.style.visibility = "hidden";
        register.style.visibility = "visible";
        console.log("some")
    });
  }