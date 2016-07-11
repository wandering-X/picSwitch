;
(function ($) {
	$.fn.switchPic= function (settings) {
		settings= $.extend({
			moveSpeedTime: 300,
			intervalTime: 3000,
			hasButtons: true,
			buttons: {
				buttons_color: 'rgba(255,255,255,.50)',
				buttons_onColor: '#fdd601',
				buttons_width: 25,
				buttons_height: 5, 
				buttons_spacing: 8 //button的间距
			},
			title: {
				title_font: '微软雅黑',
				title_size: 16,
				title_color: '#fff',
				title_indent: 20,
				title_height: 45,
				title_bgColor: 'rgba(0,0,0,.40)'
			},
			hasArrows: true,
			arrows: {
				arrows_width: 40,
				arrows_height: 40,
				arrows_font: 50,
				arrows_distance: 20 //切换按钮距离图片边缘的距离
			}
		},settings);
		var _this = this;
		var list = this.children().eq(0);
		var index = 1;
		var indexLen = list.children().length;

		addPic();
		var len = indexLen+2;
		isHasButtons();
		setTitle();
		isHasArrows();
		var buttons = $('.lunbo-btns').find('span');
		var prev = $('.lunbo-switch').find('a#prev');
		var next = $('.lunbo-switch').find('a#next');
		var interval = settings.intervalTime;
		var timer;                                               
		var picWidth = list.children().first().width();
		var listWidth = getListWidth();

		function setTitle(){
			$('.lunboPic a').find('p').css({
				font: settings.title.title_font,
				'font-size': settings.title.title_size+'px',
				color: settings.title.title_color,
				'text-indent': settings.title.title_indent+'px',
				height: settings.title.title_height+'px',
				background: settings.title.title_bgColor,
				'line-height': settings.title.title_height+'px'
			});
		}

		function isHasButtons(){
			if(settings.hasButtons){
				_this.append("<div class='lunbo-btns'></div>");
				for (var i = 0; i < indexLen; i++) {
					$('.lunbo-btns').append("<span index='1'></span>");
					$('.lunbo-btns').find('span').last().attr('index',(i+1));
				}
				$('.lunbo-btns').find('span:first').addClass('lunboBtn-on');
				setButtons();
			}
			else{
				return;
			}
		}

		function addPic(){
			var picBox = list.children();
			picBox.first().before(picBox.first().clone(true).removeClass('lunbo-on'));
			picBox.last().after(picBox.last().clone(true));
		}

		function setButtons(){
			$('.lunbo-btns').css({
				height: settings.title.title_height+'px'
			});
			$('.lunbo-btns').find('span').css({
				width: settings.buttons.buttons_width+'px',
				height: settings.buttons.buttons_height+'px',
				'margin-right': settings.buttons.buttons_spacing+'px'
			});
			setCurBtn();
		}

		function setCurBtn(){
			$('.lunbo-btns').find('span').css({
				background: settings.buttons.buttons_color
			});
			$('.lunbo-btns').find('.lunboBtn-on').css({
				background: settings.buttons.buttons_onColor
			});
		}

		function isHasArrows(){
			if (settings.hasArrows) {
				_this.append("<div class='lunbo-switch'></div>");
				$('.lunbo-switch').append("<a href='javascript:;' id='prev' class='arrow'>&lt;</a>").append("<a href='javascript:;' id='next' class='arrow'>&gt;</a>");
				setArrows();
			}
			else{
				return;
			}
		}

		function setArrows(){
			$('.lunbo-switch').find('a').css({
				'font-size': settings.arrows.arrows_font+'px',
				width: settings.arrows.arrows_width+'px',
				height: settings.arrows.arrows_height+'px',
				'line-height': settings.arrows.arrows_height+'px'
			});
			$('.lunbo-switch').find('a#prev').css({
				left: settings.arrows.arrows_distance
			});
			$('.lunbo-switch').find('a#next').css({
				right: settings.arrows.arrows_distance
			});

		}

		function getListWidth(){
			list.width(picWidth*len);
			return list.width();
		}

		function animate (offset) {  
			var left = parseInt(list.css('left')) + offset;
			if (offset>0) {
				offset = '+=' + offset;
			}
			else {
				offset = '-=' + Math.abs(offset);
			}
			list.animate({'left': offset}, settings.moveSpeedTime, function () {
				if(left > -200){
					list.css('left', -picWidth * indexLen);            
				}
				if(left < (-picWidth * indexLen)) {
					list.css('left', -picWidth);
				}
			});
		}

		function showButton() {
			buttons.eq(index-1).addClass('lunboBtn-on').siblings().removeClass('lunboBtn-on');
			setCurBtn();
		}

		function play() {
			timer = setTimeout(function () {
				next.trigger('click');
				play();
			}, interval);
		}
		function stop() {
			clearTimeout(timer);
		}

		next.bind('click', function () {
			if (list.is(':animated')) {
				return;
			}
			if (index == indexLen) {
				index = 1;
			}
			else {
				index += 1;
			}
			animate(-picWidth);
			showButton();
		});

		prev.bind('click', function () {
			if (list.is(':animated')) {
				return;
			}
			if (index == 1) {
				index = indexLen;
			}
			else {
				index -= 1;
			}
			animate(picWidth);
			showButton();
		});

		buttons.each(function () {
			$(this).bind('click', function () {
				if (list.is(':animated') || $(this).attr('class')=='lunboBtn-on') {
					return;
				}
				var myIndex = parseInt($(this).attr('index'));
				var offset = -picWidth * (myIndex - index);
				animate(offset);
				index = myIndex;
				showButton();
			})
		});

		_this.hover(stop, play);
		play();
	};
})(jQuery);
