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

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
  });


  jQuery('#message-form').on('submit',function (e) {

    e.preventDefault();

    socket.emit('createMessage',{
      from: 'User',
      text: jQuery('[name=message]').val()
    },function () {

    });
  });

























  // socket.on('newEmail',function (email) {
  //   console.log('New email',email);
  // });
