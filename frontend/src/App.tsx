import { useEffect, useState } from "react";


function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("Connected");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onerror = (err) => {
      console.log("WebSocket error", err);
    };

    return () => {
      ws.close();
    };

  }, []);

  const sendMessage = () => {
    if (!socket || input.trim() === "") return;

    socket.send(input);
    setInput(""); // clear input after sending
  };

  if (!socket) {
    return <div>Connecting to socket server...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Simple WebSocket Chat</h2>

      {/* Messages */}
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            {msg}
          </div>
        ))}
      </div>

      {/* Input + Button */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          style={{ flex: 1, padding: "8px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;