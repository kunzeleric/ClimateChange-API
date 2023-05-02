const PORT = 4000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const URL = 'https://www.theguardian.com/environment/climate-crisis';
const app = express();

const newspapers = [
    {
        name: "thetimes",
        address: "https://www.thetimes.co.uk/environment/climate-change",
        base: '',
    },
    {
        name: "guardian",
        address: "https://www.theguardian.com/environment/climate-crisis",
        base: '',
    },
    {
        name: "telegraph",
        address: "https://www.telegraph.co.uk/climate-change/",
        base: 'https://www.telegraph.co.uk'
    }
]
const articles = [];

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            $('a:contains("climate")', html).each(function() {
                const title = $(this).text();
                const url = $(this).attr('href');

                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            });

        })
})

app.get('/', (req, res) => {
    res.json('Welcome to my Climate Change News API!');
})

//route to get all articles from all newspapers
app.get('/news', (req, res) => {
    res.json(articles);
})

// route to get articles from a specific newspaper
app.get('/news/:newspaperId', async (req, res) => {
    const newspaperId = req.params.newspaperId; //gets the information through the requisition params
    const newspaperAddress = newspapers.filter((newspaper) => newspaper.name == newspaperId)[0].address; //filters the newspaper that matches the address
    const newspaperBase = newspapers.filter((newspaper) => newspaper.name == newspaperId)[0].base; //filters the newspaper that matches the base url

    
    axios.get(newspaperAddress)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const specificArticles = [];

            $('a:contains("climate")', html).each(function() {
                const title = $(this).text();
                const url = $(this).attr('href');
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles);
        }).catch(err => console.log(err))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})
