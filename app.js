const jokes = document.querySelector('.get-jokes');

jokes.addEventListener('click', function (e) {
  e.preventDefault();
  const number = document.getElementById('number').value;
  if (number <= 0 || number === null) {
    setTimeout(function () {
      document.querySelector('.jokes').innerHTML = 'Something went wrong !'
    }, 1000)
  }

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true)
  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      let output = '';

      if (response.type === 'success') {
        response.value.forEach(joke => {
          output += `<li>${joke.joke}</li>`
        });
      } else {
        output += 'Something went wrong !'
      }
      document.querySelector('.jokes').innerHTML = output
    }
  }
  xhr.send();
});