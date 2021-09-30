
import fs from 'fs'
import Product from './src/types/Product';



(async () => {
    const path = './src/json';
    const jsonsNameFile = await fs.readdirSync(path);
    
    const promises = jsonsNameFile
        .map( jsonFile => fs.readFileSync(`${path}/${jsonFile}`, 'utf-8') )

    const jsons = await Promise.all(promises);
    const products: Product[] = jsons
        .map( json => JSON.parse(json) )
        .reduce( (acc, category) => [...acc, ...category], []);


    const noRepeat: Product[] = []

    products.forEach( product => {
        const findRepeated = noRepeat.some( item => item.nome === product.nome );
        if(!findRepeated)
            noRepeat.push(product);
    });

    fs.writeFileSync( './data.json', JSON.stringify( noRepeat, null, 4 ) );

})();
