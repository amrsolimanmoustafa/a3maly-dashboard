import { io } from 'socket.io-client';

const createSocketConnection = (token: string | null) => {
  if (typeof window !== 'undefined') {
    const socket = io('https://pronto.zbony.com/order', {
      extraHeaders: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return socket;
  }

  return null;
};

export default createSocketConnection;
