import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  type: "system" | "message";
  data: {
    text: string;
    timestamp: string;
    username?: string;
  };
}

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
