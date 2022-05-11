const mongoose = require("mongoose");
const Message = require("./models/messages");
const Product = require("./models/products");
const mongoDbKey = require("../options/mongoDb");

class Container {
  constructor(config) {
    this.config = config;
  }

  async connect() {
    try {
      await mongoose.connect(this.config);
      console.log("Conectado a la base de datos");
    } catch (error) {
      console.log(error);
    }
  }
}

class ContainerProducts extends Container {
  constructor(config) {
    super(config);
    this.connect();
  }

  async getDataBaseProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

class ContainerMessages extends Container {
  constructor(config) {
    super(config);
  }

  async getDataBaseMessages() {
    try {
      const messages = await Message.find({});
      return messages;
    } catch (error) {
      console.log(error);
    }
  }

  async insertMessage(message) {
    const check = await Message.findOneAndUpdate(
      { author: message.author },
      {
        messages: { $push: { message: message.messages[0].message } },
      }
    );
    if (!check) {
      const newMessage = new Message(message);
      return await newMessage.save();
    }
    return check;
  }
}

const containerMessages = new ContainerMessages(mongoDbKey);
const containerProducts = new ContainerProducts(mongoDbKey);

module.exports = { containerMessages, containerProducts };
