var app = angular.module("myApp", []);

// Định nghĩa directive stcModal
app.directive('stcModal', function () {
    return {
        restrict: 'E', // E ở đây là Element
        scope: {
            title: '@',      // Chuỗi giá trị, ràng buộc một chiều
            content: '=',    // Biến hai chiều
            mycontent: '='   // Biến hai chiều
        },
        templateUrl: '../modal.html' // Xác định đường dẫn HTML để sử dụng làm template cho directive
    };
});

// Định nghĩa bộ lọc số điện thoại
app.filter('phoneNumberValidator', function () {
    return function (input) {
        // Kiểm tra số điện thoại Việt Nam
        if (/^(0[139785])\d{8}$/.test(input)) {
            // Định dạng số điện thoại có dấu chấm
            return input.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
        } else {  
            return '';
        }
    };
});
// Định nghĩa controller
app.controller('myCtrl', ['$scope', function ($scope, $sce) {
    // Biến để lưu trữ dữ liệu đã nhập từ form
    $scope.submittedData = null;
    // Biến để lưu trữ dữ liệu cho modal thứ hai
    $scope.mycontent = {};
    // Hàm cập nhật thông tin cá nhân
    $scope.updateProfile = function () {
        // Lưu dữ liệu đã nhập từ form vào biến submittedData
        $scope.submittedData = {
            fullName: $scope.fullName,
            phoneNumber: $scope.phoneNumber,
            email: $scope.email,
            birthdate: $scope.birthdate
        };
        // Gán dữ liệu đã nhập vào biến mycontent để hiển thị trong modal thứ hai
        $scope.mycontent = angular.copy($scope.submittedData);
    };
}]);