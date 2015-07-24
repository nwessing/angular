(function () {
    'use strict';
    angular.module('kanban').controller('KanbanController', [
        '$scope', 'Board',
        function ($scope, Board) {
            $scope.newTaskName = '';
            
            $scope.addNewTask = function () {
                $scope.todoBoard.add({ title: $scope.newTaskName });
                $scope.newTaskName = '';
            };

            $scope.totalTasks = function () {
                return $scope.allBoards.reduce(function (sum, board) {
                    return sum + board.count();
                }, 0); 
            };

            $scope.percentComplete = function () {
                if ($scope.totalTasks < 1) {
                    return 0;
                }
                return Math.floor($scope.completeBoard.count() / $scope.totalTasks() * 100);
            };

            $scope.todoBoard = new Board('To Do', [
                { title: "Allow the user to create new tasks." },
                { title: "Show number of tasks on each board next to board title." },
                { title: "Add a trash can drop area where tasks can be discarded." },
                { title: "Add a progress bar showing how many tasks are complete over total tasks." }
            ]);
            $scope.progressBoard = new Board('In Progress');
            $scope.completeBoard = new Board('Complete', [
                { title: 'Learn about Angular'}
            ]);
            $scope.allBoards = [
                $scope.todoBoard,
                $scope.progressBoard,
                $scope.completeBoard
            ];
        }
    ]);

}());