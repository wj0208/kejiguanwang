var SWITCH = false;
var COUNT = 0;
$(function() {

	//各个模块窗口大小发生变化的模块大小设置
	setHeight($(".main_wrap"));
	setHeight($('.con'));
	$(".welcome_wrap").height(window.innerHeight);
	$('.describle').width(window.innerWidth);
	$(window).resize(function() {
		setHeight($(".main_wrap"));
		setHeight($('.con'));
		$(".welcome_wrap").height(window.innerHeight);
		$('.describle').width(window.innerWidth);
	})

	//欢迎页面部分
	$('.welcome_content').delay(5000).animate({
		top: 40 + "%"
	}, 500, "linear");
	setTimeout(function() {
		$('.welcome_animated').each(function() {
			var me = $(this);
			setTimeout(function() {
				me.show().addClass('animated fadeInUp')
			}, 500)
		});
		setTimeout(function() {
			$(".welcome_wrap").slideUp(600);
			SWITCH = true;
		}, 2500)
	}, 4800)
	setTimeout(function(){
		$('.welcome_slider').fadeIn(500,function(){
			$('.welcome_slider').delay(2000).fadeOut(500);
		});
	},500)
	//双击直接进入页面
	var conClick = false;
	$('.welcome_content').click(function() {
		if(conClick) {
			$(".welcome_wrap").slideUp(600)
			SWITCH = true;
		} else {
			conClick = true
		}
	})

	//导航点击进入相应的位置
	if(getUrlParams("COUNT")){
		$(".welcome_wrap").hide();
		SWITCH = true;
		var nowIndex = parseInt(getUrlParams("COUNT"));
		var me = $('.nav_list').eq(nowIndex).find('h1');
		if(nowIndex < 3) {
			$('.con_wrap:not(:animated)').animate({
				top: -$('.con').height() * (nowIndex + 1)
			}, 400, function() {
				COUNT = nowIndex+1;
				me.parent().addClass('now');
				me.parent().siblings().removeClass('now');
			})
		} else if(nowIndex == 3 || nowIndex == 4) {
			$('.con_wrap:not(:animated)').animate({
				top: -$('.con').height() * 4
			}, 400, function() {
				COUNT = 4;
				me.parent().siblings().removeClass('now');
				me.parent().parent().find('.nav_list').eq(3).addClass('now');
				me.parent().parent().find('.nav_list').eq(4).addClass('now');
			})
		}
	}
	$('.nav_list>h1').click(function() {
		var me = $(this);
		var nowIndex = $(this).parent().index();
		if(nowIndex < 3) {
			$('.con_wrap:not(:animated)').animate({
				top: -$('.con').height() * (nowIndex + 1)
			}, 400, function() {
				COUNT = nowIndex+1;
				me.parent().addClass('now');
				me.parent().siblings().removeClass('now');
			})
		} else if(nowIndex == 3 || nowIndex == 4) {
			$('.con_wrap:not(:animated)').animate({
				top: -$('.con').height() * 4
			}, 400, function() {
				COUNT = 4;
				me.parent().siblings().removeClass('now');
				me.parent().parent().find('.nav_list').eq(3).addClass('now');
				me.parent().parent().find('.nav_list').eq(4).addClass('now');
			})
		}
	})

	//首页点击向下
	$('.donext').click(function() {
		$('.con_wrap:not(:animated)').animate({
			top: -$('.con').height()
		}, 500)
	})

	//概述部分
	$('.prev').css("opacity", ".5")
	$('.prev').click(function() {
		$('.next').css("opacity", "1")
		var desWidth = $('.describle').width();
		var nowLeft = $('.con2_wrap').css('left').split("px")[0];
		nowLeft = parseInt(nowLeft);
		if(nowLeft < 0) {
			$('.con2_wrap:not(:animated)').animate({
				left: nowLeft + desWidth
			}, 800)
		} else {
			$(this).css("opacity", ".5")
		}
	})
	$('.next').click(function() {
		$('.prev').css("opacity", "1")
		var desWidth = $('.describle').width();
		var nowLeft = $('.con2_wrap').css('left').split("px")[0];
		nowLeft = parseInt(nowLeft);
		if(nowLeft > -desWidth * 2) {
			$('.con2_wrap:not(:animated)').animate({
				left: nowLeft - desWidth
			}, 800)
		} else {
			$(this).css("opacity", ".5")
		}
	})

	//呼吸框
	setInterval(function() {
		$(".bing_img").fadeIn(1200, function() {
			$(".bing_img").delay(100).fadeOut(800);
		})
	}, 2000)

	//掌云
	$(".btn_right").click(function() {
		$me = $(this);
		$(".yun_btn.now").animate({
			"left": "78px"
		}, 100, function() {
			$(".yun_btn.now").removeClass("now");
			$me.find(".yun_btn").animate({
				"left": "0px"
			}, 400).addClass("now");
		});
		$(".slider_box").animate({
			"left": "-910px"
		}, 600)
	});

	$(".btn_left").click(function() {
		$me = $(this);
		$(".yun_btn.now").animate({
			"left": "-78px"
		}, 100, function() {
			$(".yun_btn.now").removeClass("now");
			$me.find(".yun_btn").animate({
				"left": "0px"
			}, 400).addClass("now");
		});
		$(".slider_box").animate({
			"left": "0px"
		}, 600)
	})
})

function setHeight(obj) {
	obj.height(window.innerHeight - 50);
}

//滚动切换部分
var num = 0;
var bool = true;

function fn(e) {
	if(SWITCH) {
		e = e || event;
		/*console.log(e.wheelDelta);//谷歌  120  -120
		console.log(e.detail);//火狐  3  -3*/
		num++;
		if(num == 2) {
			num = 0;
			if(bool) {
				bool = false;
				//火狐浏览器处理部分
				if(e.detail) {
					if(e.detail < 0) {
						//					console.log("向上滚")
						COUNT--;
						if(COUNT < 1) COUNT = 0;
						$('.con_wrap:not(:animated)').animate({
							top: -$('.con').height() * COUNT
						}, 500,function(){
							$('.nav_wrap').find('div').removeClass('now').eq(COUNT).addClass('now');
						})
					} else {
						//					console.log("向下滚")
						COUNT++;
						if(COUNT > $('.con').length - 1) COUNT = $('.con').length - 1;
						$('.con_wrap:not(:animated)').animate({
							top: -$('.con').height() * COUNT
						}, 500,function(){
							$('.nav_wrap').find('div').removeClass('now').eq(COUNT).addClass('now');
						})
					}
				}
				//谷歌浏览器处理部分
				if(e.wheelDelta) {
					if(e.wheelDelta > 0) {
						//					console.log("向上滚" + COUNT)
						COUNT--;
						if(COUNT < 1) COUNT = 0;
						$('.con_wrap:not(:animated)').animate({
							top: -$('.con').height() * COUNT
						}, 500,function(){
							var now = COUNT-1;
							if(now<0) now = 0;
							$('.nav_wrap').find('div').removeClass('now').eq(now).addClass('now');
						})
					} else {
						//					console.log("向下滚" + COUNT)
						COUNT++;
						if(COUNT > $('.con').length - 1) COUNT = $('.con').length - 1;
						$('.con_wrap:not(:animated)').animate({
							top: -$('.con').height() * COUNT
						}, 500,function(){
							if(COUNT-1>2){
								$('.nav_wrap').find('div').removeClass('now');
								$('.nav_wrap').find('div').eq(COUNT).addClass('now');
								$('.nav_wrap').find('div').eq(COUNT-1).addClass('now');
							}else{
								$('.nav_wrap').find('div').removeClass('now').eq(COUNT-1).addClass('now');
							}
						})
					}
				}
				setTimeout(function() {
					bool = true;
				}, 1000)
			}
		}

	}

}
document.onmousewheel = fn; //谷歌
document.addEventListener('DOMMouseScroll', fn); //火狐

function loadPart(){
	$(".welcome_wrap").hide();
	SWITCH = true;
	var $h1 = $('.nav_list').eq(getUrlParams("COUNT")).find('h1');
	$h1.trigger("click")
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