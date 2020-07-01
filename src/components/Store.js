import React, { createContext, useReducer } from "react";
import io from "socket.io-client";

export const CTX = createContext();

const initState = {
    general: [
        { from: "Ionut", msg: "Hello" },
        { from: "Nicolas", msg: "Bier" },
        { from: "Karine", msg: "Bonjour" },
    ],
    topic2: [
        { from: "Ionut", msg: "Hiello" },
        { from: "Ionut", msg: "Hiello" },
        { from: "Ionut", msg: "Hiello" },
    ],
};

function reducer(state, action) {
    const { from, msg, topic } = action.payload;

    switch (action.type) {
        case "RECEIVE_MESSAGE":
            return {
                ...state,
                [topic]: [...state[topic], { from, msg }],
            };
        default:
            return state;
    }
}

let socket;

const sendChatAction = (value) => {
    socket.emit("chat message", value);
};

const Store = (props) => {
    const user = "Catalin" + Math.ceil(Math.random() * 100);
    const [allChats, dispatch] = useReducer(reducer, initState);

    if (!socket) {
        socket = io(":3001");

        socket.on("chat message", (msg) => {
            dispatch({ type: "RECEIVE_MESSAGE", payload:  msg  });
            console.log({ msg });
        });
    }

    return (
        <CTX.Provider value={{ allChats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    );
};

export default Store;
