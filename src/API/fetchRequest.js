const request = require("request");
const fetchRequest= (_url,key)=>{
	const options={
		url : _url,
		headers: {
			'x-dexcell-token': key,//"afd49db82f0edac95d2b",//"92809480b7c0d8f02632", //"3a8772f2ccbeb2e403f4",
			"Accept": "application/json",
			'Accept-Charset': 'utf-8',
			'Content-Type': 'application/json'
		}
	};
	const requestPromise = new Promise((resolve,reject)=>{
		request(options, async function(error, response, body) {
			if(error){
				return error;
			}
			responseObj=response;
			const data =await responseObj.toJSON({
				'error':error,
				'statusCode': response && response.statusCode,
				'body': body
			});
			((response.statusCode === 200) && (data.body!== undefined))  ? resolve(data) : reject(data);
		});
	});
	return requestPromise;
};
module.exports.fetchRequest=fetchRequest;

