describe('KanbanController', function () {
    'use strict';
    var controllerFactory,
        $rootScope,
        $scope;

    beforeEach(module('kanban'));
    beforeEach(inject(['$injector', function (injector) {
        controllerFactory = injector.get('$controller');
        $rootScope = injector.get('$rootScope');
        $scope = $rootScope.$new(); 
    }]));

    function newController () {
        return controllerFactory('KanbanController', {
            $scope: $scope
        });
    }

    describe('when the controller is created', function () {
        beforeEach(function () {
            newController();
        });

        it('initializes a to do board', function () {
            expect($scope.todoBoard.name).toBe('To Do');
        });

        it('initializes an in progress board', function () {
            expect($scope.progressBoard.name).toBe('In Progress');
        });

        it('initializes a complete board', function () {
            expect($scope.completeBoard.name).toBe('Complete');
        });

        it('creates a list of all boards', function () {
            expect($scope.allBoards.length).toBe(3);
        });

        describe('addNewTask', function () {
            it('calls add on the to do board', function () {
                spyOn($scope.todoBoard, 'add');
                $scope.newTaskName = 'Unit test this stuff';
                $scope.addNewTask();

                expect($scope.todoBoard.add).toHaveBeenCalledWith({ title: 'Unit test this stuff'});
            });
        });

        describe('totalTasks', function () {
            it('returns the total number of tasks', function () {
                $scope.todoBoard.tasks = [ 1, 2, 3];
                $scope.progressBoard.tasks = [ 1, 2 ];
                $scope.completeBoard.tasks = [ ];

                var result = $scope.totalTasks();

                expect(result).toBe(5);
            });
        });

        describe('percentComplete', function () {
            it('returns the percentage of tasks in the complete board', function () {
                $scope.todoBoard.tasks = [ 1, 2, 3];
                $scope.progressBoard.tasks = [ 1, 2 ];
                $scope.completeBoard.tasks = [ 1, 2, 3];

                var result = $scope.percentComplete();

                expect(result).toBe(37);
            });
        });
    });
});