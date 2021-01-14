var forms=document.forms[0]
forms.addEventListener('submit',function (event) {
    event.preventDefault();
    var inputs=document.getElementsByTagName('input');
    // console.log(inputs)
    var send_str="";
    for (var i=0;i<inputs.length;i++){
        if(inputs[i].getAttribute("name")==null){
            continue
        }
        var k = inputs[i].getAttribute('name')
        var v = inputs[i].value
        send_str += k+"="+v+'&'
    }
    //去掉最后一个&
    new_str = send_str.substring(0,send_str.length-1)
    console.log(new_str)
    var xhr = new  XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState===4&&xhr.status===200){
            var json_str=xhr.responseText
            var json=JSON.parse(json_str)

            if(json.error==0){
                alert('登录成功')

                window.location.href='my.php'
            }else{
                alert(json.mag)
            }
            // alert(xhr.responseText)
        }
    }

    xhr.open('post','login.php')
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(new_str)
})