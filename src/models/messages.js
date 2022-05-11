const mongoose = require("mongoose");

const messagesCollection = "messages";

const authorSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  alias: { type: String, required: true },
  avatar: { type: String, required: true },
});

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
});

const messagesSchema = new mongoose.Schema({
  author: authorSchema,
  messages: [messageSchema],
});

const Message = mongoose.model(messagesCollection, messagesSchema);

module.exports = Message;

const messages = [
  {
    id: "s@g",
    name: "Sergio",
    lastName: "Garcia",
    age: 25,
    alias: "sgarcia",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "j@g",
    name: "Juan",
    lastName: "Peréz",
    age: 22,
    alias: "jperez",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: "a@g",
    name: "Andrea",
    lastName: "Barrera",
    age: 23,
    alias: "abarrera",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
];
