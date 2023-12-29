const userName = document.getElementById('user-name')
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password')


const btnRegister = document.getElementById('btn-register')

const submitRegister = async (event) => {

    event.preventDefault()

    const name = userName.value
    const email = registerEmail.value
    const password = registerPassword.value;
    if (!name && !email && !password) {
        alert('Fill all input fields')
        return;
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const data = await response.json();
        if (data.status === 'ok') {
            alert('Registration successful')
            window.location.href = '/login.html';

        } else {
            console.log('POST request failed with status:', response.status);
        }
    } catch (error) {
        console.log('Error during POST request:', error);

    }

}
btnRegister.addEventListener('click', submitRegister)

