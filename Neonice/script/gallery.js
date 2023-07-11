function gallery(alb){
	var object = $('<object>');
	var objectie = $('<object>');
	var title = $('<h1>');
	switch (alb) {
	case 1:
		var title_text="<b>P</b>hoto";
		break
	case 2:
		var title_text="<b>L</b>ogo";
		break
	case 3:
		var title_text="<b>W</b>eb";
		break
	case 4:
		var title_text="<b>V</b>ector";
		break
	case 5:
		var title_text="<b>P</b>aint";
		break
	default:
		var title_text="<b>О</b>тсутствует название";
	}
	
	$(title).attr('class','data_tittle').html(title_text).css({'padding-bottom':'5px','margin-top':'2px'}).appendTo('.alb');
		
	$($('<param>'))
		.attr({
			name:'flashvars',
			value:'alb=alb'+alb})
		.appendTo(object);
	$($('<param>'))
		.attr({
			name:'movie',
			value:'flash/gallery.swf'})
		.appendTo(object);
	$($('<param>'))
		.attr({
			name:'quality',
			value:'high'})
		.appendTo(object);
	$($('<param>'))
		.attr({
			name:'play',
			value:'true'})
		.appendTo(object);
	$($('<param>'))
		.attr({
			name:'loop',
			value:'true'})
		.appendTo(object);
		
	$($('<param>'))
		.attr({
			name:'flashvars',
			value:'alb=alb'+alb})
		.appendTo(objectie);
	$($('<param>'))
		.attr({
			name:'movie',
			value:'flash/gallery.swf'})
		.appendTo(objectie);
	$($('<param>'))
		.attr({
			name:'quality',
			value:'high'})
		.appendTo(objectie);
	$($('<param>'))
		.attr({
			name:'play',
			value:'true'})
		.appendTo(objectie);
	$($('<param>'))
		.attr({
			name:'loop',
			value:'true'})
		.appendTo(objectie);
	$(objectie)
		.attr({
			type:"application/x-shockwave-flash",
			data:"flash/gallery.swf",
			width:'900',
			height:"500"})
		.appendTo(object);
				
	$(object)
		.attr({
			classid:'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
			width:'900',
			height:'500',
			align:'middle'})
		.appendTo('.alb');
		
		$('.alb').css("display","block");

		$("#gallery_black").animate({opacity:'show'},300, function(){
			$('#gallery').animate({opacity:'show'},500);
		});
		return (alb);
}