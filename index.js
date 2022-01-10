const express = require('express');
const axios = require('axios');
const userBalances = require('./models/userBalances');
const app = express()
const port = 3000

const getValue = async (query) => {
    try {
        const res = await axios(`https://www.bitstamp.net/api/v2/ticker/${query}/`)
        return res.data.last
    } catch (error) {
        console.log(error.msg)
    }
}

app.get('/', (req, res) => {
    const printButtons = Object.keys(userBalances).map(button => {
        return `<a href='/api/${button}'><button>${button}</button>`
    })
    res.send(`Select your id!<br>${printButtons.join('')}`)
})

app.get('/api/:user',  async (req, res) => {
    const bitcoinValue = await getValue("btcusd")
    const ethereumValue = await getValue("ethusd")
    for (const user in userBalances){
        if (user == req.params.user){
            const balance = (userBalances[user].BTC || 0) * bitcoinValue + (userBalances[user].ETH || 0) * ethereumValue
            res.send(`Your current balance is $${balance.toFixed(2)} USD.<br><a href='../'>Go back.</a>`)
        }
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})