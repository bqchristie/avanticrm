(function () {
    'use strict';

    angular
        .module('avanti')
        .controller('LayoutCtrl', LayoutCtrl);

    LayoutCtrl.$inject = ['$scope','$timeout'];

    /* @ngInject */
    function LayoutCtrl($scope, $timeout) {
        var vm = this;
        vm.title = 'LayoutCtrl';

        ////////////////

        function activate() {
        }

        $scope.$watch('vm.searchText', function (newValue, oldValue) {
            if(newValue) {
                $scope.$broadcast('searchTextChange', newValue);
            }
        });

    }

})();

