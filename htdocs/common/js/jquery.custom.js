(function($){
	var agent = navigator.userAgent,
		$win  = $(window),
		isIE = agent.match(/msie/i),
		isIE6 = agent.match(/msie [6.]/i),
		isIE7 = agent.match(/msie [7.]/i),
		isIE8 = agent.match(/msie [8.]/i),
		isIE9 = agent.match(/msie [9.]/i),
		isIE10 = agent.match(/msie [10.]/i),
		modern = 1;
	if(agent.search(/iPhone/) != -1){
		agent = 'iPhone';
	}else if(agent.search(/iPad/) != -1){
		agent = 'iPad';
	}else if(agent.search(/Android/) != -1){
		agent = 'Android';
	}else{
		agent = 'PC';
	}
	if(isIE) {
		if(isIE6){
			modern = 0;
		}else if(isIE7) {
			modern = 0;
		}else if(isIE8) {
			modern = 0;
		}else if(isIE9) {
			modern = 0;
		}else {
			modern = 1;
		}
	}
	// bodyにエージェントクラスを付与
	$('body').addClass(agent);
	$(function() {
			$.fn.common.machhight();
			$.fn.common.headBoxfixed();
			$.fn.common.gnavfixed1();
			$.fn.common.gnavfixed2();
			$.fn.common.echo();
			$.fn.common.spNav();
			$.fn.common.menuClickClose();
			$.fn.common.breakpoint(0);
			$.fn.common.menuActive();
			$.fn.common.menuActive2();
			$.fn.common.seo();
			$.fn.common.fontset();
			$.fn.common.tel();
			$.fn.common.splink();
			$.fn.common.faq();
			$.fn.common.scroll();
			$.fn.common.scroll2();
			$.fn.common.scroll3();
			$.fn.common.scroll4();
	});
	$.fn.common={
		machhight: function(){
			$('.item').matchHeight();
		},
		gnavfixed1: function(){
			// var nav = $('#gNavWrap'),
			// offset = nav.offset();
			var top = $(window).scrollTop();
			if($(window).scrollTop() < 40) {
				$('body').addClass('no-scroll');
			}
			$(window).scroll(function () {
				top = $(window).scrollTop();
				if($(window).scrollTop() > 40) {
						$('body').addClass('scroll');
						$('body').removeClass('no-scroll');
						// nav.addClass('fixed');
				} else {
						$('body').removeClass('scroll');
						$('body').addClass('no-scroll');
						// nav.removeClass('fixed');
				}
			});
			// topページの時はMV下に移動
			$('.index #float_inq_menu').prependTo('#float_inq_menu_wrap');

		},
		gnavfixed2: function(){
			var nav = $('.top #gNavWrap'),
			offset = nav.offset();
			// console.log(offset);
			$(window).scroll(function () {
			  if($(window).scrollTop() > 160) {
			    nav.addClass('fixed');
			  } else {
			    nav.removeClass('fixed');
			  }
			});
		},
		headBoxfixed: function(){
			var nav = $('#headBox'),
			offset = nav.offset();
			$(window).scroll(function () {
			//   if($(window).scrollTop() > offset.top) {
			//     nav.addClass('fixed');
			//   } else {
			//     nav.removeClass('fixed');
			//   }
			});
		},
		echo: function(){
			echo.init();
		},
		slider: function(){
			$('.slider').slick({
				autoplay:true,
    			autoplaySpeed:4000,
				dots: true,
				dotsClass: 'slide-dots',
				infinite: true,
				speed: 300,
				slidesToShow: 1,
				centerMode: true,
				lazyLoad: 'progressive',
                variableWidth:true,
				// arrows:false,
				prevArrow: '<img src="/common/img/ico_prev.png" class="slide-arrow prev-arrow">',
    			nextArrow: '<img src="/common/img/ico_next.png" class="slide-arrow next-arrow">',
				responsive:[
			        {
			            breakpoint: 768,
			            settings:{
			                slidesToShow:1,
			                variableWidth:true,
			                adaptiveHeight: true,
			                centerMode: true
			            }
			        },
			    ]
			});
		},
		topLorder: function(){
			$(function() {
			  var h = $(window).height();
			 
			  $('#lorder-wrap').css('display','none');
			  $('#loader-bg ,#loader').height(h).css('display','block');
			});
			 
			$(window).load(function () { //全ての読み込みが完了したら実行
			  $('#loader-bg').delay(900).fadeOut(800);
			  $('#loader').delay(600).fadeOut(300);
			  $('#lorder-wrap').css('display', 'block');
			});
			 
			//10秒たったら強制的にロード画面を非表示
			$(function(){
			  setTimeout('stopload()',10000);
			});
			 
			function stopload(){
			  $('#lorder-wrap').css('display','block');
			  $('#loader-bg').delay(900).fadeOut(800);
			  $('#loader').delay(600).fadeOut(300);
			}
		},
		menuActive: function(){
			if(location.pathname != "/") {
	        $('#menu a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
		    } else {
		    	$('#menu li:first-child a').addClass('active');
		    }
		},
		menuActive2: function(){
			if(document.URL.match("/member/") ) {
		    	$('#menu li:nth-child(6) a').addClass('active');
		    }else{
		    	// 上記の場合以外の時に行う処理を記述する
		    }
		},
		sideActive: function(){
			if(location.pathname != "/") {
	        $('#sideNav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
		    } else{
		    	$('#sideNav a:eq(0)').addClass('active');
		    }
		},

		// 画面サイズごとにイベントを発生
		breakpoint: function(bool){
			var container = $("#container"),
					header = $("header"),
					footer = $("footer"),
					nav = $('header #gNav'),
					cnY,
					bool = 0;
			$win.setBreakpoints({
				distinct: true,
				breakpoints: [ 1, 768 ]
			});
			$win.bind('enterBreakpoint1',function(){
				// alert("sp");
				$('.fleximg').each(function() {
					$(this).attr('src',$(this).attr('src').replace('_pc', '_sp'));
				});

				var headerHeight = 50;
		    	var urlHash = location.hash;
				if(urlHash) {
					if($('body').hasClass('no-commonhashscloll')) {
					} else {
						$('body,html').stop().scrollTop(0);
						setTimeout(function(){
							var target = $(urlHash);
							var position = target.offset().top - headerHeight;
							$('body,html').stop().animate({scrollTop:position}, 500);
						}, 500);
					}
				}

					// メガナビSP

				// $('.hoverClick > li').click(function(){
				//      $(".megaMenu",this).toggleClass("hidden");
				//      return false;
				// });
				
				// $('span', this).css('border', '1px solid #c00');


			});
			$win.bind('exitBreakpoint1',function() {
				// $('#btnSPNav').removeClass();
				$('#wpSPNav').removeAttr('style');
			});
			$win.bind('enterBreakpoint768',function() {
				// alert("pc");

				var headerHeight = 150;
		    	var urlHash = location.hash;
				if(urlHash) {
					if($('body').hasClass('no-commonhashscloll')) {
					} else {
						$('body,html').stop().scrollTop(0);
						setTimeout(function(){
							var target = $(urlHash);
							var position = target.offset().top - headerHeight;
							$('body,html').stop().animate({scrollTop:position}, 500);
						}, 500);
					}
				}

				$('.fleximg').each(function() {
					$(this).attr('src',$(this).attr('src').replace('_sp', '_pc'));
				});
				$('#container .logo').insertAfter('#btnArea');

			　// メガナビPC
				function menuShowDelay (element, delayTime) { 
				  var sethover;
				  var setleave;
				  var setnexthover;
				  var targetOn;
				  var targetLi;
				  var targetOff;
				  var nowActive = -1;
				  var hoverClass = 'hidden';
				  var manuElement = element;
				  var hoverTime = delayTime;
				  manuElement.on({
				    'mouseenter': function(){
				      targetOn = $("> .megaMenu",this);
				      targetLi = $(this);
				      if(nowActive === -1){
				        sethover = setTimeout(function(){
				          targetOn.addClass(hoverClass);
				          nowActive = manuElement.index(targetOn);
				          targetLi.addClass('on');
				        }, hoverTime);
				      } else {
				        if(targetOn.hasClass(hoverClass)){
				          clearTimeout(setleave);
				        } else {
				          setnexthover = setTimeout( function(){
				            manuElement.removeClass(hoverClass);
				            targetOn.addClass(hoverClass);
				            nowActive = manuElement.index(targetOn);

				          }, 750);
				        }
				      }
				    },
				    'mouseleave': function(){
				      targetOff = $("> .megaMenu",this);
				      targetLi = $(this);
				      clearTimeout(sethover);
				          targetLi.removeClass('on');
				      function mouseIsOverWorkaround(what){
				        var temp = $(what).parent().find(":hover");
				        return temp.length == 1 && temp[0] == what;
				      }
				      var parent= targetOff;
				      if(mouseIsOverWorkaround(parent[0])){
				        if(targetOff.hasClass(hoverClass)){
				          clearTimeout(setnexthover);
				        }
				      } else {
				        setleave = setTimeout(function(){
				          targetOff.removeClass(hoverClass);
				          nowActive = -1;
				        }, 750);
				      }
				    }
				  });
				}
				$(function(){
				  menuShowDelay($('#menu > li'), 250);
				  menuShowDelay($('.megaMenu'), 250);
				});



			});
			$win.bind('exitBreakpoint768',function() {
				

			});
		},
		scroll: function(){
			// スクロール時のイベント
			var $target=$('header'),
				$btnPagetop  =$('#pagetop'),
				$camp =$('#camp')
				bool   =0;
			$win.scroll(function(){
				if($win.scrollTop() < 300) {
					$btnPagetop.addClass('hide');
					$camp.addClass('hide');
					bool=0;
				}else{
					$btnPagetop.removeClass('hide');
					$camp.removeClass('hide');
					bool=1;
				}
				var windowheight = jQuery(window).height(); //ウィンドウの高さ
				scrollHeight = $(document).height(); //ドキュメントの高さ 
				scrollPosition = windowheight + $(window).scrollTop(); //現在地 
				footHeight = $(".copy").innerHeight(); //footerの高さ（＝止めたい位置）
				if ( scrollHeight - scrollPosition  <= footHeight ) { 
				//ドキュメントの高さと現在地の差がfooterの高さ以下になったら
				$("#pagetop").css({
					"bottom": footHeight + 55 //下からfooterの高さ + 20px上げた位置に配置
				});
				} else { //それ以外の場合は
					$("#pagetop").css({
						"bottom": "55px" //下から20px上げた位置に
					});
 				}
				// 追従フッターメニュー
				 if (jQuery(this).scrollTop() > windowheight) { //スクロールが画面の高さを越えたら
					$("#float_inq_menu").addClass('floaton');
				} else { //スクロールが画面の高さを越えなければ
					$("#float_inq_menu").removeClass('floaton');
				}

			});

			$btnPagetop.click(function(){
				$("html, body").animate({scrollTop:0}, 500, "swing");
        		return false;
			})
		},

		
		scroll2: function(){
			// スクロール時のイベント
			var $target=$('header'),
				$remaining  =$('#remaining'),
				bool   =0;
			$win.scroll(function(){
				if($win.scrollTop() < 150) {
					$remaining.addClass('hide');
					bool=0;
				}else{
					$remaining.removeClass('hide');
					bool=1;
				}
				scrollHeight2 = $(document).height(); //ドキュメントの高さ 
				scrollPosition2 = $(window).height() + $(window).scrollTop(); //現在地 
				footHeight2 = $("footer").innerHeight(); //footerの高さ（＝止めたい位置）
				if ( scrollHeight2 - scrollPosition2  <= footHeight2 ) { 
					$("#remaining").addClass('hide2');
				} else { //それ以外の場合は
					$("#remaining").removeClass('hide2');
				}
				//ドキュメントの高さと現在地の差がfooterの高さ以下になったら
				// $("#remaining").css({
				// 	"position":"relative",
				// 	"bottom": "none", //下からfooterの高さ + 20px上げた位置に配置
				// 		"z-index": 0,
				// 	"border-radius": 5
				// });
				// } else { //それ以外の場合は
				// 	$("#remaining").css({
				// 		"position":"fixd",
				// 		"bottom": 0 //下から20px上げた位置に
				// 	});
 			// 	}
			});

			$remaining.click(function(){
				$("html, body").animate({scrollTop:0}, 500, "swing");
        		return false;
			})
		},

		scroll3: function(){
			if(agent=='iPhone'||agent=='iPad'||agent=='Android'){
				// キャンペーンバナースクロール時のイベント
				var $target=$('header'),
					$btnPagetop  =$('#campaign_limit'),
					bool   =0;
				$win.scroll(function(){
					if($win.scrollTop() < 300) {
						$btnPagetop.addClass('hide');
						bool=0;
					}else{
						$btnPagetop.removeClass('hide');
						bool=1;
					}
					scrollHeight = $(document).height(); //ドキュメントの高さ 
					scrollPosition = $(window).height() + $(window).scrollTop(); //現在地 
					footHeight = $(".copy").innerHeight(); //footerの高さ（＝止めたい位置）
					if ( scrollHeight - scrollPosition  <= footHeight ) { 
					//ドキュメントの高さと現在地の差がfooterの高さ以下になったら
					$("#campaign_limit").css({
						"bottom": footHeight + 90 //下からfooterの高さ + 20px上げた位置に配置
					});
					} else { //それ以外の場合は
						$("#campaign_limit").css({
							"bottom": "90px" //下から20px上げた位置に
						});
					}
				});
			}
		},
		scroll4: function(){
			if(agent=='iPhone'||agent=='iPad'||agent=='Android'){
				// キャンペーンバナースクロール時のイベント
				var $target=$('header'),
					$btnPagetop  =$('#campaign_limit02'),
					bool   =0;
				$win.scroll(function(){
					if($win.scrollTop() < 50) {
						$btnPagetop.addClass('hide');
						bool=0;
					}else{
						$btnPagetop.removeClass('hide');
						bool=1;
					}
					scrollHeight = $(document).height(); //ドキュメントの高さ 
					scrollPosition = $(window).height() + $(window).scrollTop(); //現在地 
					footHeight = $(".copy").innerHeight(); //footerの高さ（＝止めたい位置）
					if ( scrollHeight - scrollPosition  <= footHeight ) { 
					//ドキュメントの高さと現在地の差がfooterの高さ以下になったら
					$("#campaign_limit02").css({
						"bottom": footHeight + 90 //下からfooterの高さ + 20px上げた位置に配置
					});
					} else { //それ以外の場合は
						$("#campaign_limit02").css({
							"bottom": "90px" //下から20px上げた位置に
						});
					}
				});
			}
		},
		seo: function(){
			// ソース上上にあるSEO用テキストをフッターの指定エリアへ移動
			$('#tagtxth1').insertAfter('#h1Txt');
			$('#tagtxth1').css('display','block');
			// pタグ
			$('#tagtxtp').prependTo('#pTxt');
		},
		fontset:function(){
			var currentstyle = readCookie('fontStyle');
			if (currentstyle){
				switchFont(currentstyle);
			};
			$("#fontL").click(function(){
				switchFont(fontL);
				$(this).parent("ul").removeClass("fontM").addClass("fontL");
				return false;
			});
			$("#fontM").click(function(){
				switchFont(fontM);
				$(this).parent("ul").removeClass("fontL").addClass("fontM");
				return false;
			});
			function switchFont(className){
				if(className==fontM){
					$('html').css({fontSize:'62.5%'});
				}else{
					$('html').css({fontSize:'70%'});
				}
				// $("body").removeAttr("class").addClass(className);
				createCookie('fontStyle', className, 365);
			};
			// cookie script http://www.quirksmode.org/js/cookies.html
			function createCookie(name,value,days){
				if (days){
					var date = new Date();
					date.setTime(date.getTime()+(days*24*60*60*1000));
					var expires = "; expires="+date.toGMTString();
				}
				else var expires = "";
				document.cookie = name+"="+value+expires+"; path=/";
			}
			function readCookie(name){
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++)
				{
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
				return null;
			}

		},
		tel: function(){
			// PCとiPadで見たときは.tel-linkのリンクを無効化
			if(agent=='PC'||agent=='iPad'){
				$('.telLink').click(function(e){
					e.preventDefault();
				});
			}
		},
		splink: function(){
			// PCとスマホでリンク先を変更
			if(agent!='PC'&&agent!='iPad'){
				$('.flxLink').each(function(){
					$(this).attr({href:$(this).data('sp')});
				});
			}
		},
		faq: function(){
			$('.dlFAQ01 dt').click(function(){
				var $target = $(this).next('dd');
				if($(this).hasClass('open')){
					$(this).removeClass('open');
					$target.slideUp();
				}else{
					$(this).addClass('open');
					$target.slideDown();
				}
			});
		},
		spNav: function(){
			// $('#gNavWrap').clone().appendTo('#wpSPNav');
			// $('#headLogo').clone().prependTo('#wpSPNav');
			// $('#spTel').clone().appendTo('#wpSPNav');
			// $('.tagtxtp').clone().appendTo('#wpSPNav');

			$('#btnNav').on('click', function(){
				if($(this).hasClass('active')){
					// console.log("閉じようとしてる");
					$(this).removeClass('active');
					$('.lowernav_wrap.__lw_menu').removeClass('active');
					// $('#wpSPNav').slideUp();
					// $("#container").removeClass('open');
					// $("#mvArea").removeClass('open');
					$('body').removeClass('fixed');
				}else{
					// console.log("開こうとしてる");
					$(this).addClass('active');
					$('.lowernav_wrap').removeClass('active');
					$('.lowernav_wrap.__lw_menu').addClass('active');
					// $('#wpSPNav').slideDown();
					// $("#container").addClass('open');
					// $("#mvArea").addClass('open');
					$('body').addClass('fixed');
				}
			});
			$('.lowernav_wrap.__lw_menu .open_child').on('click', function(){
				if($(this).parent('.menutit').next().hasClass('_isopen')){
					$(this).parent('.menutit').next().removeClass('_isopen');
					$(this).removeClass('active');
					$(this).attr('aria-expanded', false);
				} else {
					$(this).parent('.menutit').next().addClass('_isopen');
					$(this).attr('aria-expanded', true);
					$(this).addClass('active');
				}
				return false ;
			});
			// $('#btnNav').hover(
			// 	function(){
			// 		$('.pickup_wrap .gNavlist_btn').removeClass('active');
			// 		$('.pickup_wrap .lowernav_wrap').removeClass('active');
			// 	},
			// 	function(){
			// 		// マウスが外れた時
			// 	}
			//   );
			//   $('.pickup_wrap .gNavlist_btn').hover(
			// 	function(){
			// 		$("#btnNav").removeClass('active');
			// 		$("#btnNav").removeClass('btnon');
			// 		$('.lowernav_wrap.__lw_menu').removeClass('active');
			// 	},
			// 	function(){
			// 		// マウスが外れた時
			// 	}
			//   );
			$('.pickup_wrap .gNavlist_btn').on('click', function(){
				var id = $(this).attr('id');
				console.log(id);
				if($(this).hasClass('active')){
					$(this).removeClass('active');
					$('#gNav').removeClass('pickup_open');
					$('.lowernav_wrap').removeClass('active');
					$('body').removeClass('fixed');
				}else{
					$(this).addClass('active');
					$('#gNav').addClass('pickup_open');
					$('.lowernav_wrap').removeClass('active');
					if(id=='btnService'){
						$('.__lw_service').addClass('active');
						$('body').addClass('fixed');
					}
					if(id=='btnPrice'){
						$('.__lw_price').addClass('active');
						$('body').addClass('fixed');
					}
					if(id=='btnFlow'){
						$('.__lw_flow').addClass('active');
						$('body').addClass('fixed');
					}
				}
			});
			$('.top_gNavlist_btn').on('click', function(){
					var id = $(this).attr('id');
					if(id=='topBtnService'){
						$('.__lw_service').addClass('active');
						$('body').addClass('fixed');
					}
					if(id=='topBtnPrice'){
						$('.__lw_price').addClass('active');
						$('body').addClass('fixed');
					}
					if(id=='topBtnFlow'){
						$('.__lw_flow').addClass('active');
						$('body').addClass('fixed');
					}

			});
			$('.pickup_wrap .lowernav_close_btn').on('click', function(){
				$('body').removeClass('fixed');
				$('.gNavlist_btn').removeClass('active');
				$('.lowernav_wrap').removeClass('active');
				$('#gNav').removeClass('pickup_open');
			});
		},
		menuClickClose: function(){
			$('.main_wrap').on('click', function(){
				if(agent == 'PC') {
					if($('.lowernav_wrap').hasClass('active')) {
						$('body').removeClass('fixed');
						$('.gNavlist_btn').removeClass('active');
						$('.lowernav_wrap').removeClass('active');
						$('#gNav').removeClass('pickup_open');
					}
				}
			});
			$('#container').on('click', function(){
				if(agent == 'PC') {
					if($('.lowernav_wrap').hasClass('active')) {
						$('body').removeClass('fixed');
						$('.gNavlist_btn').removeClass('active');
						$('.lowernav_wrap').removeClass('active');
						$('#gNav').removeClass('pickup_open');
					}
				}
			});
		},
		pageAco: function(){
		// 別ページから開閉パネルを開く
		// 別ページから開閉パネルを開く
    		 $(location.hash).next('dd').slideToggle();
   			 $(location.hash).toggleClass('open');
		    // #で始まるアンカーをクリックした場合に処理

		    // $('a[href^=#]').on('click', function() {
		    //     // スムーススクロール
		    //     var speed = 400;// ミリ秒
		    //     var href= $(this).attr("href");
		    //     var target = $(href == "#" || href == "" ? 'html' : href);
		    //     var position = target.offset().top;
		    //     $('body,html').animate({scrollTop:position}, speed, 'swing');
		    // });
		}
	};
})(jQuery);

$(function () {

    $('a[href^=#]').click(function () {
        var headerHeight = 150;
        if($('body').hasClass('breakpoint-1')){
            headerHeight = 50;
        }else{
            headerHeight = 150;
        }
        console.log(headerHeight);
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - headerHeight;
        $("html, body").animate({
            scrollTop: position
        }, 550, "swing");
        return false;
    });

});

// **********ナビメニュー同じページでページ内リンク**********
function headerchousei(obj){

	var nowUrl = location.pathname;
	var targetUrl = obj.getAttribute('href');
	var targetHash = targetUrl.substring(targetUrl.indexOf('#'));
	targetUrl = targetUrl.substring(0, targetUrl.indexOf('#'));
	if( nowUrl == targetUrl ) {
		if($('body').hasClass('breakpoint-1')){
			var headerHeight = 50;
		}else{
			var headerHeight = 150;
		}
		setTimeout(function(){
			var target = $(targetHash);
			var position = target.offset().top - headerHeight;
			$('body,html').stop().animate({scrollTop:position}, 500);
		}, 500);
		$('body').removeClass('fixed');
		$('.gNavlist_btn').removeClass('active');
		$('.lowernav_wrap').removeClass('active');
		$('#gNav').removeClass('pickup_open');

	}else{
		// console.log('違う');
	}
}
// **********ナビメニュー同じページでページ内リンク**********
// **********ナビメニュー同じページでページ内リンク**********
function samePage(obj){
	var nowUrl = location.pathname;
	var targetUrl = obj.getAttribute('href');
	var targetHash = targetUrl.substring(targetUrl.indexOf('#'));
	targetUrl = targetUrl.substring(0, targetUrl.indexOf('#'));
	if( nowUrl == targetUrl ) {
		$('body').removeClass('fixed');
		$('.gNavlist_btn').removeClass('active');
		$('.lowernav_wrap').removeClass('active');
		$('#gNav').removeClass('pickup_open');
	}else{
		// console.log('違う');
	}
}
// **********ナビメニュー同じページでページ内リンク**********