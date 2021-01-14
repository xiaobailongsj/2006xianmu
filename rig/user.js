function ajax(p,node){
    var xhr = new XMLHttpRequest();
    //监听
    xhr.onreadystatechange=function () {
        if(xhr.readyState===4&&xhr.status===200){
            var json_str = xhr.responseText
            var json_obj = JSON.parse(json_str)
            if(json_obj.error>0){
                alert(json_obj.msg)
                node.value = "";//清空input
                node.focus() //获取焦点
            }
        }
    }

    xhr.open('get','verify.php?data='+p)
    xhr.send();
}
//验证用户名
document.getElementById("account").addEventListener('blur',function ()
{
    if(this.value==""){
        return
    }
    var account=this.value;
    ajax(account,this)
})
//验证手机号
document.getElementById('tel').addEventListener('blur',function ()
{
    if(this.value==""){
        return
    }
    var tel=this.value;
    ajax(tel,this)
})
//验证邮箱
document.getElementById('email').addEventListener('blur',function ()
{
    if(this.value==""){
        return
    }
    var email=this.value;
    ajax(email,this)
})

var f=document.forms[0]//获取html文档中第一个 表单
f.addEventListener('submit',function (event) {
    event.preventDefault()
    //获取当前表单中要提交的input
    var inputs = f.getElementsByTagName('input');

    var send_str = ""
    for(var i=0;i<inputs.length;i++){
        if(inputs[i].getAttribute("name")==null)
        {
            continue
        }
        var k = inputs[i].getAttribute("name")
        var v = inputs[i].value
        send_str += k+"="+v+"&"
    }
    //去掉最后一个&
    new_str = send_str.substring(0,send_str.length-1)
    var  xhr= new XMLHttpRequest()
    xhr.onreadystatechange=function () {
        if(xhr.readyState===xhr.DONE){
            if(xhr.status===200){
                var json_str=xhr.responseText
                var json=JSON.parse(json_str)

                if(json.error==0){
                    alert('注册成功')
                    window.location.href='login.html'
                }else{
                    alert(json.mag)
                }
            }
        }
    }
    xhr.open('post','register.php')
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(new_str)
})