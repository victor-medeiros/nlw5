import { io } from '../http';
import { ConnectionService } from '../service/ConnectionService';
import { MessageService } from '../service/MessageService';
import { UserService } from '../service/UserService';

interface Params {
  email: string;
  text: string;
}

io.on('connect', (socket) => {
  const connectionService = new ConnectionService();
  const userService = new UserService();
  const messageService = new MessageService();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params as Params;
    let user_id = null;

    const userExists = await userService.findByEmail(email);

    if (!userExists) {
      const user = await userService.create({ email });

      await connectionService.create({
        socket_id,
        user_id: user.id
      });
      user_id = user.id;
    } else {
      user_id = userExists.id;
      const connection = await connectionService.findByUserId(userExists.id);

      if (!connection) {
        await connectionService.create({
          socket_id,
          user_id: userExists.id
        });
      } else {
        connection.socket_id = socket_id;

        await connectionService.create(connection);
      }

    }

    await messageService.create({
      user_id,
      text
    })

      const allMessages = await messageService.listByUser(user_id);

      socket.emit("client_list_all_messages", allMessages);

  });

  socket.on("client_send_to_admin", async params => {
    const { socket_admin_id, text } = params;

    const socket_id = socket.id;

    const { user_id } = await connectionService.findBySokcetId(socket_id);

    const message = await messageService.create({
      text,
      user_id
    });

    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id
    });
  });
});
