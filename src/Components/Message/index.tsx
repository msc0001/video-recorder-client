import React, { FunctionComponent, MouseEventHandler } from "react";
import Button from "../Button";

interface MessageProps {
    data: string;
    refresh?: MouseEventHandler<HTMLButtonElement>;
}

const Message: FunctionComponent<MessageProps> = ({ data, refresh }) => {
    return (
        <>
            <p>{data}</p>
            {typeof refresh === "function" ? (
                <Button onClick={refresh}>Refresh</Button>
            ) : null}
        </>
    );
};

export default Message;
