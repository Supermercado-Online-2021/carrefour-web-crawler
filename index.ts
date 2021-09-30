
import fs from 'fs'
import { Page } from 'puppeteer-core';

import Category from "./src/types/Category";
import Product from "./src/types/Product";

import carrefour from './src/carrefour';

import useWebCrawler from "./src/crawler";
import getProductsByCategoryPage from './src/getProductsByCategoryPage';




const navigateByCategory = ( category: Category ) => async (page: Page): Promise<Product[]> => {
    await page.goto( category.url, {
        waitUntil: 'networkidle2'
    });

    await page.on("console", consoleObj => console.log(consoleObj.text()));

    const products = await page.evaluate(getProductsByCategoryPage);

    return products.map( product => {
        product.category_id = category.id;
        return product;
    });
}


(async() => {
    const index = 10;
    const category = carrefour[index];
    const productsByCategory: Product[] = await useWebCrawler( navigateByCategory(category))

    const fileName = `./src/json/${category.name.replace(' ', '-')}.json`;
    const json = JSON.stringify(productsByCategory, null, 4);

    fs.writeFileSync( fileName, json );
})();
