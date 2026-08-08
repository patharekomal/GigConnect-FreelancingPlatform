import { useState } from "react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { askAI } from "../../services/chatbotService";


function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm GigConnect AI Assistant.\n\nI can help you:\n",
    },
  ]);
 const bottomRef = useRef(null);
 useEffect(() => {
   bottomRef.current?.scrollIntoView({
     behavior: "smooth",
   });
 }, [messages]);

 useEffect(() => {
   const handleReset = () => {
     resetChat();
   };

   window.addEventListener("reset-chatbot", handleReset);

   return () => {
     window.removeEventListener("reset-chatbot", handleReset);
   };
 }, []);
  



   

   const hiddenRoutes = ["/", "/login", "/register", "/forgot-password"];
  
   const handleQuickAction = (question) => {
     const userMessage = {
       sender: "user",
       text: question,
     };

     setMessages((prev) => [...prev, userMessage]);

     setTimeout(() => {
       const botMessage = {
         sender: "bot",
         text: getDummyResponse(question),
       };

       setMessages((prev) => [...prev, botMessage]);
     }, 500);
   };

  const handleSend = async () => {
    if (!input.trim()) return;

    const currentInput = input;

    const userMessage = {
      sender: "user",

      text: currentInput,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await askAI({
        message: currentInput,

        user_id: user?.id,

        job_id: null,
      });

      setMessages((prev) => [
        ...prev,

        {
          sender: "bot",

          text: response.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,

        {
          sender: "bot",

          text: "❌ Sorry! Unable to contact AI server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const resetChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Hi! I'm GigConnect AI Assistant.\n\nI can help you:",
      },
    ]);

    setInput("");
    setIsOpen(false);
  };

  
   if (hiddenRoutes.includes(location.pathname)) {
     return null;
   }


  return (
    <>
      {/* Floating Button */}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",

            bottom: "20px",

            right: "20px",

            width: "65px",

            height: "65px",

            borderRadius: "50%",

            border: "none",

            backgroundColor: "#198754",

            color: "white",

            fontSize: "28px",

            boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",

            zIndex: 9999,

            cursor: "pointer",
          }}
        >
          🤖
          {/* ✨ */}
        </button>
      )}

      {/* Chat Window */}

      {isOpen && (
        <div
          style={{
            position: "fixed",

            bottom: "20px",

            right: "20px",

            width: "380px",

            height: "600px",

            background: "white",

            borderRadius: "15px",

            boxShadow: "0 5px 20px rgba(0,0,0,.3)",

            display: "flex",

            flexDirection: "column",

            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#198754",
              color: "white",
              padding: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          >
            <div>
              <h5 className="mb-0"> 🤖GigConnect AI Assistant</h5>
            </div>

            <button
              className="btn btn-light btn-sm"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>

          {/* Chat Area */}

          <div
            style={{
              flex: 1,

              padding: "15px",

              overflowY: "auto",
            }}
          >
            {/* {messages.length === 1 && (
              <div className="mb-3">
                <button
                  className="btn btn-outline-success w-100 mb-2 text-start"
                  onClick={() => handleQuickAction("How do I post a job?")}
                >
                  📌 How to Post a Job
                </button>

                <button
                  className="btn btn-outline-success w-100 mb-2 text-start"
                  onClick={() => handleQuickAction("Recommend jobs")}
                >
                  💼 Recommend Jobs
                </button>

                <button
                  className="btn btn-outline-success w-100 mb-2 text-start"
                  onClick={() => handleQuickAction("Generate proposal")}
                >
                  📝 Generate Proposal
                </button>

                <button
                  className="btn btn-outline-success w-100 text-start"
                  onClick={() => handleQuickAction("Payment help")}
                >
                  💳 Payment Help
                </button>
              </div>
            )} */}

            {/* Chat Messages... */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user" ? "text-end mb-3" : "text-start mb-3"
                }
              >
                <div
                  style={{
                    display: "inline-block",
                    maxWidth: "70%",
                    padding: "10px 15px",
                    borderRadius: "15px",
                    background: msg.sender === "user" ? "#198754" : "#EAF7EF",
                    color: msg.sender === "user" ? "white" : "#212529",
                  }}
                >
                  <div style={{ whiteSpace: "pre-line" }}>{msg.text}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-start mb-3">
                <div
                  style={{
                    display: "inline-block",
                    maxWidth: "70%",
                    padding: "10px 15px",
                    borderRadius: "15px",
                    background: "#EAF7EF",
                    color: "#212529",
                  }}
                >
                  🤖 AI is thinking...
                </div>
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Footer */}

          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #ddd",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              className="form-control"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />

            <button className="btn btn-success" onClick={handleSend}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
