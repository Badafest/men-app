console.log('Client JS Loaded');

document.querySelectorAll('section').forEach((listSection)=>{
	listSection.addEventListener('click',(e)=>{
		if(e.target.classList.contains('listBtn')){
			const btn = e.target;
			if(btn.classList.contains('editList')){
				location.href = '/lists/edit/'+listSection.id;
			}else if(btn.classList.contains('deleteList')){
				if(confirm(`Are you sure you want to delete "${listSection.querySelector('h3').innerText}"?`)){
					axios.delete('/lists/'+listSection.id).then((res)=>{
						console.log(res.data);
					}).catch((err)=>{
						console.log(err);
					});
					listSection.remove();
				}
			}
		}else{
			location.href = '/lists/'+listSection.id;
		}
	});
});