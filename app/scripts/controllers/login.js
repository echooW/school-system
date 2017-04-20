'use strict';

/**
 * @ngdoc function
 * @name trainingProjectsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainingProjectsApp
 */
angular.module('schoolSystemApp').controller('loginCtrl',['$scope','$http','$state','$location',function ($scope,$http,$state,$location) {
		$scope.go=function(){
			$location.url("/student_index");
		}

  }])
