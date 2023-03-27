document.getElementById('savebtn').onclick = function insertOne(){
  const date = document.getElementById('inputdate').value;
  const time = document.getElementById('inputtime').value;
  const tag = document.getElementById('inputtag').value.toString();
  const amount = parseInt(document.getElementById('inputamount').value);

  const data = {date, time, tag, amount};

  const options = { // package data as a POST
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) //put data into javascript object
  };

  fetch('/expenses.html', options)
    .then(response => {
      console.log(JSON.parse(options.body), response);
    })
  alert('expense saved!');

  const refreshPage = () => {
    location.reload();
  }
  addEventListener('click', refreshPage)
};