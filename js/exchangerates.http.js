import axios from 'axios';
import { to } from './to.js';

// API KEY
// const access_key = 'beb329cb83c64eb5906dd4643526170c';

const apiKey = 'Jkf5jfnQ4XyUQH2V115IylWvauKD4Dvy6a0b7ZNG';
const base_currency = 'EUR'; 

export async function getCurrenciesSymbolsFromAPI() {
    const [err, response] = await to(axios.get('https://api.currencyapi.com/v3/currencies', {
        params: {
            apikey: apiKey,
            // currencies: currencies
        }
    }));

    if (err) {
        console.log(err);
        return;
    }

    console.log(response.data);

    return response.data;
}

export async function getExchangeRatesFromAPI() {
    const [err, response] = await to(axios.get('https://api.currencyapi.com/v3/latest', {
        params: {
            apikey: apiKey,
            base_currency: base_currency
        }
    }));

    if (err) {
        console.log(err);
        return;
    }
    
    console.log("exchangeRates", response.data);

    return response.data;
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
