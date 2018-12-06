const router = require('express').Router();

const convertCurrency = require('./api');

const formatResponse = (text) => ({
  fulfillmentText: text,
  source: 'moneybot-webhook'
})

router.post('/', async (req, res) => {
  const { queryResult } = req.body;
  const { action, parameters } = queryResult;

  let fulfillmentText = '';

  if (action === 'convert') {
    const { outputCurrency, amountToConvert } = parameters;
    const { amount, currency: inputCurrency } = amountToConvert;

    if (outputCurrency === inputCurrency) {
      fulfillmentText = `Well, ${amount} ${outputCurrency} is obviously equal to ${amount} ${outputCurrency}!`;

      res.status(200).json(formatResponse(fulfillmentText));
    } else {
      const data = await convertCurrency(inputCurrency, outputCurrency, amount);
      if (data) {
        res.status(200).json(formatResponse(`${amount} ${inputCurrency} gets you ${data} ${outputCurrency}!`));
      }
    }
  }
})

module.exports = router;