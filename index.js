const axios = require('axios')
const express = require('express')
const app = express()
const port = 5000

async function getBTCPrice() {
  try {
    let response = await axios({
      method: 'get',
      url: 'https://testnet-api.smartbit.com.au/v1/exchange-rates'
    })
    let price = response.data['exchange_rates'].filter(function(rate){ return rate['code'] == 'USD'})
    return price[0]['rate']
  } catch (e) {
    console.log(e)
  }
}

async function getBTCWallet(){
  let wallet = '3P3QsMVK89JBNqZQv5zMAKG8FK3kJM4rjt'
  let smartbitURL = 'https://api.smartbit.com.au/v1/blockchain/address/' + wallet

  try {
    let response = await axios({
      method: 'get',
      url: smartbitURL
    })

    let walletBalance = parseFloat(response.data['address']['total']['balance'])
    return walletBalance
  } catch (e) {
	   console.log(e)
  }
}

app.get('/balance', async function (req, res) {
  try {
    let [ walletBalance, btcPrice ] = await Promise.all([
      getBTCWallet(), getBTCPrice()
    ])

    let balance = (walletBalance * btcPrice).toFixed(2)

    const response = {
      statusCode: 200,
      body: balance
    }
    res.send(response)
  } catch (err) {
    const response = {
      statusCode: 500,
      body: err
    }
    res.send(response)
  }
})

console.log("App is running on ", port);

app.listen(process.env.PORT || port)
