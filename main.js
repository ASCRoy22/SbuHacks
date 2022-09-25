

const database=firebase.database().ref();
bar=0;
xp=0;
goalxp=100;
reward=50;
level=0;

const expBar=document.getElementById("innerbar")
const currLevel=document.getElementById("level")
expBar.style.width=bar+'%';
window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");
	const sendButton=document.getElementById("new-task-submit");

	const InputText=document.getElementById("new-task-input");
	
	database.on("child_added",addMessageToBoard);

function updateDB(event){
    //prevents the page from refreshing
    event.preventDefault();

    //create a variable with out message info to use as 
    //a database entry
    const entry= {
        message:InputText.value,  
       
    }
	database.push(entry);
}


	form.addEventListener('submit', (e) => {
		e.preventDefault();

		updateDB(e);

	});
});


function addMessageToBoard(rowData){
	const list_el = document.querySelector("#tasks");
    const messageObject=rowData.val();
    console.log(messageObject);

	const task = messageObject.message;

	const task_el = document.createElement('div');
	task_el.classList.add('task');

	const task_content_el = document.createElement('div');
	task_content_el.classList.add('content');

	task_el.appendChild(task_content_el);

	const task_input_el = document.createElement('input');
	task_input_el.classList.add('text');
	task_input_el.type = 'text';
	task_input_el.value = task;
	task_input_el.setAttribute('readonly', 'readonly');

	task_content_el.appendChild(task_input_el);

	const task_actions_el = document.createElement('div');
	task_actions_el.classList.add('actions');
	
	const task_edit_el = document.createElement('button');
	task_edit_el.classList.add('edit');
	task_edit_el.innerText = 'Edit';

	const task_delete_el = document.createElement('button');
	task_delete_el.classList.add('delete');
	task_delete_el.innerText = 'Delete';

	const task_completed_el = document.createElement('button');
	task_completed_el.classList.add('completed');
	task_completed_el.innerText = 'Completed';
	
	task_actions_el.appendChild(task_edit_el);
	task_actions_el.appendChild(task_delete_el);
	task_actions_el.appendChild(task_completed_el);

	task_el.appendChild(task_actions_el);

	list_el.appendChild(task_el);

	

	task_edit_el.addEventListener('click', (e) => {
		if (task_edit_el.innerText.toLowerCase() == "edit") {
			task_edit_el.innerText = "Save";
			task_input_el.removeAttribute("readonly");
			task_input_el.focus();
		} else {
			task_edit_el.innerText = "Edit";
			task_input_el.setAttribute("readonly", "readonly");
		}
	});

	task_delete_el.addEventListener('click', (e) => {
		list_el.removeChild(task_el);
		updateDB_Remove();
	});
	task_completed_el.addEventListener('click', (e) => {
		list_el.removeChild(task_el);
		//bar=Math.min(bar+50,94)//result of bar+50 cant be more than 100
		xp+=reward;
		/*if(xp>=goalxp){}*/
		bar+=(reward/goalxp)*100;   //study how the xp system works how much xp it gives
		 						//for debugging
	
		expBar.style.width=bar+"%";
		if(bar>=94){
			alert("leveled up!"+xp+'/'+goalxp)
			xp=0;
			bar=0;
			goalxp+=50;//the way xp bar expands is too linear 
			expBar.style.width=bar+"%";
			level+=1;
			currLevel.innerHTML="level "+level;

		}
		
	});
}



function updateDB_Remove(event){   //not complete yet to remove from database
    //prevents the page from refreshing
    event.preventDefault();

    
	database.remove(entry);
}

/*
form.addEventListener(task_delete_e1, (e) => {
	e.preventDefault();

	updateDB_Remove(e);

});
*/
