<?php
/**
 * Author: Jiangyeqi
 * Date: 2017/8/11
 * Time: 20:29
 * 登出
 */
?>
<?php
header("Content-type:text/html;charset=utf-8");
session_start();
session_destroy();
echo "<script>location.href='../index.php';</script>";
?>