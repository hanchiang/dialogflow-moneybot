const axios = require('axios');

const BASE_URL = 'https://www.amdoren.com/api/currency.php';

const convertParams = (from, to, amount) => ({
  api_key: process.env.KEY,
  from,
  to,
  amount
})

// handle result from https://www.amdoren.com/currency-api/
const handleResult = (result) => {
  const { data } = result;
  const { error, error_message: errorMessage, amount } = data;

  switch (error) {
    case 0: return amount;
    case 320: case 400: return errorMessage;
    default: return errorMessage;
  }
}

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  try {
    const result = await axios.get(BASE_URL, {
      params: convertParams(fromCurrency, toCurrency, amount)
    });
    return handleResult(result);
  } catch (e) {
    console.log(e);
  }
}

module.exports = convertCurrency;