$(function() {
	//加载头尾
	$("#header").load("header.html");
	$("#footer").load("footer.html");

	//pen
	$(".content_wrap > .title_list > .pen").click(function() {
		$(this).css("left", 40).animate({
			left: 725
		}, 470).parent().css({
			"width": "100",
		}).animate({
			width: 1100
		}, 600)
	})

	// 点击提示
	var likeTipsArr = ["娘娘威武","皇上万岁，万万岁","爱死你啦、MUA~","再点一下试试~"]; 
	var ifLikebtnClicked = false;
	$(".like_btn").click(function() {
		if(!ifLikebtnClicked){
			ifLikebtnClicked = true;
			var num = Math.floor(Math.random()*likeTipsArr.length);
			$(".like_tips").html(likeTipsArr[num]);
			doMove();
		}else if(ifLikebtnClicked && $(".like_tips").text()=="再点一下试试~" ){ 
			$(".like_tips").text("喊你点就点嗦~傻");
			doMove();
		}
	})
	loadArticleData();
})


//点赞移动
function doMove() {
	$(".like_tips").animate({
		top: 0,
		opacity: 1
	}, 600, "elasticOut", function() {
		$(".like_tips").delay(600).animate({
			opacity: 0,
			left: -800
		}, 600, "backIn", function() {
			$(".like_tips").css({
				"top": "-200px",
				"left": "258px"
			});
			$(".like_btn").addClass("like_btn_clicked");
		})
	})
}

//加载文章数据的方法
function loadArticleData(){
	if(getUrlParams("type")){
		var aData = articleData[getUrlParams("type")+getUrlParams("articleId")];
		$("#typeTitle").html(aData.data.typeTitle);
		$("#typeEntitle").html(aData.data.typeEntitle);
		$('#articleTitle').text(aData.data.title); 	
		$('#updateTime').text(aData.data.updateAt);	
		$('#cover').attr("src",aData.data.coverImg); 	 	
		$('#author').text(aData.data.creatByFullName); 	
		$('#content').html(aData.data.content);
	}
}














//获取页面url传过来的参数
function getUrlParams(name){
	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 var r = window.location.search.substr(1).match(reg);
	 if(r!=null)
		 return  r[2];
	 else 
		 return "";
}