(function(){
    $.urlParam = function(name) {　　
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results) {
            return results[1];
        } else {
            return 0;
        }
    };
    var getByteLen = function (val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            if (val[i].match(/[^x00-xff]/ig) != null) //全角
                len += 2;
            else
                len += 1;
        };
        return len;
    }
    // $(".bg").css("height",window.screen.height+"px");
    var name = decodeURIComponent($.urlParam("name"));
    if(!name || getByteLen(name)>10){
        window.location.href="index.html";
        return;
    }

    if($.fn.cookie("name") ==name){
        $("#save").show();
    }else{
        $("#go").show();
        $("#output2").hide();

    }
    $("#go").click(function(){
        window.location.href="index.html";
    });
    $("#canvasRadar").attr("width",600/window.devicePixelRatio);
    $("#canvasRadar").attr("height",600/window.devicePixelRatio);
    var getPoint = function(name){
        var a = md5(name);
        var points = [];
        for(var i=0;i<7;i++){
            console.log(a[i]);
            var p = a[i];
            if(p=='a'){
                p=5;
            }else if(p=='b'){
                p=4;
            }else if(p=='c'){
                p=3;
            }else if(p=='d'){
                p=4;
            }else if(p=='e'){
                p=1;
            }else if(p=='f'){
                p=0;
            }else{
                p = p % 6+1;
                if(p==6){
                    p=10;
                }
            }

            points.push(p);
        }
        console.log(points);
        return points;
    }

    var width = window.screen.width;


    // $("#canvas").css("width",width+"px");
    // $("#canvas").css("height", width * 1.5 +"px");
    var c=document.getElementById("canvas");
    var cxt=c.getContext("2d");
    // cxt.moveTo(0,0);
    // cxt.lineTo(300,150);
    // cxt.lineTo(0,150);
    // cxt.stroke();
    var img = document.createElement('img')
    img.src = 'images/bg02.jpg';
    img.onload = function(e) {
        cxt.drawImage(img, 0, 0, 720, 1136);
        // var img2 = document.createElement('img')
        // img2.src = 'images/result_bg.png';
        // img2.onload = function(e) {
            // cxt.drawImage(img2,64, 200, 592, 528);
            var img3 = document.createElement('img')
            img3.src = 'images/title3.png';
            img3.onload = function(e) {
                cxt.font = "50px PingFangSC-Semibold";
                cxt.fillStyle="#006bd1";
                var namepx = cxt.measureText(name).width;
                var namex = (720 - namepx - 363)/2;
                var imagex = namex + namepx+20;
                cxt.drawImage(img3,imagex, 60, 400, 150);

                // var x = 360 - 25*getByteLen(name)/2;
                cxt.fillText(name, namex, 90);




                var d=document.getElementById("canvasRadar");
                var cxt2=d.getContext("2d");
                var data = {
                    labels : ["颜如玉","有气质","污","小蛮腰","爱撒娇","温柔","善良"],
                    datasets : [
                        {
                            fillColor : "rgba(0,121,212,0.5)",
                            strokeColor : "rgba(0,121,212,1)",
                            pointColor : "#0079D4",
                            pointStrokeColor : "#fff",
                            data : getPoint(name)
                        }
                    ]
                }
                new Chart(cxt2).Radar(data,{
                    animation : false,
                    scaleOverride:true,
                    scaleShowLine:true,
                    scaleStartValue:0,
                    scaleStepWidth:1,
                    scaleLineColor : "rgba(0,0,0,.1)",
                    scaleLineWidth : 1,
                    scaleShowLabels : false,
                    scaleSteps:5,
                });
                var y = 170;
                if(window.devicePixelRatio==3){
                    y= 130;
                }
                cxt.drawImage(d, 60, y);


                var dataUrl = c.toDataURL();
                document.getElementById("output").src = dataUrl;
                //ToDO
               // var url = "http://www.mygushi.win/aly/index.html"; //这里要改为正式的域名
                var url = "http://weixin.qq.com/r/2jorM9bEWYsmrZJQ92-I";  //
               //var url = "http://weixin.qq.com/r/qTrz6wLEKl9VrUaI92_7";  
                var qrcode = new QRCode("qrcode", {
                    text: url,
                    width: 140,
                    height: 140,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });

                setTimeout(function(){
                    cxt.font = "20px PingFangSC-Semibold";
                    cxt.drawImage($('#qrcode img').get(0), (720-128)/2 , 1000 -128 -30);
   /*                 cxt.fillText('公众号回复 “爱”', 460, 900);
                    cxt.fillText('测测你被爱的七大理由', 460, 930);*/
                    var dataUrl = c.toDataURL();
                    document.getElementById("output2").src = dataUrl;
                },500)


            }

        // };
    };

    // var res = {
    //     "debug": false,
    //     "beta": false,
    //     "appId": "wxa0085f0f71352599",
    //     "nonceStr": "xKWhSdHXNN",
    //     "timestamp": 1477366871,
    //     "url": "http://www.uullnn.com/h5/seven/result.html",
    //     "signature": "5544476bea3e6e976e216614e0ca13542d0dddd2",
    //     "jsApiList": [
    //         "onMenuShareTimeline",
    //         "onMenuShareAppMessage"
    //     ]
    // };
    // wx.config(res);
    // wx.ready(function(){
    //     var name = decodeURIComponent($.urlParam("name"));
    //     setShare('七原罪属性测试', name+'的被隐藏的七原罪属性图', window.location.href.replace("result.html","images/cover.jpeg"));
    // });

    // $.get(window.location.href.replace('h5/seven/result.html', 'wechat_config'), function (res) {
    //     // console.log(res);
    //     // res.debug = true;
    //     wx.config(res);
    //     wx.ready(function(){
    //         var name = decodeURIComponent($.urlParam("name"));
    //         setShare('七原罪属性测试', name+'的被隐藏的七原罪属性图', window.location.href.replace("result.html","images/cover.jpeg"));
    //     });
    // }, 'json');
})();

function setShare(title, desc, imgUrl) {
//            var title = '【微信昵称】的颜值价值【结果】,超过全国【百分比】的人。';
    var link = window.location.href;
//            var imgUrl = '';
//            var desc = '你能靠脸吃饭吗?让科学数据告诉你,你的颜值值多少钱。';
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
//                    window.location.href=$appLink;
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
//                    window.location.href=$appLink;
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}
