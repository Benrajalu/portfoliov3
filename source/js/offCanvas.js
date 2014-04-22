$.fn.offCanvas = function(){


		var open = function(tar){
			$('html').css("overflow", "hidden");
			var op = new TimelineLite();
			    op.to(tar,0.3,{display:"block", right:0});
			    if(Modernizr.mq('only all and (min-width: 551px)')){
					var bp = new TimelineLite();
					bp.to("#scope",0.3,{position:'relative', right:"350px"});
				}
		}

		var close = function(tar){
			var oc = new TimelineLite();
			    oc.to(tar,0.3,{right:-350, display:"none"});
			    oc.to('html',0.1,{overflow:"auto"});
			if(Modernizr.mq('only all and (min-width: 551px)')){
				var bc = new TimelineLite();
				bc.to("#scope",0.3,{position:'relative', right:"0"});
			}
		}

	    // method for independant use
    	var methods = {
    			show : function(){
    				open();
    			}, 
    			hide : function(){
    				close();
    			}
        };

        $("a.offTrigger").each(function(){
        	$(this).on("click", function(event){
        		event.preventDefault();
        		var tar = $(this).attr("data-target");
        		open(tar);
        	})
        })

        $("a.closeCanvas").each(function(){
        	$(this).on("click", function(event){
				event.preventDefault();
        		var tar = $(this).attr("data-target");
        		close(tar);
        	})
        })



        $.fn.gladysPublic = function(methodOrOptions) {
            if ( methods[methodOrOptions] ) {
                return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
                // Default to "init"
                return methods.init.apply( this, arguments );
            } else {
                $.error( 'Method ' +  methods + ' does not exist' );
            }    
        };

};