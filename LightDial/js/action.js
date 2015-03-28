$(document).ready(function(){

if (localStorage.getItem('dials') == null) localStorage.setItem('dials','{"dials":[]}');

size = (localStorage.getItem('size') == null)? 4 : localStorage.getItem('size');
if (size != 0) $('#dials').width(222*size)


BuildDials();

// chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT, {format:'png', quality:100}, function (e) {
	// alert(e);
// });

// Sortable UI
	$("#dials").sortable({
		revert: true,
		placeholder: "element-placeholder",
		cursor: "-webkit-grabbing",
		delay: 150,
		items: ".element",
		update: function(event, ui) {
			var storageDials = {dials:[]};
		
			$('.element').each(function() {
				var dials = {
					link: $(this).find('a').attr('href'),
					title: $(this).find('h2').text(),
					image: $(this).find('img').attr('src')
				};
				storageDials.dials.push(dials);
				
			});

			localStorage.setItem('dials', JSON.stringify(storageDials));
		}
    });
	
// New dial field
	$('#new').click(function(){
		showAddField()
	});
	
// Add field images set
	$('#images-set').change(function(){
		$('#image').val( $(this).val() );
	});
	
	$('#image').change(function(){
		$('#images-set option:selected').removeAttr('selected');
		$('#images-set option:first').attr('selected','selected');
	});

// Dark overlay
	$('#overlay').click(function(){
		$('#link').val(''),
		$('#title').val(''),
		$('#image').val('')
		showAddField()
	});
	
// Add new dial
	$('#add').click(function() {
		var dials = {
			link: $('#link').val(),
			title: $('#title').val(),
			image: $('#image').val()
		};
		
		$('#link').val('');
		$('#title').val('');
		$('#image').val('');
		$('#images-set option:selected').removeAttr('selected');
		$('#images-set option:first').attr('selected','selected');
		
		
		// http: to link
		var httpRe = /^http:\/\/.*/;
		if (!httpRe.exec(dials.link))
			dials.link = 'http://'+dials.link;
		
		if (dials.image == '')
			dials.image = 'http://mini.s-shot.ru/1080x708/180/PNG/?'+dials.link;
		
		var storageDials = $.parseJSON(localStorage.getItem('dials'));
		storageDials.dials.push(dials);
		
		localStorage.setItem('dials', JSON.stringify(storageDials));
		
		$('<div>').addClass('element')
			.append( $('<a>').attr('href', dials.link)
				.append( $('<img>').attr('src', dials.image) )
				.append( $('<h2>').text(dials.title) )
			).insertBefore('#new').hide().animate({opacity:'show'},800)
				.bind("contextmenu", function(event) {
					event.preventDefault();
					showMenu(event, $(this))
				});
		showAddField();
		
	});
	
// Context-menu

	
	var elementMenu;
	function showMenu (event, elmThis) {
		$('#menu').show().addClass('active').css({top: event.pageY + "px", left: event.pageX + "px"});
		elementMenu = elmThis;
	}
	
	
	$('.element').bind("contextmenu", function(event) {
		event.preventDefault();
		showMenu(event, $(this))
	});
	
	$('#edit').bind("click", function(event) {
		$('#title').val(elementMenu.find('h2').text());
		$('#link').val(elementMenu.find('a').attr('href'));
		$('#image').val(elementMenu.find('img').attr('src'));
		showAddField();
	});
	
	$('#refresh').bind("click", function(event) {
		var newImage = elementMenu.find('img').attr('src').replace(/http:\/\/mini./, 'http://refresh.');
		elementMenu.find('img').attr('src', newImage);
	});
	
	$('#remove').bind('click', function(event) {
		var link = elementMenu.find('a').attr('href');
		var title = elementMenu.find('h2').text();
		var image = elementMenu.find('img').attr('src');
		removeDial(link, title, image);
		elementMenu.show().animate({opacity:'hide'},600, function() { $(this).remove() });
	});
	

	$('body').bind("click", function(event) {
		$('#menu.active').hide();
	});
	$('body').bind("contextmenu", function(event) {
		event.preventDefault();
	});
	
}); // end JQuery 

function BuildDials() {
	var dials = $.parseJSON(localStorage.getItem('dials'));
	
	for (var i in dials.dials) {
		var link = dials.dials[i].link;
		var title = dials.dials[i].title;
		var image = dials.dials[i].image;
	
		$('#dials').append( $('<div>').addClass('element')
							.append( $('<a>').attr('href', link)
								.append( $('<img>').attr('src',image) )
								.append( $('<h2>').text(title) )
							)
						);
	}
	
	$('#dials').append( $('<div>').attr('id','new')
						.append( $('<p>').text('+') )
					);
					

}

function showAddField() {
	$('#overlay').animate({opacity:'toggle'},300);
	$('#add-field').animate({opacity:'toggle'},300);
}

function removeDial(link, title, image) {

	var dials = $.parseJSON(localStorage.getItem('dials'));
	
	for (var i in dials.dials) {
		if (link == dials.dials[i].link &&
			title == dials.dials[i].title &&
			image == dials.dials[i].image) {			
				delete dials.dials[i];
				localStorage.setItem('dials', JSON.stringify(dials).replace(/null,/, '').replace(/,null/, ''));
				break;			
			}
	}
}