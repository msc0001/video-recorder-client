import React, { FunctionComponent } from "react";

interface MessageProps {
    data: string;
}

const Message: FunctionComponent<MessageProps> = ({ data }) => {
    return <p>{data}</p>;
};

export default Message;
