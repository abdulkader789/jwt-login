const userEmail = document.getElementById('user-email')
const input = document.getElementById('input')
const quoteText = document.getElementById('quote')
const btnUpdate = document.getElementById('update-quote')

const token = localStorage.getItem('token')
console.log('token from dashboard', token)

const populateQuote = async () => {
    try {
        const response = await fetch('/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('quote from dashboard', data);

        if (data.status === 'ok') {
            if (data.quote) {
                const quote = data.quote;
                console.log('Quote:', quote);
                quoteText.innerText = quote

            } else {
                quoteText.innerText = 'No Quote Created'

            }


        } else {
            console.log('Error:', data.error);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

populateQuote();


if (token) {
    // Split the token into header, payload, and signature
    const [header, payload, signature] = token.split('.');
    // Base64 decode the payload
    const user = JSON.parse(atob(payload));
    // Display the decoded payload
    userEmail.innerText = user.email
    console.log(user);
    if (!user) {
        localStorage.removeItem('token');
        window.location.href = '/login.html';

    } else {
        populateQuote()
    }

}


const updateQuote = async (event) => {
    event.preventDefault()
    sendQuote = input.value
    const req = await fetch('/api/quote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
            quote: sendQuote,
        }),
    })

    const data = await req.json()
    if (data.status === 'ok') {
        populateQuote()

    } else {
        alert(data.error)
    }
}

btnUpdate.addEventListener('click', updateQuote)