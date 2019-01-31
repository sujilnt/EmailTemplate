const puppeteer = require('puppeteer');
const path= require("path");

const generateReport = async (fileName)=>{
  const browser= await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setContent("<h1>hello world adam</h1>");
  await page.emulateMedia("screen");
  await page.pdf({
	  path: path.resolve(__dirname,"images/report.pdf"),
	  format: 'A4',
	  printBackground:true
  });
  await browser.close();
};

module.exports={
	generateReport
};

//generateReport("text.pdf");
