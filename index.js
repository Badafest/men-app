const express = require('express');
const path = require('path');
const uuid = require('uuid').v4;
const override = require('method-override');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lister');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open",()=>{
	console.log('Database Connected');
});

const List = require('./lists/list.js');
console.log(List);

const app = express();
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(override('_method'));

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'/views'));

app.listen(3000,()=>{
	console.log('server started on port 3000')
});

app.get('/',(req,res)=>{
	res.render('home');
})

const fallBack = async (res)=>{
	const lists = await List.find();
	res.render('lists', {lists})
};

app.get('/lists',(req,res)=>fallBack(res));

app.get('/lists/new',(req,res)=>{
	res.render('new');
});

app.post('/lists',async (req,res)=>{
	const newList = new List({
		color: req.body.color,
		id: uuid(),
		title: req.body.title,
		content: Object.values(req.body).splice(2).map((item)=>{
			return {
				item: item,
				checked: false
			}
		})
	});
	await newList.save();
	res.redirect('/lists')
});

app.get('/lists/:id',async (req,res)=>{
	const {id} = req.params;
	try{
		const list = await List.findById(id);
		res.render('show',{list});
	}catch(e){
		console.log(e);
		fallBack(res);
	}
});

app.patch('/lists/:id',async (req,res)=>{
	const {id} = req.params;
	try{
		const list = await List.findById(id);
		list.content[parseInt(Object.keys(req.body)[0])].checked = Object.values(req.body)[0];
		await list.save();
		res.send('Successfully updated Backend')
	}catch (e) {
		console.log(e);
		res.send('Error! List not Found');
	}
});

app.get('/lists/edit/:id',async (req,res)=>{
	const {id} = req.params;
	try{
		const list = await List.findById(id);
		res.render('edit',{list});
	}catch (e){
		console.log(e);
		fallBack(res);
	}
});

app.put('/lists/:id',async (req,res)=>{
	const {id} = req.params;
	try{
		const list = await List.findById(id);
		list.color = req.body.color;
		list.title = req.body.title;
		const resContent = Object.values(req.body).splice(2);
		const newContent = resContent.map((item)=>{
			return {
				item: item,
				checked: (list.content[resContent.indexOf(item)] && (list.content[resContent.indexOf(item)].checked || false))===true
			}
		});
		list.content = newContent;
		await list.save();
		res.redirect('/lists/'+id);
	}catch (e){
		console.log(e);
		res.redirect('/lists')
	}
});

app.delete('/lists/:id',async (req,res)=>{
	const {id} = req.params;
	try{
		await List.findByIdAndDelete(id);
		res.send('Successfully updated Backend');
	}catch(e){
		console.log(e);
		res.send('Error on the Server!')
	};
});