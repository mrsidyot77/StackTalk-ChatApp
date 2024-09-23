export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  closeChat: () => ({
    selectedChatData: undefined,
    selectedChatType: undefined,
    selectedChatMessages: [],
  }),
});
