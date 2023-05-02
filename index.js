const PORT = 4000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const URL = 'https://www.theguardian.com/environment/climate-crisis';

const app = express();

app.get('/', (req, res) => {
    res.json('Welcome to my Climate Change News API!');
})

app.get('/news', (req, res) => {
    axios.get(URL)
        .then((response) => {
            const html = response.data;
            console.log(html);
        })
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})
