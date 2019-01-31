const {getAllAssets} =require("./getAllAssets");

const main=async ()=>{
	const c1 = await getAllAssets();
	console.log("c1",c1);
};

module.exports={
	main
};
