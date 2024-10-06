class Socket {
    constructor(url) {
        this.socket = new WebSocket(url);
    }

    connect() {
        this.socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        this.socket.onmessage = (event) => {
            console.log("Received message: ", event.data);
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket Error: ", error);
        };

        this.socket.onclose = () => {
            console.log("WebSocket connection closed");
        };
    }

    sendMessage(message) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.log("WebSocket is not open");
        }
    }

    close() {
        this.socket.close();
    }
}

export default Socket;
