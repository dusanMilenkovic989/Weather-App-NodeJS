import { getForecast, generateDOM } from './utilities/functions'

document.querySelector('#address').addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = e.target.elements.addressInput.value

    generateDOM('Loading...')
    
    if (typeof inputValue === 'string') {
        getForecast(inputValue).then((data) => {
            if (data.error) {
                generateDOM(data.error)
            } else {
                generateDOM(undefined, data.location, data.forecast)
            }
        }).catch((error) => {
            generateDOM(error)
        })
    }
})