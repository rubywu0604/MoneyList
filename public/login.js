//Verify user (login button)
document.getElementById('loginbtn').onclick = function login() {
  const userId = document.getElementById('login_id').value;
  const userPassword = document.getElementById('login_password').value;
  const userData = {userId, userPassword};
  if(userData.userId === '') {
    alert('Please input the User Id');
  } else if(userData.userPassword === '') {
    alert('Please input the Password');
  } else {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    };
    fetch('/', options)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else if(response.status === 404) {
          throw new Error('User not found');
        } else if(response.status === 401) {
          throw new Error('Incorrect password');
        } else {
          throw new Error('Internal server error');
        }
      })
      .then(data => {
        window.location.href = `/expenses/${userId}`;
      })
      .catch(error => {
        if(error.message === 'User not found') {
          alert('Id Incorrect! Please try again or Signup to create new User Id.');
        } else if(error.message === 'Incorrect password') {
          alert('Password Incorrect!');
        } else {
          console.log(error);
          alert('An error occurred. Please try again later.');
        }
      });
  }
};


// options.body.userId