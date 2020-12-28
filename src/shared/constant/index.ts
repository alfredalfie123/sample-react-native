import { Color } from 'theme/color';

export { default as global } from './global';

export const CallingStatus = {
  'Gọi đi': {
    color: Color.blue.normal
  },
  'Gọi đến': {
    color: Color.green.normal
  },
  'Gọi lỡ': {
    color: Color.red.normal
  }
};

export const ItemHeight = 80;

export const CallingType = {
  voice: {
    icon: 'phone',
    title: 'Gọi audio',
    subtitle: 'Gọi audio lorem ipsum'
  },
  video: {
    icon: 'video-camera',
    title: 'Gọi video',
    subtitle: 'Gọi video lorem ipsum'
  }
};

export const CallingHistoryState: {
  [name: string]: { text: string; color: string };
} = {
  MISS: {
    text: 'Cuộc gọi lỡ',
    color: Color.red.dark
  },
  END: {
    text: 'Đã tiếp nhận',
    color: Color.green.dark
  },
  COMMUNICATING: {
    text: 'Đang tiếp nhận',
    color: Color.green.light
  },
  INIT: {
    text: 'Đang chờ',
    color: Color.green.normal
  }
};

export const CallEvent = {
  incoming: 'incoming_call',
  miss: 'miss_call',
  end: 'end_call'
};

export const LOCAL_NOTI_ID = '8080';
