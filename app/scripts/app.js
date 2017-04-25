'use strict';

/**
 * @ngdoc overview
 * @name trainingProjectsApp
 * @description
 * # trainingProjectsApp
 *
 * Main module of the application.
 */
angular

  .module('schoolSystemApp', ['ui.router'
  ])
 .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  		 	$stateProvider.state("login",{
  		 		url:"/login",
				templateUrl:"views/login.html"
			})
			
			$stateProvider.state("teacher_index",{
					url:"/teacher_index",
					templateUrl:"views/teacher_index.html"
			})
			$stateProvider.state("student_index",{
					url:"/student_index",
					templateUrl:"views/student_index.html"
			})
		
			$stateProvider.state("teacher_index.student_list",{
					url:"/student_list",
					views:{
						content:{
							templateUrl:"views/student_list.html"
						}
					}
			})
			
			$urlRouterProvider.when("", "/login");
			
  }])