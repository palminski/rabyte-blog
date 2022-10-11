

async function loginFormHandler(event){
    event.preventDefault();
    console.log("Hello World.");

    const username = document.querySelector('#username-field').value.trim();
    const password = document.querySelector('#password-field').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'} //What does this do?
        });

        if (response.ok) {
            console.log('logged in');
            document.location.replace('/dashboard');
        }
        else
        {
            alert('Unable to login with these credentials!');
            document.querySelector('#password-field').value = '';
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);