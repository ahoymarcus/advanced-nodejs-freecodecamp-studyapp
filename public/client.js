// This file's full path is /public/client.js
$(document).ready(function () {
  /* Global io */
	// Freecodecamp: The comment suppresses 
	// the error you would normally see since 'io' // is not defined in the file. We've already 
	// added a reliable CDN to the Socket.IO
	// library on the page in chat.pug.
	let socket = io();
	
	socket.on('user', (data) => {
		console.log(data);
		$('#num-users').text(data.currentUsers + ' users online');
    let message = data.name + (data.connected ? ' has joined the chat.' : ' has left the chat.');
    $('#messages').append($('<li>').html('<b>' + message + '</b>'));
	});
	
	// Form submittion with new message in field with id 'm'
  $('form').submit(function () {
    var messageToSend = $('#m').val();

    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
});  


