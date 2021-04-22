import { io } from '../http';
import { ConnectionService } from '../service/ConnectionService';
import { UserService } from '../service/UserService';

const connectionService = new ConnectionService();
const userService = new UserService();

io.on('connect', (socket) => {
  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params;

    const userExists = await userService.findByEmail(email);

    if (!userExists) {
      const user = await userService.create({ email });

      await connectionService.create({
        socket_id,
        user_id: user.id
      });
    } else {
      await connectionService.create({
        socket_id,
        user_id: userExists.id
      });

    }

  });
});
