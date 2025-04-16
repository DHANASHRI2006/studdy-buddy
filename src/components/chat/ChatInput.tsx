import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, Image, Paperclip } from "lucide-react";
import { toast } from "sonner";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleAttachment = () => {
    toast.info("Coming soon: File attachments");
  };

  const handleImage = () => {
    toast.info("Coming soon: Image upload");
  };

  const handleVoice = () => {
    toast.info("Coming soon: Voice input");
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 bg-background">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            placeholder="Ask anything about your studies..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[60px] resize-none pr-20"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="absolute bottom-2 right-2 flex gap-1">
            <Button type="button" size="icon" variant="ghost" className="h-8 w-8" onClick={handleAttachment}>
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button type="button" size="icon" variant="ghost" className="h-8 w-8" onClick={handleImage}>
              <Image className="h-4 w-4" />
            </Button>
            <Button type="button" size="icon" variant="ghost" className="h-8 w-8" onClick={handleVoice}>
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button 
          type="submit" 
          size="icon" 
          className="h-10 w-10 rounded-full bg-study-primary hover:bg-study-secondary"
          disabled={!message.trim() || isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
