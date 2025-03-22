import { io } from "socket.io-client";

// Kết nối đến server WebSocket
const socket = io("http://localhost:3000"); // Thay bằng địa chỉ backend của bạn

// Hàm gửi tin nhắn
export const sendMessage = (reqDataSend) => {
  socket.emit("sendMessage", reqDataSend);
};

// Hàm nhận tin nhắn
export const onMessageReceived = (callback) => {
  socket.on("receiveMessage", (message) => {
    callback(message);
  });
};

// Hàm tham gia phòng chat
export const joinRoom = (room) => {
  socket.emit("joinRoom", room);
};

export default socket;
