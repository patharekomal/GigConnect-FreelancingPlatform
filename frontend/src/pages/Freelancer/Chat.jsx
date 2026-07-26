// import Sidebar from "../../components/Freelancer/Sidebar";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getMessagesByProject, sendMessage } from "../../api/messageApi";
// function Chat() {

//     const { projectId } = useParams();

//      const user = JSON.parse(localStorage.getItem("user"));

//     const freelancerId = user.id;

//     const [chatMessages, setChatMessages] = useState([]);

//     const [newMessage, setNewMessage] = useState("");

//     useEffect(() => {
//       loadMessages();
//     }, []);
//   //load messages of a project
//     const loadMessages = async () => {
//       try {
//         const response = await getMessagesByProject(projectId);

//         console.log(response.data);

//         setChatMessages(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const handleSend = async () => {
//       if (!newMessage.trim()) {
//         return;
//       }

//       try {
//         const messageData = {
//           projectId: Number(projectId),

//           senderId: freelancerId,

//           receiverId: 1, // temporary

//           message: newMessage,
//         };

//         await sendMessage(messageData);

//         setNewMessage("");

//         loadMessages();
//       } catch (error) {
//         console.log(error);

//         alert("Unable to send message");
//       }
//     };

//     return (

//         <div className="container-fluid p-4">

//             <div className="row">

//                 <div className="col-md-2">
//                     <Sidebar />
//                 </div>

//                 <div className="col-md-10">

//                     <div className="card shadow-sm border-0"  style={{ height: "85vh" }}>
//                         {/* Header */}
//                         <div className="card-header bg-success text-white">
//                             <h4 className="mb-0"> 💬 Project Chat</h4>
//                         </div>
//                         {/* Messages */}
//                         <div className="card-body bg-light"
//                             style={{
//                                 overflowY: "auto"
//                             }}>
//                             {
//                                 chatMessages.map((msg) => (
//                                     <div
//                                         key={msg.message_id}
//                                         className={`d-flex mb-3 ${
//                                             msg.senderId === freelancerId
//                                                 ? "justify-content-end"
//                                                 : "justify-content-start"
//                                         }`}>
//                                         <div
//                                             className={`p-3 rounded shadow-sm ${
//                                                 msg.senderId === freelancerId
//                                                     ? "bg-success text-white"
//                                                     : "bg-white"
//                                             }`}
//                                             style={{maxWidth: "60%"}}>
//                                             <div>{msg.message}</div>
//                                             <small
//                                                 className={
//                                                     msg.senderId === freelancerId
//                                                         ? "text-light"
//                                                         : "text-muted"
//                                                 } > {msg.time}
//                                             </small>
//                                         </div>
//                                     </div>
//                                 ))
//                             }

//                         </div>

//                         {/* Footer */}

//                         <div className="card-footer">

//                             <div className="input-group">

//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Type a message..."
//                                     value={newMessage}
//                                     onChange={(e) =>setNewMessage(e.target.value) } />
//                                 <button className="btn btn-success" onClick={handleSend} >Send</button>

//                             </div>

//                         </div>

//                     </div>

//                 </div>

//             </div>

//         </div>

//     );
// }

// export default Chat;

import Sidebar from "../../components/Freelancer/Sidebar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMessagesByProject} from "../../api/messageApi";
import { connectSocket, disconnectSocket, subscribeProject, sendSocketMessage,} from "../../websocket/socket";

function Chat() {
  const { projectId } = useParams();

  // Temporary (Replace with JWT later)
  const user = JSON.parse(localStorage.getItem("user"));

  const freelancerId = user.id;

  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const loadMessages = async () => {
    try {
      const response = await getMessagesByProject(projectId);
      setChatMessages(response.data);
    } catch (error) {
      console.error("Error loading messages", error);
    }
  };

//   useEffect(() => {
//     loadMessages();
//   }, [projectId]);

useEffect(() => {
  loadMessages();

  connectSocket(() => {
    subscribeProject(projectId, (message) => {
      setChatMessages((prev) => [...prev, message]);
    });
  });

  return () => {
    disconnectSocket();
  };
}, [projectId]);



  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
     sendSocketMessage({
       projectId: Number(projectId),

       senderId: freelancerId,

       message: newMessage,
     });

     setNewMessage("");

    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>

        <div className="col-md-10">
          <div className="card shadow-sm border-0" style={{ height: "85vh" }}>
            {/* Header */}

            <div className="card-header bg-success text-white">
              <h4 className="mb-0">💬 Project Chat</h4>
            </div>

            {/* Messages */}

            <div
              className="card-body bg-light"
              style={{
                overflowY: "auto",
              }}
            >
              {chatMessages.length === 0 ? (
                <div className="text-center text-muted mt-5">
                  No messages yet.
                </div>
              ) : (
                chatMessages.map((msg) => (
                  <div
                    key={msg.messageId}
                    className={`d-flex mb-3 ${
                      msg.senderId === freelancerId
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded shadow-sm ${
                        msg.senderId === freelancerId
                          ? "bg-success text-white"
                          : "bg-white"
                      }`}
                      style={{
                        maxWidth: "60%",
                      }}
                    >
                      <div className="fw-semibold mb-1">{msg.senderName}</div>

                      <div>{msg.message}</div>

                      <small
                        className={
                          msg.senderId === freelancerId
                            ? "text-light"
                            : "text-muted"
                        }
                      >
                        {new Date(msg.sentAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}

            <div className="card-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSend();
                    }
                  }}
                />

                <button className="btn btn-success" onClick={handleSend}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;