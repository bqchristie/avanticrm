(function () {
    'use strict';

    angular
        .module('avanti')
        .factory('crmService', crmService);

    crmService.$inject = ['$http'];

    /* @ngInject */
    function crmService($http) {
        var service = {
            getCustomers: getCustomers,
            addCustomer: addCustomer,
            updateCustomer: updateCustomer,
            deleteCustomer: deleteCustomer,
        };
        return service;

        ////////////////

        function getCustomers() {
            return $http({
                method: 'GET',
                url: '/api/customers '
            });
        }

        function addCustomer(customer) {
            return $http({
                method: 'POST',
                url: '/api/customers ',
                data: customer
            });
        }

        function updateCustomer(customer) {
            return $http({
                method: 'PUT',
                url: '/api/customers ',
                data: customer
            });
        }

        function deleteCustomer(customer) {
            return $http({
                method: 'DELETE',
                url: '/api/customers/' + customer._id,
            });
        }
    }

})();

