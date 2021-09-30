
import os from 'os';
import puppeteer from 'puppeteer-core';

import Product from './types/Product';
import NavigationPage from './types/TypeNavigationPage';



const platform = os.platform();

const executablePaths = {
    'linux': '/usr/bin/google-chrome',
    'darwin': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'win32': 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'aix': '',
    'freebsd': '',
    'openbsd': '',
    'sunos': '',
    'android': '',
    'haiku': '',
    'cygwin': '',
    'netbsd': ''
};



export default async function useWebCrawler(callback: NavigationPage): Promise<Product[]> {
    const config = {
        headless: false,
        executablePath: executablePaths[platform]
    }

    const browser = await puppeteer.launch(config);
    const page = await browser.newPage();

    const result = await callback(page);

    await browser.close();

    return result;
}
