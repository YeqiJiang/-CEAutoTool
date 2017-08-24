$(function(){
	
	$('#switch_qlogin').click(function(){
		$('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_bottom').animate({left:'0px',width:'70px'});
		$('#qlogin').css('display','none');
		$('#web_qr_login').css('display','block');
		
		});
	$('#switch_login').click(function(){
		
		$('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_bottom').animate({left:'154px',width:'70px'});
		
		$('#qlogin').css('display','block');
		$('#web_qr_login').css('display','none');
		});
if(getParam("a")=='0')
{
	$('#switch_login').trigger('click');
}

	});
	
function logintab(){
	scrollTo(0);
	$('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
	$('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
	$('#switch_bottom').animate({left:'154px',width:'96px'});
	$('#qlogin').css('display','none');
	$('#web_qr_login').css('display','block');
	
}


//根据参数名获得该参数 pname等于想要的参数名 
function getParam(pname) { 
    var params = location.search.substr(1); // 获取参数 平且去掉？ 
    var ArrParam = params.split('&'); 
    if (ArrParam.length == 1) { 
        //只有一个参数的情况 
        return params.split('=')[1]; 
    } 
    else { 
         //多个参数参数的情况 
        for (var i = 0; i < ArrParam.length; i++) { 
            if (ArrParam[i].split('=')[0] == pname) { 
                return ArrParam[i].split('=')[1]; 
            } 
        } 
    } 
}  


var reMethod = "GET",
	pwdmin = 6;

$(document).ready(function() {


	$('#reg').click(function() {

		if ($('#user').val() == "") {
			$('#user').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×用户名不能为空</b></font>");
			return false;
		}



		if ($('#user').val().length < 4 || $('#user').val().length > 16) {

			$('#user').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×用户名位4-16字符</b></font>");
			return false;

		}
		$.ajax({
			type: reMethod,
			url: "/member/ajaxyz.php",
			data: "uid=" + $("#user").val() + '&temp=' + new Date(),
			dataType: 'html',
			success: function(result) {

				if (result.length > 2) {
					$('#user').focus().css({
						border: "1px solid red",
						boxShadow: "0 0 2px red"
					});$("#userCue").html(result);
					return false;
				} else {
					$('#user').css({
						border: "1px solid #D7D7D7",
						boxShadow: "none"
					});
				}

			}
		});


		if ($('#passwd').val().length < pwdmin) {
			$('#passwd').focus();
			$('#userCue').html("<font color='red'><b>×密码不能小于" + pwdmin + "位</b></font>");
			return false;
		}
		if ($('#passwd2').val() != $('#passwd').val()) {
			$('#passwd2').focus();
			$('#userCue').html("<font color='red'><b>×两次密码不一致！</b></font>");
			return false;
		}

		var sqq = /^[1-9]{1}[0-9]{4,9}$/;
		if ($('#qq').val().length < 10 ) {
			$('#qq').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×手机号码格式不正确</b></font>");return false;
		} else {
			$('#qq').css({
				border: "1px solid #D7D7D7",
				boxShadow: "none"
			});
			
		}

		$('#regUser').submit();
	});
	

});
function LoginSubmit(){
var username = $('#username').val();
var pwd =  $('#pwd').val();
$.ajax({
			 url: "../CEAutoTool16/include/login.php?login_name="+username+"&password="+pwd,
			 type: "post",
             cache: false,
            contentType: false,
            processData: false,
			success: function(result) {
				if(result=="a"){
					 swal({   
							  title: "登陆成功! ", 
							  text:"正在跳转……",     
							  type: "success", 
							  timer:2000, 
							  confirmButtonText: "确定"
                           }).then(function(){
                            window.location.reload();
						   });
					
				}
				else if(result=="b"){
                       swal({   
                              title: "出现错误 ",   
                              text: "用户名不存在或密码不正确",   
							  type: "error", 
							  timer:3000,  
                              confirmButtonText: "确定"
                           });
				}
			
			}
		});
}
function topbar_loginclick(){
	 $('#fast-login').slideToggle("slow");
}
function register(){
	 swal({
	  title: '请注册',
	  showCancelButton: true,
	  showLoaderOnConfirm: true,
	  confirmButtonText: '提交',
      cancelButtonText: '取消',
      html: "<form class='form-horizontal' style='margin-left:-10px' id='userCue'>"+
	   "<div class='form-group inma'><label for='user' class='col-sm-4 control-label'>用户名:</label><div class='col-sm-7'><input class='form-control' type='text' id='user' name='user' style='height:30px'></input></div></div>"
		+"<div class='form-group inma'><label for='passwd' class='col-sm-4 control-label'>密码:</label><div class='col-sm-7'><input type='password' id='passwd' name='passwd' style='height:30px'></input></div></div>"
		 +"<div class='form-group inma'><label for='passwd2' class='col-sm-4 control-label'>确认密码:</label><div class='col-sm-7'><input type='password' id='passwd2' name='passwd2' style='height:30px'></input></div></div>"
	      +"<div class='form-group inma'><label for='passwd2' class='col-sm-4 control-label'>手机号:</label><div class='col-sm-7'><input type='tel' id='qq' name='qq' style='height:30px'></input></div></div></form>",
		preConfirm: function() {
        return new Promise(function(resolve) {
          resolve([
            $('#user').val(),
			$('#passwd').val(),
			$('#passwd2').val(),
			$('#qq').val()
		  ]);
		});
		if (result[0] == "" || result[1]=="" || result[2]==""|| result[3]=="" ) {
			$('#user').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').before("<font color='red'><b>×每个输入框不能为空</b></font>");
			return false;
		}
		if (result[1] != result[2] ) {
			$('#passwd2').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').before("<font color='red'><b>×两次密码不一致</b></font>");
			return false;
		}
		if (result[3].length < 10) {
			$('#qq').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').before("<font color='red'><b>×手机号码格式不正确</b></font>");
			return false;
		}
      }
    }).then(function(result) {
      if (result) {
       if (result[0] == "" || result[1]=="" || result[2]==""|| result[3]=="" ) {
			swal({
				 title: '出现错误',
                 text: "输入框不得为空！",
                 type: "error",   
                 confirmButtonText: "确定"

			})
			return false;
		}
		if (result[1] != result[2] ) {
			swal({
				 title: '出现错误',
                 text: "两次密码不一致！",
                 type: "error",   
                 confirmButtonText: "确定"

			})
			return false;
		}
		if (result[3].length < 10) {
			swal({
				 title: '出现错误',
                 text: "手机号格式错误！",
                 type: "error",   
                 confirmButtonText: "确定"

			})
			return false;
		}
		$.ajax({
			 url: "../CEAutoTool16/include/register.php?user="+result[0]+"&password="+result[1]+"&tel="+result[3],
			 type: "post",
             cache: false,
            contentType: false,
            processData: false,
			success: function(result) {
				if(result=="success"){
					swal({
                          title: '注册成功！',
                          text: '正在跳转……',
						  timer: 2000,
						   type: "success", 
						  showCloseButton: false,
                          showCancelButton: false
                         }).then(function(){
                           window.location.reload();
						 });
					
				}
				else if(result=="error1"){
                       swal({   
                              title: "很抱歉注册失败！",   
                              text: "用户名已存在！",   
                              type: "error",   
                              confirmButtonText: "确定"
                           });
				}
				else {
					 swal({   
                              title: "很抱歉注册失败！",   
                              text:  "请联系管理员",   
                              type: "error",   
                              confirmButtonText: "确定"
                           });
				}
			
			}
		});
      }
    });
}
function Alter(a){
	var alterid=a.id.substr(5);
	window.location.href='home.php?projectid='+alterid;
	
}
function Del(a){
	var delid=a.id.substr(3);
	swal({
  title: '您确实要删除该项目吗？',
  text: "删除后将不可恢复",
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: '删除',
  cancelButtonText: '取消',
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33'
}).then(function(isConfirm) {
  if (isConfirm === true) {
    $.ajax({
			 url: "../CEAutoTool16/include/del.php?delid="+delid,
			 type: "post",
             cache: false,
            contentType: false,
            processData: false,
			success: function(result) {
				if(result=="a"){
					 swal({   
							  title: "删除成功! ", 
							  text:"正在刷新界面……",     
							  type: "success", 
							  timer:1000, 
							  confirmButtonText: "确定"
                           }).then(function(){
                            window.location.reload();
						   });
					
				}
				else{
                       swal({   
                              title: "很抱歉，出现错误 ",   
                              text: "请联系管理员",   
							  type: "error", 
							  timer:2000,  
                              confirmButtonText: "确定"
                           });
				}
			
			}
		});
  } 
})
}
// $('#register').click(function(){
  
// });