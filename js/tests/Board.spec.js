describe('Board', function () {
    'use strict';
    var Board;
    
    beforeEach(module('kanban'));
    beforeEach(inject(['$injector', function (injector) {
        Board = injector.get('Board');
    }]));

    describe('constructor', function () {
        it('sets the name to the name parameter', function () {
            var board = new Board('Bob');
            expect(board.name).toBe('Bob');
        });

        it('sets the tasks array to the tasks paramer', function () {
            var tasks = [ { title: 'Do some tests'} ];
            var board = new Board(null, tasks);
            expect(board.tasks).toBe(tasks);
        }); 

        describe('when the tasks parameter is missing', function () {
            it('sets the task array to an empty array', function () {
                var board = new Board();
                expect(board.tasks).toEqual([]);
            });
        });
    });

    describe('add', function () {
        it('adds an item to the end of tasks', function () {
            var initialTasks = [
                { title: 5 },
                { title: 6 }
            ];
            var board = new Board('test', initialTasks);
            board.add({ title: 7 });
            expect(board.tasks.length).toBe(3);
            expect(board.tasks[2].title).toBe(7);
        });
    });

    describe('remove', function () {
        it('removes an item from tasks', function () {
            var initialTasks = [
                { title: 5 },
                { title: 6 }
            ];
            var board = new Board('test', initialTasks);
            board.remove(initialTasks[0]);
            expect(board.tasks.length).toBe(1);
            expect(board.tasks[0].title).toBe(6);
        });
    });

    describe('count', function () {
        it('returns the number of tasks', function () {
            var initialTasks = [
                { title: 5 },
                { title: 6 }
            ];
            var board = new Board('test', initialTasks);
            expect(board.count()).toBe(2);
        });
    });

});