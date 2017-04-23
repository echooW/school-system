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
	
	
}]).directive("lxm", function($http) {
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
				$('.lxm_main').css('opacity','1')
				$('.lxm_main').css('z-index','2')
			})
			
			$('.student').bind('click',function(){
				$('.lxm_main').css('opacity','1')
				$('.lxm_main').css('z-index','2')
			})
			
			$('.lxm_main_cen p i').bind('click',function(){
				$('.lxm_main').css('z-index','-2')
				$('.lxm_main').css('opacity','0')
			})
			
			function nice(name){
				$(name).focus(function(){
					$(this).css('width','86%');
					$(this).siblings('span').css('width','14%')
					$(this).parent().css('border','1px #2196f3 solid')
				})
				$(name).blur(function(){
					$(this).css('width','100%');
					$(this).siblings('span').css('width','0')
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
			
			$('.lxm_sub').bind('click',function(){
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
						setTimeout(function(){
							$('.lxm_user').val('')
							$('.lxm_pass').val('')
							$('.yzm').val('')
						},500)
						$('.lxm_main_wrapper').css('transform','translate(-50%,-50%) rotateY(180deg)')
						setTimeout(function(){
							//success
//							$('.lxm_main_back').css('background','#8BC34A')
//							$('.lxm_main_back p').text('欢迎回来!')
//							$('.my_ok').css('display','block')
//							$('.spinner').css('display','none')

							//erro
//							$('.lxm_main_back').css('background','red')
//							$('.lxm_main_back p').text('用户名或密码错误%>_<%')
//							$('.my_erro').css('display','block')
//							$('.spinner').css('display','none')
//							$('.onload').css('display','block')
						},2000)
					}
				}
			})
			
			$('.onload').bind('click',function(){
				$('.lxm_main_wrapper').css('transform','translate(-50%,-50%) rotateY(0)')
			})
			
//			$('lxm_login_input').bind('input', function() { 
//				alert(1)
//			});
		}
	}	
	
})
