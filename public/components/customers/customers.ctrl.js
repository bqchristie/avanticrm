(function () {
    'use strict';

    angular
        .module('avanti')
        .controller('CustomersCtrl', CustomersCtrl);

    CustomersCtrl.$inject = ['$scope', '$mdDialog', 'crmService'];


    /* @ngInject */
    function CustomersCtrl($scope, $mdDialog, crmService) {
        var vm = this;
        vm.showCustomerDialog = showCustomerDialog;
        vm.showContactDialog = showContactDialog;
        vm.deleteCustomer = deleteCustomer;
        vm.deleteContact = deleteContact;
        vm.query = "";

        activate();

        ////////////////

        function activate() {
            crmService.getCustomers().then(function (res) {
                vm.customers = res.data;
                vm.customers = _.map(vm.customers, function (customer) {
                    return setActiveContact(customer);
                })

            }).catch(function (err) {
                console.error(err);
            })
        }

        function setActiveContact(customer) {
            if (customer.contacts && customer.contacts.length > 0) {
                customer.selectedContact = customer.contacts[0];
            }
            return customer;
        }

        function deleteCustomer(customer) {
            crmService.deleteCustomer(customer).then(function (data) {
                _.remove(vm.customers, {_id: customer._id});
            }).catch(function (err) {
                console.error(err);
            });
        }

        function deleteContact(customer) {
            _.remove(customer.contacts, {_id: customer.selectedContact._id})
            crmService.updateCustomer(customer).then(function (data) {
            }).catch(function (err) {
                console.log(error);
            })
            customer = setActiveContact(customer);
        }

        function showCustomerDialog(ev) {
            $mdDialog.show({
                controller: CustomerDialogController,
                controllerAs: 'vm',
                templateUrl: 'components/customers/customer.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (customer) {
                vm.customers.push(customer);
                crmService.addCustomer(customer).then(function () {
                    activate();
                }).catch(function (err) {
                    console.log(err);
                })
            })
        }

        $scope.$on('searchTextChange', function (event, data) {
            console.log("Search Text....");
            console.log(data);
            vm.query = data;
        });


        function CustomerDialogController($scope, $mdDialog) {

            var vm = this;
            vm.provinces = ["ON", "AB", "NL", "PQ"];
            vm.customer = {};

            vm.customer = {};

            vm.hide = function () {
                $mdDialog.hide();
            };

            vm.cancel = function () {
                $mdDialog.cancel();
            };

            vm.addCustomer = function () {
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
            }).then(function (contact) {
                console.log(contact);
                customer.contacts.push(contact);
                crmService.updateCustomer(customer).then(function (res) {
                    updateCustomerLocal(res.data, contact);
                }).catch(function (err) {
                    console.log(err);
                })
            })
        }

        function updateCustomerLocal(customer, contact) {
            customer.selectedContact = _.find(customer.contacts, {
                firstName: contact.firstName, lastName: contact.lastName
            });
            var index = _.findIndex(vm.customers, {_id: customer._id});
            vm.customers.splice(index, 1, customer);
        }

        function ContactDialogController($scope, $mdDialog) {

            var vm = this;
            vm.contact = {};

            vm.hide = function () {
                $mdDialog.hide();
            };

            vm.cancel = function () {
                $mdDialog.cancel();
            };

            vm.addContact = function () {
                $mdDialog.hide(vm.contact);
            };
        }
    }


})();


