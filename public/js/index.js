const socket = io.connect();

function renderProducts(products) {
  const html = products
    .map((product) => {
      return `
        <tr>
          <td> ${product.title} </td>
          <td>${product.price}</td>
          <td><img src=${product.thumbnail} /></td>
        </tr>`;
    })
    .join(" ");
  document.getElementById("table").innerHTML = html;
}

socket.on("products", (products) => {
  renderProducts(products);
});

document.getElementById("products").addEventListener("submit", (e) => {
  e.preventDefault();
});

function addProducts() {
  const newProduct = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socket.emit("new-products", newProduct);
}

function renderMessage(messages) {
  const authorSchema = new normalizr.schema.Entity(
    "authors",
    {},
    { idAttribute: "email" }
  );

  const messageSchema = new normalizr.schema.Entity(
    "messages",
    {},
    { idAttribute: "_id" }
  );

  const postSchema = new normalizr.schema.Entity("post", {
    author: authorSchema,
    post: messageSchema,
  });

  const normalizedData = normalizr.normalize(messages, postSchema);
  console.log(normalizedData);
  const html = normalizedData.result
    .map((elem) => {
      return `<div>
        <strong class="email">${elem.email}</strong>
        <em class="date">[${elem.date}]</em>:
        <em class="text">${elem.message}</em> </div>
        <img src="${elem.avatar}"></img>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}

socket.on("messages", (messages) => {
  renderMessage(messages);
});

document.getElementById("chat").addEventListener("submit", (e) => {
  e.preventDefault();
});

function addMessage() {
  const newMessage = {
    author: {
      email: document.getElementById("email").value,
      name: document.getElementById("name").value,
      lastName: document.getElementById("lastName").value,
      age: document.getElementById("age").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    messages: [
      {
        message: document.getElementById("message").value,
      },
    ],
  };

  socket.emit("new-message", newMessage);
}
