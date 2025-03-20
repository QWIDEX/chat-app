import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Message from "../components/Message";
import LoadingIndicator from "../components/LoadingIndicator";
import TextInput from "../ui/TextInput";
import sendMsgIcon from "../icons/send-message-dm-svgrepo-com.svg";
import { sendMessage } from "../store/slices/chatsSlice";

const Chat = () => {
  const username = useSelector((state) => state.userSlice.User?.user?.username);
  const chatId = useParams().chatId;
  const chats = useSelector((state) => state.chatsSlice.Chats);

  const chatIdx = chats.findIndex((val) => val.chatId === chatId);
  const chat = chats[chatIdx];
  const dispatch = useDispatch();

  const submitMessage = async (e) => {
    e.preventDefault();

    const message = e.target.message.value;
    if (message.length != 0) {
      dispatch(
      sendMessage({
          message,
          sender: username,
          sentAt: new Date().toISOString(),
          dest: chatId,
        })
      );
      e.target.message.value = ""
    }
  };

  return (
    <>
      {chats.length === 0 ? (
        <div className="h-full w-full flex items-center justify-center">
          <LoadingIndicator />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-3 h-full">
          <div className="bg-[#3e5c76] flex items-center px-5 w-full h-16">
            {chat.chatName}
          </div>
          <div className="px-5 overflow-y-scroll flex flex-col justify-end gap-3 h-full">
            {chat.chat.map((val, idx, arr) => {
              const shortMonth = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];

              const msg = arr[arr.length - 1 - idx];
              const dateThis = new Date(msg.sentAt);
              const dateNext = new Date(arr[arr.length - idx]?.sentAt);
              return (
                <React.Fragment key={idx}>
                  {dateThis.toDateString() !== dateNext.toDateString() ? (
                    <div
                      key={dateThis.getUTCDate()}
                      className="bg-[#1d2d44] w-fit text-xs self-center rounded-full px-2.5 py-1.5"
                    >
                      {`${dateThis.getDate()} ${
                        shortMonth[dateThis.getMonth()]
                      } ${dateThis.getFullYear()}`}
                    </div>
                  ) : (
                    ""
                  )}
                  <Message
                    sentAt={msg.sentAt}
                    sender={msg.sender}
                    message={msg.message}
                    username={username}
                  />
                </React.Fragment>
              );
            })}
          </div>
          <div>
            <form
              onSubmit={submitMessage}
              className="flex gap-2 items-center justify-center w-full mb-5"
            >
              <TextInput
                placeholder="Your message"
                name="message"
                id="message"
                tabIndex={1}
                className="max-w-[80%] "
              />
              <button type="submit" className="p-2 cursor-pointer">
                <img src={sendMsgIcon} alt="" className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
