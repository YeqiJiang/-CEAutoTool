<?php
header("Content-type:text/html;charset=utf-8");
?>
<?php
	session_start();
	include_once "include/lib.php";
    $db=create_database();
	$id=$_SESSION['id'];
	$username = $_SESSION['username']; 
?> 
<!DOCTYPE html>
<!--[if IE 6]>
<html id="ie6" class="ie"lang="en-US">
<![endif]-->
<!--[if IE 7]>
<html id="ie7"  class="ie"lang="en-US">
<![endif]-->
<!--[if IE 8]>
<html id="ie8"  class="ie"lang="en-US">
<![endif]-->
<!--[if IE 9]>
<html id="ie9"  class="ie"lang="en-US">
<![endif]-->
<!--[if gt IE 9]>
<html class="ie"lang="en-US">
<![endif]-->

<!-- This doesn't work but i prefer to leave it here... maybe in the future the MS will support it... i hope... -->
<!--[if IE 10]>
<html id="ie10"  class="ie"lang="en-US">
<![endif]-->


<!--[if !IE]>
<html lang="en-US">
<![endif]-->

<!-- START HEAD -->
<head>
    <meta charset="UTF-8" />
    <title>CEAutoTool</title>
    <!-- RESET STYLESHEET -->
     <link rel="stylesheet" type="text/css" media="all" href="css/bootstrap/bootstrap.css" />
    <link rel="stylesheet" type="text/css" media="all" href="css/reset.css" />
    <!-- BOOTSTRAP STYLESHEET -->
    <!-- MAIN THEME STYLESHEET -->
    <link rel="stylesheet" type="text/css" media="all" href="style.css" />
    <!-- [favicon] begin -->
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <!-- [favicon] end -->
    <link rel='stylesheet' id='slide-detail-css'  href='style1.css' type='text/css' media='all' />
    <link rel='stylesheet' id='custom-css'  href='css/custom.css' type='text/css' media='all' />
     <link href="css/sweetalert2.min.css" rel="stylesheet">
<script type='text/javascript' src='js/jquery-2.2.1.min.js'></script>
<script type='text/javascript' src='js/jquery.colorbox-min.js'></script>
<script type='text/javascript' src='js/media-upload.min.js'></script>
<script type='text/javascript' src='js/jquery.clickout.min.js'></script>
<script type='text/javascript' src='js/responsive.js'></script>
<script type='text/javascript' src='js/jquery.placeholder.js'></script>
<script type='text/javascript' src='js/jquery.tipsy.js'></script>
<script type='text/javascript' src='js/jquery.cycle.min.js'></script>
<script type='text/javascript' src='js/bootstrap.min.js'></script>
<script type='text/javascript' src='js/login.js'></script>
<script type="text/javascript" src="js/sweetalert2.min.js"></script>
<script src="js/es6-promise.min.js"></script>
<script src="js/finally.js"></script>


</head>
<!-- END HEAD -->
<!-- START BODY -->
<body class="home page no_js responsive stretched" style="background-image:url(images/back.png)">

<!-- START BG SHADOW -->
<div class="bg-shadow">

<!-- START WRAPPER -->
    <div id="wrapper" class="container group">

        <!-- START TOP BAR -->
        <div id="topbar">
            <div class="container" >
                <div class="row">
                    <div id="nav" class="span12 light">
                        <!-- START MAIN NAVIGATION -->
          <!-- <img href="http://www.sophtek.cn/" class="nav-brand" src="images/logo-blue.png" width="11%" style="float:left;margin:5px 65px 5px 10px"></img> -->
                        <ul id="menu-menu" class="level-1">
                            
                            <li>
                                <a href="http://www.sophtek.cn/">首页</a>
                            </li>
                            <li>
                                <a href="#">教程</a>
                            </li>
                           
                        </ul>
                        <!-- END MAIN NAVIGATION -->

                        <!-- START TOPBAR LOGIN -->
<?php  
if($id==null) {
    echo"   
  <div id='topbar_login' class='not_logged_in'>
  <a class='topbar_login' onclick='topbar_loginclick()'>
登 陆 <span class='sf-sub-indicator'></span>
                            </a>

                            <div id='fast-login' class='access-info-box'>
                                <form action='#' method='post' name='loginform'>

                                    <div class='form'>
                                        <p>
                                            <label>
                                               用户名<br/>
                                                <input type='text' tabindex='10' size='20' name='username' id='username' class='input-text' />
                                            </label>
                                        </p>

                                        <p>
                                            <label>
                                                密码<br/>
                                                <input type='password' tabindex='20' size='20'  name='pwd' id='pwd' class='input-text' />
                                            </label>
                                        </p>

                                        <a class='align-left lostpassword' onclick='register()'>
                                            没有账号？请注册
                                        </a>

                                        <p class='align-right'>
                                            <input type='button' tabindex='100' value='提交' name='wp-submit' id='wp-submit' class='input-submit' onclick='LoginSubmit()'/>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>";
                        } 
                    else{
                   echo <<<EOD
 <div id="topbar_login" class="not_logged_in">
                    <a class="topbar_login" onclick="topbar_loginclick()">
                         欢迎您,$username<span class="sf-sub-indicator"></span>
                       </a>
                            <div id="fast-login" class="access-info-box" style="margin-left:0px;width:104px">
                                <ul class="form text-center" style="width:100px;margin-left:10px">
                                <li style="padding:5px 8px 0 18px;"><a href="include/logout.php" style="font-size:12px;color: #ffffff; " >退出登陆</a></li>
                                </ul>
                            </div>
                        </div>
EOD;
                    }  
                        ?>
                        <!-- END TOPBAR LOGIN -->
                    </div>
                </div>
            </div>
        </div>
         
   
    <!-- SLOGAN -->
    <div class="slogan">
        <!-- <h2>WELCOME TO LIBRA</h2>
        <h3>you can integrate the portfolio shortcodes in your home page</h3> -->
    </div>
   
    <!-- START PRIMARY -->
    <div id="primary" class="sidebar-no">
        <div class="container group">
            <div class="row">
                <!-- START CONTENT -->
                <div id="content-home" class="span12 content group">
                        <div class="page type-page status-publish hentry group">
                            <h4>
                                您近期创建的<span style="color: #9a983c;">文件</span>
                            </h4>

                            <div class="row">
                                <ul id="portfolio" class="slide-detail detail thumbnails">
                                    <li  class="filterable_item span3 brandidentity  logodesign  " id="createpart">
                                        <div class="ch-item" style="background: url('images/portfolios/create.png') no-repeat center;" onclick="window.location.href='home.php'">
             
                                        </div>
                                    </li> 
                                    <?php
                                    $query="select * from project where userid = '$id'";
                                    $result=$db->query($query);
                                    $num_results=$result->num_rows;
                                    for ($i=0; $i <$num_results; $i++) { 
                                        $row=$result->fetch_assoc();
                                        $timecut=substr($row[time],0,11);
                                      echo <<<EOD
                                    <li  class="filterable_item span3 brandidentity  logodesign  ">
                                        <div class="ch-item ch-item-hover" style="background: url('images/portfolios/view.png') no-repeat center;">
                                            <div class="ch-info">
                                                <div class="ch-info-icons">
                                                <span  class="glyphicon glyphicon-edit icon" aria-hidden="true" id='alter$row[onlyid]' onclick='Alter(this)'></span>
                                                <span class="glyphicon glyphicon-trash icon" aria-hidden="true" id='del$row[onlyid]'  onclick='Del(this)'></span>
                                                </div>
                                                <div class="ch-info-text">
                                                    <p class="title">项目id：$row[onlyid]</p>
                                                    <p class="title">创建时间： $timecut</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li> 
EOD;
                                    }
                                   
                            
                                    ?>
                                    <hr />
                                    <hr />
                                </ul>
                           </div>
                    <!-- START COMMENTS -->
                    <div id="comments"></div>
                    <!-- END COMMENTS -->
                </div>
                <!-- END CONTENT -->

                <!-- START EXTRA CONTENT -->
                <!-- END EXTRA CONTENT -->
            </div>
        </div>
    </div>
    <div id="copyright" style="position:fixed; bottom:0;width:100%">
        <div class="container">
            <div class="row">
                <div class="span12 center">
                    <p>
                         Copyright 2016 All Rights Reserved. @版权所有：<a href="http://www.sophtek.cn/">北京慧物科联科技有限公司</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!-- END COPYRIGHT -->

    <div class="wrapper-border"></div>

    </div>
<!-- END WRAPPER -->

</div>
<!-- END BG SHADOW -->
</body>
<!-- END BODY -->
</html>