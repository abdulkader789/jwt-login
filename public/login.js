
const loginEmail = document.getElementById('login-email')
const loginPassword = document.getElementById('login-password')
const btnLogin = document.getElementById('btn-login')


const submitLogin = async (event) => {
    event.preventDefault()


    const email = loginEmail.value
    const password = loginPassword.value;
    if (!email && !password) {
        alert('Fill all input fields')
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json();
        console.log(data)
        if (data.user) {
            console.log(data.user)
            alert('login successful')
            localStorage.setItem('token', data.user)
            window.location.href = '/dashboard.html';

        } else {
            console.log('POST request failed with status:', response.status);
        }
    } catch (error) {
        console.log('Error during POST request:', error);

    }

}

btnLogin.addEventListener('click', submitLogin)
