<?php
session_start();
include_once "lib.php";//这段php用于接收表单提交数据
$db=create_database();
$userid=$_SESSION['id'];
// $content=$_POST['content'];//传递的是字符串
// $projectid=$_POST['Uid'];
// $workbench=$_POST['workbench'];
$raw_post_data = file_get_contents('php://input', 'r'); 
$time=date("Y-m-d");
$raw_post_data = json_decode($raw_post_data);
$projectid =  $raw_post_data->Uid;
$content =  $raw_post_data->content;
$workbench =  $raw_post_data->workbench;
$query="select * from project where onlyid = '$projectid'";
$result=$db->query($query);
$num_results=$result->num_rows;
if($num_results==0){
$query="insert into project (onlyid,userid,workbench,createdjson,time,state) values ('$projectid','$userid','$workbench','$content','$time',0)";
}
else{
$query="update project set workbench = '$workbench',createdjson = '$content',time='$time' where onlyid = '$projectid'";  
}
//echo $query;
$result=$db->query($query);
if($result)
{
 echo "保存成功！";	
 exit;
}
else{
  echo"出现问题，请联系管理员！";
  exit;
}
?>