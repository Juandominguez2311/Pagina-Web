angular.module('todoApp', [])
    .controller('TodoListEstados', function () {
        var todoEstados = this;
        todoEstados.todos = [
            { text: 'learn AngularJS', done: true },
            { text: 'build an AngularJS app', done: false }];

        
        if (localStorage.getItem("Estados")) {
            todoEstados.estados = JSON.parse(localStorage.getItem('Estados'));
        }
        else {
            todoEstados.estados = [];
        }

        todoEstados.showFormulario = false;
        todoEstados.soyAlta = false;

        todoEstados.addTodo = function () {
            todoEstados.todos.push({ text: todoEstados.todoText, done: false });
            todoEstados.todoText = '';
        };

        todoEstados.remaining = function () {
            var count = 0;
            angular.forEach(todoEstados.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };



        todoEstados.addEstado = function () {
            var estado = { estado: todoEstados.NewUserNombre, IdEstado: todoEstados.NewUserIdEstado}
            todoEstados.estados.push(estado);
            var listString = JSON.stringify(todoEstados.estados);
            localStorage.setItem('Estados', listString);
        };


        todoEstados.delEstado = function (index) {
            todoEstados.estados.splice(index, 1);
            localStorage.setItem('Estados', JSON.stringify(todoEstados.estados))
        };

        todoEstados.indexAEditar = 0;

        todoEstados.ModificarEstado = function (estado, index) {
            todoEstados.showFormulario = true;
            todoEstados.soyAlta = false;
            todoEstados.indexAEditar = index;
            todoEstados.NewUserNombre = estado.nombre;
            todoEstados.NewUserIdEstado = estado.IdEstado;

            
        };

        todoEstados.SaveModificarEstado = function () {

            todoEstados.estados[todoEstados.indexAEditar].nombre = todoEstados.NewUserNombre;
            todoEstados.estados[todoEstados.indexAEditar].IdEstado = todoEstados.NewUserIdEstado;
            
        };

        todoEstados.nuevoEstado = function () {
            todoEstados.NewUserNombre = "";
            todoEstados.NewUserIdEstado = "";
            todoEstados.showFormulario = true;
            todoEstados.soyAlta = true;
        };

    });