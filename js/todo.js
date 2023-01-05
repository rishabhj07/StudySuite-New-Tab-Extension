function loadTasks() {
	chrome.storage.sync.get("tasks", function(obj) {
		let taskArray = obj["tasks"]
		var divElement = document.createElement("div");
		divElement.innerHTML = taskArray;
	
		var childDivs = divElement.getElementsByTagName('div');
	
		// alert(divElement.innerHTML); <-- works
		// Container containing all the tasks
		taskList = document.getElementById("tasks-list");
		taskList.innerHTML = "" // Resets taskList so we don't get duplicates when we reload tasks
	
		for (i=0; i < childDivs.length; i++) {
			// Get task name
			taskData = childDivs[i].innerHTML;
	
			var taskElement = document.createElement('html');
			taskElement.innerHTML = taskData;
			
			// Saves the task name
			taskScope = taskElement.getElementsByTagName('span')[0].innerHTML;
	
			// Create a div for the task
			const taskContainer = document.createElement("div");
	
			// Add a checkbox beside the task
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.classList.add("task-checkbox")
	
			// See if the task is crossed out
			if (taskElement.getElementsByTagName('span')[0].classList.contains("cross-out")) {
				// If so, check it's checkbox boxed and add the cross-out class
				checkbox.checked = true;
	
			}
	
			taskContainer.appendChild(checkbox);
	
			// Crosses out the task when the box is clicked
			checkbox.onclick = function() { 
				// If it has the class "cross-out", remove the class "cross-out" from the element
				if (taskName.classList.contains("cross-out")) {
					taskName.classList.remove("cross-out");
				}
	
				else {
					// Else, adds the class "cross-out" to the element
					taskName.classList.add("cross-out");
				}
	
				saveTasks();
			};
	
			// Adds the name of the task to the task container
			const taskName = document.createElement("span");
	
			taskName.innerHTML = taskScope;
			taskName.classList.add("a-task");
	
			if (checkbox.checked == true) {taskName.classList.add("cross-out");}
			taskContainer.appendChild(taskName);
	
			// Add a X beside the task
			const deleteButton = document.createElement('button');
			deleteButton.innerHTML = '<i class="delete-task-icon fa-solid fa-xmark"></i>';
			deleteButton.classList.add("delete-task-button")
			taskContainer.appendChild(deleteButton);
	
			// Removes the task when the button is clicked
			deleteButton.onclick = function() { 
				taskContainer.remove();
				saveTasks();
				loadTasks();
			};
	
			taskList.appendChild(taskContainer);	
		}
	})
}

loadTasks();

function saveTasks() {
	currTasks = document.getElementById("tasks-list").innerHTML;
	chrome.storage.sync.set({"tasks":currTasks})
}


function addTask() {
	taskScope = document.getElementById("task-input").value.trim();

	if (taskScope) {
		// Makes the text box empty
		document.getElementById("task-input").value = "";

		// Container containing all the tasks
		taskList = document.getElementById("tasks-list");

		// Create a div for the task
		const taskContainer = document.createElement("div");
		

		// Add a checkbox beside the task
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.classList.add("task-checkbox")
		taskContainer.appendChild(checkbox);

		// Crosses out the task when the box is clicked
		checkbox.onclick = function() { 
			// If it has the class "cross-out", remove the class "cross-out" from the element
			if (taskName.classList.contains("cross-out")) {
				taskName.classList.remove("cross-out");
			}
		
			else {
				// Else, adds the class "cross-out" to the element
				taskName.classList.add("cross-out");
			}

			saveTasks();
		};

		// Adds the name of the task to the task container
		const taskName = document.createElement("span");

		taskName.innerHTML = taskScope;
		taskName.classList.add("a-task");
		taskContainer.appendChild(taskName);

		// Add a X beside the task
		const deleteButton = document.createElement('button');
		deleteButton.innerHTML = '<i class="delete-task-icon fa-solid fa-xmark"></i>';
		deleteButton.classList.add("delete-task-button")

		// Removes the task when the button is clicked
		deleteButton.onclick = function() { 
			taskContainer.remove();
			saveTasks();
			loadTasks();
		};
		
		taskContainer.appendChild(deleteButton);

		taskList.appendChild(taskContainer);	
		saveTasks();
	}
}

// When the user presses the "Enter" key on the keyboard, submit the form to add a task
document.getElementById("task-input").addEventListener("keyup", 
	function(event) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.code === 'Enter') {
			addTask();
		}
	}
);

// Add task button onclick
document.getElementById("add-task-button").addEventListener("click", addTask);

