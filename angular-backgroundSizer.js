(function(){

	'use strict';

	var app = angular.module('backgroundSizer', []);

	app.directive('backgroundSizer', function(){

		return {
			link: function ( s, el, atts ) {

				// From Underscore
				var throttle=function(e,t){var n,r,i,s;var o=0;var u=function(){o=new Date;i=null;s=e.apply(n,r)};return function(){var a=new Date;var f=t-(a-o);n=this;r=arguments;if(f<=0){clearTimeout(i);i=null;o=a;s=e.apply(n,r)}else if(!i){i=setTimeout(u,f)}return s}};

				// Get the actual DOM element (angular wraps it in a jQLite wrapper)
				el = el[0];

				var doCalc = throttle(function( url ){

					var img = document.createElement('img');
						img.style.visibility = 'hidden';
						img.style.position = 'absolute';

					( document.body || document.querySelector('body') || document.getElementsByTagName('body')[0] ).appendChild(img);

					img.onload = function(){

						if 			( el.clientWidth < img.clientWidth ) 	el.style.backgroundSize = 'cover';
						else if 	( el.clientHeight < img.clientHeight ) 	el.style.backgroundSize = 'contain';
						else 												el.style.backgroundSize = '';

						img.remove();

					};

					img.src = atts.backgroundSizer;

				}, 100);

				atts.$observe( 'backgroundSizer', function( url ){

					if ( !url ) return;
					else 		doCalc();
				});

				// IE8 uses attachEvent

				if ( window.attachEvent )	window.attachEvent('resize', doCalc);
				else 						window.addEventListener('resize', doCalc, false);

				// In the event of the scope going away, remove the previously set event listener

				s.$on('$destroy', function(){

					if ( window.detachEvent )	window.detachEvent('resize', doCalc);
					else 						window.removeEventListener('resize', doCalc, false);
				});

			}
		};

	});

})();
