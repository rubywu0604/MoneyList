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


function selected() {
  const checkboxes = document.querySelectorAll("#deleteCheckbox");
  const checkedValues = [];
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      checkedValues.push(checkbox.value);
    }
  });
  console.log(checkedValues);
  return true;  // NOT prevent the form from submitting
}