'use strict';

/**
 * @ngdoc function
 * @name trainingProjectsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainingProjectsApp
 */
angular.module('schoolSystemApp')
  .controller('student_indexCtrl',['$scope','$state',function ($scope) {
//		$scope.aa="8765";

  }]).directive("lxmStudent", function($http,$state) {
  	return {
		restrict: "ECMA",
		link: function($scope, element, attr) {
			var len;
			var my_num = 0;
//			$('.lxm_student_more').addClass('lxm_important_a')
			
			if(!sessionStorage.id){
				$state.go("login");
			}
			
			//扣分
//			$.ajax({
//				type:'get',
//				url: ''+ip+'school/break',
//				async:false,
//				data:{
//					uname:sessionStorage.name
//				},
//				success:function(e){
////					console.log(e)
//					for(var i = 0; i < e.length; i++){
//						my_num += Number(e[i].fenshu) 
//					}
//					console.log(my_num)
//				}
//			})
			
			//获取当前登录人信息
			$.ajax({
				type:'get',
				url: ''+ip+'search/people',
				async:false,
				data:{
					id:sessionStorage.id
				},
				success:function(e){
//					var aa = 0		
					console.log(e)
					if(e){
						$('.lxm_msg p:nth-child(1) span').text(e[0].xinming)
						$('.lxm_msg p:nth-child(2) span').text(e[0].sex)
						$('.lxm_msg p:nth-child(3) span').text(e[0].tel)
						$('.lxm_msg p:nth-child(4) span').text(e[0].banji)
						
						//首次提示守则
						
						if(e[0].state == 0){
//							alert(1)
							$('.lxm_student_rule').css('display','block')  
							$.ajax({
								type:'post',
								url: ''+ip+'search/state',
								async:false,
								data:{
									id:sessionStorage.id
								},
								success:function(e){
									
								}
							})
						}else if(e[0].state == 1){
//							alert(2)
							$('.lxm_student_rule').css('display','none')
						}
					}
				}
			})
			
			
			
			$.ajax({
				type:"get",
				url:''+ip+'page/pageclass',
				data:{
					start:0,
					end:7,
					banji:sessionStorage.class
				},
				async:false,
				success:function(e){
					console.log(e)
//					console.log(e[0][0].xinming)
//					console.log(e[0].length)
					len = e[1];
					var html = '';
					for(var i = 0; i < e[0].length; i++){
						html += '<tr class = "lxm_row" name = '+e[0][i].xinming+' need = '+e[0][i].id+'><td>'+e[0][i].xinming+'</td><td>'+e[0][i].banji+'</td><td>'+e[0][i].sex+'</td><td>'+e[0][i].tel+'</td><td>'+e[0][i].qinshi+'</td></tr>'
					}
					$('.lxm_tbody').append(html)
				}
			})
			$(".lxm_student_erro_two").bind('click',function(){
				$('.lxm_discipline').css('display','none')
//				$('.lxm_my_erro').removeAttr("need_erro")
			})
			$(".lxm_student_erro_one").bind('click',function(){
				my_num = 0;
				$('.lxm_student_more').css('display','none')
			})
			$(".lxm_student_erro_two").bind('click',function(){
				$('.lxm_student_rule').css('display','none')
			})
			$(".lxm_student_rule_btn").bind('click',function(){
				$('.lxm_student_rule').css('display','block')
			})
			
			$('.lxm_look_all').bind('click',function(){
				$('.lxm_student_more').css('display','block')
				$.ajax({
					type:'get',
					url: ''+ip+'search/people',
					async:false,
					data:{
						id:sessionStorage.id
					},
					success:function(e){
						$.ajax({
							type:'get',
							url: ''+ip+'school/break',
							async:false,
							data:{
								uname:sessionStorage.name
							},
							success:function(e){
			//					console.log(e)
								for(var i = 0; i < e.length; i++){
									my_num += Number(e[i].fenshu) 
								}
								console.log(my_num)
								$('.my_achievement').text(100-my_num) //综合分数
//								console.log(100-my_num)
							}
						})
//						console.log(e)
						if(e){

							$(".lxm_my_erro").attr('need_erro',e[0].xinming)
							
							$('.lxm_more_mes ul:nth-child(1) li:nth-child(1) span').text(e[0].xinming) //姓名
							$('.lxm_more_mes ul:nth-child(1) li:nth-child(2) span').text(e[0].sex) //性别
							$('.lxm_more_mes ul:nth-child(1) li:nth-child(3) span').text(e[0].qinshi) //宿舍号
							$('.lxm_more_mes ul:nth-child(2) li:nth-child(2) span').text(e[0].tel) //本人手机号
				
							$('.lxm_more_mes ul:nth-child(1) li:nth-child(4) span').text(e[0].year) //出生年月
							$('.lxm_more_mes ul:nth-child(2) li:nth-child(1) span').text(e[0].parents) //父母
							$('.lxm_more_mes ul:nth-child(2) li:nth-child(3) span').text(e[0].parenttel) //父母手机号
							$('.lxm_more_mes ul:nth-child(3) li:nth-child(1) span').text(e[0].bzrname) //班主任
							$('.lxm_more_mes ul:nth-child(3) li:nth-child(2) span').text(e[0].teachname) //授课老师
							$('.lxm_more_mes ul:nth-child(3) li:nth-child(3) span').text(e[0].bzrtel) //班主任电话
							$('.lxm_map span').text(e[0].address) //家庭地址
							$('.lxm_more_mes ul:nth-child(5) li:nth-child(1) span').text(e[0].stage) //实训阶段
						}
					}	
				})
			})
			
			
			$('.lxm_my_erro').bind('click',function(){
				$('.lxm_discipline').css('display','block')
				var my_need = $(this).attr("need_erro")
//				console.log(my_need)
				console.log(my_need)
				$.ajax({
					type:'get',
					url: ''+ip+'school/break',
					async:false,
					data:{
						uname:my_need
					},
					success:function(e){
						console.log(e)
//						console.log(e[0].why)
						$('.lxm_erro_tbody').children().remove()
						var html = ''
						if(e){
							for(var i = 0; i < e.length; i++){
								html += '<tr><td>'+e[i].time.split('T')[0]+'</td><td>'+e[i].fenshu+'分</td><td>'+e[i].why+'</td></tr>'
							}
							$('.lxm_erro_tbody').append(html)
						}
					}
				})	
			})
			
			$("body").delegate('.lxm_table tr','click',function(){
				
				var my_need_name = $(this).children('td:nth-child(1)').text();
				
				$('.lxm_student_more').css('display','block')
//				console.log()
				$('.lxm_more_mes ul:nth-child(1) li:nth-child(1) span').text($(this).children('td:nth-child(1)').text()) //姓名
				$('.lxm_more_mes ul:nth-child(1) li:nth-child(2) span').text($(this).children('td:nth-child(3)').text()) //性别
				$('.lxm_more_mes ul:nth-child(1) li:nth-child(3) span').text($(this).children('td:nth-child(5)').text()) //宿舍号
				$('.lxm_more_mes ul:nth-child(2) li:nth-child(2) span').text($(this).children('td:nth-child(4)').text()) //本人手机号
//				$('.lxm_more_mes ul:nth-child(1) li:nth-child(4) span').text($(this).children('td:nth-child(3)').text())
				var need = $(this).attr("need")
				$(".lxm_my_erro").attr('need_erro',$(this).attr("name"))
				$.ajax({
					type:'get',
					url: ''+ip+'search/people',
					async:false,
					data:{
						id:need
					},
					success:function(e){
//						console.log(e)
						if(e){
							$('.lxm_more_mes ul:nth-child(1) li:nth-child(4) span').text(e[0].year) //出生年月
							$('.lxm_more_mes ul:nth-child(2) li:nth-child(1) span').text(e[0].parents) //父母
							$('.lxm_more_mes ul:nth-child(2) li:nth-child(3) span').text(e[0].parenttel) //父母手机号
							$('.lxm_more_mes ul:nth-child(3) li:nth-child(1) span').text(e[0].bzrname) //班主任
							$('.lxm_more_mes ul:nth-child(3) li:nth-child(2) span').text(e[0].teachname) //授课老师
							$('.lxm_more_mes ul:nth-child(3) li:nth-child(3) span').text(e[0].bzrtel) //班主任电话
							$('.lxm_map span').text(e[0].address) //家庭地址
							$('.lxm_more_mes ul:nth-child(5) li:nth-child(1) span').text(e[0].stage) //实训阶段

						}
					}	
				})
				$.ajax({
					type:'get',
					url: ''+ip+'school/break',
					async:false,
					data:{
						uname:my_need_name
					},
					success:function(e){
	//					console.log(e)
						for(var i = 0; i < e.length; i++){
							my_num += Number(e[i].fenshu) 
						}
						$('.my_achievement').text(100-my_num) //综合分数
//						console.log(my_num)
					}
				})
//				console.log()
//				alert(1)
			})
			
			
			$(".tcdPageCode").createPage({
		        pageCount:Math.ceil(len/7),
		        current:1,
		        backFn:function(p){
		            console.log(p);
		            $.ajax({
						type:"get",
						url:''+ip+'page/page',
						data:{
							start:p*7-7,
							end:7
						},
						async:false,
						success:function(e){
							$('.lxm_tbody').children().empty()
							len = e[1];
							var html = '';
							for(var i = 0; i < e[0].length; i++){
								html += '<tr name = '+e[0][i].xinming+' need = '+e[0][i].id+'><td>'+e[0][i].xinming+'</td><td>'+e[0][i].banji+'</td><td>'+e[0][i].sex+'</td><td>'+e[0][i].tel+'</td><td>'+e[0][i].qinshi+'</td></tr>'
							}
							$('.lxm_tbody').append(html)
//							$("body").delegate('.lxm_row','click',function(){
//								$('.lxm_student_more').css('display','block')
//							})
//							$(".lxm_student_erro_one").bind('click',function(){
//								$('.lxm_student_more').css('display','none')
//							})
						}
					})
		        }
		    })
			
			//修改密码
			
			$('.lxm_success').bind('click',function(){
//				alert(1)
				if($('.lxm_old').val() == ''){
					layer.msg('请输入旧密码');
				}else if($('.lxm_new').val() == ''){
					layer.msg('请输入新密码')
				}else if($('.lxm_old').val() != sessionStorage.pass){
					layer.msg('旧密码与当前登录密码不一致')
				}else{
		            $.ajax({
						type:"post",
						url:''+ip+'edit/uppwd',
						data:{
							id:sessionStorage.id,
							pwd:MD5($('.lxm_new').val())
						},
						async:false,
						success:function(e){
							console.log(e)
							sessionStorage.pass = $('.lxm_new').val();
							if(e.flag == 1){
								layer.msg('修改成功,三秒后请重新登录')
								setTimeout(function(){
									$state.go("login");
								},2300)
							}else{
								layer.msg('修改失败,请重试')
							}
						}
					})	
				}
			})
			
			$('.lxm_pass_mes').bind('click',function(){
				$('.lxm_modify_password_wrapper').css('display','block')
			})
			
			$('.lxm_student_erro_three').bind('click',function(){
				$('.lxm_modify_password_wrapper').css('display','none')
			})
			
			//退出登录
			$('.lxm_not_login').bind('click',function(){
				$state.go("login");
				sessionStorage.clear()
			})
			
		}
	}	
  })
