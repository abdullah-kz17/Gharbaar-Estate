import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaComments, FaHome, FaBlog, FaTools, FaUserCircle } from "react-icons/fa";
import { axiosPublic } from "../../utils/axiosInstance";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import logo from "/images/logo.png";
import ReactMarkdown from 'react-markdown';

const BOT_COLOR = "#4F46E5";
const USER_COLOR = "#E0E7FF";
const SUGGESTIONS = [
  { icon: <FaHome />, text: "Show me latest properties" },
  { icon: <FaTools />, text: "What services do you offer?" },
  { icon: <FaBlog />, text: "Show me recent blogs" },
  { icon: <FaHome />, text: "Find houses in DHA Lahore" },
  { icon: <FaTools />, text: "How do I book a service?" },
];

// Helper: render markdown with links styled, using SPA navigation for internal links
function renderMessageMarkdown(text) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, ...props }) => {
          if (href && href.startsWith('/')) {
            return <RouterLink to={href} className="text-indigo-600 dark:text-indigo-300 font-semibold underline break-all" {...props} />;
          }
          return <a href={href} className="text-indigo-600 dark:text-indigo-300 font-semibold underline break-all" target="_blank" rel="noopener noreferrer" {...props} />;
        },
        strong: (props) => <strong className="text-slate-800 dark:text-slate-100 font-bold" {...props} />,
        h3: (props) => <h3 className="text-lg font-bold my-2 text-indigo-700 dark:text-indigo-300" {...props} />,
        li: (props) => <li className="ml-4 mb-1 list-disc" {...props} />,
        img: (props) => <img {...props} alt={props.alt || 'image'} className="max-w-full rounded-xl my-2 shadow" loading="lazy" />,
      }}
      skipHtml
    >{text}</ReactMarkdown>
  );
}

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I'm your Gharbaar Estate Assistant. Ask me anything about properties, services, or blogs!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();

  // Reset chat when route changes
  useEffect(() => {
    setMessages([
      { sender: "bot", text: "👋 Hi! I'm your Gharbaar Estate Assistant. Ask me anything about properties, services, or blogs!" }
    ]);
    setInput("");
    setLoading(false);
  }, [location]);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async (msg) => {
    const userMsg = msg || input;
    if (!userMsg.trim()) return;
    setMessages((msgs) => [...msgs, { sender: "user", text: userMsg }]);
    setLoading(true);
    setInput("");
    try {
      const res = await axiosPublic.post("/chat", { message: userMsg });
      setMessages((msgs) => [...msgs, { sender: "bot", text: res.data.reply }]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "❌ Sorry, something went wrong. Please try again." }
      ]);
    }
    setLoading(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-8 bg-indigo-600 dark:bg-indigo-700 text-white rounded-full w-16 h-16 shadow-lg z-50 flex items-center justify-center text-3xl hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors"
          aria-label="Open chatbot"
        >
          <FaComments style={{ width: 36, height: 36 }} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-6 right-4 w-[95vw] max-w-sm sm:max-w-md md:max-w-lg h-[70vh] max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl z-50 flex flex-col animate-fadeInUp border border-indigo-100 dark:border-gray-800"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-800 dark:to-indigo-700 text-white px-5 py-4 rounded-t-2xl flex items-center justify-between shadow">
            <span className="flex items-center font-bold text-lg">
              <img src={logo} alt="Gharbaar Estate Logo" className="w-9 h-9 rounded-full mr-3 border-2 border-indigo-100 dark:border-indigo-700 bg-white" />
              Gharbaar Estate Assistant
            </span>
            <button
              onClick={() => setOpen(false)}
              className="bg-transparent border-none text-white text-2xl cursor-pointer hover:text-indigo-200"
              aria-label="Close chatbot"
            >
              <FaTimes />
            </button>
          </div>

          {/* Suggestions */}
          {messages.length === 1 && messages[0].sender === "bot" && (
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(s.text)}
                  className="flex items-center gap-2 bg-white dark:bg-gray-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 rounded-full px-4 py-2 font-semibold text-sm shadow hover:bg-indigo-50 dark:hover:bg-indigo-800 transition"
                  disabled={loading}
                >
                  {s.icon} <span>{s.text}</span>
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4 bg-gray-50 dark:bg-gray-900 flex flex-col gap-3" style={{scrollbarWidth: 'thin'}}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {/* Avatar */}
                {msg.sender === "bot" ? (
                  <img src={logo} alt="Gharbaar Estate Assistant" className="w-9 h-9 rounded-full mr-2 border-2 border-indigo-100 dark:border-indigo-700 bg-white" />
                ) : (
                  <FaUserCircle className="w-9 h-9 ml-2 text-slate-400 dark:text-slate-300 bg-white rounded-full border-2 border-indigo-100 dark:border-indigo-700 shadow" aria-label="User" />
                )}
                <div
                  className={`relative max-w-[80%] break-words ${msg.sender === "user" ? "bg-indigo-100 dark:bg-indigo-800 text-slate-900 dark:text-slate-100" : "bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-100"} px-4 py-3 rounded-2xl shadow border ${msg.sender === "bot" ? "border-indigo-100 dark:border-indigo-700" : "border-indigo-200 dark:border-indigo-700"} ${msg.sender === "user" ? "rounded-br-md" : "rounded-bl-md"} animate-fadeInBot`}
                  style={{ marginBottom: msg.sender === "bot" ? 6 : 0 }}
                >
                  {msg.sender === "bot" ? renderMessageMarkdown(msg.text) : msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center mt-2 min-h-[32px]">
                <span className="typing-indicator inline-flex items-center h-6">
                  <span className="dot w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-300 mx-0.5 inline-block animate-bounce" style={{ animationDelay: '0s' }}></span>
                  <span className="dot w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-300 mx-0.5 inline-block animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="dot w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-300 mx-0.5 inline-block animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-indigo-100 dark:border-indigo-700 px-4 py-3 bg-white dark:bg-gray-900 flex items-center">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Ask about properties, services, or blogs..."
              className="flex-1 border border-indigo-200 dark:border-indigo-700 outline-none px-4 py-2 rounded-lg text-base bg-gray-50 dark:bg-gray-800 text-slate-900 dark:text-slate-100 mr-3"
              disabled={loading}
              autoFocus
            />
            <button
              onClick={() => sendMessage()}
              className="bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg px-5 py-2 text-xl flex items-center justify-center shadow hover:bg-indigo-700 dark:hover:bg-indigo-800 transition"
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes fadeInBot {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce {
            from { transform: translateY(0); opacity: 0.7; }
            to { transform: translateY(-8px); opacity: 1; }
          }
        `}
      </style>
    </>
  );
};

export default ChatbotWidget;