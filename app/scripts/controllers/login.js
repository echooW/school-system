'use strict';

/**
 * @ngdoc function
 * @name trainingProjectsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trainingProjectsApp
 */
angular.module('schoolSystemApp').controller('loginCtrl',['$scope','$http','$state','$location',function ($scope,$http,$state,$location) {
//		$scope.go=function(){
//			$location.url("/teacher_index");
//		}
//	alert(1)
	
	
}]).directive("lxm", function($http,$state) {
	return {
		restrict: "ECMA",
		link: function($scope, element, attr) {
			
			
			var verifyCode = new GVerify("v_container");
//			layer.alert('内容', {
//			  icon: 1,
//			  skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
//			})
//			layer.open({
//			  type: 1,
//			  skin: 'layui-layer-demo', //样式类名
//			  closeBtn: 0, //不显示关闭按钮
//			  anim: 2,
//			  shadeClose: true, //开启遮罩关闭
//			  content: '内容'
//			});
			$('.teacher').bind('click',function(){
//				$('.lxm_main').css('opacity','1')
//				$('.lxm_main').css('z-index','2')
				$('.lxm_sub').addClass('lxm_teacher_clk')
				$('.lxm_login_wrapper').css('transform','translateX(4%)')
			})
			
			$('.student').bind('click',function(){
//				$('.lxm_main').css('opacity','1')
//				$('.lxm_main').css('z-index','2')
				$('.lxm_sub').addClass('lxm_student_clk')
				$('.lxm_login_wrapper').css('transform','translateX(4%)')
			})
			
			$('.lxm_main_cen p i').bind('click',function(){
//				$('.lxm_main').css('z-index','-2')
//				$('.lxm_main').css('opacity','0')
				$('.lxm_sub').removeClass('lxm_student_clk lxm_teacher_clk')
				$('.lxm_login_wrapper').css('transform','translateX(-34%)')
			})
			
			function nice(name){
				$(name).focus(function(){
					$(this).css('width','86%');
					$(this).siblings('span').css('width','14%')
					$(this).parent().css('border','1px #2196f3 solid')
				})
				$(name).blur(function(){
					$(this).css('width','100%');
					$(this).siblings('span').css('width','0');
					$(this).parent().css('border','1px #dddddd solid')
				})
			}
			nice('.lxm_user')
			nice('.lxm_pass')
			$('.yzm').focus(function(){
				$(this).css('border','1px #2196f3 solid')
			})
			$('.yzm').blur(function(){
				$(this).css('border','1px #dddddd solid')
			})
			
			
			
//			console.log(ip)
			doger_click('.lxm_teacher_clk',''+ip+'login/teachers','teacher_index')
			doger_click('.lxm_student_clk',''+ip+'login/students','student_index')
			function doger_click(myclass,myurl,html){
			$('body').delegate(myclass,'click',function(){	
//			$(myclass).bind('click',function(){
//				alert(1)
				var res = verifyCode.validate($('.yzm').val());
				if($('.lxm_user').val() == ''){
//					layer.alert('请输入用户名', {icon: 6},title: '你好，layer。');
//					layer.alert('见到你真的很高兴',{title:'提示'},{icon: 6});
					layer.msg('请输入用户名');
				}else if($('.lxm_pass').val() == ''){
					layer.msg('请输入密码');
				}else{
					console.log(res)
					if($('.yzm').val() == ''){
						layer.msg('请输入验证码');
					}else if(!res){
						layer.msg('验证码输入错误');
//						layer.alert('验证码输入错误',{title:'提示'});
					}else{
//						console.log($('.lxm_user').val())
//						console.log($('.lxm_pass').val())
						$('.lxm_main_wrapper').css('transform','rotateY(180deg)')
						setTimeout(function(){
							$('.lxm_user').val('')
							$('.lxm_pass').val('')
							$('.yzm').val('')
						},500)
						$.ajax({
							type:'post',
							url: myurl,
							async:false,
							data:{
								username:$('.lxm_user').val(),
								password:$('.lxm_pass').val()
							},
							success:function(e){
								console.log(e)
								if(e.result){
									sessionStorage.id = e.result[0].id
								}
								if(e.flag ==1){
									setTimeout(function(){
										$('.lxm_main_back').css('background','#8BC34A')
										$('.lxm_main_back p').text('欢迎回来!')
										$('.my_ok').css('display','block')
										$('.spinner').css('display','none')
										$('.onload').css('display','none')
										$('.my_erro').css('display','none')
										setTimeout(function(){
//											location.href = "#!/student_index.html"
											$state.go(html);
										},1000)
									},2000)
								}
								else if(e.flag == 2 || 3 || 4){
									setTimeout(function(){
										$('.lxm_main_back').css('background','red')
										$('.lxm_main_back p').text('用户名或密码错误%>_<%')
										$('.my_erro').css('display','block')
										$('.spinner').css('display','none')
										$('.onload').css('display','block')
									},2000)
								}
							}
						})
					}
				}
			})
			} 
			
			$('.onload').bind('click',function(){
				$('.lxm_main_wrapper').css('transform','rotateY(0)')
				$('.spinner').css('display','block')
				$('.lxm_main_back').css('background','#222')
				$('.my_erro').css('display','none')
				$('.onload').css('display','none')
				$('.lxm_main_back p').text('正在认证……')
			})
			
		}
	}	
	
})
