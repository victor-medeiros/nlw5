let socket_admin_id = null;
let emailUser = null;
let socket = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {
  socket = io();

  const chat_help = document.getElementById("chat_help");
  chat_help.style.display = "none";

  const chat_in_support = document.getElementById("chat_in_support");
  chat_in_support.style.display = "block";

  const email = document.getElementById("email").value;
  emailUser = email;
  const text = document.getElementById("txt_help").value;

  socket.on("connect", () => {
    const params = { email, text };
    console.log(params);
    socket.emit("client_first_access", params, (call, err) => {
      console.log(err ? err : call);
    });
  });

  socket.on("client_list_all_messages", messages => {
    const templateClient = document.getElementById("message-user-template").innerHTML;
    const templateAdmin = document.getElementById("admin-template").innerHTML;

    messages.forEach(message => {
      if (message.admin_id === null) {
        const rendered = Mustache.render(templateClient, {
          message: message.text,
          email
        });

        document.getElementById("messages").innerHTML += rendered;
      } else {
        const rendered = Mustache.render(templateAdmin, {
          message_admin: message.text
        });

        document.getElementById("messages")
      }
    });
  });

  socket.on("admin_sent_to_client", message => {
    socket_admin_id = message.socket_id;
    const templateAdmin = document.getElementById("admin-template").innerHTML;

    const rendered = Mustache.render(templateAdmin, {
      message_admin: message.text
    });

    document.getElementById("messages").innerHTML += rendered;
  });
});

document.querySelector("#send_message_button").addEventListener("click", event => {
  const text = document.getElementById("message_user").value;

  const params = {
    text,
    socket_admin_id
  }

  const templateClient = document.getElementById("message-user-template").innerHTML;

  const rendered = Mustache.render(templateClient, {
    message: text,
    email: emailUser
  });

  socket.emit("client_send_to_admin", params);

  document.getElementById("message_user").value = "";
  document.getElementById("messages").innerHTML += rendered;
})
