"use client";
import { Camera, Mic, MonitorUp, PhoneOff, MessageSquare } from "lucide-react";
import { useState } from "react";
import { IoChatboxEllipsesOutline, IoSend } from "react-icons/io5";
import { FaComments, FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
type Message = {
  id: number;
  text: string;
  sender: string;
}

type Participant = {
  id: number;
  name: string;
  avatar: string;
  isMicOn: boolean; // Nueva propiedad para el estado del micrófono
  isCamOn: boolean; // Nueva propiedad para el estado de la cámara
};

export default function VideoConference() {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Control de apertura del SideSheet
  const [showAvatars, setShowAvatars] = useState(true);

  const participants = [
    { id: 1, name: "Hugo Lagos", avatar: "/Multimedia/Imagen/images/avatar-1.jpeg", isMicOn: true, isCamOn: false },
    { id: 2, name: "Violeta Gallego", avatar: "/Multimedia/Imagen/images/avatar-2.jpeg", isMicOn: false, isCamOn: true },
    { id: 3, name: "Alejandro Gomez", avatar: "/Multimedia/Imagen/images/avatar-3.png", isMicOn: true, isCamOn: true },
    { id: 4, name: "Pedro Urbano", avatar: "/Multimedia/Imagen/images/avatar-4.png", isMicOn: false, isCamOn: false },
    { id: 5, name: "Pedro Urbano", avatar: "/Multimedia/Imagen/images/avatar-4.png", isMicOn: true, isCamOn: true },
    { id: 6, name: "Pedro Urbano", avatar: "/Multimedia/Imagen/images/avatar-3.png", isMicOn: false, isCamOn: true },
    { id: 8, name: "Edward Urbano", avatar: "/Multimedia/Imagen/images/avatar-4.png", isMicOn: true, isCamOn: false },
    { id: 9, name: "Carlos Urbano", avatar: "/Multimedia/Imagen/images/avatar-5.png", isMicOn: true, isCamOn: true },
    { id: 10, name: "Carlos Urbano", avatar: "/Multimedia/Imagen/images/avatar-3.png", isMicOn: false, isCamOn: false },
    { id: 12, name: "Carlos Urbano", avatar: "/Multimedia/Imagen/images/avatar-1.jpeg", isMicOn: true, isCamOn: false },
    { id: 13, name: "Carlos Urbano", avatar: "/Multimedia/Imagen/images/avatar-1.jpeg", isMicOn: false, isCamOn: true },
  ];

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hola, ¿cómo están todos?", sender: "Usuario1" },
    { id: 2, text: "¡Hola! Todo bien por aquí.", sender: "Usuario2" },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "Tú"
      }
      setMessages([...messages, newMessage])
      setInputMessage("")
    }

  }

  const toggleView = () => {
    setShowAvatars(!showAvatars);
  }
  return (
    <div className="flex flex-col h-[82vh]  max-sm:pt-14">
      <div className="flex-1 flex max-lg:flex-col">
        <div className=" flex-1 p-4  relative">
          <div className="w-full h-[82vh] max-sm:h-[65vh] bg-gray-900 rounded-lg flex items-center justify-center">
            <img
              src=""
              alt=""
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="w-fit mx-auto bg-dark-1 p-4 flex rounded-full px-6 justify-center space-x-4 absolute right-10 left-10 max-xl:hidden bottom-8">
            <button
              className={`p-2 rounded-full ${isCameraOn ? 'bg-blue-500' : 'bg-gray-500'}`}
              onClick={() => setIsCameraOn(!isCameraOn)}
            >
              <Camera className="h-6 w-6 text-white" />
            </button>

            <button
              className={`p-2 rounded-full ${isMicOn ? 'bg-blue-500' : 'bg-gray-500'}`}
              onClick={() => setIsMicOn(!isMicOn)}
            >
              <Mic className="h-6 w-6 text-white" />
            </button>
            <button className="p-2 rounded-full bg-gray-700">
              <MonitorUp className="h-6 w-6 text-white" />
            </button>
            <button className="p-2 rounded-full bg-gray-700">
              <MessageSquare className="h-6 w-6 text-white" />
            </button>
            <button className="p-2 rounded-full bg-red-500">
              <PhoneOff className="h-6 w-6 text-white" />
            </button>
            <button onClick={() => setIsSheetOpen(true)} className="p-2 bg-blue-500 text-white rounded-full  max-xl:block hidden ">
              <IoChatboxEllipsesOutline className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mostrar el SideSheet solo en pantallas pequeñas */}
        <div className="xl:hidden">

       
        </div>

        {/* Mostrar la estructura original en pantallas grandes */}
        <div className="flex flex-col-reverse h-full relative">
          <button onClick={toggleView} className="bg-blue-500 text-white p-2 py-2 rounded-lg mb-4 flex items-center justify-center absolute right-6 bottom-1 max-xl:hidden ">
            {showAvatars ? (
              <FaComments className="text-2xl" /> // Icono para mostrar el chat
            ) : (
              <FaUserFriends className="text-2xl" /> // Icono para mostrar los avatares
            )}
          </button>

          {showAvatars ? (
            <div className="h-full hidden xl:block w-80 m-4 bg-white rounded-lg shadow-xl border-2">
              <div className="p-4 overflow-y-auto h-[calc(100vh-150px)] scrollbar-hide">
                <div className="space-y-4 flex flex-col">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between space-x-4">
                      <div className="flex items-center gap-4">

                      <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                        
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium">{participant.name}</span>
                      </div>
                      {/* Iconos de micrófono y cámara */}
                      <div className="flex space-x-2">
                        {participant.isMicOn ? (
                          <FaMicrophone className="text-green-500" /> // Icono de micrófono encendido
                        ) : (
                          <FaMicrophoneSlash className="text-red-500" /> // Icono de micrófono apagado
                        )}
                        {participant.isCamOn ? (
                          <FaVideo className="text-green-500" /> // Icono de cámara encendida
                        ) : (
                          <FaVideoSlash className="text-red-500" /> // Icono de cámara apagada
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-[550px] w-full max-w-md border shadow-2xl rounded-lg overflow-hidden max-xl:hidden">
              <div className="bg-blue-500 text-white p-4">
                <h2 className="text-xl font-bold">Chat de Videoconferencia</h2>
              </div>
              <div className="flex-grow p-4 overflow-y-auto">
                {messages.map((message) => (
                  <div key={message.id} className={`flex items-start space-x-2 mb-4 ${message.sender === "Tú" ? "justify-end" : "justify-start"}`}>
                    {message.sender !== "Tú" && (
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full">
                        <span className="text-sm font-bold">{message.sender[0]}</span>
                      </div>
                    )}
                    <div className={`rounded-lg p-2 max-w-[70%] ${message.sender === "Tú" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                      <p className="text-sm font-medium mb-1">{message.sender}</p>
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-grow border rounded-lg p-2"
                  />
                  <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 mb-1 py-3"><IoSend /></button>
                  <button type="submit" className=" text-white rounded-lg px-4 py-2"><IoSend className="text-white" /></button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="hidden max-xl:block">
        <div className="w-fit mx-auto bg-dark-1 p-4 flex rounded-full px-6 justify-center space-x-4  mb-2 ">
          <button
            className={`p-2 rounded-full ${isCameraOn ? 'bg-blue-500' : 'bg-gray-500'}`}
            onClick={() => setIsCameraOn(!isCameraOn)}
          >
            <Camera className="h-6 w-6 text-white" />
          </button>

          <button
            className={`p-2 rounded-full ${isMicOn ? 'bg-blue-500' : 'bg-gray-500'}`}
            onClick={() => setIsMicOn(!isMicOn)}
          >
            <Mic className="h-6 w-6 text-white" />
          </button>
          <button className="p-2 rounded-full bg-gray-700">
            <MonitorUp className="h-6 w-6 text-white" />
          </button>
          <button className="p-2 rounded-full bg-gray-700">
            <MessageSquare className="h-6 w-6 text-white" />
          </button>
          <button className="p-2 rounded-full bg-red-500">
            <PhoneOff className="h-6 w-6 text-white" />
          </button>
          <button onClick={() => setIsSheetOpen(true)} className="p-2 bg-blue-500 text-white rounded-full  max-xl:block hidden ">
            <IoChatboxEllipsesOutline className="h-6 w-6" />
          </button>
        </div>
      </div>


    </div>
  );
}
