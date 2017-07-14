$(function() {
	//加载头尾
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	//滚动
	$(window).scroll(function() {
		var scrollTop = $(document).scrollTop();
		if(scrollTop > 600) {
			$("#scrollBox").show(100);
		} else {
			$("#scrollBox").hide();
		}
	})
	$("#goBack").click(function() {
		var timer = setInterval(function() {
			var scrollTop = $(document).scrollTop();
			var x = scrollTop / 10;
			$(window).scrollTop(scrollTop - x);
			if(scrollTop < 10) {
				clearInterval(timer);
				$(window).scrollTop(0);
			}
		}, 20)
	})

	//banner部分页面切换
	var bannerIndex = 0;
	var bannerLiLength = $("#content1>ul>li").length;

	function showPic(index) {
		$("#btn_warp>i").eq(index).addClass("btn-on").siblings().removeClass("btn-on");
		$("#content1>ul>li").fadeOut(300).eq(index).fadeIn(300);
	}
	$("#prev").click(function() {
		bannerIndex--;
		if(bannerIndex < 0) bannerIndex = bannerLiLength - 1;
		showPic(bannerIndex);
	})
	$("#next").click(function() {
		bannerIndex++;
		if(bannerIndex > bannerLiLength - 1) bannerIndex = 0;
		showPic(bannerIndex);
	})
	$("#btn_warp>i").click(function() {
		bannerIndex = $(this).index();
		showPic(bannerIndex);
	})

	//产品部分
	var proIndex = 0;
	var proLiLength = $("#product_content>li").length;

	function showPro(index, now) {
		$("#now_btn>.now_btn").eq(now).find("i").addClass("now_btn_on").end().siblings().find("i").removeClass("now_btn_on");
		index > now ? $("#product_content>li").hide().eq(now).addClass("fadeInLeft").show().siblings().removeClass("fadeInRight fadeInLeft") : $("#product_content>li").hide().eq(now).addClass("fadeInRight").show().siblings().removeClass("fadeInRight fadeInLeft");
	}
	$("#now_btn>.now_btn>span").click(function() {
		var now = $(this).parent().index();
		showPro(proIndex, now);
		proIndex = now;
	})
	$("#pro_prev").click(function() {
		proIndex--;
		if(proIndex < 0) proIndex = proLiLength - 1;
		$("#now_btn>.now_btn").eq(proIndex).find("i").addClass("now_btn_on").end().siblings().find("i").removeClass("now_btn_on");
		$("#product_content>li").hide().eq(proIndex).addClass("fadeInLeft").show().siblings().removeClass("fadeInRight fadeInLeft")
	})
	$("#pro_next").click(function() {
		proIndex++;
		if(proIndex > proLiLength - 1) proIndex = 0;
		$("#now_btn>.now_btn").eq(proIndex).find("i").addClass("now_btn_on").end().siblings().find("i").removeClass("now_btn_on");
		$("#product_content>li").hide().eq(proIndex).addClass("fadeInRight").show().siblings().removeClass("fadeInRight fadeInLeft")
	})

	//服务部分
	$(".yewu_btn").click(function() {
		if($(this).parent().siblings().is(":hidden")) {
			$(this).css("background-position-y", "67px");
			$(this).parent().siblings().slideDown();
			$(this).parent().parent().siblings().find(".yewu_detail").slideUp();
			$(this).parent().parent().siblings().children().find(".yewu_btn").css("background-position-y", "0px");
		} else {
			$(this).css("background-position-y", "0px");
			$(this).parent().siblings().slideUp();
		}
	})

	//团队部分
	var teamLiLength = $("#content5 ul li").length; //图片总张数
	var teamIndex = 0;
	var liwidth = $("#content5 ul li").width(); //图片的宽度
	function change(){
		$("#team_next").trigger("click");
	}
	var timer = setInterval(change,4000);
	$("#content5 ul>li").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(change,4000);
	})
	$("#team_prev").click(function() {
		clearInterval(timer);
		$("#content5 ul:not(:animated)").prepend($("#content5 ul>li").last()).css("left", -liwidth);
		$("#content5 ul:not(:animated)").animate({
			left: liwidth / 10
		}, 500).animate({
			left: 0
		}, 500, function() {
			teamIndex--;
			if(teamIndex < 0) teamIndex = teamLiLength - 1;
			$("#team_btn_warp>i").removeClass("btn-on").eq(teamIndex).addClass("btn-on");
			timer = setInterval(change,4000);
		})
	});
	$("#team_next").click(function() {
		clearInterval(timer);
		$("#content5 ul:not(:animated)").animate({
			left: liwidth / 10
		}, 500).animate({
			left: -liwidth
		}, 500, function() {
			teamIndex++;
			if(teamIndex > teamLiLength - 1) teamIndex = 0;
			$("#content5 ul").css("left", 0).append($("#content5 ul>li").first());
			$("#team_btn_warp>i").removeClass("btn-on").eq(teamIndex).addClass("btn-on");
			timer = setInterval(change,4000);
		})
	});


	//地图部分
	//创建和初始化地图函数：
	function initMap() {
		createMap(); //创建地图
		setMapEvent(); //设置地图事件
		addMapControl(); //向地图添加控件
	}

	//创建地图函数：
	function createMap() {
		var map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图
		var point = new BMap.Point(106.580011, 29.573863); //定义一个中心点坐标
		map.centerAndZoom(point, 11); //设定地图的中心点和坐标并将地图显示在地图容器中
		map.setCurrentCity("重庆"); // 设置地图显示的城市 此项是必须设置的
		window.map = map; //将map变量存储在全局
	}

	//地图事件设置函数：
	function setMapEvent() {
		map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
		//      map.enableScrollWheelZoom();//启用地图滚轮放大缩小
		map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
		map.enableKeyboard(); //启用键盘上下左右键移动地图
	}

	//获取定位
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r) {
		if(this.getStatus() == BMAP_STATUS_SUCCESS) {
			var mk = new BMap.Marker(r.point);
			mk.addEventListener("click", function(e){
			    searchInfoWindow.open(mk);
			})
			mk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
			map.addOverlay(mk);
			map.panTo(r.point);
			//			alert('您的位置：'+r.point.lng+','+r.point.lat);
		} else {
			alert('failed' + this.getStatus());
		}
	}, {
		enableHighAccuracy: true
	})

	//地图控件添加函数：
	function addMapControl() {
		//向地图中添加缩放控件
		var ctrl_nav = new BMap.NavigationControl({
			anchor: BMAP_ANCHOR_TOP_LEFT,
			type: BMAP_NAVIGATION_CONTROL_LARGE
		});
		map.addControl(ctrl_nav);
		//向地图中添加比例尺控件
		var ctrl_sca = new BMap.ScaleControl({
			anchor: BMAP_ANCHOR_BOTTOM_LEFT
		});
		map.addControl(ctrl_sca);
	}
	initMap(); //创建和初始化地图
})