import React from 'react'
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set, get) =>
({
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
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    if (!userId) {
      toast.error("No user selected for messages");
      return;
    }
    set({ isMessagesLoading: true })
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data.messages });
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
    finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      console.log("Axios response:", res);

      if (res?.data) {
        set({ messages: [...(Array.isArray(messages) ? messages : []), res.data] });
      } else {
        console.error("Invalid response: no data");
        toast.error("Server did not return a valid message");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  //listen to messages
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    //optimise
    socket.on("newmessage", (newmessage) => {
      // only add if the newMessage is for the selected chat
      const isMessageRelevant =
        newmessage.senderid === selectedUser._id ||
        newmessage.receiverid === selectedUser._id;

      if (!isMessageRelevant) return;

      set({ messages: [...get().messages, newmessage] });
    });

  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newmessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));