<?php	
header("Content-type:text/html;charset=utf-8");
session_start();
include_once "lib.php";//这段php用于接收表单提交数据
$db=create_database();
$login_name=$_GET['login_name'];
$password=$_GET['password'];
$query="select * from user where username='$login_name' and password='$password'"; //查找用户是否存在
$result=$db->query($query);
$num_results=$result->num_rows;
if($num_results!=0) //用户是存在的
{
  $row=$result->fetch_assoc();
  $_SESSION['id']=$row['id'];
  $_SESSION['username']=$row['username'];
  $d="a";
  //用户id放入session
			}
  else
  {
      $d="b";
			}
     echo $d;
     exit ();
	?>