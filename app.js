//selectors
const todoInput = document.querySelector('.todo-input'); //select the todo-input class and put it in a varable
const todoButton = document.querySelector('.todo-button'); //select the todo-button class and put it in a varable
const todoList = document.querySelector('.todo-list'); //select the todo-list class and put it in a varable
const filterOption = document.querySelector('.filter-todo'); //select the filter-todo class and put it in a var

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo); // an event listener for when the add button is clicked
todoList.addEventListener('click', deleteCheck); // an event listener for when the delete button is clicked
filterOption.addEventListener('click', filterTodo); // an event listener for when the select button is clicked

//function

//function for the addTodo event listener
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //Todo div
    const todoDiv = document.createElement('div'); //created the Div
    todoDiv.classList.add('todo');  //adding class to the div
    //Create LI
    const newTodo = document.createElement('li'); //create an li in the div
    newTodo.innerText = todoInput.value;  //the value thats going to be in the li
    newTodo.classList.add('todo-item');     //adding a class to the li
    todoDiv.appendChild(newTodo);   //putting the newTodo(li) in the todoDiv
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    //Completed button
    const completedButton = document.createElement('button'); //creating a button
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; //adding an html tag to the button
    completedButton.classList.add('completed-btn'); //adding a class to the delete button
    todoDiv.appendChild(completedButton);   //putting the completebutton in the todoDiv
    //Delete button
    const trashButton = document.createElement('button'); //creating a trashButton
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //adding an html tag to the trashButton
    trashButton.classList.add('delete-btn');   //adding a class to the delete button
    todoDiv.appendChild(trashButton);  //putting the trashButton in the todoDiv
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = "";
}

//deleteCheck function for the functio in the event listener
function deleteCheck(e){
    const item = e.target; //event target to get what is being clicked
    //DELETE TODO 
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        //ANIMATION
        todo.classList.add('fall');

        //REMOVING LOCALSTORAGE TODO
        removeLocalTodos(todo);

        //AFTER ANIMATION REMOVE TODO
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //COMPLETED TODO
    if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;  
        todo.classList.toggle('complete');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes; //put the selected todoList's childnode in a varable
    todos.forEach(function(todo){ //create a foreach to check which value we click on
        switch (e.target.value) { //create a switch with the event targeting the value
            case "all":                             //if the value all is selected    
                todo.style.display = "flex";        //add a style of display: flex to the todo style
                break;
            case "completed":                             //the value completed is selected
                if(todo.classList.contains("complete")){    //if the todo has a class of complete
                    todo.style.display = "flex";            //then add a style of display:flex
                }else{
                    todo.style.display = "none";            //else add a style of display:none
                }
                break;
            case "uncompleted":                             //the value uncompleted is selected
                if(!todo.classList.contains("complete")){   //if the todo does not have a class of complete
                    todo.style.display = "flex";            //then add a style of display:flex
                }else{
                    todo.style.display = "none";            ////else add a style of display:none
                }
                break;
        }
    });
}

//implimenting the local storage to the app


function saveLocalTodos(todo){
    //CHECK IF THERE ARE THINGS IN THE LOCAL STORAGE
    let todos;                                      //create a var to use 
    if(localStorage.getItem('todos') === null){     //an if statement to check if there is something stored in local storage
        todos = [];                                 //if not create empty array
    } else{                                         //else if there is something in the localstorage
        todos = JSON.parse(localStorage.getItem('todos'));  //we get back the actual data from local storage
    }
    //if there is something in the local storage
    todos.push(todo);                   //we push new todo to it
    localStorage.setItem('todos', JSON.stringify(todos));  //then set it to local storage 
}

function getTodos(){
    //CHECK IF THERE ARE THINGS IN THE LOCAL STORAGE
    let todos;                                      //create a var to use 
    if(localStorage.getItem('todos') === null){     //an if statement to check if there is something stored in local storage
        todos = [];                                 //if not create empty array
    } else{                                         //else if there is something in the localstorage
        todos = JSON.parse(localStorage.getItem('todos'));  //we get back the actual data from local storage
    }
    todos.forEach(function(todo){
        //Todo div
        const todoDiv = document.createElement('div'); //created the Div
        todoDiv.classList.add('todo');  //adding class to the div
        //Create LI
        const newTodo = document.createElement('li'); //create an li in the div
        newTodo.innerText = todo;  //the value thats going to be in the li which is in the localstorage
        newTodo.classList.add('todo-item');     //adding a class to the li
        todoDiv.appendChild(newTodo);   //putting the newTodo(li) in the todoDiv
        //Completed button
        const completedButton = document.createElement('button'); //creating a button
        completedButton.innerHTML = '<i class="fas fa-check"></i>'; //adding an html tag to the button
        completedButton.classList.add('completed-btn'); //adding a class to the delete button
        todoDiv.appendChild(completedButton);   //putting the completebutton in the todoDiv
        //Delete button
        const trashButton = document.createElement('button'); //creating a trashButton
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //adding an html tag to the trashButton
        trashButton.classList.add('delete-btn');   //adding a class to the delete button
        todoDiv.appendChild(trashButton);  //putting the trashButton in the todoDiv
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //CHECK IF THERE ARE THINGS IN THE LOCAL STORAGE
    let todos;                                      //create a var to use 
    if(localStorage.getItem('todos') === null){     //an if statement to check if there is something stored in local storage
        todos = [];                                 //if not create empty array
    } else{                                         //else if there is something in the localstorage
        todos = JSON.parse(localStorage.getItem('todos'));  //we get back the actual data from local storage
    }
    const todoIndex = todo.children[0].innerText;       //create a var to get the index of the todo and narrow it down to the inner text because the localstorage stores inner text
    todos.splice(todos.indexOf(todoIndex), 1);          //use the splice method to remove a string from the array and it has two element todoindex and how many we want to remove at a time
    localStorage.setItem("todos", JSON.stringify(todos)); //after that we set back the local storage.
}



Function 

