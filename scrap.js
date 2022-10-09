import * as cheerio from 'cheerio';
import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://www.unscramblerer.com/common-five-letter-words/',
    timeout: 1000,
    headers: {'Cookie': 'hasCookie=true'}
});

const result = await instance.get();
const $ = cheerio.load(result.data);

$('.words > li').each((index, ele) => {
    const text = $(ele).find('a > span').text();

    console.log(text);
});