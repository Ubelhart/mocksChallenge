const express = require("express");
const app = express();

const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);

const { Server: IOServer } = require("socket.io");
const io = new IOServer(httpServer);

const { faker } = require("@faker-js/faker");
const { normalize, schema } = require("normalizr");
const denormalize = normalize.denormalize;

const { containerMessages, containerProducts } = require("./Container");

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");
  const messages = await containerMessages.getDataBaseMessages();
  const products = await containerProducts.getDataBaseProducts();

  socket.emit("products", products);
  socket.on("new-products", async (product) => {
    product.price = parseInt(product.price);

    containerProducts.insertProduct(product);
    const products = await containerProducts.getDataBaseProducts();
    io.sockets.emit("products", products);
  });

  socket.emit("messages", messages);
  socket.on("new-message", async (message) => {
    containerMessages.insertMessage(message);
    const messages = await containerMessages.getDataBaseMessages();

    io.sockets.emit("messages", messages);
  });
});

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("form");
});

app.get("/api/productos-test", (req, res) => {
  const products = [];
  for (let i = 0; i < 5; i++) {
    const product = {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.image(),
    };
    products.push(product);
  }
  res.json(products);
});

module.exports = httpServer;
