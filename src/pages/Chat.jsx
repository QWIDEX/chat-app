import React, { useEffect, useRef, useState,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Message from "../components/Message";
import LoadingIndicator from "../components/LoadingIndicator";
import TextInput from "../ui/TextInput";
import sendMsgIcon from "../icons/send-message-dm-svgrepo-com.svg";
import { sendMessage } from "../store/slices/chatsSlice";
import useChat from "../hooks/useChat";

const Chat = () => {
  const user = useSelector((state) => state.userSlice.User);
  const chatId = useParams().chatId;
  const [stickToBottom, setStickToBottom] = useState(true);

  const [from, setFrom] = useState(0);

  const { chat, loading } = useChat(user?.accessToken, from, 30);
  const dispatch = useDispatch();

  const messageListRef = useRef(null);

  useEffect(() => {
    setStickToBottom(true);
  }, [chatId]);

  useEffect(() => {
    if (stickToBottom) {
      const messageList = messageListRef.current;
      messageList?.scroll(
        0,
        messageList.scrollHeight - messageList.clientHeight + 2
      );
    }
  }, [chat, stickToBottom]);

  useEffect(() => {
    if (chat?.chat !== 0) {
      const messageList = messageListRef.current;
      const prevHeight = messageList.scrollHeight;
      return () => {
        const newHeight = messageList.scrollHeight;
        messageList.scrollTop += newHeight - prevHeight;
      };
    }
  }, [from, chat]);

  const submitMessage = async (e) => {
    e.preventDefault();

    const message = e.target.message.value;
    if (message.length != 0) {
      dispatch(
        sendMessage({
          message,
          sender: user?.user?.username,
          sentAt: new Date().toISOString(),
          dest: chatId,
        })
      );
      e.target.message.value = "";
      setStickToBottom(true);
    }
  };

  const scrollMessages = (e) => {
    const target = e.target;

    if (target.scrollHeight - target.clientHeight - target.scrollTop > 100) {
      setStickToBottom(false);
    } else {
      setStickToBottom(true);
    }

    if (target.scrollTop < 700 && !stickToBottom) {
      setFrom(chat.chat.length);
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-full w-full flex items-center justify-center">
          <LoadingIndicator />
        </div>
      ) : (
        <div className="w-full flex flex-col flex-grow min-h-0  ">
          <div className="bg-[#3e5c76] px-5 w-full py-4">{chat?.chatName}</div>
          <div
            className="px-5 overflow-auto relative h-fit mt-auto grid gap-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full[&::-webkit-scrollbar-track]:bg-[#2e343c] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#565b60]"
            ref={messageListRef}
            onScroll={scrollMessages}
          >
            {chat?.chat?.map((val, idx, arr) => {
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
                      className="bg-[#1d2d44] w-fit text-xs justify-self-center rounded-full px-2.5 py-1.5"
                      style={{ marginTop: idx === 0 ? "200px" : "0" }}
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
                    username={user?.user?.username}
                  />
                </React.Fragment>
              );
            })}
          </div>
          <div className="w-full relative">
            <button
              type="button"
              className={`after:content-[''] after:bg-[#b1b2b6] after:w-0.5 after:rounded-full after:h-3 after:block before:content-[''] before:bg-[#b1b2b6] before:w-0.5 before:rounded-full before:h-3 after:-rotate-45 before:rotate-45 after:absolute before:absolute after:left-3.5 before:left-5.5 before:block w-9.5 h-9.5 absolute after:top-3.5 before:top-3.5 cursor-pointer rounded-full bg-[#1d2d44] right-5 z-10 transition-all -bottom-12 block ${
                !stickToBottom ? "bottom-3" : ""
              }`}
              onClick={() => setStickToBottom(true)}
            ></button>
          </div>
          <div>
            <form
              onSubmit={submitMessage}
              className="flex gap-2 bg-[#01161e] z-20 relative items-center mt-2 justify-center w-full mb-5"
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
