'use strict';

angular.module('app.customer')
  .controller('CartDetailController',
    ['$scope', '$rootScope', '$state', 'ngCart',
      function ($scope, $rootScope, $state, ngCart) {
          var parentController = $scope.$parent;
          $scope.ngCart = ngCart;
      }
    ]);


