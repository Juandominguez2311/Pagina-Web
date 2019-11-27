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

       
        if (localStorage.getItem("Usuarios")) {
            todoList.usuarios = JSON.parse(localStorage.getItem('Usuarios'));
        }
        else {
            todoList.usuarios = [];
        }

        if (localStorage.getItem("Estados")) {
            todoList.EstadosIndex = JSON.parse(localStorage.getItem('Estados'));
        }
        else {
            alert('por favor añadir un estado')
        }



        todoList.showFormulario = false;
        todoList.soyAlta = false;
        todoList.showDesaprobados = false;

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
                nota2: todoList.NewUsernota2,
                promedio: Math.round(promedio(todoList.NewUsernota1,todoList.NewUsernota2)),
                estado: todoList.NewEstado
            }
            todoList.usuarios.push(usuario);
            var listString = JSON.stringify(todoList.usuarios);
            localStorage.setItem('Usuarios', listString);
        };


        todoList.delUsuario = function (usuario, index) {
            todoList.usuarios.splice(index, 1);
            localStorage.setItem('Usuarios', JSON.stringify(todoList.usuarios))
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
            todoList.NewEstado=usuario.NewEstado;
        };

        todoList.SaveModificarUsuario = function () {

            todoList.usuarios[todoList.indexAEditar].nombre = todoList.NewUserNombre;
            todoList.usuarios[todoList.indexAEditar].apellido = todoList.NewUserApellido;
            todoList.usuarios[todoList.indexAEditar].edad = todoList.NewUsernota1;
            todoList.usuarios[todoList.indexAEditar].edad = todoList.NewUsernota2;
            todoList.usuarios[todoList.indexAEditar].edad = todoList.NewEstado;
        };

        todoList.nuevoUsuario = function () {
            todoList.NewUserNombre = "";
            todoList.NewUserApellido = "";
            todoList.NewUsernota1="";
            todoList.NewUsernota2="";
            todoList.NewEstado = "";
            todoList.showFormulario = true;
            todoList.soyAlta = true;
            console.log(localStorage.getItem('Estados'));
        };

        todoList.AlumnosDesaprobados = function(){
            if(!todoList.showDesaprobados){
                todoList.showFormulario = false;
                todoList.showDesaprobados = true;
            }else{
                todoList.showFormulario = true;
                todoList.showDesaprobados = false;
            }
            todoList.usuariosDesaprobadosCargados = [];
            todoList.usuarios.forEach(usuarioDesaprobado => {
                if(usuarioDesaprobado.promedio < 5){
                    todoList.usuariosDesaprobadosCargados.push(usuarioDesaprobado);
                }
            })
        }
    });