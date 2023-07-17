function openMenu(node){
	var subMenu = node.parentNode.getElementsByTagName("ul")[0];
	subMenu.style.display == "none" ? subMenu.style.display = "block" : subMenu.style.display = "none";
}

const todoList = [];
const baseTodoId = 'todoitem';

function deleteElement(id) {
    // находим по id индекс элемента, который нужно удалить
    const index = todoList.findIndex(item => item.id === id);
    // удаляем элемент из массива
    todoList.splice(index, 1);
    // находим по id карточку элемента в шаблоне и удаляем
    document.getElementById(baseTodoId + id).remove();
}

function addToDo() {
    // получаем форму из нашего html
    const form = document.forms.toDoForm;
    // достаем значения каждого из полей ввода
    const newTodo = {
        id: createNewId(), // вызываем нашу функцию, создающую id для элемента
        title: form.elements.title.value,
        color: form.elements.color.value,
        description: form.elements.description.value
    }
    todoList.push(newTodo);
    addToDoToHtml(newTodo);
}

function createNewId() {
    // проверяем, есть ли уже элементы в массиве
    // если нет - id нового элемента = 1
    // если элементы уже есть - преобразуем массив элементов в массив их id (с помощью "map")
    // например, было:
    // [
    //     {
    //         id: 1,
    //         title: 'название 1',
    //         color: '#000000',
    //         description: 'описание 1'
    //     },
    //     {
    //         id: 3,
    //         title: 'название 3',
    //         color: '#ffffff',
    //         description: 'описание 3'
    //     }
    // ]
    // а стало: [ 1, 3 ]
    // после этого в получившемся массиве ищем максимальный элемент и прибавляем 1 - такой id точно будет уникальным
    return todoList.length === 0 ?
        1 : Math.max(
            ...todoList.map(todo => todo.id)
        ) + 1;
}

function addToDoToHtml(newToDo) {
    // создаем div для нового элемента
    const div = document.createElement('div');
    // присваиваем div id нашего элемента
    div.id = baseTodoId + newToDo.id;
    // указываем свойство класса
    div.className = 'row my-3';

    // добавляем html код содержимого для элемента
    // при этом вставляем в него текст из полей переменной "newToDo"
    // для этого используем кавычки ``,
    // а когда нам нужно вставить посреди текста переменную - используем ${*название переменной*}
    div.innerHTML = `<div class="col">
                        <div class="card">
                            <div class="card-header" style="height: 35px; background-color: ${newToDo.color}"></div>
                            <div class="card-body">
                                <h5 class="card-title"> ${newToDo.title} </h5>
                                <p class="card-text"> ${newToDo.description} </p>
                                <button type="button" class="btn btn btn-link"
                                        onclick="deleteElement(${newToDo.id})"> Удалить задачу </button>
                            </div>
                        </div>
                     </div>`
    // добавляем наш элемент в контейнер из шаблона
    document.getElementById('toDoContainer').append(div);
}