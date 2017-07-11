/**
 * Created by cnaisin06 on 2017/6/22.
 */
var website_url = "http://www.cnaisin.com";
// var android_url = "https://pro-app-qn.fir.im/60470926f784a0f7dff9959b572331edf81ee651.apk?attname=爱信公益v.apk_1.1.2.apk&e=1492712441&token=LOvmia8oXF4xnLh0IdH05XMYpH6ENHNpARlmPc-T:4kE7qyQx_cenZ30qmhWHTkFu0K4=";
// var ios_url = "itms-apps://itunes.apple.com/app/id1190774356";   // "https://itunes.apple.com/app/id1190774356";
var android_url = "";
var ios_url = "";
var queryUrl = "https://restapi.cnaisin.com:7443/backend/queryUrl";
var yingyongbaoUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.cnaisin.axgy";

function initUrl(){
    $.ajax({
        url: queryUrl,
        async: false,
        type: "POST",
        success: function(result){
            android_url = result.data.android_url;
            ios_url = result.data.ios_url;
            return false;
        }
    });

}

window.onload = function(){
//        console.log("启动");
    initUrl();
    $("#a_href_url").attr("href", android_url);
    download();
}



/**
 * 下载
 */
function download() {

    //判断访问终端
    var browser={
        versions:function(){
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        }(),
        language:(navigator.browserLanguage || navigator.language).toLowerCase()
    };

    var u = navigator.userAgent.toLowerCase();
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) ||(u.indexOf('iPhone') > -1) || (u.indexOf('Mac') > -1) || (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) ; //ios终端
    var isWeiXin = u.match(/MicroMessenger/i) == "micromessenger";

    if(isiOS){
        $("#iframe1").attr("src", ios_url);
    }else if(isWeiXin && (!isiOS)){
        window.location.href = yingyongbaoUrl;
    }else  if(isAndroid){
        $("#iframe1").attr("src", android_url);
    }else{
        //$("#iframe1").attr("src", android_url);
    }
};