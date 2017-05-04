'use strict';

/**
 * @ngdoc function
 * @name trainingProjectsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainingProjectsApp
 */
angular.module('schoolSystemApp')
	.controller('student_listCtrl', ['$scope', function($scope) {
		//		$scope.aa="8765";

	}]).directive("rjxStudentlist", function($http) {
		return {
			restrict: "ECMA",
			templateUrl:"views/student_template.html",
			
			link: function($scope, element, attr) {
				var rjx_num = 0;
				var rjx_leng = 0;
				var rjx_length = 0;
				var rjx_ye = 1;
				var rjx_leng2 = 0;
				var rjx_length2 = 0;
				var num = 0;
				$.ajax({
					type:"get",
					url:"http://192.168.43.204:8888/page/pageclass",
					async:true,
					beforeSend:function(){
						num++
						console.log("num:"+num)
					},
					data:{
						banji:sessionStorage.aa,
						start:0,
						end:7
					},
					success:function(e){
						$(".rjx_student_main_content").empty()
						console.log(e)
						rjx_leng = e[1]
						var html='';
						for(var i = 0;i<e[0].length;i++){
							html+="<tr><td class='user'>"+e[0][i].xinming+"</td><td>"+e[0][i].banji+"</td><td>"+e[0][i].sex+"</td><td>"+e[0][i].tel+"</td><td><button class="+e[0][i].id+">编辑</button><button class='rjx_del' index="+e[0][i].id+">删除</button></td></tr>"
						}
						$(".rjx_student_main_content").append(html)
						rjx_length = Math.ceil(rjx_leng/7)
						$(".rjx_fenye_main div span:nth-child(2)").html(rjx_length)
					}
				});
				//上一页点击事件
				$(".rjx_top").attr("disabled", "disabled")
				$(".rjx_top").click(function() {
						$(".rjx_bottom").removeAttr('disabled')
						rjx_ye--;
						if(rjx_ye == 1) {
							$(".rjx_top").attr("disabled", true)
						}
						rjx_num -= 7;
						if(rjx_num < 0) {
							rjx_num = 0
						}
						$(".rjx_fenye_main div span:nth-child(1)").html(rjx_ye)
						$.ajax({
							type:"get",
							url:"http://192.168.43.204:8888/page/pageclass",
							async:true,
							data:{
								banji:sessionStorage.aa,
								start:rjx_num,
								end:7
							},
							success:function(e){
								$(".rjx_student_main_content").html('')
								var html='';
							for(var i = 0;i<e[0].length;i++){
								html+="<tr><td class='user'>"+e[0][i].xinming+"</td><td>"+e[0][i].banji+"</td><td>"+e[0][i].sex+"</td><td>"+e[0][i].tel+"</td><td><button>编辑</button><button class='rjx_del' index="+e[0][i].id+">删除</button></td></tr>"
							}
							$(".rjx_student_main_content").append(html)
							}
						});
					})
					//下一页点击事件
				$(".rjx_bottom").click(function() {
					if(rjx_ye==rjx_length){
						$(".rjx_bottom").attr('disabled','disabled')
					}else{
						$(".rjx_top").removeAttr('disabled')
						rjx_ye++;
					}
					$(".rjx_fenye_main div span:nth-child(1)").html(rjx_ye)
					rjx_num += 7;
					if(rjx_num > rjx_leng) {
						rjx_num = rjx_leng - (rjx_leng % 7)
					} else if(rjx_num == rjx_leng) {
						rjx_num = rjx_leng
					}
					$.ajax({
						type:"get",
						url:"http://192.168.43.204:8888/page/pageclass",
						async:true,
						data:{
							banji:sessionStorage.aa,
							start:rjx_num,
							end:7
						},
						success:function(e){
							$(".rjx_student_main_content").html('')
							var html='';
						for(var i = 0;i<e[0].length;i++){
							html+="<tr><td class='user'>"+e[0][i].xinming+"</td><td>"+e[0][i].banji+"</td><td>"+e[0][i].sex+"</td><td>"+e[0][i].tel+"</td><td><button>编辑</button><button class='rjx_del' index="+e[0][i].id+">删除</button></td></tr>"
						}
						$(".rjx_student_main_content").append(html)
						}
					});
				})
				$(".rjx_student_erro_one").bind('click', function() {
					$('.rjx_student_more').css('display', 'none')
				})
				$(".rjx_student_elit_one").bind("click", function() {
					$('.rjx_student_more_elit').css('display', 'none')
				})
				$(".rjx_student_erro_two").bind('click', function() {
					$('.rjx_discipline').css('display', 'none')
				})
				//编辑里的违纪
				$(".rjx_elit_my_erro").bind('click',function(){
					$(".neirong").html("")
						$('.rjx_discipline').css('display', 'block')
						var username = $(this).parents().children(1).children(1).children("input").val()
						$.ajax({
							type: "get",
							url: '' + ip + 'school/break',
							async: true,
							data: {
								"uname": username
							},
							success: function(e) {
								var html1 = '';
								for(var i = 0; i < e.length; i++) {
									var date = e[i].time;
									date = date.substring(0, 10);
									html1 += "<tr><td>" + date + "</td><td>" + e[i].fenshu + "</td><td>" + e[i].why + "</td></tr>"
								}
								$(".neirong").append(html1)
									//
							}
						});
				})
					//违纪详情
				$('.rjx_my_erro').bind('click', function() {
						$(".neirong").html("")
						$('.rjx_discipline').css('display', 'block')
						var username = $(this).parents().children(1).children(1).children("span").html()
						$.ajax({
							type: "get",
							url: '' + ip + 'school/break',
							async: true,
							data: {
								"uname": username
							},
							success: function(e) {
								var html1 = '';
								for(var i = 0; i < e.length; i++) {
									var date = e[i].time;
									date = date.substring(0, 10);
									html1 += "<tr><td>" + date + "</td><td>" + e[i].fenshu + "</td><td>" + e[i].why + "</td></tr>"
								}
								$(".neirong").append(html1)
									//
							}
						});
				})
				//编辑信息
				$("body").delegate(".rjx_student_main tr td:nth-child(5) button:nth-child(1)", "click", function() {
					$('.rjx_student_more_elit').css('display', 'block')
					var id = this.className
					console.log(id)
					$.ajax({
						type: "get",
						url: '' + ip + 'edit/findid',
						async: true,
						data: {
							'id': id
						},
						success: function(e) {
							console.log(e)
							$(".rjx_more_elit_mes ul:nth-child(1) li:nth-child(1) input").val(e[0].xinming)
							$(".rjx_more_elit_mes ul:nth-child(1) li:nth-child(2) input").val(e[0].sex)
							$(".rjx_more_elit_mes ul:nth-child(1) li:nth-child(3) input").val(e[0].qinshi)
							$(".rjx_more_elit_mes ul:nth-child(1) li:nth-child(4) input").val(e[0].year)
							$(".rjx_more_elit_mes ul:nth-child(2) li:nth-child(1) input").val(e[0].parents)
							$(".rjx_more_elit_mes ul:nth-child(2) li:nth-child(2) input").val(e[0].tel)
							$(".rjx_more_elit_mes ul:nth-child(2) li:nth-child(3) input").val(e[0].parenttel)
							$(".rjx_more_elit_mes ul:nth-child(3) li:nth-child(1) input").val(e[0].bzrname)
							$(".rjx_more_elit_mes ul:nth-child(3) li:nth-child(2) input").val(e[0].teachname)
							$(".rjx_more_elit_mes ul:nth-child(3) li:nth-child(3) input").val(e[0].bzrtel)
							$(".rjx_more_elit_mes p input").val(e[0].address)
							$(".rjx_more_elit_mes ul:nth-child(5) li:nth-child(1) input").val(e[0].stage)
							$(".rjx_more_elit_mes ul:nth-child(5) li:nth-child(2) input").val(Number(e[0].oneweek) + Number(e[0].twoweek) + Number(e[0].threeweek) + Number(e[0].fourweek))
							$(".rjx_a_detailed ul:nth-child(2) li:nth-child(1) input").val(e[0].oneweek)
							$(".rjx_a_detailed ul:nth-child(2) li:nth-child(2) input").val(e[0].twoweek)
							$(".rjx_a_detailed ul:nth-child(2) li:nth-child(3) input").val(e[0].threeweek)
							$(".rjx_a_detailed ul:nth-child(2) li:nth-child(4) input").val(e[0].fourweek)
								//确认修改
							$(".querenxiugai").click(function() {
								$.ajax({
									type: "post",
									url: '' + ip + 'edit/edit',
									async: true,
									data: {
										"id": id,
										"username": e[0].username,
										"banji": e[0].banji,
										"xingming": $(".rjx_more_elit_mes ul:nth-child(1) li:nth-child(1) input").val(),
										"tel": $(".rjx_more_elit_mes ul:nth-child(2) li:nth-child(2) input").val(),
										"qinshi": $(".rjx_more_elit_mes ul:nth-child(1) li:nth-child(3) input").val(),
										"sex": $(".rjx_more_elit_mes ul:nth-child(1) li:nth-child(2) input").val(),
										"year": $(".rjx_more_elit_mes ul:nth-child(1) li:nth-child(4) input").val(),
										"parents": $(".rjx_more_elit_mes ul:nth-child(2) li:nth-child(1) input").val(),
										"parenttel": $(".rjx_more_elit_mes ul:nth-child(2) li:nth-child(3) input").val(),
										"bzrname": $(".rjx_more_elit_mes ul:nth-child(3) li:nth-child(1) input").val(),
										"teachname": $(".rjx_more_elit_mes ul:nth-child(3) li:nth-child(2) input").val(),
										"bzrtel": $(".rjx_more_elit_mes ul:nth-child(3) li:nth-child(3) input").val(),
										"address": $(".rjx_more_elit_mes p input").val(),
										"stage": $(".rjx_more_elit_mes ul:nth-child(5) li:nth-child(1) input").val(),
										"oneweek": $(".rjx_a_detailed ul:nth-child(2) li:nth-child(1) input").val(),
										"twoweek": $(".rjx_a_detailed ul:nth-child(2) li:nth-child(2) input").val(),
										"threeweek": $(".rjx_a_detailed ul:nth-child(2) li:nth-child(3) input").val(),
										"fourweek": $(".rjx_a_detailed ul:nth-child(2) li:nth-child(4) input").val()
									},
									success: function(e) {
										if(e.affectedRows == 1) {
											alert("修改成功！")
											$('.rjx_student_more_elit').css('display', 'none')
											location.reload()
										}
									}
								});
							})
						}
					});

				})
				//详细信息
				$("body").delegate(".rjx_student_main tr td:nth-child(1)", "click", function() {
					$('.rjx_student_more').css('display', 'block')
					var user = $(this).parent().children(1).html()
					studentDetail(user)
				})
				$("body").delegate(".rjx_student_main tr td:nth-child(2)", "click", function() {
					$('.rjx_student_more').css('display', 'block')
					var user = $(this).parent().children(1).html()
					studentDetail(user)
				})
				$("body").delegate(".rjx_student_main tr td:nth-child(3)", "click", function() {
					$('.rjx_student_more').css('display', 'block')
					var user = $(this).parent().children(1).html()
					studentDetail(user)
				})
				$("body").delegate(".rjx_student_main tr td:nth-child(4)", "click", function() {
					$('.rjx_student_more').css('display', 'block')
					var user = $(this).parent().children(1).html()
					studentDetail(user)
				})

				function studentDetail(user) {
					$.ajax({
						type: "get",
						url: '' + ip + 'search/student',
						async: true,
						data: {
							'uname': user
						},
						success: function(e) {
							$(".rjx_more_mes ul:nth-child(1) li:nth-child(1) span").html(e[0].xinming)
							$(".rjx_more_mes ul:nth-child(1) li:nth-child(2) span").html(e[0].sex)
							$(".rjx_more_mes ul:nth-child(1) li:nth-child(3) span").html(e[0].qinshi)
							$(".rjx_more_mes ul:nth-child(1) li:nth-child(4) span").html(e[0].year)
							$(".rjx_more_mes ul:nth-child(2) li:nth-child(1) span").html(e[0].parents)
							$(".rjx_more_mes ul:nth-child(2) li:nth-child(2) span").html(e[0].tel)
							$(".rjx_more_mes ul:nth-child(2) li:nth-child(3) span").html(e[0].parenttel)
							$(".rjx_more_mes ul:nth-child(3) li:nth-child(1) span").html(e[0].bzrname)
							$(".rjx_more_mes ul:nth-child(3) li:nth-child(2) span").html(e[0].teachname)
							$(".rjx_more_mes ul:nth-child(3) li:nth-child(3) span").html(e[0].bzrtel)
							$(".rjx_more_mes p span").html(e[0].address)
							$(".rjx_more_mes ul:nth-child(5) li:nth-child(1) span").html(e[0].stage)
							$(".rjx_more_mes ul:nth-child(5) li:nth-child(2) span").html(Number(e[0].oneweek) + Number(e[0].twoweek) + Number(e[0].threeweek) + Number(e[0].fourweek))
							$(".rjx_detailed ul:nth-child(2) li:nth-child(1)").html(e[0].oneweek)
							$(".rjx_detailed ul:nth-child(2) li:nth-child(2)").html(e[0].twoweek)
							$(".rjx_detailed ul:nth-child(2) li:nth-child(3)").html(e[0].threeweek)
							$(".rjx_detailed ul:nth-child(2) li:nth-child(4)").html(e[0].fourweek)
						}
					});
				}	
				//删除 
				$('body').delegate('.rjx_del', 'click', function() {
					var id = $(this).attr('index')
					var index = $(this).index('.rjx_del')
						//				alert(1)
					layer.confirm('是否删除该学生信息？', {
						btn: ['确定', '取消'] //按钮
					}, function() {
						$.ajax({
							type: "get",
							url: "http://192.168.43.204:8888/edit/del",
							async: true,
							data: {
								'id': id
							},
							success: function(e) {
								layer.msg('删除成功');
								setTimeout(function() {
									location.reload()
								}, 1000)
							}
						})
					}, function() {
						layer.msg('已经取消');
					});
//					$(this).parent().parent().remove()
				})
				
			}
		}
	})