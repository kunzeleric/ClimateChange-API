import express from 'express';
import axios from 'axios';
import { load } from 'cheerio';
import { newspapers } from './others/NewsPapers.js';
const app = express();

const articles = [];

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then((response) => {
            const html = response.data;
            const $ = load(html);

            $('a:contains("climate")', html).each(function () {
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
    res.json('Welcome to my Climate Change News API! Check out the news and news/${newsPaper} you would like to see :)');
})

//route to get all articles from all newspapers
app.get('/news', (req, res) => {
    res.json(articles);
})

// route to get articles from a specific newspaper
app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId; //gets the information through the requisition params
    const newspaperAddress = newspapers.filter((newspaper) => newspaper.name == newspaperId)[0].address; //filters the newspaper that matches the address
    const newspaperBase = newspapers.filter((newspaper) => newspaper.name == newspaperId)[0].base; //filters the newspaper that matches the base url


    axios.get(newspaperAddress)
        .then((response) => {
            const html = response.data;
            const $ = load(html);
            const specificArticles = [];

            $('a:contains("climate")', html).each(function () {
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

export default app;