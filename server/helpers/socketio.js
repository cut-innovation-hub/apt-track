const sio = require("socket.io");

let io = null;
module.exports = {
  // Initalize the socket server
  initialize: function (httpServer) {
    io = sio(httpServer);
    io.on("connection", function (socket) {
      console.log("New client connected with id = ", socket.id);
      socket.on("disconnect", function (reason) {
        console.log("A slient disconnected id = ", socket.id);
      });
    });
  },
  getInstance: function () {
    return io;
  },
};
