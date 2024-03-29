async function getCurrent() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
   

    const usdRate = data.Valute.USD.Value.toFixed(2);
    const eurRate = data.Valute.EUR.Value.toFixed(2);

    const usdElement = document.querySelector('#usd_text');
    const eurElement = document.querySelector('#eur_text');

    const eurCourse = document.querySelector('#eur');
    const usdCourse = document.querySelector('#usd');

    eurCourse.innerText =eurRate;
    usdCourse.innerText =usdRate;

    usdElement.innerText = '';
    eurElement.innerText = '';

    return { usdRate, eurRate };
    
}

getCurrent().then(({ usdRate, eurRate }) => {
    const inputElement = document.querySelector('#input');
    const eurElement = document.querySelector('#eur_text');
    const usdElement = document.querySelector('#usd_text');

    inputElement.addEventListener('input', function() {
        const inputText = inputElement.value;
        if (inputText === '') {
            eurElement.innerText = '';
            usdElement.innerText = '';
            return; 
        }
        
        const resultUSD = parseFloat(inputText) / parseFloat(usdRate);
        const resultEUR = parseFloat(inputText) / parseFloat(eurRate);
        
        eurElement.innerText = resultEUR.toFixed(1);
        usdElement.innerText = resultUSD.toFixed(1);
    });
});
