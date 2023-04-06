//Create new data (input button)
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
  location.reload();
};

//Select hisotry data (checkbox button)
function selected() {
  const checkboxes = document.querySelectorAll("#checkbox");
  const checkedValues = [];
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      checkedValues.push(checkbox.value);
    }
  });
  console.log('selected:', checkedValues);
  return checkedValues;
}

//Delete hisotry data (delete button)
document.getElementById('deletebtn').onclick = function deleteMany(){
  const optionsDel = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(selected())
  }
  console.log('select to delete: ', optionsDel.body);

  fetch('/expenses.html', optionsDel)
    .then(response => {
      console.log(JSON.parse(optionsDel.body), response);
    })
  alert('expense deleted!');
  location.reload();
}

//Edit hisotry data (edit button)