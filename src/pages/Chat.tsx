
import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, Message } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookMarked, Brain, Play, Lightbulb, Search } from "lucide-react";

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI Study Buddy. How can I help with your studies today?",
    timestamp: new Date(Date.now() - 60000),
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(content),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  // Simple function to generate AI responses
  const generateAIResponse = (userMessage: string): string => {
    const lowerCaseMsg = userMessage.toLowerCase();
    
    if (lowerCaseMsg.includes("hello") || lowerCaseMsg.includes("hi")) {
      return "Hello! How can I help with your studies today?";
    } else if (lowerCaseMsg.includes("math") || lowerCaseMsg.includes("equation")) {
      return "I can help with math problems! Feel free to ask about algebra, calculus, or statistics concepts.";
    } else if (lowerCaseMsg.includes("biology") || lowerCaseMsg.includes("cell")) {
      return "Biology is fascinating! I can explain concepts like cell structure, genetics, or human physiology if you'd like.";
    } else if (lowerCaseMsg.includes("help")) {
      return "I'm here to help! You can ask me questions about your subjects, request explanations of concepts, get help with problem-solving, or even ask for study tips.";
    } else {
      return "That's an interesting question. Let me help you understand this concept better. What specific aspects would you like me to focus on?";
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Quick question suggestions
  const suggestions = [
    "Explain photosynthesis",
    "Help me solve quadratic equations",
    "What are Newton's laws of motion?",
    "How do I write a good essay?",
  ];

  return (
    <div className="container py-6 max-w-5xl">
      <div className="flex flex-col h-[calc(100vh-140px)]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Study Chat</h1>
            <p className="text-muted-foreground">
              Ask anything about your studies and get instant help
            </p>
          </div>
          
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="math">Math</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Quick suggestion buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="bg-muted/50"
              onClick={() => handleSendMessage(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1">
          {/* Main chat area */}
          <div className="lg:col-span-3 flex flex-col border rounded-lg overflow-hidden">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-study-light rounded-lg p-3 flex gap-1">
                      <div className="h-2 w-2 bg-study-primary rounded-full animate-bounce delay-0"></div>
                      <div className="h-2 w-2 bg-study-primary rounded-full animate-bounce delay-150"></div>
                      <div className="h-2 w-2 bg-study-primary rounded-full animate-bounce delay-300"></div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
          
          {/* Right sidebar with tools */}
          <div className="hidden lg:flex flex-col gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md">Study Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" /> Research
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookMarked className="h-4 w-4 mr-2" /> Summarize
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Brain className="h-4 w-4 mr-2" /> Quiz Me
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lightbulb className="h-4 w-4 mr-2" /> Explain
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Play className="h-4 w-4 mr-2" /> Tutorial
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md">Recent Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="text-muted-foreground hover:text-foreground cursor-pointer">Photosynthesis process</li>
                  <li className="text-muted-foreground hover:text-foreground cursor-pointer">Linear equations</li>
                  <li className="text-muted-foreground hover:text-foreground cursor-pointer">World War II causes</li>
                  <li className="text-muted-foreground hover:text-foreground cursor-pointer">Chemical bonding</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
