
import { Page } from 'puppeteer-core'

import Product from './Product';



type NavigationPage = (page: Page) => Promise<Product[]>;

export default NavigationPage;
