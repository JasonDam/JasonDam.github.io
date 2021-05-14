function changeTxt() {
    document.getElementById('about').innerHTML = 'Changed';
}
//Test force
var app = angular.module('knowledge', []);
app.controller('infoCtrl', function($scope){
    $scope.firstName = "Jason";
    $scope.lastName = "Dam";
    $scope.display = function(input) {
        if (input == 'first name' || input == 'firstname' || input == 'First name' || input == 'First Name'
        || input == 'Firstname' || input == 'FirstName'){
            return "Jason";
        } else {
            return "Nothing is here";
        }
    }
})