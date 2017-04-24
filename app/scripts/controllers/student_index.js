'use strict';

/**
 * @ngdoc function
 * @name trainingProjectsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainingProjectsApp
 */
angular.module('schoolSystemApp')
  .controller('student_indexCtrl',['$scope',function ($scope) {
//		$scope.aa="8765";

  }]).directive("lxmStudent", function($http) {
  	return {
		restrict: "ECMA",
		link: function($scope, element, attr) {
			$(".lxm_student_erro_one").bind('click',function(){
				$('.lxm_student_more').css('display','none')
			})
			$(".lxm_student_erro_two").bind('click',function(){
				$('.lxm_discipline').css('display','none')
			})
			$('.lxm_my_erro').bind('click',function(){
				$('.lxm_discipline').css('display','block')
			})
			$('.lxm_table tr').bind('click',function(){
				$('.lxm_student_more').css('display','block')
			})
			$('.lxm_look_all').bind('click',function(){
				$('.lxm_student_more').css('display','block')
			})
			$(".tcdPageCode").createPage({
		        pageCount:3,
		        current:1,
		        backFn:function(p){
		            console.log(p);
		        }
		    })
		}
	}	
  })
