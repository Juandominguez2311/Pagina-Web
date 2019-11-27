angular.module('todoApp', [])
    .controller('TodoListController', function () {
        var todoList = this;
        todoList.todos = [
            { text: 'learn AngularJS', done: true },
            { text: 'build an AngularJS app', done: false }];

        
        if (localStorage.getItem("Estados")) {
            todoList.estados = JSON.parse(localStorage.getItem('Estados'));
        }
        else {
            todoList.estados = [];
        }

        todoList.showFormulario = false;
        todoList.soyAlta = false;

        todoList.addTodo = function () {
            todoList.todos.push({ text: todoList.todoText, done: false });
            todoList.todoText = '';
        };

        todoList.remaining = function () {
            var count = 0;
            angular.forEach(todoList.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };



        todoList.addUsuario = function () {
            var estado = { nombre: todoList.NewUserNombre, IdEstado: todoList.NewUserIdEstado}
            todoList.estados.push(estado);
            var listString = JSON.stringify(todoList.estados);
            localStorage.setItem('Estados', listString);
        };


        todoList.delUsuario = function (index) {
            todoList.estados.splice(index, 1);
        };

        todoList.indexAEditar = 0;

        todoList.ModificarUsuario = function (estado, index) {
            todoList.showFormulario = true;
            todoList.soyAlta = false;
            todoList.indexAEditar = index;
            todoList.NewUserNombre = estado.nombre;
            todoList.NewUserIdEstado = estado.IdEstado;

            
        };

        todoList.SaveModificarUsuario = function () {

            todoList.estados[todoList.indexAEditar].nombre = todoList.NewUserNombre;
            todoList.estados[todoList.indexAEditar].IdEstado = todoList.NewUserIdEstado;
            
        };

        todoList.nuevoUsuario = function () {
            todoList.NewUserNombre = "";
            todoList.NewUserIdEstado = "";
            todoList.showFormulario = true;
            todoList.soyAlta = true;
        };

    });