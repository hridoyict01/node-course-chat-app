var socket = io();


socket.on('connect', function () {
 console.log('connected to server');

//  socket.emit('createEmail',{
//    to: 'i@gmail.com',
//    text: 'from client to server'
//  })
    // socket.emit('createMessage',{
    //   from:'Hridoy',
    //   text:'That works for me'
    // });
  });




socket.on('disconnect', function () {
 console.log('disconnected from server');
});
  socket.on('newMessage',function (message) {
    console.log('newMessage',message);
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
  });

  socket.on('newLocationMessage',function (message) {
    var li = jQuery('<li></li>');
    var a =jQuery('<a target="_blank">My current location</a>');
    var formattedTime = moment(message.createdAt).format('h:mm a');
    li.text(`${message.from} ${formattedTime}:  `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);

  });

  jQuery('#message-form').on('submit',function (e) {

    e.preventDefault();

    var messageTextbox= jQuery('[name=message]');

    socket.emit('createMessage',{
      from: 'User',
      text: messageTextbox.val()
    },function () {
    messageTextbox.val('')

    });
  });


var locationButton = jQuery('#send-location');

    locationButton.on('click',function () {
      if(!navigator.geolocation) {
        return alert('Geo location not supported by your browser');
      }

      locationButton.attr('disabled','disabled').text('Sending location');

      navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
      });
    });





















  // socket.on('newEmail',function (email) {
  //   console.log('New email',email);
  // });
