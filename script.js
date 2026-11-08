var myAppKey = 'my_todo_items';

var textInput = document.getElementById('taskInput');
var buttonAdd = document.getElementById('addBtn');
var listUl = document.getElementById('taskList');

var todoList = [];

function startApp() {
    var storedData = localStorage.getItem(myAppKey);
    if (storedData) {
        todoList = JSON.parse(storedData);
    }
    showAllTasks();
}

function updateStorage() {
    localStorage.setItem(myAppKey, JSON.stringify(todoList));
}

function showAllTasks() {
    listUl.innerHTML = '';

    for (var i = 0; i < todoList.length; i++) {
        var item = todoList[i];
        
        var liElement = document.createElement('li');
        if (item.completed) {
            liElement.className = 'task completed';
        } else {
            liElement.className = 'task';
        }
        var wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'task-actions';

        var chkBox = document.createElement('input');
        chkBox.setAttribute('type', 'checkbox');
        chkBox.className = 'task-checkbox';
        chkBox.checked = item.completed;
        
        (function(targetIndex) {
            chkBox.onclick = function() {
                todoList[targetIndex].completed = !todoList[targetIndex].completed;
                updateStorage();
                showAllTasks();
            };
        })(i);

        var textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.innerText = item.text;

        var btnDel = document.createElement('button');
        btnDel.className = 'deleteBtn';
        btnDel.innerText = 'Delete';
        
        (function(targetIndex) {
            btnDel.onclick = function() {
                todoList.splice(targetIndex, 1);
                updateStorage();
                showAllTasks();
            };
        })(i);

        wrapperDiv.appendChild(chkBox);
        wrapperDiv.appendChild(textSpan);
        wrapperDiv.appendChild(btnDel);

        liElement.appendChild(wrapperDiv);
        listUl.appendChild(liElement);
    }
}

function createNewTask() {
    var inputVal = textInput.value;
    if (!inputVal || inputVal.trim() === '') {
        return;
    }

    todoList.unshift({
        text: inputVal.trim(),
        completed: false
    });

    updateStorage();
    textInput.value = '';
    showAllTasks();
}

buttonAdd.addEventListener('click', createNewTask);

textInput.onkeypress = function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) { // Enter key
        createNewTask();
    }
};

startApp();