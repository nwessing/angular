(function () {
    'use strict';
    angular.module('kanban').factory('Board', [
        function () {
            return function (name, tasks) {
                this.tasks = tasks || [];
                this.name = name;
                
                this.add = function (task) {
                    this.tasks.push(task);
                }.bind(this);
                
                this.remove = function (task) {
                    this.tasks.splice(this.tasks.indexOf(task), 1);
                }.bind(this);

                this.count = function () {
                    return this.tasks.length;
                }.bind(this);
            };
        }
    ]);
}());