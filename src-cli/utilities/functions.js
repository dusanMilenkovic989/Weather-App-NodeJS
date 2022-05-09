const getForecast = async (address) => {
    const response = await fetch(`/weather?location=${encodeURIComponent(address)}`)

    if (response.status === 200) {
        return response.json()
    } else {
        throw new Error('Could not get weather information at this time. Try again later')
    }
}

const generateDOM = (loadErr, location, forecast) => {
    const selector = document.querySelector('#render-dom')
    selector.innerHTML = ''

    if (loadErr) {
        const loadErrEl = document.createElement('p')
        loadErrEl.textContent = loadErr
        selector.appendChild(loadErrEl)
    } else{
        const locationEl = document.createElement('p')
        const forecastEl = document.createElement('p')
        locationEl.textContent = location
        forecastEl.textContent = forecast
        selector.appendChild(locationEl)
        selector.appendChild(forecastEl)
    }
}

export { getForecast, generateDOM }