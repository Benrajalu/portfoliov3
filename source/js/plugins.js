// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

// Parsley 
	var validateFront = function () {
	  if (true === $('#contactForm').parsley().isValid()) {
	    $('#feedback').addClass('hidden').html("");
	  } else {
	    $('#feedback').removeClass('hidden').html("Tous les champs sont obligatoires, et votre adresse email doit être valide...");
	  }
	};

	var sendMessage = function(){
		if (true === $('#contactForm').parsley().isValid()) {
			event.preventDefault();
			$("#contactForm").find("#submit").attr("value", "Envoi en cours...").attr("disabled", "disabled");
			var sendTo = $("#contactForm").attr("action");
			$.ajax({
			  type: "POST",
			  url: sendTo,
			  data: $("#contactForm").serialize(),
			  success: function() {
			    $('#feedback').addClass("success").html("Message reçu");
			    $("#contactForm").find("#submit").attr("value", "Nouvel envoi").removeAttr("disabled");
			  }, 
			  error: function() {
			  	$('#feedback').removeClass("success").html("Oups, soucis de script. Merci de me joindre via email !");
			  }
			});
			return false;
		} else {
		  $('#feedback').removeClass('success').html("Tous les champs sont obligatoires, et votre adresse email doit être valide...");
		}
	}

// Vertical align
	var verticalAlign = function(){
		if(Modernizr.mq('only all and (min-width: 781px)')){
			$(".vertHolder").each(function(){
				var h = $(this).find(".vSizer").outerHeight() + "px";
				$(this).find(".vParent").css({"line-height": h, "height" : h});
			})
		}
	}

// Backstreches
	var copySize = function(){
		if(Modernizr.mq('only all and (min-width: 781px)')){
			$(".copySize").each(function(){
				var size = $(this).siblings(".columns").height();
				$(this).css("height", size);
			})
		}
		else{
			$(".copySize").each(function(){
				$(this).css("height", "200px");
			})
		}
	}
	copySize();
	$(".backstretch").each(function(){
		$(this).find(".source").hide();
	})
	var autoSize = function(){
		if(Modernizr.mq('only all and (min-width: 781px)')){
			$(".autoSize").each(function(){
				var size = $(this).parent(".columns").height();
				$(this).css("height", size);
			})
		}
		else{
			$(".autoSize").each(function(){
				$(this).css("height", "200px");
			})
		}
	}
	autoSize();

$(window).load(function () {
	// Parsley
		$.listen('parsley:field:validate', function () {
			validateFront();
		});

		$.listen('parsley:form:validated', function() {
			sendMessage();
		});

		$('#contactForm input[type="submit"]').on('click', function () {
		  $('#contactForm').parsley().validate();
		  validateFront();
		});

	// Backstretch
		$(".backstretch").each(function(){
			var src = $(this).find(".source").attr("src");
			$(this).backstretch(src, {speed: 300});
		})

	// Vertical align
		verticalAlign();
		$(window).resize(function(){
			verticalAlign();
			copySize();
			autoSize();
		})

	// Work
		$(".work").each(function(){
		    var lefty = $(this).find(".smallDisc.left");
		    var righty = $(this).find(".smallDisc.right");
		    
		    var tl = new TimelineLite();
		    tl.pause();
		    tl.to(lefty,0.2,{left:-55,zIndex:1, ease:Back.easeOut});
		    tl.to(lefty,0.2,{left:-5, zIndex:4});
		    
		    var tr = new TimelineLite();
		    tr.pause();
		    tr.to(righty,0.2,{right:-55,zIndex:1, ease:Back.easeOut});
		    tr.to(righty,0.2,{right:-5, zIndex:4});
		   
		    $(this).hover(function(){
		        tl.play();
		        tr.play();
		    },function(){
		        tl.reverse();
		        tr.reverse();
		    });
		});

	// Scroll top
		$(function () {
			$(window).scroll(function () {
				if ($(this).scrollTop() > 200) {
					$('#scrollTop').addClass("show");
					$('#scrollTop').removeClass("hide");
				} else {
					$('#scrollTop').removeClass("show");
					$('#scrollTop').addClass("hide");
				}
			});

			// scroll body to 0px on click
			$('#scrollTop').click(function () {
				$('body,html').animate({
					scrollTop: 0
				}, 600);
				return false;
			});
		});

	// Place any jQuery/helper plugins in here.
		$("#contactBar").offCanvas();
});