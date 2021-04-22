document.querySelector("#start_chat").addEventListener("click", (event) => {
  const socket = io();

  const chat_help = document.getElementById("chat_help");
  chat_help.style.display = "none";

  const chat_in_support = document.getElementById("chat_in_support");
  chat_in_support.style.display = "block";

  const email = document.getElementById("email").value;
  // const email = "victor@email.com";
  // const text = "Oi preciso de ajuda";
  const text = document.getElementById("txt_help").value;

  socket.on("connect", () => {
    const params = { email, text };
    console.log(params);
    socket.emit("client_first_access", params, (call, err) => {
      console.log(err ? err : call);
    });
  });
});
