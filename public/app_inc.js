//Create new data (input button)
document.getElementById('savebtn').onclick = function insertOne(){
  const date = document.getElementById('inputdate').value;
  const time = document.getElementById('inputtime').value;
  const tag = document.getElementById('inputtag').value.toString();
  const amount = parseInt(document.getElementById('inputamount').value);
  const userId = document.getElementById('userName').dataset.userid;
  const data = {date, time, tag, amount, userId};
  if(date === ''){
    alert('Please select the <Date>');
  }else if(time === ''){
    alert('Please select the <Time>');
  }else if(tag === ''){
    alert('Please input the <Tag>');
  }else if(amount <= 0 || !amount){
    alert('Please input the <Amount> greater than 0');
  }else{
  const options = { // package data as a POST
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) //put data into javascript object
  };

  fetch(`/incomes/${userId}`, options)
    .then(response => {
      console.log(JSON.parse(options.body), response);
      location.reload();
    })
  };
}

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
  const userId = document.getElementById('userName').dataset.userid;
  const data = { userId };
  if(checkedValuesInc[0] === undefined){
    alert('Please select at least one income.')
  }else{
  const optionsDel = {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(selectedInc(), data)
  }
  fetch(`/incomes/${userId}`, optionsDel)
    .then(response => {
      console.log(JSON.parse(optionsDel.body), response);
      location.reload();
    })
  };
}

//Edit hisotry data (edit button)