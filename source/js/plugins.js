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


$(document).ready(function () {
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
				$.ajax({
				  type: "POST",
				  url: "send.php",
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

	// Backstretch
		$(".backstretch").each(function(){
			$(this).find(".source").hide();
			var src = $(this).find(".source").attr("src");
			$(this).backstretch(src);
		})

	// Vertical align
		var verticalAlign = function(){
			if(Modernizr.mq('only all and (min-width: 781px)')){
				$(".vertHolder").each(function(){
					var h = $(this).find(".vSizer").outerHeight() + "px";
					$(this).find(".vParent").css({"line-height": h, "height" : h});
				})
			}
		}
		verticalAlign();
		$(window).resize(function(){
			verticalAlign();
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

});

// Place any jQuery/helper plugins in here.
$("#contactBar").offCanvas();