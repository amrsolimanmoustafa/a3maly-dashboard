import { io } from 'socket.io-client';

const createSocketConnection = (token: string | null) => {
  if (typeof window !== 'undefined') {
    const socket = io('', {
      extraHeaders: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return socket;
  }

  return null;
};

export default createSocketConnection;
