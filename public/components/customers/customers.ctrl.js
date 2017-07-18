(function () {
    'use strict';

    angular
        .module('avanti')
        .controller('CustomersCtrl', CustomersCtrl);

    CustomersCtrl.$inject = ['$scope', '$mdDialog','crmService'];



    /* @ngInject */
    function CustomersCtrl($scope, $mdDialog, crmService) {
        var vm = this;
        vm.showCustomerDialog = showCustomerDialog;
        vm.showContactDialog = showContactDialog;
        vm.deleteCustomer = deleteCustomer;

        vm.contacts = [
            {name:'Bob Bannerman', phone:'416-417-0178'},
            {name:'Bob Bannerman', phone:'416-417-0178'}
        ]

        activate();

        ////////////////

        function activate() {
            crmService.getCustomers().then(function(res){
                vm.customers = res.data;
            }).catch(function(err){
                console.error(err);
            })
        }

        function deleteCustomer(customer){
            crmService.deleteCustomer(customer).then(function(data){
                vm.customers = _.remove(vm.customers,{_id:customer._id});
            }).catch(function(err){
                console.error(err);
            });
        }

        function showCustomerDialog(ev) {
            $mdDialog.show({
                controller: CustomerDialogController,
                controllerAs: 'vm',
                templateUrl: 'components/customers/customer.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function(customer){
                console.log(customer);
                vm.customers.push(customer);
                crmService.addCustomer(customer).then(function(){
                    activate();
                }).catch(function(err){
                    console.log(err);
                })
            })
        }

        function CustomerDialogController($scope, $mdDialog) {

            console.log("in the customer dialog controller");
            var vm = this;
            vm.provinces = ["ON","AB","NL","PQ"];
            vm.customer = {};

            vm.customer = {};

            vm.hide = function() {
                $mdDialog.hide();
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };

            vm.addCustomer = function() {
                $mdDialog.hide(vm.customer);
            };
        }

        function showContactDialog(ev, customer) {
            $mdDialog.show({
                controller: ContactDialogController,
                controllerAs: 'vm',
                templateUrl: 'components/customers/contact.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function(contact){
                console.log(contact);
                customer.contacts.push(contact);
                crmService.updateCustomer(customer).then(function(){
                    activate();
                }).catch(function(err){
                    console.log(err);
                })
            })
        }

        function ContactDialogController($scope, $mdDialog) {

            console.log("in the customer dialog controller");
            var vm = this;
            vm.contact = {};

            vm.hide = function() {
                $mdDialog.hide();
            };

            vm.cancel = function() {
                $mdDialog.cancel();
            };

            vm.addContact = function() {
                $mdDialog.hide(vm.contact);
            };
        }
    }





})();


