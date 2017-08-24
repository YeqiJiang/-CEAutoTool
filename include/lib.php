<?php
	function create_database()
	{
		$db=new mysqli('localhost','root','','autotool');
		if(mysqli_connect_errno()){
			exit();
		}
		return $db;
	}
	function jump_to($url) //实现页面跳转
	{
		echo "<script language='javascript' type='text/javascript'>";  
		echo "window.location.href='$url'";  
		echo "</script>"; 
	}
?>
