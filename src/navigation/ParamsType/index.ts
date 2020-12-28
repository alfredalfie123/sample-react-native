export type CallType = 'Outgoing' | 'Incoming';

export type VideoCallParams = {
  callId?: string;
  from: string;
  to: string;
  callType: CallType;
};
