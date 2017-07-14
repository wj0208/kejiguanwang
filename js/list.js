var GLOBAL = GLOBAL || {};
$(function() {
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	$("#content_warp > h3 > span").click(function() {
		$(this).css("left", 40).animate({
			left: 1039
		}, 800).parent().css({
			"width": "100",
		}).animate({
			width: 1100
		}, 800)
	})
	loadArticleList();

	//点击下一页，加载对应页面数据
	$("#listMore").click(function() {
		if(GLOBAL.pageStart < GLOBAL.pageCount) {
			loadArticleList();
		}
	})
	
	$("#articleList").delegate(".content_one","click",function(){
		window.open("article.html?type="+getUrlParams("type")+"&articleId="+$(this).attr("articleid")+"");
	})
})
//加载列表数据方法

function loadArticleList() {
	if(!GLOBAL.pageStart) {
		$('#articleList').html("");
		GLOBAL.pageStart = 0;
	}
	var itemHtml = "";
	var articleData = listData["listData0" + GLOBAL.pageStart];
	var articleList = articleData.data.list;
	if(!articleList || !articleList.length) {
		$('#articleList').html("此部分暂时没有内容，敬请期待");
	} else {
		var updateTime;
		for(var i = 0; i < articleList.length; i++) {
			updateTime = articleList[i].creatAt;
			itemHtml = $("#itemHtml").html().replace("$articleCover$", articleList[i].coverImg)
				.replace("$articleId$", articleList[i].sysId)
				.replace("$articleTitle$", articleList[i].title)
				.replace("$updateTime$", updateTime.substr(0, 10))
				.replace("$describe$", articleList[i].describe);
			$("#articleList").append(itemHtml);
		}
		GLOBAL.pageStart = articleData.data.pageStart + 1;
		GLOBAL.pageCount = Math.ceil(articleData.data.count / articleData.data.pageSize);
		if(GLOBAL.pageStart >= GLOBAL.pageCount) {
			$("#listMore").css("opacity", "0").prev("img").attr("src", "img/list_gomore_bg_nomore.jpg");
		}
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
