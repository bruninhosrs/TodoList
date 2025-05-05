// Seleção dos elementos
const todoForm = document.querySelector("#form-todo");  // Formulário de adição de tarefas
const todoInput = document.querySelector("#input-todo");  // Campo de entrada de tarefas
const todoList = document.querySelector("#todo-list"); // Lista de tarefas
const editForm = document.querySelector("#edit-form"); // Formulário de edição de tarefas
const editInput = document.querySelector("#input-edit"); // Campo de entrada para edição de tarefas
const cancelEditBtn = document.querySelector("#cancel-edit-btn"); // Botão de cancelar edição    
const searchInput = document.querySelector("#input-pesquisar");  // Botão de pesquisar
const eraseBtn = document.querySelector("#erase-button"); // Botão de apagar tarefas
const filterBtn = document.querySelector("#filter-select"); // Botão de filtro

let oldInputValue; // Variável para armazenar o valor antigo da tarefa antes da edição

// Funções
const saveTodo = (text, done = 0, save = 1) => {

    const todo = document.createElement("div"); // Cria um elemento div para a tarefa
    todo.classList.add("todo"); // Adiciona a classe "todo" à div

    const todoTitle = document.createElement("h3"); // Cria um elemento h3 para o título da tarefa
    todoTitle.innerText = text; // Define o texto do título como o valor da tarefa
    todo.appendChild(todoTitle); // Adiciona o título à div da tarefa


    const doneBtn = document.createElement("button"); // Cria um botão para marcar a tarefa como concluída
    doneBtn.classList.add("finish-todo"); // Adiciona a classe "finish-todo" ao botão
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn); // Adiciona o botão à div da tarefa

    const editBtn = document.createElement("button"); 
    editBtn.classList.add("edit-todo"); 
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn); 

    const deleteBtn = document.createElement("button"); 
    deleteBtn.classList.add("delete-todo"); 
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    // Utilizando dados da Local Storage
    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({text, done});
    }

    todoList.appendChild(todo); // Adiciona a tarefa à lista de tarefas

    todoInput.value = ""; // Limpa o campo de entrada após adicionar a tarefa
    todoInput.focus(); // Foca novamente no campo de entrada
};

// Função de Editar Tarefa
const toggleForms = () => {
    editForm.classList.toggle("hide"); // Alterna a classe "hide" do formulário de edição
    todoForm.classList.toggle("hide"); // Alterna a classe "hide" do formulário de adição
    todoList.classList.toggle("hide"); // Alterna a classe "hide" da lista de tarefas
}

// Função de Atualizar Tarefa
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo"); // Seleciona todas as tarefas

    todos.forEach((todo) => {
        let todoTile = todo.querySelector("h3");

        if (todoTile.innerText === oldInputValue) {
            todoTile.innerText = text; // Atualiza o texto da tarefa

            updateTodosLocalStorage(oldInputValue, text); // Atualiza o texto da tarefa no Local Storage
        }
    });
}

const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) =>{
        let todoTile = todo.querySelector("h3").innerText.toLowerCase(); // Pega o texto da tarefa em minúsculas

        const normalizedSearch = search.toLowerCase(); // Normaliza o texto da pesquisa para minúsculas

        todo.style.display = "flex"; // Exibe a tarefa por padrão

        if (!todoTile.includes(normalizedSearch)) {
            todo.style.display = "none";

        }
    });
}

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch(filterValue) {
        case "all":
            todos.forEach((todo) => todo.style.display = "flex");
        break;

            case "done":
                todos.forEach((todo) => 
                todo.classList.contains("done") 
                ? (todo.style.display = "flex") 
                : (todo.style.display = "none")
                );
            break;

                case "todo":
                    todos.forEach((todo) => 
                    !todo.classList.contains("done") 
                    ? (todo.style.display = "flex") 
                    : (todo.style.display = "none")
                    );
                break;

    default:
        break;

    }
};

// Eventos
todoForm.addEventListener("submit", (e)=> {
    e.preventDefault(); // Previve que a página seja recarregada

    const inputValue = todoInput.value; // Pega o valor do campo de entrada

    if (inputValue) {
        
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target; // Pega o elemento que foi clicado
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {

        todoTitle = parentEl.querySelector("h3").innerText; // Pega o título da tarefa

    }
    
    if (targetEl.classList.contains("finish-todo")) {

        parentEl.classList.toggle("done"); // Marca a tarefa como concluída

        updateTodosStatusLocalStorage(todoTitle); // Atualiza o status da tarefa no Local Storage
    }

    if (targetEl.classList.contains("delete-todo")) {

        parentEl.remove(); // Remove a tarefa da lista
        deleteTodoLocalStorage(todoTitle);
    }

    if (targetEl.classList.contains("edit-todo")) {

        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle; // Armazena o valor antigo da tarefa antes da edição
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms(); // Cancela a edição e volta para o formulário de adição
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value; // Pega o valor do campo de edição

    if (editInputValue) {

        updateTodo(editInputValue);
    }

    toggleForms();
});

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value; // Pega o valor do campo de pesquisa

    getSearchTodos(search);
});

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup")); // Dispara o evento de pesquisa para limpar a lista
});

filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
});


// Local Storage
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos; // Retorna todos os todos armazenados no Local Storage
};

const saveTodoLocalStorage = (todo) => {

    const todos = getTodosLocalStorage();

    todos.push(todo); // Adiciona o novo todo à lista de todos

    localStorage.setItem("todos", JSON.stringify(todos)); // Salva a lista de todos no Local Storage
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};

const deleteTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo)=> todo.text !== todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodosStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo)=> todo.text === todoText ? (todo.done = !todo.done) : null);

    localStorage.setItem("todos", JSON.stringify(todos));

};

const updateTodosLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo)=> todo.text === todoOldText ? (todo.text = todoNewText) : null);

    localStorage.setItem("todos", JSON.stringify(todos));

};

loadTodos(); // Carrega os todos do Local Storage ao iniciar a página