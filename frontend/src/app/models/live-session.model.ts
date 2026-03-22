export interface LiveSession {
  id: string;
  title: string;
  teacherName: string;
  courseName?: string;
  jitsiRoomName?: string;
  scheduledAt: string;
  duration?: number;
  status: 'scheduled' | 'live' | 'ended';
  participantCount?: number;
}

export interface JoinSessionResponse {
  roomName: string;
  domain: string;
  displayName: string;
  sessionTitle: string;
}
