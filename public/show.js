document.querySelectorAll("input[type='checkbox']").forEach((chkBox)=>{
	chkBox.addEventListener('click',()=>{
		chkBox.previousElementSibling.classList.toggle('done');
		axios.patch('/lists/'+document.querySelector('section').id, {
			[chkBox.name.slice(4)] : chkBox.checked
		}).then((res)=>{
			console.log(res.data);
		}).catch((err)=>{
			console.log(err);
		});
	});
});