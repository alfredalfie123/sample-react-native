import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { StoreState } from '../redux/store';
import { IUserState } from 'redux/reducer/user.reducer';
import { connectSocket, disconnectSocket } from 'redux/action/socket.action';
import { pushImage } from 'redux/action/image.action';
import BackgroundTimer from 'react-native-background-timer';
import { ILoadingState } from 'redux/reducer/loading.reducer';
import { ICallState } from 'redux/reducer/call.reducer';

interface ISocketProps {
  url: string;
  children: any;
}

const SocketContext = React.createContext<SocketIOClient.Socket | undefined>(
  undefined
);

export const SocketProvider = ({ url, children }: ISocketProps) => {
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>(
    undefined
  );
  const [timer, setTimer] = useState(null);
  const [connected, setConnected] = useState(false);

  const user = useSelector<StoreState, IUserState>((state) => state.user);
  const call = useSelector<StoreState, ICallState>((state) => state.call);
  const option = {
    reconnection: true,
    reconnectionAttempts: Infinity, // number of reconnection attempts before giving up
    reconnectionDelay: 500, // how long to initially wait before attempting a new reconnection
    reconnectionDelayMax: 1000, // maximum amount of time to wait between reconnection attempts. Each attempt increases the reconnection delay by 2x along with a randomization factor
    randomizationFactor: 0.5
  };
  const { authToken, isLoggedIn } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !isLoggedIn) {
      console.log('=== User is not login');
      return;
    }
    console.log('Connect to socket');
    const newSocket = io.connect(url, option);
    const emit = newSocket.io.emit.bind(newSocket.io);
    newSocket.io.emit = function (...args) {
      return emit(...args);
    };

    setSocket(newSocket);
  }, [isLoggedIn, authToken]);

  const loading = useSelector<StoreState, ILoadingState>(
    (state) => state.loading
  );

  useEffect(() => {
    if (loading.isLoading && socket) {
      const intervalId = BackgroundTimer.setInterval(() => {
        socket.emit('alive');
      }, 5000);
      setTimer(intervalId);
    }
    if (!loading.isLoading && socket) {
      BackgroundTimer.clearInterval(timer);
    }
  }, [loading]);

  useEffect(() => {
    if (!socket) {
      console.log('Dont have socket');
      return;
    }
    socket.on('connect', () => {
      setConnected(true);
      if (call.callId) {
        socket.emit('join-room', {
          idCallIdentity: user.user?.idCallIdentity,
          callId: call.callId
        });
      }
      socket.emit('auth', authToken);
      socket.on('auth', async (data: any) => {
        // Cancel the timer when you are done with it
        if (data && data.success) {
          dispatch(connectSocket());
        }
      });
    });
    socket.on('chat-image', (data: any) => {
      console.log('[Socket.io] - On Handle chat-image Event', data);
      if (data) {
        data.seen = false;
        dispatch(pushImage(data));
      }
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
      setConnected(false);
      // dispatch(disconnectSocket());
    });
    if (!authToken) {
      socket.disconnect();
    }
  }, [socket]);

  useEffect(() => {
    if (!connected && socket && call.callId) {
      socket?.connect();
    }
  }, [connected]);

  useEffect(() => {
    if (call.callId && socket) {
      socket.emit('join-room', {
        idCallIdentity: user.user?.idCallIdentity,
        callId: call.callId
      });
    }
  }, [call.callId, socket, connected]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const useEmit = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    console.log('No socket was provided');
    return;
  }
  return socket.emit;
};

export const useEmitEvent = (eventName: string) => {
  const socket = useSocket();
  if (!socket) {
    console.log('No socket was provided');
    return;
  }
  return (data: any) => socket.emit(eventName, data);
};
