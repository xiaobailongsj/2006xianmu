<?php
$account=$_POST['account'];

$pwd =$_POST['pwd'] ;
$mysqli=new mysqli('127.0.0.1','root','root','2006');
$sql= "select * from `user` where account='$account'||email='$account'||tel='$account'";
//echo $sql;
$res= $mysqli->query($sql);
$arr=mysqli_fetch_assoc($res);
//print_r($arr['pwd']);
//$pwd=password_hash($pwd,PASSWORD_DEFAULT);
if(!empty($arr)){
    if(password_verify($pwd,$arr['pwd'])){
        session_start();
        $_SESSION['user']=$arr['account'];
        $_SESSION['id']=$arr['id'];
        setcookie('user_names',$arr['account'],time()+86400*7);
        setcookie('user_ids',$arr['id'],time()+3600*24*7);
        $time = time();
        $sql="update user set last_logiin='$time' where id = $arr[id]";
        $res= $mysqli->query($sql);
        $response=[
            'error' => 0,
            'mag'=>'登录成功'
        ];

    }else{
        $response=[
            'error' => 50008,
            'mag'=>'密码有误'
        ];
    }
    echo json_encode($response);
}else{
    $response=[
        'error' => 40004,
        'mag'=>'帐号有误'
    ];
    die(json_encode($response));
}