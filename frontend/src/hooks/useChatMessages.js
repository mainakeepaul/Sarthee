// src/hooks/useChatMessages.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/*
 * Custom hook to manage chat messages.
 * Handles fetching old messages, sending new ones, and auto-refresh.
 *
 * @param {string} chatId - MongoDB Chat _id for current conversation
 * @param {string} token  - JWT token for Authorization header
 */
export function useChatMessages(chatId, token) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  // base URL automatically works with Next.js API routes
  const axiosInstance = axios.create({
    baseURL: "/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  /**
   * Fetch messages for current chat
   */
  const fetchMessages = useCallback(async () => {
    if (!chatId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get(`/chats/${chatId}`);
      setMessages(res.data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError(err.response?.data?.error || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [chatId]);

  /**
   * Send a new message
   */
  const sendMessage = useCallback(
    async (text, attachments = []) => {
      if (!chatId || !text?.trim()) return;
      setSending(true);
      setError(null);

      try {
        const res = await axiosInstance.post(`/chats/${chatId}`, {
          text,
          attachments,
        });

        // Append message to local state
        setMessages((prev) => [...prev, res.data]);
      } catch (err) {
        console.error("Error sending message:", err);
        setError(err.response?.data?.error || "Failed to send message");
      } finally {
        setSending(false);
      }
    },
    [chatId]
  );

  /**
   * Auto-refresh messages when chatId changes
   */
  useEffect(() => {
    if (chatId) {
      fetchMessages();
    }
  }, [chatId, fetchMessages]);

  return {
    messages,
    loading,
    sending,
    error,
    fetchMessages,
    sendMessage,
  };
}
