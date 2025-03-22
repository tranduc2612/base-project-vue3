<script setup lang="ts">
import { ref, nextTick } from 'vue'
import socket, { sendMessage, onMessageReceived, joinRoom } from '@/socket/socketService'

// State
const messages = ref([])
const newMessage = ref('')
const username = ref('')
const selectedRoom = ref('room1')
const container = ref(null)

// Khi component mounted, tham gia phòng
const initChat = () => {
  if (!username.value) return alert('Vui lòng nhập tên người dùng!')

  joinRoom(selectedRoom.value)

  // Clear tin nhắn cũ khi đổi room
  messages.value = []

  // Lấy lịch sử chat khi vào phòng
  socket.on('chatHistory', (history) => {
    messages.value = history // Gán lịch sử chat khi vào phòng
  })

  // Lắng nghe tin nhắn từ server
  onMessageReceived((message) => {
    messages.value = message
    nextTick(() => {
      if (container.value) {
        container.value.scrollTop = container.value.scrollHeight
      }
    })
  })
}

// Gửi tin nhắn
const send = () => {
  if (newMessage.value.trim()) {
    const dataSend = { room: selectedRoom.value, message: newMessage.value, sender: username.value }
    sendMessage(dataSend)
    newMessage.value = ''
    messages.value.push(dataSend)
    console.log(messages.value)
  }
}
</script>

<template>
  <div class="chat-container">
    <h2>Chat Room</h2>

    <!-- Chọn User -->
    <input v-model="username" placeholder="Nhập tên user..." />
    <button @click="initChat">Đăng nhập</button>

    <!-- Chọn Room -->
    <select v-model="selectedRoom" @change="initChat">
      <option value="room1">Room 1</option>
      <option value="room2">Room 2</option>
    </select>

    <!-- Hiển thị tin nhắn -->
    <div class="messages" ref="container">
      <p v-for="(msg, index) in messages" :key="index">
        <strong :style="{ color: msg.sender === username ? 'blue' : 'green' }">
          {{ msg.sender }}:
        </strong>
        {{ msg.message }}
      </p>
    </div>

    <!-- Gửi tin nhắn -->
    <input v-model="newMessage" @keyup.enter="send" placeholder="Nhập tin nhắn..." />
    <button @click="send">Gửi</button>
  </div>
</template>

<style scoped>
.chat-container {
  width: 400px;
  margin: auto;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.messages {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
input {
  width: 80%;
  padding: 5px;
  margin-bottom: 5px;
}
button {
  padding: 5px 10px;
}
</style>
