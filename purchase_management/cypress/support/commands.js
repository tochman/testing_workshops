
import puppeteer from "puppeteer";

let puppeteerBrowser;
let mainWindow;
let metamaskWindow;

const initializePuppeteer = async () => {
  const debuggerDetails = await fetch('http://localhost:9222/json/version'); //DevSkim: ignore DS137138
    const debuggerDetailsConfig = await debuggerDetails.json();
    const webSocketDebuggerUrl = debuggerDetailsConfig.webSocketDebuggerUrl;

    puppeteerBrowser = await puppeteer.connect({
      browserWSEndpoint: webSocketDebuggerUrl,
      ignoreHTTPSErrors: true,
      defaultViewport: null,
    });
    return puppeteerBrowser.isConnected();
}

const assignWindows = async () => {
  let pages = await puppeteerBrowser.pages();
  for (const page of pages) {
    if (page.url().includes('integration')) {
      mainWindow = page;
    } else if (page.url().includes('extension')) {
      metamaskWindow = page;
    }
  }
  return true;
}

const initiate = async () => {
  await initializePuppeteer()
  await assignWindows()
}


