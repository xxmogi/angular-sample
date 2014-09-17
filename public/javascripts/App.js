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

.controller('CreationController',['$scope',function($scope){
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

  $scope.save =function() {  };

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

.controller('SheetListController' ,[function(){

}])


.controller('SheetController'    ,[function(){}])
