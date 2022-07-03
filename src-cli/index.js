import { getForecast, generateDOM } from './utilities/functions'

document.querySelector('#address').addEventListener('submit', async (e) => {
    e.preventDefault()
    const inputValue = e.target.elements.addressInput.value

    generateDOM('Loading...')
    
    if (typeof inputValue === 'string') {
        try {
            const { error } = await getForecast(inputValue)

            if (error) {
                generateDOM(error)
            } else {
                generateDOM(undefined, data.location, data.forecast)
            }
        } catch (e) {
            generateDOM(e)
        }
    }
})