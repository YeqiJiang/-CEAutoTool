<?php
header("Content-type:text/html;charset=utf-8");
session_start();
include_once "lib.php";//这段php用于接收表单提交数据
$db=create_database();
$delid=$_GET['delid'];
$query="delete from project where onlyid = '$delid'";
//echo $query;
$result=$db->query($query);
 if($result){
     echo"a";
 }
?>