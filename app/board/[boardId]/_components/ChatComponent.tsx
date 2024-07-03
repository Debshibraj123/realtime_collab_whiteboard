import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, X } from "lucide-react";

interface ChatComponentProps {
  orgId: string;
  boardId: Id<"boards">;
  onClose: () => void;
}

export default function ChatComponent({ orgId, boardId, onClose }: ChatComponentProps) {
  const messages = useQuery(api.chat.getMessages, { boardId });
  const sendMessage = useMutation(api.chat.sendMessage);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await sendMessage({ orgId, boardId, content: newMessage });
      setNewMessage("");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex flex-col h-full bg-white shadow-lg rounded-l-xl overflow-hidden"
    >
      <div className="flex justify-between items-center p-4 bg-gray-100 border-b">
        <h2 className="text-xl font-semibold">Chat</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-start space-x-3 mb-4"
            >
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${message.author}`} />
                <AvatarFallback>{message.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">{message.author}</span>
                <span className="mt-1 text-sm text-gray-700 bg-gray-100 rounded-lg py-2 px-3">
                  {message.content}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </motion.div>
  );
}