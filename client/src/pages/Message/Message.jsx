import { useContext, useEffect, useState, useRef } from 'react'
import ChatOnline from '../../components/chatonline/ChatOnline'
import Conversations from '../../components/conversations/Conversations'
import Mess from '../../components/message/Mess'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { io } from 'socket.io-client'
import './message.css'

const Message = () => {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const socket = useRef(io("ws://localhost:8090"));

    const newMessage = useRef();

    const scrollRef = useRef();

    const { user } = useContext(AuthContext);

    useEffect(() => {
        socket.current = io("ws://localhost:8090");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);


    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers(user.followings.filter(f => users.some(u => u.userId === f)))
        })
    }, [user])




    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversation/" + user._id)
                setConversations(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getConversations();
    }, [])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get('/message/' + currentChat?._id)
                setMessages(res.data)
            } catch (error) {
                console.log(error)
            }

        }
        getMessages()
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])



    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage.current.value,
            conversationId: currentChat._id
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post("/message", message)
            setMessages([...messages, res.data])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Topbar />
            <div className='message'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" placeholder='Search for friends' className='chatMenuInput' />
                        {
                            conversations.map(conversation => (
                                <div key={conversation._id} onClick={() => setCurrentChat(conversation)}>
                                    <Conversations
                                        {...conversation}
                                        currentUser={user._id}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ?
                            <>
                                <div className="chatBoxTop">
                                    {messages.map(message => (
                                        <div ref={scrollRef} key={message._id}>
                                            <Mess
                                                {...message}
                                                own={message.sender === user._id}
                                            />
                                        </div>
                                    ))}

                                </div>
                                <div className="chatBoxBottom">
                                    <textarea placeholder='Say hello!' className='chatMessageInput' ref={newMessage}></textarea>
                                    <button onClick={(e) => handleSubmit(e)} className='chatSubmitButton'>Send</button>
                                </div>
                            </>
                            : <span className='noConversation'> Select a friend to start a chat </span>
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        {onlineUsers.map(online => (
                            <ChatOnline onlineUsers={online} currentId={user._id} setCurrentChat={setCurrentChat} key={online.userId} />
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Message