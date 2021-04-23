const socket = io();
let connectionUsers = [];

socket.on("admin_list_all_users", (connections) => {
  connectionUsers = connections;
  document.getElementById("list_users").innerHTML = "";

  const adminTemplate = document.getElementById("template").innerHTML;

  connections.forEach(connection => {
    const rendered = Mustache.render(adminTemplate, {
      id: connection.socket_id,
      email: connection.user.email,
    });

    document.getElementById("list_users").innerHTML += rendered;
  });
});


function call(id) {
  const connection = connectionUsers.find(connection => connection.socket_id === id);

  const template  = document.getElementById("admin_template").innerHTML;

  const render = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user_id
  });

  document.getElementById("supports").innerHTML += render;
  const params = { user_id: connection.user_id };

  socket.emit("admin_list_messages_by_user", params, messages => {
    console.log(messages)
    const divMessages = document.getElementById(`allMessages${connection.user_id}`);

    messages.forEach(message => {
      const createDiv = document.createElement("div");

      if (message.admin_id === null) {
        createDiv.className = "admin_message_client";

        createDiv.innerHTML = `<span>${connection.user.email}</span>`;
        createDiv.innerHTML += `<span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${
          dayjs(message.created_at).format("DD/MM//YYYY HH:mm:ss")}</span>`;
        } else {
        createDiv.className = "admin_message_admin";

        createDiv.innerHTML = `Atendente: <span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${
          dayjs(message.created_at).format("DD/MM//YYYY HH:mm:ss")}</span>`;
        createDiv
      }
      divMessages.appendChild(createDiv);
    });
  });
}

function sendMessage(id) {
  const text  = document.getElementById(`send_message_${id}`).value;

  const params = {
    user_id: id,
    text: text
  }

  socket.emit("admin_send_message", params);

  const createDiv = document.createElement("div");

  createDiv.className = "admin_message_admin";

  createDiv.innerHTML = `Atendente: <span>${text}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs().format("DD/MM//YYYY HH:mm:ss")}</span>`;

  document.getElementById(`allMessages${id}`).appendChild(createDiv);

  document.getElementById(`send_message_${id}`).value = "";
}

socket.on("admin_receive_message", data => {
  const connection = connectionUsers.find(connection => connection.socket_id === data.socket_id);

  const divMessages = document.getElementById(`allMessages${connection.user_id}`);

  const createDiv = document.createElement("div");
  createDiv.className = "admin_message_client";

  createDiv.innerHTML = `<span>${connection.user.email}</span>`;
  createDiv.innerHTML += `<span>${data.message.text}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${
    dayjs(data.message.created_at).format("DD/MM//YYYY HH:mm:ss")}</span>`;

  divMessages.appendChild(createDiv);
});
