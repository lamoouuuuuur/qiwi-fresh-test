const getCurrencyData = async () => {
    try {
        const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        const data = await response.json();
        return data.Valute;
    } catch (error) {
        console.log(error.message);
    }
}

const getCurrencyDate = async () => {
    try {
        const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        const data = await response.json();
        return data.Date;
    } catch (error) {
        console.log(error.message);
    }
}

const getCurrencyPreviousDate = async () => {
    try {
        const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js")
        const data = await response.json();
        return data.PreviousDate;
    } catch (error) {
        console.log(error.message);
    }
}

const formatDateFromString = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    return formattedDate;
}

const updateCurrencyInfo = async (currency) => {
    const currencyIdElement = document.getElementById('currencyId');
    const currencyNameElement = document.getElementById('currencyName');
    const currencyCodeElement = document.getElementById('currencyCode');
    const currencyValueDateElement = document.getElementById('currencyValueDate');
    const currencyPreviousValueDateElement = document.getElementById('currencyPreviousValueDate');

    currencyIdElement.textContent = currency.ID;
    currencyNameElement.textContent = currency.Name;
    currencyCodeElement.textContent = currency.CharCode;
    currencyValueDateElement.textContent = `${(formatDateFromString(await getCurrencyDate()))} - ${currency.Value}`;
    currencyPreviousValueDateElement.textContent = `${formatDateFromString(await getCurrencyPreviousDate())} - ${currency.Previous}`

}

const createCurrencySelector = (currencyData) => {
    const currencySelector = document.getElementById('currencySelector');
    const defaultOption = document.createElement('option');
    defaultOption.value = ""
    defaultOption.textContent = "Выберите валюту"
    defaultOption.disabled = true;
    defaultOption.selected = true;
    currencySelector.appendChild(defaultOption);

    for (const key in currencyData) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${currencyData[key].ID} - ${currencyData[key].Name}`;
        currencySelector.appendChild(option);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const currencyData = await getCurrencyData();
    const currencySelector = document.getElementById('currencySelector');
    const currencyInfo = document.getElementById('currencyInfo');

    if (currencyData) {
        createCurrencySelector(currencyData);
        currencySelector.addEventListener('change', (event) => {
            const selectedCurrency = event.target.value;
            if (selectedCurrency) {
                const selectedCurrencyData = currencyData[selectedCurrency];
                updateCurrencyInfo(selectedCurrencyData);
                currencyInfo.style.display = 'block';
            } else {
                currencyInfo.style.display = 'none';
            }
        });
        currencyInfo.style.display = 'none';
    }
});
