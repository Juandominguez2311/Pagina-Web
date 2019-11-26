function promedio(nota1,nota2) {
    var num1 = Number.parseInt(nota1);
    var num2 = Number.parseInt(nota2);
    return (num1 + num2) / 2;
}



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
            var usuario = { 
                nombre: todoList.NewUserNombre,
                apellido: todoList.NewUserApellido,
                nota1: todoList.NewUsernota1,
                nota2 :todoList.NewUsernota2,
                promedio: Math.round(promedio(todoList.NewUsernota1,todoList.NewUsernota2))
            }
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
            todoList.NewUsernota1=usuario.nota1;
            todoList.NewUsernota2=usuario.nota2;
        };

        todoList.SaveModificarUsuario = function () {

            todoList.usuarios[todoList.indexAEditar].nombre = todoList.NewUserNombre;
            todoList.usuarios[todoList.indexAEditar].apellido = todoList.NewUserApellido;
            todoList.usuarios[todoList.indexAEditar].edad = todoList.NewUsernota1;
            todoList.usuarios[todoList.indexAEditar].edad = todoList.NewUsernota2;
        };

        todoList.nuevoUsuario = function () {
            todoList.NewUserNombre = "";
            todoList.NewUserApellido = "";
            todoList.NewUsernota1="";
            todoList.NewUsernota2="";
            todoList.showFormulario = true;
            todoList.soyAlta = true;
        };

    });