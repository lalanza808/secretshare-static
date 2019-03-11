---
# front matter in order to pull in the api endpoint from config
---


$( document ).ready(function(){
    $('body').removeClass('is-preload');
});

$('#create-secret').on('submit', function(event) {
	event.stopPropagation();
	event.preventDefault();
	window.setTimeout(function() {

		var data = {
			username: $('#secret-username').val(),
			password: $('#secret-password').val(),
			message: $('#secret-message').val(),
			expiration: $('#secret-expiration').val(),
			expire_on_read: $('#secret-expire-on-read')[0].checked
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
				$('#secret-response').removeClass('hidden');
			},
			error: function (res){
				$('#secret-response').html('Something went wrong: ' + JSON.stringify(res.responseJSON));
			}
		});
	}, 750);
});

$('#retrieve-secret').on('submit', function(event) {
	event.stopPropagation();
	event.preventDefault();
	window.setTimeout(function() {

		var token = $('#secret-token').val();
		
		$.ajax({
			method: 'GET',
			url: '{{ site.secret_endpoint }}?token=' + token,
			crossDomain: 'true',
			contentType: 'application/json',
			success: function (res){
				$('#retrieve-secret').trigger('reset');
				$('#secret-response').removeClass('hidden');
				$('#response-username').html(res['username']);
				$('#response-password').html(res['password']);
				$('#response-message').html(res['message']);
				$('#response-expiration').html(res['expiration']);
			},
			error: function (res){
				$('#secret-response').html('Something went wrong: ' + JSON.stringify(res.responseJSON));
			}
		})
	}, 750);
});
