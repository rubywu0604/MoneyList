//Create new data (input button)
document.getElementById('savebtn').onclick = function insertOne(){
  const date = document.getElementById('inputdate').value;
  const time = document.getElementById('inputtime').value;
  const tag = document.getElementById('inputtag').value.toString();
  const amount = parseInt(document.getElementById('inputamount').value);
  const data = {date, time, tag, amount};
  if(data.date === ''){
    alert('Please select the <Date>');
  }else if(data.time === ''){
    alert('Please select the <Time>');
  }else if(data.tag === ''){
    alert('Please input the <Tag>');
  }else if(data.amount <= 0){
    alert('Please input the <Amount> greater than 0');
  }else{
  const options = { // package data as a POST
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) //put data into javascript object
  };

  fetch('/incomes.html', options)
    .then(response => {
      console.log(JSON.parse(options.body), response);
    })
  alert('income saved!');
  location.reload();
};
};

//Select hisotry data (checkbox button)
const checkedValuesInc = [];

function selectedInc() {
  const checkboxes_inc = document.querySelectorAll(".checkbox_inc");
  checkedValuesInc.length = 0; // clear the array before re-populating it
  checkboxes_inc.forEach(function(checkbox_inc) {
    if (checkbox_inc.checked) {
      checkedValuesInc.push(checkbox_inc.value);
    }
  });
  console.log(checkedValuesInc);
  return checkedValuesInc;
}

//Delete hisotry data (delete button)
document.getElementById('deletebtn').onclick = function deleteMany(){
  if(checkedValuesInc[0] === undefined){
    alert('Please select at least one income.')
  }else{
  const optionsDel = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(selectedInc())
  }

  fetch('/incomes.html', optionsDel)
    .then(response => {
      console.log(JSON.parse(optionsDel.body), response);
    })
  alert('income deleted!');
  location.reload();
};
}

//Edit hisotry data (edit button)