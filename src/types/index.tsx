export type SystemMessageType = {
  text: string;
  timestamp: string;
};

export type MessageType = {
  text: string;
  username: string;
  timestamp: string;
};

export type ChatMessage = {
  type: "system" | "message";
  data: SystemMessageType | MessageType;
};
