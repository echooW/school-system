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

  }])
//.directive("rjxStudentindex", function($http) {
//	return {
//		restrict: "ECMA",
//		link: function(scope, element, attr) {
//			var classes=sessionStorage.classes.split(",");
//			var str='';
//			for(var i=0;i<classes.length;i++){
//				str+='<li><a ui-sref=".student_list">'+classes[i]+'</a></li>';
//			}
//			console.log(str)
//			$(".aa").before(str)
//		}
//	}	
//})