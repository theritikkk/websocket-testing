import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
function App() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            console.log(' Connected ');
            setSocket(socket);
        };
        socket.onmessage = (message) => {
            console.log('Received message : ', message.data);
            setMessage(message.data);
        };
    }, []);
    if (!socket) {
        return _jsx("div", { children: "Connecting to socket server ...." });
    }
    return (_jsx(_Fragment, { children: _jsx("div", { children: message }) }));
}
export default App;
//# sourceMappingURL=App.js.map