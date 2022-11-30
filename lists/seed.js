const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lister');

const readLine = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

const List = require('./list.js');

let lists = [
	{
		color: 'red',
		title: 'Shopping List',
		content: [
				{item: '1 kg sugar',
				checked: false},
				{item: '5 packets biscuits',
				checked: true}]
	},
	{
		color: 'blue',
		title: 'To-Do List',
		content: [
				{item: 'Read a lot',
				checked: false},
				{item: 'Play a lot',
				checked: true}]
	},
	{
		color: 'green',
		title: 'Books to Read',
		content: [
				{item: 'Tuesdays with Morrie',
				checked: false},
				{item: 'Five People you Meet in Heaven',
				checked: true},
				{item: 'The Timekeeper',
				checked: true},
				{item: 'The First Phone Call From Heaven',
				checked: true}]
	},
	{
		color: 'white',
		title: 'Shopping List',
		content: [
				{item: '1 kg sugar',
				checked: false},
				{item: '5 packets biscuits',
				checked: true}]
	},
	{
		color: 'blue',
		title: 'To-Do List',
		content: [
				{item: 'Read a lot',
				checked: false},
				{item: 'Play a lot',
				checked: true}]
	}
];

const seed = async ()=>{
	let dataLength = await List.countDocuments();
	console.log(dataLength);
	if(dataLength>0){
		const askToSeed = ()=>{readLine.question('The database is not empty. Do you want to clear it and then seed? (y/n)',(res)=>{
				if(res==='n' || res==='N'){
					console.log('No Seeding Done!');
					process.exit();
				}else if(res==='y' || res==='Y'){
					List.deleteMany().then(seedData);
				}else{
					askToSeed();
				}
			});
		};
		askToSeed();
	}else{
		seedData();
	};
};

seedData = async ()=>{
	await List.insertMany(lists);
	console.log('Seeding Done!')
	process.exit();
}

seed();