import React, { useRef, useState } from "react";
import useUsers from "../hooks/useUsers";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../ui/TextInput";
import SubmitBtn from "../ui/SubmitBtn";
import { addChatroomMember, createChatroom } from "../db/chat";
import { updateAccessTokenAndCall } from "../helpers/updateAccessToken";
import { addChat, addChatMember } from "../store/slices/chatsSlice";
import ChatCard from "./ChatCard";

const UsersList = () => {
  const { users } = useUsers();
  const user = useSelector((state) => state.userSlice.User);
  const [action, setAction] = useState(null);
  const prevAction = useRef("");
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatsSlice.Chats);

  const createOrAddToChat = (uid) => {
    setAction({ state: "decision", target: uid });
  };

  const createChat = (e) => {
    e.preventDefault();

    const chatName = e.target.chatName.value;

    createChatroom(user.accessToken, action.target, e.target.chatName.value)
      .then((resp) => {
        dispatch(
          addChat({
            chatName,
            members: [user.user.uid, action.target],
            chat: [],
            chatId: resp.chatId,
          })
        );
        prevAction.current = "";
        setAction(null);
      })
      .catch((err) => {
        if (err.status === 401) {
          updateAccessTokenAndCall(
            dispatch,
            async (accessToken) => {
              return await createChatroom(
                accessToken,
                action.target,
                e.target.chatName.value
              );
            },
            (resp) => {
              dispatch(
                addChat({
                  chatName,
                  members: [user.user.uid, action.target],
                  chat: [],
                  chatId: resp.chatId,
                })
              );
              prevAction.current = "";
              setAction(null);
            }
          );
        }
      });
  };

  const addToChat = (chatId) => {
    addChatroomMember(user.accessToken, action.target, chatId)
      .then(() => {
        dispatch(
          addChatMember({
            member: action.target,
            chatId: chatId,
          })
        );
        prevAction.current = "";
        setAction(null);
      })
      .catch((err) => {
        if (err.status === 401) {
          updateAccessTokenAndCall(
            dispatch,
            async (accessToken) => {
              return await addChatroomMember(
                accessToken,
                action.target,
                chatId
              );
            },
            () => {
              dispatch(
                addChatMember({
                  member: action.target,
                  chatId: chatId,
                })
              );
              prevAction.current = "";
              setAction(null);
            }
          );
        }
      });
  };

  if (action) {
    return (
      <div className="relative flex h-full gap-3 py-3 pt-12 w-full flex-col items-center">
        <button
          onClick={() => {
            setAction(prevAction.current);
            prevAction.current = null;
          }}
          className="after:content-[''] after:bg-[#b1b2b6] after:w-0.5 after:rounded-full after:h-3 after:block before:content-[''] before:bg-[#b1b2b6] before:w-0.5 before:rounded-full before:h-3 after:-rotate-45 before:rotate-45 after:absolute before:absolute after:left-4.25 before:left-4.25 before:block w-9.5 h-9.5 absolute after:top-4.25 before:top-2.75 cursor-pointer  left-2 top-1 block"
        ></button>
        {action.state === "decision" ? (
          <>
            <button
              onClick={() => {
                prevAction.current = action;
                setAction({ state: "createChat", target: action.target });
              }}
              className="bg-[#3e5c76] w-[70%] rounded-lg py-2 cursor-pointer"
            >
              Create Chat
            </button>
            <button
              onClick={() => {
                prevAction.current = action;
                setAction({ state: "addToChatroom", target: action.target });
              }}
              className="bg-[#3e5c76] w-[70%] py-2 rounded-lg cursor-pointer"
            >
              Add to chatroom
            </button>
          </>
        ) : action.state === "createChat" ? (
          <form
            onSubmit={createChat}
            className="w-full h-full flex items-center flex-col gap-3 px-5"
          >
            <TextInput
              className="py-2! px-3!"
              name="chatName"
              id="chatName"
              placeholder="Chat name"
              type="text"
            />
            <SubmitBtn className="py-1.5! w-fit px-5!">Create chat</SubmitBtn>
          </form>
        ) : (
          <div className="w-[100%] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full[&::-webkit-scrollbar-track]:bg-[#2e343c] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#565b60] grid max-h-[100%] overflow-auto">
            {chats.map((chat) => (
              <ChatCard
                onClick={() => addToChat(chat.chatId)}
                lastMessage={chat.chat[0]?.message}
                chatName={chat.chatName}
                key={chat.chatId}
                chatId={chat.chatId}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid max-h-[100%] overflow-auto gap-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full[&::-webkit-scrollbar-track]:bg-[#2e343c] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#565b60]">
      {users?.map((user) => (
        <UserCard
          username={user.username}
          uid={user.uid}
          email={user.email}
          key={user.uid}
          btnOnClick={createOrAddToChat}
        />
      ))}
    </div>
  );
};

export default UsersList;
