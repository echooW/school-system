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
			$.ajax({
				type:'get',
				url: ''+ip+'search/people',
				async:false,
				data:{
					id:1
				},
				success:function(e){
					console.log(e)
					if(e){
					$('.lxm_msg p:nth-child(1) span').text(e[0].xinming)
					$('.lxm_msg p:nth-child(2) span').text(e[0].sex)
					$('.lxm_msg p:nth-child(3) span').text(e[0].tel)
					$('.lxm_msg p:nth-child(4) span').text(e[0].banji)
					}
				}
			})
			$.ajax({
				type:"get",
				url:''+ip+'page/page',
				data:{
					start:0,
					end:7
				},
				async:false,
				success:function(e){
					console.log(e[0].length)
					var html = '';
					for(var i = 0; i < e[0].length; i++){
//						html += '<tr><td>李小明</td><td>1604a</td><td>男</td><td>13103491829</td><td>619</td></tr>'
					}
//					len = e[1];
//					totalPages = Math.ceil(len/2)
//					$('.yesu').text(len+'条数据')
//					$('.cc').text(Math.ceil(len/2)+'页')
//			//		console.log()
//					var html = ''
//					for(var i = 0; i < e[0].length; i++){
//						html += '<ul class="cat"><li>'+e[0][i].username+'</li><li>'+e[0][i].phone+'</li><li><button class="del" id = '+e[0][i].id+'>删除</button><button class = "bianji" id = '+e[0][i].id+'>修改信息</button></li></ul>'
//					}
//					$('.list').append(html)
				}
			})
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
