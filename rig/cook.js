var time = 3
var times=setInterval(function () {

    if(time>=0){
        var s = Math.floor(time%60)
        var tim=s+'秒'
        document.getElementById('time').innerText=tim
        // console.log(time)
        time--
    }else{
        clearInterval(times)
        document.getElementById("time").style.display="none";

        // function getMyCookie(key) {
        //     var val = "";
        //
        //     // 对cookie操作
        //     var cookies = document.cookie;
        //     console.log(cookies)
        //     cookies = cookies.replace(/\s/, "");
        //     var cookie_array = cookies.split(";");
        //     console.log(cookie_array)
        //     for (i = 0; i < cookie_array.length; i++) {
        //         //cookie_array中的值是一个（A=B）的形式，A为键，B为对应的值
        //         var cookie = cookie_array[i];
        //         var array = cookie.split("=");
        //         console.log(array)
        //         if (array[0] == key) {
        //             val = array[1];
        //         }
        //
        //     }
        //     return val;
        //
        // }

        var user_names = getCookie("user_names");
        var user_id= getCookie("user_ids");
        // var cookies = getCookie.withConverter({
        //     read: function (value, name) {
        //         if (name === 'escaped') {
        //             return unescape(value)
        //         }
        //         // Fall back to default for all other cookies
        //         return Cookies.converter.read(value, name)
        //     }
        // })
        // cookies.get("user_names") // 北
        // cookies.get("user_ids") // 北
        // cookies.get() // { escaped: '北', default: '北' }
        // console.log(user_names)
        $.ajax({
            url:'api.php',
            method:'GET',
            data:{user_names:user_names,user_ids:user_id},
            dataType:'json'
        }).done(function (d) {
            function timestampToTime(timestamp) {
                var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                return Y+M+D+h+m+s;
            }
            $('#a').append(d['email'])
            $('#b').append(timestampToTime(d['last_logiin']))
            $('#c').append(timestampToTime(d['time']))
        })


    }



},1000)
