
# API Climate Change News - UK

This project was a study into webscraping and API development, based on a video I searched on YouTube.
It contains two routes to access information regarding Climate Change across some of most famous Newspapers of UK.



## API Documentation

#### Return all news

```http
  GET /news
```
#### Returns all news from a specific Newspaper

```http
  GET /news/${newspaperId}
```

| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Mandatory**. ID of the Newspaper you're looking for. |


## Take Aways

Despite the very simple format of the project so far, it was very important for me to improve my Backend abilities. Also, I've always been keen to learning webscraping, so I thought I'd give this a shot.

## Stack Applied

**Back-end:** Node, Express

**Others:** Cheerio, Axios


## Setup

Download and install the project with npm command below:

```bash
  npm install my-project
```
    
## Reference

 - [5 API Projects in 5 hours](https://www.youtube.com/watch?v=WDwhJNbWka0&t=47s&ab_channel=CodewithAniaKub%C3%B3w)


