const socketIO = require("socket.io");
const { NOTIFICATION_TYPES } = require("../config/constants");

let io = null;
const socketService = {

  init(server) {
    io = socketIO(server, {
      cors: true,
      origins: [
        // "http://127.0.0.1:3000",
        "http://localhost:3000",
      ],
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      //   socket.on("notification", (data) => {
      //     this.sendNotification(socket, data);
      //   });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    // setInterval(() => {
    //   this.sendNotification("360c4dc7-d15e-49f5-abc0-8f13bd447482", {
    //     type: NOTIFICATION_TYPES.QUESTION_LIKE,
    //     // user,
    //   });
    // }, 5000);
  },

  sendNotification(userId, data) {
    io.emit(`notification-${userId}`, data);
    console.log("Emitted!!");
  },
};

module.exports = socketService;
