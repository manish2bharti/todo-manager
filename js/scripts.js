$(document).ready(function () {
    $('#counter').val('0');
    $('#clicked').val('');
    $('#base_txt').hide();
    $('#base_btn').hide();

	if(localStorage.getItem('gen_buttons') || localStorage.getItem('counter') != null) {
		$('.gen_buttons').html(localStorage.getItem('gen_buttons'));
		$('#counter').val(localStorage.getItem('counter'));
	}
	
    $('#createTodo_btn').click(function () {
        $('#base_txt').show();
        $('#base_btn').show();
		$('#createTodo_btn').hide();

        $('#base_btn').click(function () {
            $('#counter').val(parseInt($('#counter').val(), 10) + 1);
            $('.gen_buttons').append('<input id="' + $('#counter').val() + '" type="button" value="' + $('#base_txt').val() + '" class="' + $('#base_txt').val().replace(' ', '_') + '">');
			var gen_buttons = $('.gen_buttons').html();
			var counter = $('#counter').val();
			localStorage.setItem('gen_buttons', gen_buttons);
			localStorage.setItem('counter', counter);
	   });
    });

    $('.gen_buttons input').live('click', function () {
        $('#clicked').val($(this).attr('id'));
		$(this).addClass("selected");
        $('div .item').remove();
		var clickedId = $(this).attr('id');
		if(localStorage.getItem('todos'+clickedId+'')) {
			$('.items').html(localStorage.getItem('todos'+clickedId+''));
		}		
        $('#dialog').dialog({
            width: 360,
            overlay: {
                opacity: 0.5,
                background: "#000000"
            },
            modal: true
        });
        $(".ui-dialog-titlebar span.ui-dialog-title").html($(this).val());
		
		return false;

    });
	
	$(".ui-dialog-titlebar-close").live('click', function () {
		var selectedId = $(".gen_buttons .selected").attr('id');
    	var todos = $('.items').html();
		localStorage.setItem('todos'+selectedId+'', todos);
	
		$(".gen_buttons input").removeClass("selected");
	});	
	
	$(".item .view input").live('click', function () {
		if($(this).is(':checked')){
			$(this).attr('checked', 'checked');
			$(this).parent().parent().addClass('done');
		}
		else{
			$(this).removeAttr('checked');
			$(this).parent().parent().removeClass('done');
		}
	});
	
	$(".destroy").live('click', function () { 
		$(this).parent().parent().remove();
	});
	
	$(".view").live('dblclick',function(){
		$(this).parent().addClass('editing');
		$(".items .editing .edit input").val( $(".items .editing .view span").html());
	});
	
	$("#tasks").live('click',function(){
		$(".items .editing .edit input").val();
		$(this).find(".editing").removeClass('editing');
		
	});
	
	$(".items .editing .edit").live('click',function(e){
		 e.stopPropagation();
	});
	
	$(".items .editing .edit input").live('keyup keypress',function(e){
		 $(".items .editing .view span").html($(this).val());
		 if(e.which == 13) {
			$(this).parent().parent().removeClass('editing');
			$(".items .editing .edit input").val();
		}
	});
	
});  

