const puppeteer = require('puppeteer');
const path= require("path");
const fs = require("fs");
//const {generateReport} = require("generateReport");
const _launchsetting = (obj={})=>{
  const setting = obj.launchSettings;
  return obj.length ?  setting : {
      headless:false,
      devtools:false,
  }
};

const loginScreen = (obj,fs)=>{
    const settings = _launchsetting(obj);
    const _email= obj.email;
    const _password=obj.password;
   puppeteer.launch(settings).then(async browser=>{
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 1080 });
        await page.goto("https://optimisedbuildings.dexcell.com/login.htm");
        await page.type("input#username", _email); // user  Id
        await page.type("input[type='password']", _password); // password
        await page.click("button.btn");
        await page.waitFor(1000);
        await page.waitForSelector(".selection_container[id='1082']"); // waiting for dom element that has morrission url
        await page.click(".selection_container[id='1082']");  // click on the morrission url
        await page.waitForSelector("#analysis-item");
        await page.click("#report-item");
        await page.waitForSelector("#menu-report");
        await page.waitForSelector(".menu_item[data-key = 'reports-custom-i-5c4736ea872f18693dfcab77']");
        await page.click("#menu-report ul .menu_item[data-key = 'reports-custom-i-5c4736ea872f18693dfcab77'] ");
        await page.waitFor(".menu_item[data-key = 'reports-custom-i-5c4736ea872f18693dfcab77']");
        await page.click(".menu_item[data-key = 'reports-custom-i-5c4736ea872f18693dfcab77'] ");
        await page.waitForSelector(".menu_sub_item[data-key='reports-custom-si-5c474472872f18693dfcac04']");
        await page.click(".menu_sub_item[data-key='reports-custom-si-5c474472872f18693dfcac04'] a ");
        await  page.waitForSelector(".odd .link");
        await  page.click(".odd .link a[href*='l_14673']");
        await page.waitForSelector(".noScrolling");
       await page.waitFor(10000);
       const iframeParagraph = await page.evaluate(() => {
        
           const iframe = document.querySelector("iframe").contentDocument;
           //document.querySelector("iframe").contentDocument.getElementsByTagName("img")
           // grab iframe's document object
           //const iframeDoc = iframe.contentWindow.document;
           const iframeP = iframe.getElementsByTagName("img");
           console.log("show something........",iframe,iframeP,typeof(iframeP),[...iframeP]);
           const images = [...iframeP].map((data)=>{
               return data.src;
           });
           /*
           const Electable = iframe.getElementById("div-table-summary");
           return Electable.outerHTML;*/
           
           const gasTable = iframe.getElementsByTagName("table");
           console.log("show something........",iframe,iframeP,typeof(gasTable),[...gasTable]);
           const listoFtables= [...gasTable].map((row)=>{
               return row.outerHTML;
           });
           
           return {tables: listoFtables , images: images};
       });
       
       console.log(iframeParagraph); // prints "This is a paragraph"
       
   });
  
};

const getAllAssets = async (obj,path)=>{
    loginScreen(obj,path);
    
};
const data = {
    email: "adampearson@optimisedbuildings.com",
    password: "optimis3d",
    headless:false,
    devtools:true,
    
};

getAllAssets(data,path);

module.exports={
    getAllAssets : getAllAssets
};

