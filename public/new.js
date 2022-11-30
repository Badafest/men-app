console.log('Client JS Loaded');
const itemsContainer = document.querySelector('#listItems');
const colorOptions = Array.from(document.querySelector('#colorOptions').children);
const colorSelect = Array.from(document.querySelector('#color').children);

document.querySelector('#addItem').addEventListener('click',()=>{	
	let id = itemsContainer.childElementCount+1;
	let label = document.createElement('label');
	label.setAttribute('for',`listItem${id}`);
	label.innerText = `${id}. `;
	let input = document.createElement('input');
	input.setAttribute('type','text');
	input.setAttribute('name',`listItem${id}`);
	input.setAttribute('id',`listItem${id}`);
	input.setAttribute('required','true')
	let delItm = document.createElement('span');
	delItm.classList.add('deleteItem');
	delItm.innerText = ' ✘';
	delItm.addEventListener('click',removeItem);
	let div = document.createElement('div');
	div.classList.add('formContainer');
	div.append(label);
	div.append(input);
	div.append(delItm);
	itemsContainer.append(div);
});

colorOptions.forEach((colorOption)=>{
	colorOption.addEventListener('click',()=>{
		colorOptions.forEach((x)=>{x.classList.remove('checked')})
		colorOption.classList.add('checked');
		colorSelect.forEach((x)=>{x.removeAttribute('selected')})
		colorSelect.forEach((x)=>{
			if(x.value === colorOption.classList[0]){
				x.setAttribute('selected','true');
			}
		});
	});
});

document.querySelector('#saveList').addEventListener('click',()=>{
	document.querySelector('#userFormSubmit').click();
});

function removeItem() {
	if(itemsContainer.childElementCount>1){
		let allItems = Array.from(itemsContainer.children);
		let start = allItems.indexOf(this.parentElement);
		for(i=start+1;i<allItems.length;i++){
			let index = parseInt(allItems[i].children[0].innerText);
			allItems[i].children[0].innerText = `${index-1}. `;
		};
		this.parentElement.remove();
	};
};

document.querySelectorAll('.deleteItem').forEach((delItm)=>{delItm.addEventListener('click',removeItem)});