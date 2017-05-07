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
  	if(sessionStorage.teacherTel){
  		$scope.as=sessionStorage.classes.split(",");
		$scope.huoqu=function(aa){
			console.log("aa"+aa)
			sessionStorage.aa=aa;
		}
		$(".teacherName").html(sessionStorage.teacherName)
		$(".teacherTel").html(sessionStorage.teacherTel);
		$('.clear').bind('click',function(){
			$state.go("login");
			sessionStorage.clear()
		})
  	}else{
  		$state.go("login");
  	}
		

  }])
//.directive("rjxStudentindex", function($http) {
//	return {
//		restrict: "ECMA",
//		link: function(scope, element, attr) {
//				if(!sessionStorage.teacherTel){
////						$state.go("login");
//					alert(1)
//				}
//				
//		}
//	}	
//})