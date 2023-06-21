import axios from 'axios';
import { to } from './to.js';

// API KEY
const access_key = 'beb329cb83c64eb5906dd4643526170c';

export async function getExchangeRates(destinationSymbol) {
    const endpoint = 'latest';
    const url = `http://api.exchangeratesapi.io/v1/${endpoint}?access_key=${access_key}&symbols=${destinationSymbol}`;

    console.log("Llamando a la API para obtener el exchange rate...");

    const [err, response] = await to(axios.get(url));
    if (err) {
        console.log(err);
        return;
    }

    console.log("La llamada a la API ha tenido éxito");

    const json = response.data;
    // console.log(destinationSymbol);
    // console.log(json);
    // console.log(json.rates);
    // console.log(json.rates[destinationSymbol]);
    // console.log(json.base);

    return json.rates[destinationSymbol];
}

export async function getSymbols() {
    const endpoint = 'symbols';
    const url = `http://api.exchangeratesapi.io/v1/${endpoint}?access_key=${access_key}`;

    const [err, response] = await to(axios.get(url));
    if (err) {
        console.log(err);
        return;
    }

    const json = response.data;
    const symbols = json.symbols;
    const symbolCount = Object.keys(symbols).length;

    // console.log(symbolCount);
    // console.log(symbols);

    return symbols;
}
