(function () {
    'use strict';
    var draggedItem,
        onLeave;

    angular.module('kanban').directive('draggable', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    data: '=',
                    onLeave: '='
                },
                link: function ($scope, element) {
                    element.attr('draggable', true);
                    element.on('dragstart', function (ev) {
                        draggedItem = $scope.data;
                        onLeave = $scope.onLeave;
                    });
                }
            };
        }
    ]);

    angular.module('kanban').directive('dropZone', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    onDrop: '='
                },
                link: function ($scope, element) {                    
                    element.on('dragover', function (ev) {
                        ev.preventDefault();
                        return false;
                    });

                    element.on('drop', function (ev) {
                        if (!draggedItem) {
                            return;
                        }
                        
                        if (typeof $scope.onDrop === 'function') {
                            $scope.onDrop(draggedItem);
                        }
                        if (typeof onLeave === 'function') {
                            onLeave(draggedItem);
                        }
                        draggedItem = null;
                        onLeave = null;
                        $scope.$apply();
                    });
                }
            };
        }
    ]);

}());