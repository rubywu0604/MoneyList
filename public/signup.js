//Create new user (signup button)
document.getElementById('signupbtn').onclick = function signup(){
  const userId = document.getElementById('signup_id').value;
  const userPassword = document.getElementById('signup_password').value;
  const userEmail = document.getElementById('signup_email').value;
  const userData = {userId, userPassword, userEmail};

  const emailRegex = /^(?:[a-zA-Z0-9._%+-]+@(?:gmail\.com|yahoo\.com|yahoo\.com\.tw))$/; // regular expression for email validation

  if(userData.userId === ''){
    alert('Please set the <User Id>');
  }else if(userData.userPassword === ''){
    alert('Please set the <Password>');
  }else if(userData.userEmail === '' || !emailRegex.test(userData.userEmail)){
    alert('Please input a valid <Email Address>');
  }else{
    const options = { // package data as a POST
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData) //put data into javascript object
    };

    fetch('/signup.html', options)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => {
        if (data === 'exist') {
          alert('User already exists!');
        } else {
          window.location.href = '/expenses.html';
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};