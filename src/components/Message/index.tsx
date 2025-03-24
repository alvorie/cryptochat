import { ChatMessage, SystemMessageType, MessageType } from "../../types";

export function Message(props: Readonly<ChatMessage>) {
  return (
    <>
      {props.type === "system" ? (
        <div>
          {(props.data as SystemMessageType).text} (
          {new Date(
            (props.data as SystemMessageType).timestamp
          ).toLocaleTimeString()}
          )
        </div>
      ) : (
        <div>
          <div>
            <b>{(props.data as MessageType).username}</b> написал(а) (
            <small>
              {new Date((props.data as MessageType).timestamp).toLocaleString()}
            </small>
            ): <br />
          </div>
          <div>{(props.data as MessageType).text}</div>
        </div>
      )}
    </>
  );
}
