angular.module('App', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'template/index-tmpl.html',
    controller : 'SheetListController'
  })
  .when('/new', {
    templateUrl: 'template/new-tmpl.html',
    controller : 'CreationController'
  })
  .when('/sheet/:id', {
    templateUrl: 'template/sheet-tmpl.html',
    controller : 'SheetController'
  })
  .otherwise({
    redirectTo: '/'
  });
}])

.service('sheets', [function () {
  this.list = [];

  this.add = function (lines) {
    this.list.push({
      id: String(this.list.length + 1),
      createdAt: Date.now(),
      lines: lines
    });
  };

  this.get = function (id) {
    var list = this.list;
    var index = list.length;
    var sheet;

    while (index--) {
      sheet = list[index];
      if (sheet.id === id) {
        return sheet;
      }
    }
    return null;
  };
}])

.controller('CreationController',['$scope','$location', 'sheets',
function CreationController($scope,$location, sheets){

  function createOrderLine() {
    return {
      productName: '',
      unitPrice: 0,
      count: 0
    };
  };

  $scope.lines = [createOrderLine()];

  $scope.addLine = function() {
    $scope.lines.push(createOrderLine());
  };

  $scope.initialize = function() {
    $scope.lines = [createOrderLine()];
  };

  $scope.getTotalAmount = function(lines) {
    var totalAmount = 0;

    angular.forEach(lines, function (orderLine) {
      totalAmount += $scope.getSubTotal(orderLine);
    });

    return totalAmount;
  };

  $scope.save =function() {
    sheets.add($scope.lines);
    $location.path('/');
  };

  $scope.removeLine = function(target) {
    var lines = $scope.lines;
    var index = lines.indexOf(target);

    if (index !==  -1) {
      lines.splice(index, 1);
    }
  };

  $scope.getSubTotal = function(orderLine) {
    return orderLine.unitPrice * orderLine.count;
  };
}])

.controller('SheetListController' ,['$scope','sheets',
function SheetListController($scope, sheets) {
  $scope.list = sheets.list;
}])


.controller('SheetController'    ,['$scope', '$routeParams', 'sheets',
function SheetController($scope, $params, sheets){
  angular.extend($scope, sheets.get($params.id));

  $scope.getSubtotal = function (orderLine) {
    return orderLine.unitPrice * orderLine.count;
  };

  $scope.getTotalAmount = function (lines) {
    var totalAmount = 0;

    angular.forEach(lines, function (orderLine) {
      totalAmount += $scope.getSubtotal(orderLine);
    });

    return totalAmount;
  };
}])
