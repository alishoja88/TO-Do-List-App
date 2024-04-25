window.addEventListener('load', function () {
    loadToDoList();
});

function addToDoProject() {
    let inputValue = textInput.value;

    // create elements 
    let divContent = document.createElement("div");
    divContent.classList.add("content-project");

    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");

    let paragraph = document.createElement("p");
    paragraph.textContent = inputValue;

    let deletBtn = document.createElement("button");
    deletBtn.setAttribute("id", "deletebtn");
    deletBtn.textContent = "Delete";
    deletBtn.style.color = "white";
    deletBtn.classList.add("delete-button");
    deletBtn.disabled = true;

    let editButton = document.createElement("button");
    editButton.setAttribute("id", "edit-button");
    editButton.textContent = "Edit";
    editButton.style.color = "white";
    editButton.classList.add("edit-button");
    editButton.disabled = true;

    // append elements to the project container
    projectContainer.appendChild(divContent)
    divContent.appendChild(checkBox);
    divContent.appendChild(paragraph);
    divContent.appendChild(deletBtn);
    divContent.appendChild(editButton);

    // Function to delete a to-do item
    function deletToDoList() {
        let todoItemContainer = divContent;
        projectContainer.removeChild(todoItemContainer);

        saveToDoListToLocalStorage();
        toggleTitleVisibility();
    }

    // Event listener for delete button
    deletBtn.addEventListener("click", function () {
        deletToDoList(divContent);
    });

    // Update delete and edit button states based on checkbox
    function updateButtonStates() {
        if (checkBox.checked) {
            paragraph.style.textDecoration = "line-through red";
            deletBtn.disabled = false;
            editButton.disabled = false;
            deletBtn.style.backgroundColor = "#e10101";
            editButton.style.backgroundColor = "#01e162"
        } else {
            paragraph.style.textDecoration = "none";
            deletBtn.disabled = true;
            editButton.disabled = true;
            deletBtn.style.backgroundColor = "#9b9b9b45";
            editButton.style.backgroundColor = "#9b9b9b45"
        }
    }

    // Event listener for checkbox
    checkBox.addEventListener("change", function () {
        updateButtonStates();
    });

    // Call updateButtonStates initially
    updateButtonStates();

    // Event listener for edit button
    editButton.addEventListener("click", function () {
        addEditContent(paragraph);
    });

    // Save the to-do list to local storage
    saveToDoListToLocalStorage();
    textInput.value = "";

    // Toggle title visibility
    toggleTitleVisibility();
}

function deletToDoList(divContent) {
    if (!divContent) {
        return; // Exit the function if divContent is undefined
    }
    projectContainer.removeChild(divContent);
    saveToDoListToLocalStorage();
    toggleTitleVisibility();
}

// toggle for show title to do list if add any to do list to container
function toggleTitleVisibility() {
    if (projectContainer.children.length === 0) {
        projectTitle.style.display = "none"; // Hide the title if there are no tasks
    } else {
        let hasTasks = Array.from(projectContainer.children).some(child => child.tagName === "DIV");
        if (hasTasks) {
            projectTitle.style.display = "block"; // Show the title if there are tasks
        } else {
            projectTitle.style.display = "none"; // Hide the title if there are no tasks
        }
    }
}

const addEditContent = function (paragraph) {
    let editContent = document.createElement("div");
    editContent.classList.add("edit-content");
    editContent.id = "edit-content";

    let inputField = document.createElement("input");
    inputField.setAttribute("type", "text");
    inputField.placeholder = "Enter new value";
    // Set the current paragraph text as the input field value
    inputField.value = paragraph.textContent;

    let divButtons = document.createElement("div");
    divButtons.classList.add("buttons-content");

    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";

    let cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";

    let overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay");
    overlayContent.id = "overlay";

    editContent.appendChild(inputField);
    divButtons.appendChild(cancelButton);
    divButtons.appendChild(saveButton);
    editContent.appendChild(divButtons)
    projectContainer.appendChild(editContent);

    projectContainer.appendChild(overlayContent)

    editContent.style.display = "flex";
    overlayContent.style.display = "block"

    cancelButton.addEventListener("click", function () {
        editContent.style.display = "none";
        overlayContent.style.display = "none"
    });

    saveButton.addEventListener("click", function () {
        // Get the input value
        let newValue = inputField.value;

        // Update the paragraph content with the new value
        paragraph.textContent = newValue;

        // Hide the edit content and overlay
        editContent.style.display = "none";
        overlayContent.style.display = "none"
    });
};

function saveToDoListToLocalStorage() {
    // Get the current to-do list from the DOM
    let toDoList = [];
    let toDoItems = projectContainer.querySelectorAll('.content-project');
    toDoItems.forEach(function (item) {
        let todo = {
            text: item.querySelector('p').textContent,
            checked: item.querySelector('input[type="checkbox"]').checked
        };
        toDoList.push(todo);
    });

    // Save the to-do list to local storage
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

function loadToDoList() {
    // Load the to-do list from local storage
    let toDoList = JSON.parse(localStorage.getItem('toDoList'));

    if (toDoList) {
        // Iterate through the to-do list and create DOM elements
        toDoList.forEach(function (todo) {
            let divContent = document.createElement('div');
            divContent.classList.add('content-project');

            let checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.checked = false;

            let paragraph = document.createElement('p');
            paragraph.textContent = todo.text;

            let deletBtn = document.createElement('button');
            deletBtn.setAttribute('id', 'deletebtn');
            deletBtn.textContent = 'Delete';
            deletBtn.style.color = 'white';
            deletBtn.classList.add('delete-button');
            deletBtn.disabled = true;
            deletBtn.style.backgroundColor = "rgba(155, 155, 155, 0.27)";

            let editButton = document.createElement('button');
            editButton.setAttribute('id', 'edit-button');
            editButton.textContent = 'Edit';
            editButton.style.color = 'white';
            editButton.classList.add('edit-button');
            editButton.disabled = true;
            editButton.style.backgroundColor = "rgba(155, 155, 155, 0.27)";

            // Append elements to the project container
            projectContainer.appendChild(divContent);
            divContent.appendChild(checkBox);
            divContent.appendChild(paragraph);
            divContent.appendChild(deletBtn);
            divContent.appendChild(editButton);

            // Add event listener for delete button
            deletBtn.addEventListener("click", function () {
                deletToDoList(divContent);
            });

            // Add event listener for edit button
            editButton.addEventListener("click", function () {
                addEditContent(paragraph);
            });

            // Event listener for checkbox
            checkBox.addEventListener("change", function () {
                if (this.checked) {
                    paragraph.style.textDecoration = "line-through red";
                    deletBtn.disabled = false;
                    editButton.disabled = false;
                    deletBtn.style.backgroundColor = "#e10101";
                    editButton.style.backgroundColor = "#01e162";
                } else {
                    paragraph.style.textDecoration = "none";
                    deletBtn.disabled = true;
                    editButton.disabled = true;
                    deletBtn.style.backgroundColor = "#9b9b9b45";
                    editButton.style.backgroundColor = "#9b9b9b45";
                }
                saveToDoListToLocalStorage();
            });

        });

        // Toggle title visibility
        toggleTitleVisibility();
    }
}


let textInput = document.getElementById("text-toDo");
let addButton = document.getElementById("add-button");
let projectContainer = document.getElementById("addProject");
let projectTitle = document.getElementById("titleTask");


// add,  add function to listener 
addButton.addEventListener("click", addToDoProject);



