---
# front matter in order to pull in the api endpoint from config
---

/*
	Eventually by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {

	"use strict";

	var	$body = document.querySelector('body');

	// Methods/polyfills.

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Play initial animations on page load.
		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});


	// (function() {
	//
	// })


	// Form handling
		(function() {

			// Vars.
				var $form = document.querySelectorAll('.secret-form')[0],
					$message;

			// Bail if addEventListener isn't supported.
				if (!('addEventListener' in $form))
					return;


				$('#retrieve-secret').on('submit', function(event) {
					var token = $('#secret-token').val()
					event.stopPropagation();
					event.preventDefault();
					window.setTimeout(function() {
						$.ajax({
							method: 'GET',
							url: '{{ site.secret_endpoint }}?token=' + token,
							crossDomain: 'true',
							contentType: 'application/json',
							success: function (res){
								$('#retrieve-secret').trigger('reset');
								$('#secret-response').html('Secret token: ' + JSON.stringify(res));
							},
							error: function (res){
								console.log(res);
								$('#secret-response').html('failure Something went wrong. Please try again.' + res);
							}
						})
					}, 750)
				})

			// Events
				$('#create-secret').on('submit', function(event) {
					event.stopPropagation();
					event.preventDefault();
						window.setTimeout(function() {

							var data = {
						    username: $('#secret-username').val(),
						    password: $('#secret-password').val(),
						    message: $('#secret-message').val(),
								expiration: $('#secret-expiration').val()
						  }

						  $.ajax({
						    method: 'POST',
						    url: '{{ site.secret_endpoint }}',
								crossDomain: 'true',
						    contentType: 'application/json',
						    data: JSON.stringify(data),
						    success: function (res){
									$('#create-secret').trigger('reset');
									$('#secret-response').html('Secret token: ' + res['token']);
									// $submit.disabled = true;
								},
						    error: function (res){
									console.log(res);
									$message._show('failure', 'Something went wrong. Please try again.');
						    }
						  });


						}, 750);

				});

		})();

})();
