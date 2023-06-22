import { getExchangeRatesFromAPI, getCurrenciesSymbolsFromAPI } from './exchangerates.http.js';

const selectMonedaOrigen = document.getElementById('monedaOrigen');
const selectMonedaDestino = document.getElementById('monedaDestino');
const cantidad = document.getElementById('cantidad');
const formEntrada = document.getElementById('formEntrada');
const error = document.getElementById('error');
const resultado = document.getElementById('resultado');

// Funciones de evento
function comprobarForm(event) {
    event.preventDefault();
    if (selectMonedaOrigen.value === "0" || selectMonedaDestino.value === "0" || cantidad.value === "") {
        event.preventDefault();
        error.innerText = "Se deben de rellenar todos los campos";
        return false;
    } else {
        const cantidadMoneda = parseFloat(cantidad.value);
        if (isNaN(cantidadMoneda)) {
            event.preventDefault();
            error.innerText = "La cantidad introducida no es un número";
            return false;
        } else {
            convertCurrency();
            return true;
        }
    }
}

// Otras funciones

async function convertCurrency() {
    const exchangeRates = await getCurrenciesRates();
    const rate = exchangeRates.data[selectMonedaDestino.value].value;
    const result = parseFloat(cantidad.value) * parseFloat(rate);
    console.log("result", result);
    const selectedOptionText = selectMonedaDestino.options[selectMonedaDestino.selectedIndex].text;
    resultado.innerText = `${cantidad.value} euros son ${result} ${selectedOptionText}`;
}

const cacheDuration = 1000 * 60 * 10 // 10 min

function getCurrenciesSymbols() {
    // Verificar si hay datos en la caché y si aún son válidos
    const cache = JSON.parse(localStorage.getItem('cache'));
    if (cache && cache.symbols && Date.now() - cache.timestamp < cacheDuration) {
        console.log("Symbols: Utilizando datos de la cache");
        return Promise.resolve(cache.symbols);
    }
    // Si no hay datos en la caché o ya expiraron, hacer una nueva petición a la API
    console.log("Symbols: Actualizando datos de la cache");
    return getCurrenciesSymbolsFromAPI()
        .then(symbols => {
            // Almacenar la respuesta en la cache
            localStorage.setItem('cache', JSON.stringify({
                ...cache,
                symbols,
                timestamp: Date.now()
            }));
            return symbols;
        });
}

function getCurrenciesRates() {
    // Verificar si hay datos en la caché y si aún son válidos
    const cache = JSON.parse(localStorage.getItem('cache'));
    if (cache && cache.rates && Date.now() - cache.timestamp < cacheDuration) {
        console.log("Rates: Utilizando datos de la cache");
        return Promise.resolve(cache.rates);
    }
    // Si no hay datos en la caché o ya expiraron, hacer una nueva petición a la API
    console.log("Rates: Actualizando datos de la cache");
    return getExchangeRatesFromAPI()
        .then(rates => {
            // Almacenar la respuesta en la cache
            localStorage.setItem('cache', JSON.stringify({
                ...cache,
                rates,
                timestamp: Date.now()
            }));
            return rates;
        });
}


// Rellenamos los selects del formulario con los datos de la API

const symbols = await getCurrenciesSymbols();

const optionElement1 = document.createElement('option');
optionElement1.value = 'EUR';
optionElement1.text = "[EUR] Euro";
selectMonedaOrigen.appendChild(optionElement1);

for (const key in symbols.data) {
    const optionElement2 = document.createElement('option');
    optionElement2.value = key;
    optionElement2.text = "[" + key + "]" + " " + symbols.data[key].name;
    selectMonedaDestino.appendChild(optionElement2);
}

// Inicio de carga de eventos
formEntrada.addEventListener('submit', comprobarForm);



