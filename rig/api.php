<?php
//$cook=implode (',',$_G);
$account=$_GET['user_names'];
$id=$_GET['user_ids'];

$dbh = new PDO("mysql:host=127.0.0.1;dbname=2006", 'root', 'root');

//$mysqli= new mysqli('127.0.0.1','root','root','2006');
$sql = "select id,account,email,last_logiin,`time` from user where id='{$id}' and account='{$account}'";
//echo $sql;die;
$res= $dbh->query($sql);
$arr = $res->fetch(PDO::FETCH_ASSOC);

//print_r($arr);exit;
echo json_encode($arr);
