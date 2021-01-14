<?php

$account=$_POST['account'];
$tel=$_POST['tel'];
$email=$_POST['email'];

$pwd=$_POST['pwd'];
$is_pwd=$_POST['is_pwd'];
$time= time();
//链接数据库
$mysqli=new mysqli('127.0.0.1','root','root','2006');
//验证密码
if(strlen($pwd)<6){

        $response=[
            'error' => 40002,
            'mag'=>'密码不能小于六位'
        ];
        die(json_encode($response));


}
//验证用户名手机号邮箱唯一性
if(!empty($account)){
    $sq="select * from `user` where account='$account'";
//    echo $sq;die;
    $res=$mysqli->query($sq);
    $arr=mysqli_fetch_all($res);
    if(!empty($arr)){
        $response=[
            'error' => 40001,
            'mag'=>'用户名已存在'
        ];
       die(json_encode($response));
    }
}
if(!empty($tel)){
    $sq="select * from `user` where tel='$tel'";
//    echo $sq;die;
    $res=$mysqli->query($sq);
    $arr=mysqli_fetch_all($res);
    if(!empty($arr)){
        $response=[
            'error' => 40003,
            'mag'=>'手机号已存在'
        ];
        die(json_encode($response));

    }
}
if(!empty($email)){
    $sq="select * from `user` where email='$email'";
//    echo $sq;die;
    $res=$mysqli->query($sq);
    $arr=mysqli_fetch_all($res);
    if(!empty($arr)){
        $response=[
            'error' => 40004,
            'mag'=>'邮箱已存在'
        ];
        die(json_encode($response));

    }
}
$pwd = password_hash($pwd,PASSWORD_DEFAULT);
if(password_verify($is_pwd,$pwd)){

    $sql="insert into user(account,tel,email,pwd,time)values ('$account','$tel','$email','$pwd','$time')";
//echo $sql;die;
    $res=$mysqli->query($sql);

    if($res){
        $response=[
            'error' => 0,
            'mag'=>'注册成功'
        ];
    }else{
        $response=[
            'error' => 50008,
            'mag'=>'注册失败'
        ];
    }
   echo json_encode($response);
}else{
    $response=[
        'error' => 50009,
        'mag'=>'密码不一致'
    ];
    die(json_encode($response));
}
