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
        console.log(error);
        return "error";
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
    const user = req.params.user
    if (bitcoinValue !== "error" && ethereumValue !== "error") {
        if (userBalances[user]){
            const balance = (userBalances[user].BTC || 0) * bitcoinValue + (userBalances[user].ETH || 0) * ethereumValue
            res.json({user, balance: `$${balance.toFixed(2)} USD`})
        } else {
            res.json({user: "not found"})
        }
    } else {
        res.send("error")
    }
})

module.exports = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
