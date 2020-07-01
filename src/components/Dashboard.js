import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { CTX } from "./Store";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "50px",
        padding: theme.spacing(3, 2),
    },
    flex: {
        display: "flex",
        alignItems: "center",
    },
    topicsWindow: {
        width: "30%",
        height: "300px",
        borderRight: "1px solid gray",
    },
    chatWindow: {
        width: "70%",
        height: "300px",
        padding: "20px",
    },
    chatBox: {
        width: "85%",
        // height: "300px",
    },
    button: {
        width: "15%",
        // height: "300px",
    },
    active: {
        color: "#3d45f5",
    },
}));

const Dashboard = () => {
    const classes = useStyles();

    //* CTX store
    const { allChats, sendChatAction, user } = useContext(CTX);
    const topics = Object.keys(allChats);

    //* Local state
    const [activeTopic, changeActiveTopic] = useState(topics[0]);
    const [textValue, changeTextValue] = useState("");

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Chat app
                </Typography>

                <Typography className={classes.active} component="h5">
                    {activeTopic.toUpperCase()}
                </Typography>

                <div className={classes.flex}>
                    {/* TOPICS */}
                    <div className={classes.topicsWindow}>
                        <List>
                            {topics.map((topic) => (
                                <ListItem
                                    onClick={(e) =>
                                        changeActiveTopic(e.target.innerText)
                                    }
                                    key={topic}
                                    button
                                >
                                    <ListItemText primary={topic} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    {/* CHAT WINDOW */}
                    <div className={classes.chatWindow}>
                        {allChats[activeTopic].map((chat, i) => (
                            <div className={classes.flex} key={i}>
                                <Chip label={chat.from} />
                                <Typography>{chat.msg}</Typography>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={classes.flex}>
                    <TextField
                        id="standard-basic"
                        label="Send message"
                        className={classes.chatBox}
                        value={textValue}
                        onChange={(e) => changeTextValue(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                            sendChatAction({
                                from: user,
                                msg: textValue,
                                topic: activeTopic,
                            });
                            changeTextValue("");
                        }}
                    >
                        Send
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default Dashboard;
