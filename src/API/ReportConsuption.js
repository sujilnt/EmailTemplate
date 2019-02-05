const {consumption} = require("./consumption");
const {convertDate,addValues} = require('./utils');
//const electricity = consumption(fromDate,toDate,deviceID,paramkey,params, key);
const {getAllLocation} = require("./getAllLocation");

const params ={
	start: 1,
	limit: 500
};

const allLocations = getAllLocation("d8265882f973ec4d8e7a").then(async (data)=>{
	const converttoJson=JSON.parse(data.body);
	const fromDate =  convertDate("2019-01-01");
	const toDate =  convertDate("2019-01-31");
	converttoJson[0]["reference_devices"].map(async (row)=>{
		console.log(row,"rowData");
		if(row.type=== "MAINSUPPLY"){
			const total_ElecConsuption = await consumption(fromDate,toDate,row.id,"EACTIVE","D","d8265882f973ec4d8e7a").then(async (data)=>{
				const consuptionData =await JSON.parse(data.body);
				console.log("Elect",consuptionData);
				return  consuptionData.values.reduce(addValues,0);
			});
			return total_ElecConsuption;
		} else if(row.type=== "GAS"){
			console.log("GAS");
			const totalGasConsumption =  await consumption(fromDate,toDate,row.id,"GAS","D","d8265882f973ec4d8e7a").then((data)=>{
				
				const consuptionGasData = JSON.parse(data.body);
				//return  consuptionGasData.values.reduce(addValues,0);
			});
			return totalGasConsumption ;
		} else if(row.type==="Water"){
			console.log("Water");
			const totalWaterConsumption =  await consumption(fromDate,toDate,row.id,"WATER","D","d8265882f973ec4d8e7a").then((data)=>{
				const consuptionWaterData = JSON.parse(data.body);
				//  consuptionWaterData.values.reduce(addValues,0);
			});
		} else{
			return;
		}
		
		
		
		
	});
	
	
	console.log(converttoJson[0].id, converttoJson);
});

console.log(allLocations,"aaaaaaa000");


