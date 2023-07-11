// JavaScript Document
function main_hint()
{
	if($("#menu_scrl").attr('class')!=='active')
	{
var start = document.createElement('div');
$(start)
	.attr('id','start')
	.css({"width":"250", "height":"266", "position":"absolute", "left":"50%", "top":"250px", "margin-left":"-125px","opacity":"0.9", "display":"none"});	
var startup = document.createElement('div');
$(startup)
	.css({"height":"16","background":"url(image/start_hint.png) center center no-repeat"})
	.appendTo(start);
	
var startbody = document.createElement('div');
$(startbody)
	.css({"width":"210", "height":"40", "padding":"20px", "background-color":"#FFF", "border-radius":"30px", "line-height":"40px"})
	.appendTo(start);

var mainhint = document.createElement('p');
$(mainhint)
	.html("Начните работу с Меню")
	.css({"font-family":'"Trebuchet MS", Arial, Helvetica, sans-serif', "font-size":18, "color":"#bdbdbd","text-align":"center"})
	.appendTo(startbody);

$('body').prepend(start);
if ($('#menu_scrl').css('height')=='27px')
{
	$('#start').animate({opacity:'show'},800)
		.animate({top:'144'}, {queue:false}, 2000);
}
else {
	$('#start').animate({opacity:'show'},800)
		.animate({top:'185'}, {queue:false}, 2000);
}
		
setTimeout(function(){
	$('#start').animate({opacity:'hide'},600,function(){
		$('#start').remove();
	}).animate({top:'200'}, {queue:false}, 600);;
	setTimeout(function(){
		$('#start').remove();

		setTimeout(function(){main_hint()},3000);

	},700);	
	
},1500)
	}
}