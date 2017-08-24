<?php
header("Content-type:text/html;charset=utf-8");
session_start();
include_once "lib.php";//这段php用于接收表单提交数据
$db=create_database();
$projectid=$_GET['alterid'];
$query="select * from project where onlyid = '$projectid'";
//echo $query;
$result=$db->query($query);
 $row=$result->fetch_assoc();
 $arr = array ('workbench'=>"$row[workbench]",'createdjson'=>"$row[createdjson]"); 
  echo json_encode($arr);   
?>