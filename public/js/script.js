console.log(data);

let email = document.getElementById("emailInput");
let rating = document.getElementById("ratingInput");
let review = document.getElementById("reviewInput");

email.addEventListener('input', evt => {
    let log = evt.target.value;
    data.forEach(user => {
        if (log === user.email) {
            rating.disabled = false;
            review.disabled = false;
        }
    });
})
