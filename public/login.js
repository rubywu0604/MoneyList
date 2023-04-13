//Verify user (login button)
document.getElementById('loginbtn').onclick = function signup(){
  const userId = document.getElementById('login_id').value;
  const userPassword = document.getElementById('login_password').value;
  const userData = {userId, userPassword};
  if(userData.userId === ''){
    alert('Please input the <User Id>');
  }else if(userData.userPassword === ''){
    alert('Please input the <Password>');
  }else{
    const options = { // package data as a POST
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData) //put data into javascript object
    };

    fetch('/index.html', options)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        if (data === 'match') {
          alert('Login successfully!');
          window.location.href = '/expenses.html';
        } else {
          alert('Incorrect!');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};