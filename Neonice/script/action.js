// JavaScript Document
$(document).ready(function(){
//Предзагрузка картинок	
    $.preloadImages([
		"image/start_baloon1.png",
		"image/start_baloon2.png",
		"image/start_baloon3.png",
		"image/start_baloon4.png",
		"image/start_hint.png",
		"image/point1_logo.png",
		"image/point2_logo.png",
		"image/point3_logo.png",
		"image/point4_logo.png",
		"image/logo.png",
		"image/fb_background.png",
		"image/menu_scrl.png",
		"image/background.png"
	], function () {
			$("#loader").css('background-image','url()');
			$("#loader").animate({opacity:'hide'}, 400);;
			setTimeout(function(){
					main_hint()
			},2000);
    });

	//Событие "подробнее"
	$(".more").click(function (){
		var now_flyc="#"+$(".now_content").attr('id')+"_"+$(".now_data").attr('class').split(" ")[0];
		$(now_flyc).toggleClass("now_flyc");
		$(".now_flyc").css("display","block");
		$("#flyc").css("display", "block");		
		$("#flyc").animate({top:'110'},500);
		$("#flyc_black").animate({opacity:'show'},500);
	});
	
	$("#flyc_black").click(function (){
		
		$("#flyc").animate({top:'-500'},500);
		$(this).animate({opacity:"hide"},300, function (){
			$("#flyc").css("display", "none");
			$(".now_flyc").css("display","none");
			$(".now_flyc").toggleClass("now_flyc");
			
		});
	});
	$("#flyc_black").hover(
		function (){
			$(".exit").stop(true, true).animate({opacity:"1"},"fast")
		}, function (){
			$(".exit").stop(true, true).animate({opacity:"0.3"},"fast")
		}
	);
	
	//Событие для опускания меню
	$("#menu_scrl").hover(
		function(){
			if ($(this).attr('class')!=='active')
			{
				$(this).stop(true, true).animate({height:"+=41"},"slow","easeOutElastic");
				$('#start').stop(true, true).animate({top:"185"},"slow","easeOutElastic");
			}
		}, function(){
			if ($(this).attr('class')!=='active')
			{
				$(this).stop(true, true).animate({height:"-=41"},"slow","easeOutElastic");
				$('#start').stop(true, true).animate({top:"144"},"slow","easeOutElastic");
			}
		}
	)
	
	//**Событие для выдвигания меню**
	$("#menu_scrl").mousedown(function(){
		if (!$('#content').find('div').is('.now_content')) //Проверка на отображение контента
		{
			$(this).toggleClass("active");
			$(this).stop(true, true);
			$(this).attr('height','41');
	
		
			if ($(this).attr('class')=='active') //Проверка активности меню
			{			
					$("#main_menu").stop(true, true).animate({opacity:'show'},500);
					$("#point1").stop(true, true).animate({marginLeft:'0'},500,"easeOutCirc");
					$("#point3").stop(true, true).animate({marginRight:'0'},500,"easeOutCirc",function(){
						$("#point1_logo").stop(true, true).animate({top:'90'},300);			
						$("#point2_logo").stop(true, true).animate({top:'90'},600);
						$("#point3_logo").stop(true, true).animate({top:'90'},300);
						$("#point4_logo").stop(true, true).animate({top:'90'},600);	
						});
		
					//$("#main_menu").attr('overflow','visible');
			}
			else
			{
				if (!$('#main_menu li').is('.selected_button')){
					$("#point1_logo").stop(true, true).animate({opacity:'hide'},20).animate({top:'-200'},20).animate({opacity:'show'},20);			
					$("#point2_logo").stop(true, true).animate({opacity:'hide'},20).animate({top:'-200'},20).animate({opacity:'show'},20);
					$("#point3_logo").stop(true, true).animate({opacity:'hide'},20).animate({top:'-200'},20).animate({opacity:'show'},20);
					$("#point4_logo").stop(true, true).animate({opacity:'hide'},20).animate({top:'-200'},20).animate({opacity:'show'},20);
					$("#main_menu").stop(true, true).animate({opacity:'hide'},300);
					$("#point1").stop(true, true).animate({marginLeft:'337'},300,"easeOutCirc");
					$("#point3").stop(true, true).animate({marginRight:'337'},300,"easeOutCirc");
				}
			}
		}
	})
	
	//**Событие для анимации пунктов меню**
	$('#main_menu li').hover(
		function() {
			if ($(this).find('span').attr('class')!=='selected_button_logo')
			{
				$(this).find('span').stop(true, true).animate({top:'75'},"fast");
			}
			else { return false; }
		},
		function() {
			if ($(this).find('span').attr('class')!=='selected_button_logo')
			{
				$(this).find('span').stop(true, true).animate({top:'90'},"fast");
			}
			else { return false; }
		}
	);
	
	//**Событие для появления контента**
	$('#main_menu li').mousedown(function(){
		if (!$(this).hasClass('selected_button')) // если эта кнопка НЕ нажата
		{
			var now = $(this).find('a').attr('href'); // текущий контент
			var now_but = '#'+$(this).attr('id');
			var now_cd = now+"_data";
			
			if (!$('#main_menu li').find('span').is('.selected_button_logo'))
			{
					$(this).find('span').toggleClass('selected_button_logo');
					$('.selected_button_logo').stop(true, true).animate({top:'65'},'fast');
			}
			else
			{
				$('.selected_button_logo').stop(true, true).animate({top:'90'},'fast',function(){
					$('.selected_button_logo').toggleClass('selected_button_logo');
					$(now_but).find('span').toggleClass('selected_button_logo');
					$('.selected_button_logo').stop(true, true).animate({top:'65'},'fast');			
				});
			}							
	
			$('.selected_button').toggleClass('selected_button');
			$(this).toggleClass('selected_button');
				
			$('.now_content_data').toggleClass('now_content_data');
			$('.now_data').toggleClass('now_data');
			
			if (!$('#content').find('div').is('.now_content')){ 
					$(now).addClass('now_content');
			}
						
			$(".now_content").stop(true, true).animate({opacity:'hide',height:'0'},'fast',function(){
					$(".now_content").toggleClass('now_content');
					$(now_cd).toggleClass('now_content_data');
					$('.now_content_data .data_1').toggleClass('now_data');
					$(now).toggleClass('now_content');
					$(now).stop(true, true).animate({opacity:'show',height:'466'},'slow');
					
					//**Добавление кнопок навигации**
						if ($(".now_content_data > div").length != 1) {
							$(now+' .button_down').css('background-image','url(image/for_down.png)');
							$(now+' .button_up').css('background-image','url()');
							$(now+' .button_down').find('a').attr('href','.data_2');
						} else {
							$(now+' .button_up').css('background-image','url()');
							$(now+' .button_down').find('a').attr('href','');
							$(now+' .button_down').css('background-image','url()');
							$(now+' .button_up').find('a').attr('href','');
						}
				});
			setTimeout(function(){
				$(".button_down").animate({opacity:"1"},200).animate({opacity:"0.2"},200).animate({opacity:"1"},200).animate({opacity:"0.2"},200);
			},2000);
		}
		else // если эта кнопка повторно нажата
		{
			$(this).toggleClass('selected_button');
			$('.selected_button_logo').stop(true, true).animate({top:'75'},'fast');
			$(this).find('span').toggleClass('selected_button_logo');
			
			$('.now_content_data').toggleClass('now_content_data');
			$('.now_data').toggleClass('now_data');
			
			$(".now_content").stop(true, true).animate({opacity:'hide',height:'0'},'fast');
			$(".now_content").toggleClass('now_content');
		}
	});
	
	//**Событие для анимации кнопок навигации**
	$('.navigator').hover(
		function()
		{
			$(this).stop(true, true).animate({opacity:'0.7'},"fast");
		},
		function ()
		{
			$(this).stop(true, true).animate({opacity:'0.2'},"fast");
	});
	
	//**Прокрутка контента**
	var data= new Array ();
	for (var i=0;i<$("#content_1_data > div").length;i++)
	{
		data[i]='.data_'+(i+1);//Создание массива с ссыками на информацию
	}

	$(".navigator").mousedown(function(){
		if ($(this).find('a').attr('href')!=='') {
		$('.now_data').toggleClass('now_data');
		var max_data = $(".now_content_data > div").length;
		var to = $(this).find('a').attr('href');
		$(to).toggleClass('now_data');
		for (var i=0; i<data.length; i++)
			{
				if (to == data[i])
				{
					data_id = i;
					break;
				}
			};

		$('.button_up').find('a').attr('href',data[data_id-1]);
		$('.button_down').find('a').attr('href',data[data_id+1]);
		
		if ($('.button_down').find('a').attr('href')!=='' && data_id!==max_data-1){
				$('.button_down').css('background-image','url(image/for_down.png)');
			} else{
				$('.button_down').css('background-image','url()');
				$('.button_down').find('a').attr('href','');
			};
			
		if ($('.button_up').find('a').attr('href')!=='' && data_id!==0)
			{
				$('.button_up').css('background-image','url(image/for_up.png)');
			} else 
			{
				$('.button_up').css('background-image','url()');
				$('.button_up').find('a').attr('href','');
			};

		$('.now_content_data').stop(true, true).scrollTo(data[data_id],'slow',{easing:'easeInOutExpo'}, function (){
			$(to).toggleClass('now_data');			
		});
		}
	});
	
	//**Анимация предпросмотра галереи**
	$('.gallery_pic').hover(
	function(){
		$(this).find('.gallery_pic_black').stop(true, true).animate({'top':'+=155'},800,'easeOutBounce');
	},
	function(){
		$(this).find('.gallery_pic_black').stop(true, true).animate({'top':'-=155'},400);
	})
	
	$('#gallery_black').mousedown(function(){
		$('.alb').css("display","none");
		$('#gallery_black').animate({opacity:'hide'},500);
		$('#gallery').animate({opacity:'hide'},500,function(){
			$('.alb').empty();
		});		
	});
		
	$("#gallery_black").hover(
		function (){
			$(".exit").stop(true, true).animate({opacity:"1"},"fast")
		}, function (){
			$(".exit").stop(true, true).animate({opacity:"0.3"},"fast")
		}
	);
	
}); //** END JQeury **