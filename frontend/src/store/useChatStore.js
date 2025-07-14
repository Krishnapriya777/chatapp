import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    if (!userId) {
      toast.error("No user selected for messages");
      return;
    }
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data.messages });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser || !selectedUser._id) {
      toast.error("No user selected");
      return;
    }

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      if (res?.data) {
        set({
          messages: [...(Array.isArray(messages) ? messages : []), res.data],
        });
      } else {
        toast.error("Server did not return a valid message");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: (selectedUserId) => {
    const socket = useAuthStore.getState().socket;
    if (!socket || !selectedUserId) return;

    const handler = (newMessage) => {
      const isRelevant =
        newMessage.senderid === selectedUserId ||
        newMessage.recieverid === selectedUserId;

      if (!isRelevant) return;

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    };

    socket.on("newmessage", handler);

    // Store the handler for cleanup
    set({ _messageHandler: handler });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    const handler = get()._messageHandler;
    if (socket && handler) {
      socket.off("newmessage", handler);
    }
    set({ _messageHandler: null });
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
