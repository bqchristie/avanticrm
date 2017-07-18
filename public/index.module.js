(function () {
    'use strict';

    angular
        .module('avanti', [
            'ngAnimate',
            'ngAria',
            'ngMaterial',
            'ngMessages',
            'ngRoute'
        ]);

})();


angular.module('avanti').config(['$routeProvider', '$locationProvider',function ($routeProvider, $locationProvider) {
    $routeProvider
    // Home
        .when("/",
            {
                templateUrl: "components/customers/customers.html",
                controller: "CustomersCtrl",
                controllerAs: "vm"
            }
        )
        .when("/customers",
            {
                templateUrl: "components/customers/customers.html",
                controller: "CustomersCtrl",
                controllerAs: "vm"
            }
        )

    $locationProvider.html5Mode(true);
}]);