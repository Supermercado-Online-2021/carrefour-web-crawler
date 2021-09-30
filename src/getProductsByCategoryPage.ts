
import Product from './types/Product';



async function globalScopeBrowser(): Promise<Product[]> {
    const sleep = async (time: number) => await new Promise( r => setTimeout( r, time ));

    async function showMoreProducts () {
        await sleep(1000);
        
        const showMore: HTMLAnchorElement | null = document.querySelector(".css-11960sk");

        if(showMore){
            showMore.click();
            await showMoreProducts();
        }
    }

    function factoryProduct(div: HTMLDivElement): Product {
        const name = div.querySelector('.css-1xmtsk1')?.textContent;
        const discount = div.querySelector(".list-price.css-vurnku")?.textContent;
        const price = div.querySelector('.css-1xc4ph5')?.textContent;

        const image: HTMLImageElement | null = div.querySelector('.css-j0j5gy');

        const realPrice = (discount !== '' && discount !== null ? discount: price);
        const priceFormatted = realPrice?.replace('R$', '').replace(',','.');

        return {
            nome: name,
            preco: Number(priceFormatted) || 0,
            image_src: image?.src
        }
    }

    await showMoreProducts();
    
    const array: Product[] = [];

    const productsContainer: NodeListOf<HTMLDivElement> = document.querySelectorAll('.css-1u9y7ms');
    productsContainer.forEach( (div: HTMLDivElement) => {
        const product: Product = factoryProduct(div);
        array.push(product);
    });

    return array;
}

export default globalScopeBrowser;
