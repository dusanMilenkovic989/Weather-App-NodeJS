const messageOne = document.querySelector('#p-one')
const messageTwo = document.querySelector('#p-two')

document.querySelector('#address').addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = e.target.elements.addressInput.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    if (typeof inputValue === 'string') {
        fetch(`/weather?location=${encodeURIComponent(inputValue)}`).then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error('Could not get weather information at this time. Try again later')
            }
        }).then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        }).catch((error) => {
            messageOne.textContent = error
        })
    }
})