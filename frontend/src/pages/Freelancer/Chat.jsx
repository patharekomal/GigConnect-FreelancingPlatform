// import Sidebar from "../../components/Freelancer/Sidebar";
// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import { messages } from "../../data/dummyData";

// function Chat() {

//     const { projectId } = useParams();

//     const [newMessage, setNewMessage] = useState("");

//     const projectMessages =
//         messages.filter(
//             msg => msg.project_id == projectId
//         );

//     const handleSend = () => {

//         console.log("Message:", newMessage);

//         setNewMessage("");
//     };

//     return (

//         <div className="container-fluid p-4">

//             <div className="row">

//                 <div className="col-md-2">
//                     <Sidebar />
//                 </div>

//                 <div className="col-md-10">

//                     <div
//                         className="card shadow-sm border-0"
//                         style={{ height: "80vh" }}
//                     >

//                         <div className="card-header bg-success text-white">

//                             <h4 className="mb-0">
//                                 💬 Project Chat
//                             </h4>

//                         </div>

//                         <div
//                             className="card-body"
//                             style={{
//                                 overflowY: "auto"
//                             }}
//                         >

//                             {
//                                 projectMessages.map(msg => (

//                                     <div
//                                         key={msg.message_id}
//                                         className="mb-3"
//                                     >

//                                         <div
//                                             className="p-2 rounded bg-light"
//                                         >

//                                             {msg.message}

//                                         </div>

//                                         <small
//                                             className="text-muted"
//                                         >
//                                             {msg.sent_at}
//                                         </small>

//                                     </div>

//                                 ))
//                             }

//                         </div>

//                         <div className="card-footer">

//                             <div className="input-group">

//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Type a message..."
//                                     value={newMessage}
//                                     onChange={(e) =>
//                                         setNewMessage(
//                                             e.target.value
//                                         )
//                                     }
//                                 />

//                                 <button
//                                     className="btn btn-success"
//                                     onClick={handleSend}
//                                 >
//                                     Send
//                                 </button>

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
import { useState } from "react";
import { messages as initialMessages } from "../../data/dummyData";

function Chat() {

    const { projectId } = useParams();

    const freelancerId = 6;

    const [chatMessages, setChatMessages] = useState(initialMessages.filter(msg => msg.project_id === Number(projectId)));

    const [newMessage, setNewMessage] = useState("");

    const handleSend = () => {

        if (!newMessage.trim()) return;

        const messageObj = {

            message_id: chatMessages.length + 1,
            project_id: Number(projectId),
            sender_id: freelancerId,
            sender_name: "Jane Smith",
            message: newMessage,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })
        };
        setChatMessages([...chatMessages, messageObj]);
        setNewMessage("");
    };

    return (

        <div className="container-fluid p-4">

            <div className="row">

                <div className="col-md-2">
                    <Sidebar />
                </div>

                <div className="col-md-10">

                    <div className="card shadow-sm border-0"  style={{ height: "85vh" }}>
                        {/* Header */}
                        <div className="card-header bg-success text-white">
                            <h4 className="mb-0"> 💬 Project Chat</h4>
                        </div>
                        {/* Messages */}
                        <div className="card-body bg-light"
                            style={{
                                overflowY: "auto"
                            }}>
                            {
                                chatMessages.map((msg) => (
                                    <div
                                        key={msg.message_id}
                                        className={`d-flex mb-3 ${
                                            msg.sender_id === freelancerId
                                                ? "justify-content-end"
                                                : "justify-content-start"
                                        }`}>
                                        <div
                                            className={`p-3 rounded shadow-sm ${
                                                msg.sender_id === freelancerId
                                                    ? "bg-success text-white"
                                                    : "bg-white"
                                            }`}
                                            style={{maxWidth: "60%"}}>
                                            <div>{msg.message}</div>
                                            <small
                                                className={
                                                    msg.sender_id === freelancerId
                                                        ? "text-light"
                                                        : "text-muted"
                                                } > {msg.time}
                                            </small>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>

                        {/* Footer */}

                        <div className="card-footer">

                            <div className="input-group">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) =>setNewMessage(e.target.value) } />
                                <button className="btn btn-success" onClick={handleSend} >Send</button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Chat;