'use strict';

/**
 * @ngdoc function
 * @name trainingProjectsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainingProjectsApp
 */
angular.module('schoolSystemApp')
  .controller('teacher_indexCtrl',['$scope','$http','$state','$location',function ($scope,$http,$state,$location) {
		

  }]).directive("rjxStudentlist", function($http) {
  	return {
		restrict: "ECMA",
		link: function($scope, element, attr) {
			
		}
	}	
  })