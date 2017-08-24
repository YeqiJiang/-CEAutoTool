<?php
session_start();
include_once "lib.php";//这段php用于接收表单提交数据
$db=create_database();
$export=file_get_contents('php://input','r');
$export=json_decode($export);
$content=$export->content;
$uid = $export->Uid;
$workbench = $export->workbench;
// $content=$_GET['content'];//传递的是字符串
// $uid=$_GET['Uid'];
// $workbench=$_GET['workbench'];
$userid=$_SESSION['id'];
$myfile = fopen("../createdjson/".$uid.".json", "w");
fwrite($myfile, $content);
fclose($myfile);
$query="select * from project where onlyid = '$uid'";
$result=$db->query($query);
$num_results=$result->num_rows;
if($num_results==0){
$query="insert into project (onlyid,userid,workbench,createdjson,state) values ('$uid','$userid','$workbench','$content',1)";
//echo $query;
}
else{
$query="update project set workbench = '$workbench',createdjson = '$content' where onlyid = '$$uid'";  
}
$db->query($query);
echo "保存成功！";	
?>