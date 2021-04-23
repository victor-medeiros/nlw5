document.querySelector("#start_chat").addEventListener("click", (event) => {
  const socket = io();

  const chat_help = document.getElementById("chat_help");
  chat_help.style.display = "none";

  const chat_in_support = document.getElementById("chat_in_support");
  chat_in_support.style.display = "block";

  const email = document.getElementById("email").value;
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
});
