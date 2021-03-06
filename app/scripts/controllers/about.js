'use strict';

/**
 * @ngdoc function
 * @name astarApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the astarApp
 */
angular.module('astarApp')
    .controller('AboutCtrl', function($scope) {
        // 1 means can go , 0 means can't
        $scope.world = [
            [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
            [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0],
            [1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
            [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
            [1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1],
            [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0],
            [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1],
            [1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
            [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1]
        ];

        $scope.worldL = _.range($scope.world.length - 1);

        $scope.startX = 2;
        $scope.startY = 0;

        $scope.endX = 12;
        $scope.endY = 13;

        var getH = function(posx, posy) {
            return Math.ceil(Math.sqrt(Math.pow($scope.endY - posy,2) + Math.pow($scope.endX - posx, 2)));
        };

        $scope.openList = [{
            x: $scope.startX,
            y: $scope.startY,
            g: 0,
            f: 0 + getH($scope.startX, $scope.startY)
        }];

        $scope.closedList = [];

        while (Object.keys($scope.openList).length > 0) {
            var minF = _.sortBy($scope.openList, 'f')[0];
            _.remove($scope.openList, minF);
            $scope.closedList.push(minF);

            if (minF.x === $scope.endX && minF.y === $scope.endY) {
                break;
            }

            for (var row = minF.x - 1; row <= minF.x + 1; row++) {
                for (var col = minF.y - 1; col <= minF.y + 1; col++) {
                    if (row < 0 || col < 0 || !$scope.world[row] || !$scope.world[row][col] || $scope.world[row][col] === 0) {
                        continue;
                    }
                    if (row !== minF.x && col !== minF.y) {
                        continue;
                    }
                    if (_.find($scope.closedList, {
                            x: row,
                            y: col
                        })) {
                        continue;
                    }
                    var thisNode = _.find($scope.openList, {
                        x: row,
                        y: col
                    });

                    var gFromParent = (row === minF.x) ? 1 : (col === minF.y) ? 1 : 2;
                    var thisG = gFromParent + minF.g;
                    var thisF = thisG + getH(row, col);

                    if (thisNode && thisF < thisNode.f) {
                        thisNode.g = thisG;
                        thisNode.f = thisF;
                        thisNode.parentx = minF.x;
                        thisNode.parenty = minF.y;
                    } else {
                        $scope.openList.push({
                            x: row,
                            y: col,
                            g: thisG,
                            f: thisF,
                            parentx: minF.x,
                            parenty: minF.y
                        });
                    }
                    setTimeout(function(r, c, g, f) {
                        $('#box-' + r + '-' + c).html('(' + r + ',' + c + ')' + g + ', ' + f);
                    }.bind(null, row, col, thisG, thisF), 100);

                }
            }
        }

        var iterateBack = function(parentx, parenty) {
            var node = _.find($scope.closedList, {
                x: parentx,
                y: parenty
            });

            if (!node || (node.x === $scope.startX && node.y === $scope.startY)) {
                return;
            }
            if (!(node.x === $scope.endX && node.y === $scope.endY)) {
                $('#box-' + node.x + '-' + node.y).css({
                    'background': '#9CB8DA'
                });
            }

            iterateBack(node.parentx, node.parenty);
        };

        

        setTimeout(function() {
            var lastNode = _.last($scope.closedList);
            iterateBack(lastNode.x, lastNode.y);
        }, 500);
    });
