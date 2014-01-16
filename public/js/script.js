var mod = angular.module('main', ['ngTable']);
var app = mod.controller('DemoCtrl', function($scope, ngTableParams, $http) {
    $http({method: 'GET', url: '/zend_angularjs-save/public/todo/list'}).
            success(function(data, status, headers, config) {
                $scope.tableParams = new ngTableParams({
                    page: 1, // show first page
                    count: 10           // count per page
                }, {
                    total: data.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
});

mod.controller("newTodoCtrl", function($scope, $http, $location) {
    //$location.absUrl();
    $scope.tache = null;
    $scope.tache_date = null;
    
    var currentLocation = document.location.href;
    var id = currentLocation.substring(currentLocation.lastIndexOf("/")+1, currentLocation.length);
    
    if(id !== "add"){
        $scope.tache = "";
        $scope.tache_date = "";
    }
    
    
    $scope.createTodo = function() {
        var data = {tache: $scope.tache, data_tache: $scope.tache_date};
        $http.post('/zend_angularjs/public/todo/add', data).success(function() {
            alert("todo added");
//            $location.path('/zend_angularjs/public/todo/index');
        });
    };
});

function putObject(path, object, value) {
    var modelPath = path.split(".");

    function fill(object, elements, depth, value) {
        var hasNext = ((depth + 1) < elements.length);
        if (depth < elements.length && hasNext) {
            if (!object.hasOwnProperty(modelPath[depth])) {
                object[modelPath[depth]] = {};
            }
            fill(object[modelPath[depth]], elements, ++depth, value);
        } else {
            object[modelPath[depth]] = value;
        }
    }
    fill(object, modelPath, 0, value);
}
//var directives = angular.module('myApp', []);

mod.directive('datepicker', function() {
    return function(scope, element, attrs) {
        element.datepicker({
            inline: true,
            dateFormat: 'dd.mm.yy',
            onSelect: function(dateText) {
                var modelPath = $(this).attr('ng-model');
                putObject(modelPath, scope, dateText);
                scope.$apply();
            }
        });
    };
});

function myCtrl($scope) {
    $scope.item = "";
    $scope.add = function() {
        $scope.$apply();
        alert($scope.item);
    };
}

mod.controller("editTodoCtrl", function($scope, $http, $location) {
    //$location.absUrl();
    $scope.tache = null;
    $scope.tache_date = null;
    
    var currentLocation = document.location.href;
    var id = currentLocation.substring(currentLocation.lastIndexOf("/") + 1, currentLocation.length);
//    alert(id);
    $http({method: 'GET', url: '/zend_angularjs/public/todo/edit' + currentLocation}).
            success(function(data, status, headers, config) {
                    $scope.tache = ' ';
                    $scope.tache_date = ' ';
    }).error(function(data, status, headers, config) {
    if(id !== "edit"){
        $scope.tache = "";
        $scope.tache_date = "";
    }
});
    
    $scope.editTodo = function() {
        var data = {tache: $scope.tache, data_tache: $scope.tache_date};
        $http.post('/zend_angularjs/public/todo/edit', data).success(function() {
            alert("todo edit");
//            $location.path('/zend_angularjs/public/todo/index');
        }.error(function() {
            alert("Erreur pendant edition");
           }));
    };
});

function putObject(path, object, value) {
    var modelPath = path.split(".");

    function fill(object, elements, depth, value) {
        var hasNext = ((depth + 1) < elements.length);
        if (depth < elements.length && hasNext) {
            if (!object.hasOwnProperty(modelPath[depth])) {
                object[modelPath[depth]] = {};
            }
            fill(object[modelPath[depth]], elements, ++depth, value);
        } else {
            object[modelPath[depth]] = value;
        }
    }
    fill(object, modelPath, 0, value);
}
//var directives = angular.module('myApp', []);

mod.directive('datepicker', function() {
    return function(scope, element, attrs) {
        element.datepicker({
            inline: true,
            dateFormat: 'dd.mm.yy',
            onSelect: function(dateText) {
                var modelPath = $(this).attr('ng-model');
                putObject(modelPath, scope, dateText);
                scope.$apply();
            }
        });
    };
});

function myCtrl($scope) {
    $scope.item = "";
    $scope.add = function() {
        $scope.$apply();
        alert($scope.item);
    };
}


mod.controller("deleteTodoCtrl", function($scope, $http, $location) {
    var currentLocation = document.location.href;
    var id = currentLocation.substring(currentLocation.lastIndexOf("/") + 1, currentLocation.length);
    alert(id);
    $http({method: 'GET', url: '/zend_angularjs/public/todo/edit'  + currentLocation}).
            success(function(data, status, headers, config) {
        $scope.id = id;
    }).error(function(data, status, headers, config) {
    });

    $scope.deleteTodo = function() {
        var data = {id: $scope.id};
        $http.post('/zend_angularjs/public/todo/edit' , data).success(function() {

        }.error(function() {
            alert("Erreur pendant la suppression");
        }));
    };
});