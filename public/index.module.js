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


angular.module('avanti').config(['$routeProvider', function ($routeProvider) {
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
}]);