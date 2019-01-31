const puppeteer = require('puppeteer');
const path= require("path");

const _launchsetting = (obj={})=>{
	const setting = obj.launchSettings;
	return obj.length ?  setting : {
		headless:false,
		devtools:false,
	}
};

const loginScreen = (obj)=>{
	const settings = _launchsetting(obj);
	const _email= obj.email;
	const _password=obj.password;
	console.log(settings,_email);
	puppeteer.launch(settings).then(async browser=>{
		const page = await browser.newPage();
		await page.goto("https://optimisedbuildings.dexcell.com/login.htm");
		await page.type("input#username", _email); // user  Id
		await page.type("input[type='password']", _password); // password
		await page.click("button.btn");
		await page.waitFor(1000);
		await page.waitForSelector(".selection_container[id='1082']"); // waiting for dom element that has morrission url
		await page.click(".selection_container[id='1082']");  // click on the morrission url
		await page.waitForSelector("#analysis-item");
		await page.click("#analysis_section");
		///====
		await page.waitForSelector(".date-range-field");
		await page.waitFor(5000);
		await page.click(".date-range-field");
		await page.type("input[class='start']","01/11/2018");
		await page.type("input[class='start']","01/12/2018");
		await page.waitFor(1000);
		await page.click(".btn[id='apply_dates']");
		
		await page.screenshot({path: path.resolve(__dirname,"images/fullPage.png"), fullPage: true});
		await page.waitFor(2000);
		
		await page._client.send('Page.setDownloadBehavior', {
			behavior: 'allow',
			downloadPath: path.resolve(__dirname,"images/screenshot.png")
		});
		await page.click(".btn[id='link-export-img']");
		await page.waitFor(5000);
		await page.close();
		await page.waitFor(2000);
		await browser.close();
	});
};

const getAllAssets = async (obj)=>{
	loginScreen(obj);
	
};
const data = {
	email: "sujil@optimisedbuildings.com",
	password: "optimised1234",
	headless:false,
	devtools:true,
	
};

getAllAssets(data);

module.exports={
	getAllAssets
};
