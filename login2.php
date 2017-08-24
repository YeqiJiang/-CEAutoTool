
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <title>聚羧酸减水剂自动化控制系统</title>
    <meta name="keywords" content="聚羧酸减水剂自动化控制系统" />
    <meta name="description" content="聚羧酸减水剂自动化控制系统" />
     <link id="bs-css" href="common/css/bootstrap-cerulean.min.css" rel="stylesheet">
     <link href="css/login2.css" rel="stylesheet" type="text/css" />
    <link href="common/css/style.css" rel="stylesheet" type="text/css" />
    <link href="common/css/faded.css" type="text/css" rel="stylesheet" />
    <script type="text/javascript" src="Scripts/jquery-1.10.2.js"></script>
    <script src="common/js/faded.js" type="text/javascript"></script>
    <script type="text/javascript" src="Scripts/jquery.bootstrap.teninedialog.v3.js"></script>
     <script type="text/javascript" src="Scripts/bootstrap.js"></script>
    <script type="text/javascript" src="js/login.js"></script>
    <script type="text/javascript">
        $(function () {
            $("#faded").faded();
        });
        function login() {
            var name = $('#LoginName').val();
            var pass = $('#LoginPass').val();
            $.ajax({
                url: 'include/login.php?login_name=' + name + '&password=' + pass,
                type: 'post', 
                success: function (d) {
                    if (d == "a") {
                        location.href = "index.php";
                    }
                    else {
                        alert(d);
                        // $.teninedialog({
                        //     title: '系统提示',
                        //     content: d,
                        //     showCloseButton: true,
                        //     otherButtonStyles: ['btn-primary', 'btn-primary'],
                        //     bootstrapModalOption: { keyboard: true }
                        // });
                    }    
                }
            });
        }
    </script>
  <style>
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
            box-shadow: 0 0 0 30px #fff inset;
            -webkit-text-fill-color: #333;
        }
    </style>  
</head>

<body>
    <div id="head">
        <div id="logo"><a href="#"><img src="images/logo-blue.png" width='200px' style="margin-top:14px" alt="物联网环境监控分析系统-OAM" title="物联网环境监控分析系统-OAM" /></a></div>
        <div class="text">
            <span>| &nbsp;&nbsp;聚羧酸减水剂自动化控制系统</span>
        </div>
    </div>
    <div id="main">
        <div class="box">
            <div id="faded">
                <ul>
                    <li><div class="pic"><img src="common/img/login/left-1.png" /></div></li>
                    <li><div class="pic"><img src="common/img/login/left-2.png" /></div></li>
                    <li><div class="pic"><img src="common/img/login/left-3.png" /></div></li>
                </ul>
            </div>
           
               
<div class="login" style="margin-top:35px;">
    
    <div class="header">
        <div class="switch" id="switch"><a class="switch_btn_focus" id="switch_qlogin" href="javascript:void(0);" tabindex="7">快速登录</a>
			<a class="switch_btn" id="switch_login" href="javascript:void(0);" tabindex="8">快速注册</a><div class="switch_bottom" id="switch_bottom" style="position: absolute; width: 64px; left: 0px;"></div>
        </div>
    </div>    
  
    
    <div class="web_qr_login" id="web_qr_login" style="display: block; height: 335px;">    

            <!--登录-->
            <div class="web_login" id="web_login">
               
               
               <div class="login-box">
    
            
			<div class="login_form">
				<form  name="loginform" accept-charset="utf-8" id="login_form" class="loginForm" >
                <div class="uinArea" id="uinArea">
                <label class="input-tips" for="u">帐号：</label>
                <div class="inputOuter" id="uArea">
                    
                    <input type="text" id="LoginName" name="LoginName" class="inputstyle"/>
                </div>
                </div>
                <div class="pwdArea" id="pwdArea">
               <label class="input-tips" for="p">密码：</label> 
               <div class="inputOuter" id="pArea">
              
                    <input type="password" id="LoginPass" name="LoginPass" class="inputstyle"/>
                </div>
                </div>
    
                <div style="padding-left:28%;margin-top:40px;">
                <!--<input type="hidden" value="yes"  name="login" />-->
                <button style="width:70%;" class="button_blue" onclick="login()"/> 登 录</button>
                
                 </div>
              </form>
           </div>
           
            	</div>
               
            </div>
            <!--登录end-->
  </div>

  <!--注册-->
    <div class="qlogin" id="qlogin" style="display: none; ">
   
    <div class="web_login"><form name="form2" id="regUser" accept-charset="utf-8"  >
	      <input type="hidden" name="register" value="yes"/>
        <ul class="reg_form" id="reg-ul">
        		<div id="userCue" class="cue">快速注册请注意格式</div>
                <li>
                	
                    <label for="user"  class="input-tips2">用户名：</label>
                    <div class="inputOuter2">
                        <input type="text" id="user" name="user" maxlength="16" class="inputstyle2"/>
                    </div>
                    
                </li>
                
                <li>
                <label for="passwd" class="input-tips2">密码：</label>
                    <div class="inputOuter2">
                        <input type="password" id="passwd"  name="passwd" maxlength="16" class="inputstyle2"/>
                    </div>
                    
                </li>
                <li>
                <label for="passwd2" class="input-tips2">确认密码：</label>
                    <div class="inputOuter2">
                        <input type="password" id="passwd2" name="passwd2" maxlength="16" class="inputstyle2" />
                    </div>
                    
                </li>
                
               <li>
                 <label for="qq" class="input-tips2">手机号：</label>
                    <div class="inputOuter2">       
                        <input type="tellphone" id="qq" name="qq" class="inputstyle2"/>
                    </div>
                   
                </li>
                
                <li>
                    <div class="inputArea" style="padding-left:28%;">
                        <input type="button" id="reg"  style="margin-top:10px;width:70%" class="button_blue" value="注 册"/> 
                    </div>
                    
                </li><div class="cl"></div>
            </ul></form>
           
    
    </div>
   
    
    </div>
    <!--注册end-->


            </div>
        </div>
    </div>
    <div id="foot" style="display:none;"><p>Copyright © 2015-2016 鹏通高科 . 版权所有 </p></div>
</body>
</html>
