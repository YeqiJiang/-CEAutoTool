<?php	
header("Content-type:text/html;charset=utf-8");
session_start();
include_once "lib.php";//这段php用于接收表单提交数据
$db=create_database();
$register_name=$_GET['user'];
$password=$_GET['password'];
$tel = $_GET['tel'];
$query="select * from user where username='$register_name'"; //查找用户名是否已经存在
$result=$db->query($query);
$num_results=$result->num_rows;
if($num_results!=0) //用户是存在的
{
  echo"error1";
  exit();
			}
  else
  {
     $query = "insert into user (username,password,tel) values ('$register_name','$password','$tel')";
     $result = $db->query($query);
     if($result){
         echo"success";
         exit();
     }
			}
	?>