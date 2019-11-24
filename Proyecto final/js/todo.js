angular.module('todoApp', [])
    .controller('TodoListController', function () {
        var todoList = this;
        todoList.todos = [
            { text: 'learn AngularJS', done: true },
            { text: 'build an AngularJS app', done: false }];

        //todoList.usuarios = [
        //    { nombre: 'AngularJS', apellido: "Gomez", edad:'25' },
        //    { nombre: 'buildapp', apellido: "false", edad:'35' }];
        if (localStorage.getItem("Usuarios")) {
            todoList.usuarios = JSON.parse(localStorage.getItem('Usuarios'));
        }
        else {
            todoList.usuarios = [];
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
            var usuario = { nombre: todoList.NewUserNombre, apellido: todoList.NewUserApellido, edad: todoList.NewUserEdad }
            todoList.usuarios.push(usuario);
            var listString = JSON.stringify(todoList.usuarios);
            localStorage.setItem('Usuarios', listString);
        };


        todoList.delUsuario = function (index) {
            todoList.usuarios.splice(index, 1);
        };

        todoList.indexAEditar = 0;

        todoList.ModificarUsuario = function (usuario, index) {
            todoList.showFormulario = true;
            todoList.soyAlta = false;
            todoList.indexAEditar = index;
            todoList.NewUserNombre = usuario.nombre;
            todoList.NewUserApellido = usuario.apellido;
            todoList.NewUserEdad=usuario.edad;
        };

        todoList.SaveModificarUsuario = function () {

            todoList.usuarios[todoList.indexAEditar].nombre = todoList.NewUserNombre;
            todoList.usuarios[todoList.indexAEditar].apellido = todoList.NewUserApellido;
            todoList.usuarios[todoList.indexAEditar].edad = todoList.NewUserEdad;
        };

        todoList.nuevoUsuario = function () {
            todoList.NewUserNombre = "";
            todoList.NewUserApellido = "";
            todoList.NewUserEdad="";
            todoList.showFormulario = true;
            todoList.soyAlta = true;
        };

    });