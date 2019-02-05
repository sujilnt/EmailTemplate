//const {parsingObj} = require("./parsingObjects.js");
const {fetchRequest}=require("./fetchRequest");
const getAllLocation = async (key)=>{
	const _url= "https://api.dexcell.com/v3/locations/";
	return await fetchRequest(_url,key).then((data)=>{
		return data;
	}).catch((error)=>error);
};
module.exports.getAllLocation=getAllLocation;
