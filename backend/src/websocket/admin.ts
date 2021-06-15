import { io } from '../http';
import { ConnectionService } from '../service/ConnectionService';
import { MessageService } from '../service/MessageService';


io.on("connect", async (socket) => {
  const connectionService = new ConnectionService();
  const messageService = new MessageService();
  const connectionsWithoutAdmin = await connectionService.findAllWithoutAdmin();

  io.emit("admin_list_all_users", connectionsWithoutAdmin);

  socket.on("admin_list_messages_by_user", async (params,  callback) => {
    const { user_id } = params;

    const messages = await messageService.listByUser(user_id);

    callback(messages);
  });

  socket.on("admin_user_on_support", async params => {
    const { user_id } = params;

    await connectionService.update(user_id, socket.id);

    const connectionsWithoutAdmin = await connectionService.findAllWithoutAdmin();

    io.emit("admin_list_all_users", connectionsWithoutAdmin);
  });

  socket.on("admin_send_message", async params=> {
    const { user_id, text } = params;

    const message = await messageService.create({
      user_id,
      text,
      admin_id: socket.id
    });

    const { socket_id } = await connectionService.findByUserId(user_id);

    io.to(socket_id).emit("admin_sent_to_client", {
      text,
      socket_id: socket.id
    });

  });
});
