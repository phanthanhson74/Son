/* FlatHeights
=========================================== */
	
	/* --- fix height for text content ----- */
	var flatHeight = {
		setInit : function(){
		
			/* divided into three sets of each element */
			var sets = [], temp = [];
			$('.box_info > .box_info_inner > .txt_con').each(function(i) {
				temp.push(this);
				if (i % 2 == 1) {
					sets.push(temp);
					temp = [];
				}
			});
			if (temp.length) sets.push(temp);

			/* align the height for each set */
			$.each(sets, function() {
				$(this).flatHeights();
			});
		}
	}
	
	/* --- fix height for box content ----- */
	var flatHeight_02 = {
		setInit : function(){
		
			/* divided into three sets of each element */
			var sets = [], temp = [];
			$('#ctn_main > .ctn_main_inner > .box_info').each(function(i) {
				temp.push(this);
				if (i % 2 == 1) {
					sets.push(temp);
					temp = [];
				}
			});
			if (temp.length) sets.push(temp);

			/* align the height for each set */
			$.each(sets, function() {
				$(this).flatHeights();
			});
		}
	}

/* Slider
=========================================== */

/*--------------- Animate-------------*/
function animate_01(img , src){
	img.fadeOut(400, function(){
		img.attr('src', src).fadeIn(400);	
	});	
}


/*---------- Event Handler Effect -------------*/
var product_effect = {
	setInit : function(fr_name){
		// addclass .current for first image product
		$("#"+ fr_name +" .thumb_view li:first").addClass("current");
		
		// event show image product
		$("#"+ fr_name +" .thumb_view li").click(function(){
			// reset css
			$("#"+ fr_name +" .thumb_view li").each(function(){
				$(this).attr('class', "");
			});
			
			// add class current
			$(this).attr('class','current');
			
			// show selected product
			var src_img = $(this).find("img").attr("src");

			// get image object
			var img_obj = $("#"+ fr_name +" .img_view").find("img");
				
				// get random from 1 to 100			
				var _random = Math.floor((Math.random()*100)+1);
				
				// set animate
				
					animate_01(img_obj , src_img);
				
		});
	}
}
	
/* ===========================================
* START
=========================================== */
	$(document).ready(function(){
		// FlatHeights
		flatHeight.setInit();
		flatHeight_02.setInit();
		//slides
		product_effect.setInit("box_slides");
	}); 