import { AnyAction } from 'redux';

export interface ICallingImage {
  callID: string;
  created_at: string;
  created_by_call_identity: string;
  id: string;
  image_url: string;
  name: string;
  updated_at: string;
  seen?: boolean;
}

export default function callReducer(
  state: Map<string, ICallingImage> = new Map<string, ICallingImage>(),
  action: AnyAction
) {
  switch (action.type) {
    case 'PUSH_IMAGE':{
      const map = new Map<string, ICallingImage>(state);
      
      const callingImage = action.payload as ICallingImage;
      map.set(callingImage.image_url, callingImage);
      return map;
    }
    case 'CLEAR_DATA':
      return new Map<string, ICallingImage>();
    case 'SEEN_ALL': {
      const map = new Map<string, ICallingImage>(state);
      map.forEach((value, key, map) => {
        map.set(key, { ...value, seen: true });
      });
      return map;
    }
    default:
      return state;
  }
}
