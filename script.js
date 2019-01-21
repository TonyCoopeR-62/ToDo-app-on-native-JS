function createElement(tag, props, ...children) {
	const element = document.createElement(tag);
	
	
	Object.keys(props).forEach(key => element[key] = props[key]);
	
	if (children.length > 0) {
		children.forEach(child => {
			if (typeof child === 'string') {
				child = document.createTextNode(child);
			}
			
			element.appendChild(child)
			
		});
		
	}
	return element;
}

// время добавления элемента
function addTime() {
	let item = document.getElementById('time');
	item.innerHTML = date2.toLocaleTimeString();
}


function createTodoItem (title) { //Главная форма пользователя
	var date2 = new Date();
	const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox'});

	const label = createElement('label', {className: 'title'}, title);

	const editInput = createElement('input', {type: 'text', className: 'textField'});

	const editButton = createElement('button', {className: 'edit'}, 'Изменить');
	
	const deleteButton = createElement('button', {className: 'delete'}, 'Удалить');

	const time2 = createElement('div', {className: 'time2'});

	const listItem = createElement('li', {className: 'todo-item'}, checkbox, label, editInput, time2, editButton, deleteButton);
	listItem.className = 'todo-item';
	

	time2.innerHTML = date2.toLocaleTimeString();
	bindEvents(listItem);

	return listItem;
}

function bindEvents(todoItem) { // привязка кнопок
	const checkbox = todoItem.querySelector('.checkbox');
	const editButton = todoItem.querySelector('button.edit');
	const deleteButton = todoItem.querySelector('button.delete');

	checkbox.addEventListener('change', toggleTodoItem);
	editButton.addEventListener('click', editTodoItem);
	deleteButton.addEventListener('click', deleteTodoItem);
}

function addTodoItem (event) {
	event.preventDefault(); //останавливаем перезагрузку страницы по дефолту

	if (addInput.value === '') return alert('Необходимо ввести название задачи'); //проверка что поле не пустое
	const todoItem = createTodoItem(addInput.value); // то что ввел пользователь
	todoList.appendChild(todoItem);
	
	addInput.value = "";
}

function toggleTodoItem() {
	const listItem = this.parentNode;
	listItem.classList.toggle('completed');
}

function editTodoItem() {
	const listItem = this.parentNode;
	const title = listItem.querySelector('.title');
	const editInput = listItem.querySelector('.textField');
	const isEditing = listItem.classList.contains('editing');

	if (isEditing) {
		title.innerText = editInput.value;
		this.innerText = 'Изменить';
	} else {
		editInput.value = title.innerText;
		this.innerText = 'Сохранить';
	}

	listItem.classList.toggle('editing');

}

function deleteTodoItem() {
	const listItem = this.parentNode;
	todoList.removeChild(listItem);
}
const todoForm = document.getElementById('todo-form'); //получаем элементы страницы
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

function main() {
	todoForm.addEventListener('submit', addTodoItem); //Добавляем обработчик событий на форму
	todoItems.forEach(item => bindEvents(item));
}

main();

// часы на форме
window.onload = function() {
	window.setInterval( function() {
		let time = document.getElementById('time');
		let date = new Date();
		time.innerHTML = date.toLocaleTimeString();
	}, 1000);
}


