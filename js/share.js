/**
 * Created by cnaisin06 on 2017/6/22.
 */

$(function () {
//                var actId = '${!(obj.actId)}' || '';
//                var userId = '${!(obj.userId)}' || '';
    var actId = "30";
    var userId = "VGVzdF9jYlVGS0d6bjNscFo=";

    function dateConvert(dateStr){
        var da = Number(dateStr);
        da = new Date(da);
//             var year = da.getFullYear()+'年';
        var month = da.getMonth()+1+'月';
        var date = da.getDate()+'日';
        var hour = da.getHours();
        var minute = da.getMinutes() < 10 ? "0" + da.getMinutes() : da.getMinutes() ;
//             console.log([year,month,date].join(''));
        return [month,date].join('') + " "  + hour + ":"+ minute
    }
    $.ajax({
//                    url:"https://192.168.31.248:8443/backend/share/act",
        url:baseUrl,
        datatype:"json",
        data: {"actId": actId, "userId": userId},
        type:"post",
        success: function (result) {
//                        console.log(result);
//                        console.log(result.data.collectionTimePlace.length);
//                        console.log(result.data.sponsorshipSupport);
//                        console.log(result.data.customLabel);
//                        console.log(result.data.activityTabs);
//                        console.log(result.data.userName);
//                        console.log(result.data.actStatus);
            //活动开始时间
            var startTime = dateConvert(result.data.startTime);
            //结束时间
            var finishTime = dateConvert(result.data.finishTime);
            console.log(finishTime);
//                      console.log([year,month,date].join(''));

            //活动状态
            if(result.data.actStatus == "Preparation"){
                $(".zhuangtai").html("报名中");
                $(".zhuangtai").css({"background-image":"url('./images/状态背景.png')"})
            }
            if(result.data.actStatus == "Processing"){
                $(".zhuangtai").html("进行中");
                $(".zhuangtai").css({"background-image":"url('./images/状态背景.png')"})
            }
            if(result.data.actStatus == "Finish"){
                $(".zhuangtai").html("已结束");
                $(".zhuangtai").css({"background-image":"url('./images/gray.png')"})
                $(".zhuangtai").css({"color":"#666"})
            }
            if(result.data.actStatus == "Archived"){
                $(".zhuangtai").html("已结束");
                $(".zhuangtai").css({"background-image":"url('./images/gray.png')"})
                $(".zhuangtai").css({"color":"#666"})
            }

            //活动集合时间
            var collect, year1, month1, date1;
            if(result.data.collectionTimePlace.length != 0 ){
                var collect = Number( $.inArray("collectionTime", result.data.collectionTimePlace[0]) ? result.data.collectionTimePlace[0].collectionTime : "");
                collect = new Date(collect);
                var year1 = collect.getFullYear()+'年';
                var month1 = collect.getMonth()+1+'月';
                var date1 = collect.getDate()+'日';
                if([year1,month1,date1].join('')){
                    $(".collecttime").html([year1,month1,date1].join(''))
                }

            }
            if(result.data.collectionTimePlace.length == 0){
                $(".jihetime").css({"display":"none"})
            }

            $(".top img").attr("src",result.data.coverPicture);
            //活动标题
            $(".title").html(result.data.actName)
            //地址和时间
            if(result.data.addressAndTime.length != 0){
                $(".adress").html(result.data.addressAndTime[0].province
                    +result.data.addressAndTime[0].city
                    +result.data.addressAndTime[0].district
                    +result.data.addressAndTime[0].street
                )
            }
            $(".starttime").html( startTime + " 至 " + finishTime )
            if(result.data.customLabel){
                var obj = result.data.customLabel;
                for(var i=0;i<obj.length;i++){
                    var span1=document.createElement("span");
                    span1.setAttribute("class","span1")
                    var str = obj.toString();
                    console.log(str);
                    var arr = str.split(",")
                    console.log(arr);
                    $(".div").append(span1);
                    $(".span1").html(str);
                }
            }

            //集合地点和时间
            if(result.data.collectionTimePlace.length != 0){
                $(".collectadress").html(result.data.collectionTimePlace[0].province
                    +result.data.collectionTimePlace[0].city
                    +result.data.collectionTimePlace[0].district
                    +result.data.collectionTimePlace[0].street
                )
            }
            if(result.data.collectionTimePlace.length == 0){
                $(".jihedidian").css({"display":"none"})
            }

            //赞助支持
            if(result.data.sponsorshipSupport.length != 0){
                if(result.data.sponsorshipSupport[0].title||result.data.sponsorshipSupport[0].content||!result.data.sponsorshipSupport[0].content){
                    if(result.data.sponsorshipSupport[0].title.length < 13){
                        $(".response").html(result.data.sponsorshipSupport[0].title);
                    }
                    if(result.data.sponsorshipSupport[0].title.length >= 13){
                        var subtitle = result.data.sponsorshipSupport[0].content.substring(0,13);
                        subtitle = subtitle.replace(subtitle.charAt(subtitle.length-1),"...")
                        $(".response").html(subtitle);
                    }
                }
                if(result.data.sponsorshipSupport[0].title == ""&&result.data.sponsorshipSupport[0].content.length < 13){
                    $(".response").html(result.data.sponsorshipSupport[0].content);
                }
                if(result.data.sponsorshipSupport[0].title == ""&&result.data.sponsorshipSupport[0].content.length >= 13){
                    var sub= result.data.sponsorshipSupport[0].content.substring(0,13);
                    sub=sub.replace(sub.charAt(sub.length-1),"...")
                    $(".response").html(sub);
                }
            }
            if(result.data.sponsorshipSupport.length == 0){
                $(".zanzhu").hide()
            }

            if(result.data.relatedUserAct == "NotJoin"||result.data.relatedUserAct == "AppliedJoin"){
                $(".acting").html("");
                $(".role").html("");
            }
            if(result.data.relatedUserAct == "ActAdmin"){
                $(".role").html("担任管理员");
            }
            if(result.data.relatedUserAct == "ActLeader"){
                $(".role").html("担任负责人");
            }
            if(result.data.relatedUserAct == "ActParter"){
                $(".role").html("担任参与者");
            }
            //分享者姓名
            $(".sharer").html(result.data.userName);

//                      $(".fee").html(result.data.fee)

            //判断是真实姓名还是昵称
            if(result.data.actLeader.trueName != ""){
                $(".username").html(result.data.actLeader.trueName)
            }
            if(result.data.actLeader.trueName == ""){
                $(".username").html(result.data.actLeader.nickName)
            }
            //判断头像
            if(result.data.actLeader.photoUrl == ""){
//                            $(".userUrl").attr("src","images/默认头像.png")
            }
            else{
                $(".userUrl").attr("src",result.data.actLeader.photoUrl)
            }
            //动态更换title
            if(result.data.actLeader.trueName)
                document.title = result.data.actName+"_爱信公益,让公益更简单";
            var html = template("scale",result.data)
            $(".scale").html(html);
            var html1 = template("team",result.data)
            $(".team").html(html1);
            var html2 = template("mask",result.data)
            $(".tip").html(html2);

            var html3 = template("details",result.data)
            $("#box").html(html3);
            $("#box").find("#showbox0").css({"display":"block"}).siblings().css({"display":"none"})
            $(function () {
                var isopen = true;
                $("#btn").on("click", function () {
                    if(isopen){
                        $("#box").find("#showbox0").css({"display":"block"}).siblings().slideToggle();
                        $(this).find("span").html("收起")
                        $(this).find("img").attr("src","${ctxPath}/static/images/上箭头.png")
                    }
                    else{
                        $("#box").find("#showbox0").css({"display":"block"}).siblings().slideToggle();
                        $(this).find("span").html("展开");
                        $(this).find("img").attr("src","${ctxPath}/static/images/下箭头.png")
                    }
                    isopen =!isopen;
                })
            })
        }
    })
})
$(function () {
    $(".close").on("click", function () {
        $(".links").fadeOut()
    })
    $(".downloading").on("click", function () {
        window.location.href = "./download.html"
    })
})