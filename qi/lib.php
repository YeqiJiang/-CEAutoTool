<?php
	function create_database()
	{
		$db=new mysqli('localhost:3306','root','','index');
		if(mysqli_connect_errno()){
			//echo 'Connection to datebase failed:'.mysqli_connect_error();
			exit();
		}
		//echo 'connect success<br/>';
		return $db;
	}
	//function upload($i)
	//{
		
	//$name{$i} = $_FILES['$file{$i}']['name'];//上传文件的文件名 
     //$type{$i}=$_FILES['$file{$i}']['type'];//上传文件的类型 
     //$size{$i}=$_FILES['$file{$i}']['size'];//上传文件的大小 
     //$tmp_name{$i}=$_FILES['$file{$i}']['tmp_name'];//上传文件的临时存放路径
		
	//return array($name{$i},$type{$i}, $size{$i}, $tmp_name{$i});
	//}

	function jump_to($url) //实现页面跳转
	{
		echo "<script language='javascript' type='text/javascript'>";  
		echo "window.location.href='$url'";  
		echo "</script>"; 
	}

	function notice($id,$text) //实现将第二参的内容写到第一参中 <script language='javascript' type='text/javascript'>   $("#notice").append('aaaaa'); </script>;	目前没有用到
	{
		echo "<script language='javascript' type='text/javascript'>";  
		echo ' $("#'.$id.'").html('."'$text');";
		echo "</script>"; 
	}
    function control($i)
	{   
		$db=create_database();
		$query="select * from event where event_category = $i";
		$result=$db->query($query);
		$row=$result->fetch_assoc();
		$state=$row['state'];
		$no=$row['number'];
		if($state==1)
			return $no;
		else 
		{
			echo"<script language='javascript'>alert('该功能尚未开通，请联系管理员');</script>";
			exit();
		}

	}
	function insert($sheet,$n,$PA,$id) //将数据插入数据库表中，数据库为c1....cn, 对应表单p1....pn 另外将state置1 第一参数为表名，第二参为插入的参数个数，第三参为参数数组，注意这个数组下表从1开始,第四参是创建者。
	{
		$db=create_database();
		$query="insert into ".$sheet." (";
		for($i=1;$i<$n+1;$i++)
			$query=$query."c".$i.",";
		$query=$query."state,id_p) values(";
		for($i=1;$i<$n+1;$i++)
			$query=$query."'".$PA[$i]."',";
		$query=$query."1,$id)";
		$result=$db->query($query);
		return $result;
	}
	function insert2($sheet,$n,$PA,$PS,$id) //将数据插入MO1/MO2数据库表中，数据库为c1....cn, 对应表单p1....pn 另外将state置1 第一参数为表名，第二参为插入的参数个数，第三参为参数数组，注意这个数组下表从1开始,第四参是创建者。
	{
		$db=create_database();
		$query="insert into ".$sheet." (";
		for($i=1;$i<$n+1;$i++)
			$query=$query."c".$i.",";
		for ($i=1;$i<$n+9;$i++)
			$query=$query."r".$i.",";
		$query=$query."state,id_p) values(";
		for($i=1;$i<$n+1;$i++)
			$query=$query."'".$PA[$i]."',";
		for($i=1;$i<$n+9;$i++)
			$query=$query."'".$PS[$i]."',";
		$query=$query."1,$id)";
		$result=$db->query($query);
		return $result;
	}
function insert3($sheet,$n,$PA,$joinid) //将数据插入数据库表中，数据库为c1....cn, 对应表单p1....pn 另外将state置1 第一参数为表名，第二参为插入的参数个数，第三参为参数数组，注意这个数组下表从1开始,第四参是创建者。
	{
		$db=create_database();
		$query="insert into ".$sheet." (";
		for($i=1;$i<$n+1;$i++)
			$query=$query."c".$i.",";
		$query=$query."num,id_p,info,position) select ";
		for($i=1;$i<$n+1;$i++)
			$query=$query."c".$i.",";
		$query=$query."num,id_p,info,position from ".$PA." where id = ".$joinid."";
		$result=$db->query($query);
		return $result;
	}

	function change($sheet,$n,$PA,$state,$id_index)
	{
		$db=create_database();
		$query="update $sheet set ";
		for($i=1;$i<$n;$i++)
			$query=$query.'c'.$i."='".$PA[$i]."',";
		$query=$query.'state='.$state." where id=$id_index";
		echo $query;
		$result=$db->query($query);
		return $result;
	}
	function change2($sheet,$n,$PA,$state,$id_index)//这里传入的参数是用户的id,这是后来需要的，所以没有将两个函数改在一起。
	{
		$db=create_database();
		$query="update $sheet set ";
		for($i=1;$i<$n;$i++)
			$query=$query.'c'.$i."='".$PA[$i]."',";
		$query=$query.'state='.$state." where id_p=$id_index";
		echo $query;
		$result=$db->query($query);
		return $result;
	}
	function change1($sheet,$n,$PA,$id_f,$id)//用于膜经理培训的update
	{
		$db=create_database();
		$query="update $sheet set ";
		for($i=1;$i<$n;$i++)
			$query=$query.'c'.$i."='".$PA[$i]."',";
		$query=$query.'id_f='.$id_f." where id_p=$id";
		$result=$db->query($query);
		return $result;
	}

	function ifthereis($sheet, $condition) //第一参表名，第二参查询条件
	{
		$db=create_database();
		$query="select * from $sheet where $condition ";
		$result=$db->query($query);
		$num_results=$result->num_rows;
		return $num_results;
	}
    function print_experts2($index,$category_f)//这里是打印网格资质等级结构专家的意见
	{
	$db=create_database();
	$query="select * from expert where id_f=$index and form_category=$category_f";
	$result=$db->query($query);
	$num_results=$result->num_rows;
    echo "
		<table class='table table-bordered table-responsive text-center'>
		<tr>
		<th colspan='12' style='text-align:center;'><lead>专家打分</lead></th>
		</tr>";
	for($i=1;$i<=$num_results;$i++) 
			{//将每个已做出评价的专家的信息打印出来
				$row=$result->fetch_assoc(); 
				$id_p=$row['id_p'];
				$query="select * from user where id=".$row['id_p'];
				$result2=$db->query($query);
				$row2=$result2->fetch_assoc(); //获得专家的真实姓名 
				
				echo "
						<tr>
						<td colspan='1'>$i</td>
							<td colspan='1'>用户名</td>
							<td colspan='2'>". $row2['uid']." </td>
							<td colspan='2'>姓名</td>
							<td colspan='2'>". $row2['name']." </td>
							<td colspan='2'>电话</td>
							<td colspan='2'>". $row2['tel']."</td>
						</tr>
						<tr>";
						$query3="select position from expert where id_p='$id_p' and id_f='$index' and form_category=$category_f";
						$result3=$db->query($query3);
				        $row3=$result3->fetch_assoc();
						$position=$row['position'];
						echo"
						<td colspan='12'> <a href='webpage/wang1/expert/$position'>  请下载专家评审表<a> </td>
						</tr>
						</table>
						";
	}
	
	
	}
	function print_experts($index,$category_f) //打印专家的评审意见，第一参是expert表中的id_f,第二参是form_category
	{
		$db=create_database();
			$query="select * from expert where id_f=$index and form_category=$category_f";
			$result=$db->query($query);
			$num_results=$result->num_rows;
			echo "
				<table class='table table-bordered table-responsive text-center'>
				<tr>
					<th colspan='12' style='text-align:center;'><lead>专家打分</lead></th>
				</tr>";
			for($i=1;$i<=$num_results;$i++) 
			{//将每个已做出评价的专家的信息打印出来
				$row=$result->fetch_assoc(); 
				$query="select * from user where id=".$row['id_p'];
				$result2=$db->query($query);
				$row2=$result2->fetch_assoc(); //获得专家的真实姓名 
				
				echo "
						<tr>
						<td colspan='1'>$i</td>
							<td colspan='1'>用户名</td>
							<td colspan='2'>". $row2['uid']." </td>
							<td colspan='2'>姓名</td>
							<td colspan='2'>". $row2['name']." </td>
							<td colspan='2'>电话</td>
							<td colspan='2'>". $row2['tel']."</td>
						</tr><tr>
						";
						if($category_f!==5)
				{		
				for($i1=0;$i1<6;$i1++)
				{
					$str="s".($i1+1);
					echo "
							<td colspan='2' >支撑材料".($i1+1)."意见：</td>
							<td colspan='2'> ". $row[$str]." </td>
						";
					if($i1==2)
						echo "</tr><tr>";
					
				}
				}
				echo "
					</tr>
						<tr><td colspan='2'>专家留言</td><td colspan='10'>".$row['info']." </td></tr>";
			}
			echo "</table>";
	}

function print_experts3($index,$category_f,$q) //打印专家的评审意见，第一参是expert表中的id_f,第二参是form_category
	{
		$db=create_database();
			$query="select * from expert where id_f=$index and form_category=$category_f";
			$result=$db->query($query);
			$num_results=$result->num_rows;
			echo "
				<table class='table table-bordered table-responsive text-center'>
				<tr>
					<th colspan='12' style='text-align:center;'><lead>专家打分</lead></th>
				</tr>";
			for($i=1;$i<=$num_results;$i++) 
			{//将每个已做出评价的专家的信息打印出来
				$row=$result->fetch_assoc(); 
				$query="select * from user where id=".$row['id_p'];
				$result2=$db->query($query);
				$row2=$result2->fetch_assoc(); //获得专家的真实姓名 
				
				echo "
						<tr>
						<td colspan='1'>$i</td>
							<td colspan='1'>用户名</td>
							<td colspan='2'>". $row2['uid']." </td>
							<td colspan='2'>姓名</td>
							<td colspan='2'>". $row2['name']." </td>
							<td colspan='2'>电话</td>
							<td colspan='2'>". $row2['tel']."</td>
						</tr><tr>
						";
						if($category_f!==5)
				{		
				for($i1=$q;$i1<($q+6);$i1++)
				{
					$str="s".($i1+1);
					echo "
							<td colspan='2' >支撑材料".($i1+1)."意见：</td>
							<td colspan='2'> ". $row[$str]." </td>
						";
					if($i1==2)
						echo "</tr><tr>";
					
				}
				}
				echo "
					</tr>
						<tr><td colspan='2'>专家留言</td><td colspan='10'>".$row['info']." </td></tr>";
			}
			echo "</table>";
	}

	function print_sod($index,$category_f) //打印秘书处或理事会意见，几乎完全一样，第一参$sheet 中的id_f ，第二参是理事会评审表中的表分类，如果是0则使用秘书处表。 sod=secret or director
	{
		if($category_f>0) //理事会表格初始化
		{
			$str='理事会';
			$query="select * from director where id_f=$index and form_category=$category_f";
			$send='send5';
			$success=4;
		}			
		else  //秘书处表格初始化
		{
			$str='秘书处';
			$query="select * from secret where id_f=$index";
			$send='send2';
			$success=2;
		}

		$db=create_database();
		$result=$db->query($query);
		$num_results=$result->num_rows;
		echo "
		<table class='table table-bordered table-responsive text-center'>
			<tr>
				<th colspan='12' style='text-align:center;'><lead>".$str."意见</lead></th>
			</tr>";
		for($i=0;$i<$num_results;$i++) 
		{//将每个已做出评价的秘书处的信息打印出来
			$row=$result->fetch_assoc(); 
			switch ($row['result'])
			{
				case 1: $res='通过';break;
				case 2: $res='不通过';break;
				case 3: $res='弃权';break;
				default : $res='未正常提交';break;
			}
			$query="select * from user where id=".$row['id_p'];
			$result2=$db->query($query);
			$row2=$result2->fetch_assoc(); //获得秘书处用户的真实姓名 
			echo "
			<tr>
				<td colspan='2'>用户名</td>
				<td colspan='2'>". $row2['uid']." </td>
				<td colspan='2'>姓名</td>
				<td colspan='2'>". $row2['name']." </td>
				<td colspan='2'>意见</td>
				<td colspan='2'>". $res."</td>
			</tr>
			<tr><td colspan='2'>".$str."留言</td><td colspan='10'>".$row['info']." </td></tr>
			";
		}
		echo "
			</table>
			<form enctype='multipart/form-data' action='' method='post'>
			<table class='table table-bordered table-responsive text-center'>
				<tr>
					<td colspan='2' >管理员意见：</td>
					<td colspan='10'>
						<select class='form-control' data-style='btn-primary' name='judge'>
								<option value='".$success."'> 通过！</option>
								<option value='9'> 不通过！</option>
						</select>
					</td>
				</tr>
				<tr>
					<td colspan='12'>
					<textarea  type='text' class='form-control' name='info' placeholder='意见及留言'></textarea>
					</td>
				</tr>
			</table>
				<div style='text-align: right;margin-bottom: 2%'>
					<input type='hidden' value='yes' name='".$send."'>
					<button type='submit' class='btn btn-md btn-primary' >&nbsp;&nbsp; 提交 &nbsp; &nbsp;
					</button>
				</div>
			</form>
		";
	}
	function judge($sheet)
	{
		$db=create_database();
		$nav1=$_GET['nav1'];
		$query="select * from nav_2 where id_n1=$nav1";
			$result=$db->query($query);
			$num_results=$result->num_rows;
				$row=$result->fetch_assoc();
		if($_POST['change_key']=='yes')
		{			
				$key=$_POST['key'];
             $query="select c1 from $sheet where c1 like '%$key%'";
			 
			$result=$db->query($query);
			
			$num_results=$result->num_rows;
			if($num_results==0)
				{
			 $query="select $sheet.c1 from join_form,user where user.id = join_form.id_p and user.uid like '%$key%'";
			 $result=$db->query($query);
			 $num_results=$result->num_rows;
			 }
             for($i=0;$i<$num_results;$i++) 
						{
			$row2 = $result->fetch_assoc();
			echo"<a href='index.php?nav1=".$nav1."&nav2=".$row['id_n2']."&index=".$row2['id']."'>
			 ".($row2['uid'])."</a>";
						} 
							}
	           else {
					echo"<div id='ulside' class='list-group'>";	
               for($i1=1;$i1<=5;$i1++)
      {
		switch ($i1)
		{
			case 1:echo"<h5 class='list-group-item' >提交待审核</h5>";break;
			case 2:echo"<h5 class='list-group-item' >等待专家打分</h5>";break;
			case 3:echo"<h5 class='list-group-item' >专家意见</h5>";break;
			case 4:
			echo"<a class='list-group-item'  href='index.php?nav1=".$nav1."&nav2=".$row['id_n2']."&index=0'>投递给理事会</a>";break;
			case 5:echo"<a class='list-group-item'  href='index.php?nav1=".$nav1."&nav2=".$row['id_n2']."&index=-1'>理事会意见反馈</a>";break; 
			default:break;
		}
		echo"<div>";
		$query="select id,c1 from $sheet where state = $i1 ";
        $result=$db->query($query);
        $num_results=$result->num_rows;
	    for($i=0;$i<$num_results;$i++) 
						{
			$row2 = $result->fetch_assoc();
			echo"<a class='list-group-item' href='index.php?nav1=".$nav1."&nav2=".$row['id_n2']."&index=".$row2['id']."'>
			 ".($row2['c1'])."</a>";
							}
							echo"</div>";
		
		}
     echo"</div>";
		}
	}
	
?>
