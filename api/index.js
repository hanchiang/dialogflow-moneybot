const axios = require('axios');

const BASE_URL = 'https://free.currencyconverterapi.com/api/v6/convert';

// Gets the conversion rate from input currency to output currency
const convertParams = (from, to) => ({
  q: `${from}_${to}`,
  compact: 'y'
})

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  try {
    const result = await axios.get(BASE_URL, {
      params: convertParams(fromCurrency, toCurrency, amount)
    });
    const resultKey = `${fromCurrency}_${toCurrency}`;
    const { [resultKey]: data } = result.data;
    
    if (data) {
      const { val: rate } = data;
      return Math.round(amount * rate);
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = convertCurrency;