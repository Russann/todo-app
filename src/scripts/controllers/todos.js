angular
.module('TodosController', [
  'dgmTodo.auth',
  'dgmTodo.todos',
])
.controller('TodosController', [
  'auth',
  '$location',
  'todos',
  function(auth, $location, todos) {
    'use strict';

    auth.isLoggedIn().then(function(currentUser) {
      if(!currentUser) {
        $location.url('/login');
      } else {
        self.currentUser = currentUser;
        readTodos();
      }
    });

    function readTodos(){
      todos.read(self.currentUser.id)
      .then(function(todoItems) {
        self.todos = todoItems;
      });
    }
    function resetCreateForm() {
      self.create = {
        name: '',
        description: '',
        tags: '',
      };
    }
    resetCreateForm();

    self.createTodo = function (data) {

      var todo = {
      name: data.name,
      description: data.description || 'No Description',
      tags: (data.tags || '')
      .split(',')
      .map(function (tag) {
        return tag;
      })
      .filter(function(tag) {
        return tag;
    })
      };

      todos.create(self.currentUser,id,todo)
      .then(function() {
        readTodos();
        resetCreateForm();
        console.log('success');

      });

      self.updateTodo = function(todo) {
        var updatedTodo = {
          completed: todo.completed,
          name: todo.name,
          archived: todo.archived,
        };

        todos.update(self.currentUser.id, todo.id, todo)
        .then(function () {
          readTodos();
})
          .catch(function (err) {
            console.log(err);
          });
};
    self.archiveTodo = function(todo) {
      todo.archived = true;
      self.updateTodo(todo);
    };

};
}]);
