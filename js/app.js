import { getExchangeRates, getSymbols } from './exchangerates.http.js';

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
            devolverResultado();
            return true;
        }
    }
}

// Otras funciones
function convertCurrency(cantidad, destinationRate) {
    return cantidad * destinationRate;
}

async function devolverResultado() {
    const exchangeRate = await getExchangeRates(selectMonedaDestino.value);
    console.log(exchangeRate);
    const result = convertCurrency(parseFloat(cantidad.value), parseFloat(exchangeRate));
    console.log(result);
    const selectedOptionText = selectMonedaDestino.options[selectMonedaDestino.selectedIndex].text;
    resultado.innerText = `${cantidad.value} euros son ${result} ${selectedOptionText}`;
}

// Rellenamos los selects del formulario con los datos de la API

const symbols = await getSymbols();

const optionElement1 = document.createElement('option');
    optionElement1.value = 'EUR';
    optionElement1.text = "[EUR] Euro";
    selectMonedaOrigen.appendChild(optionElement1);

for (const key in symbols) {
    const optionElement2 = document.createElement('option');
    optionElement2.value = key;
    optionElement2.text = "[" + key + "]" + " " + symbols[key];
    selectMonedaDestino.appendChild(optionElement2);
}

// Inicio de carga de eventos
formEntrada.addEventListener('submit', comprobarForm);

  