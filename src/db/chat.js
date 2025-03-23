const getChats = async (accessToken = "") => {
  const resp = await fetch("http://localhost:8080/chats", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await resp.json();

  if (!resp.ok) {
    throw { status: resp.status, message: result.message };
  }

  return result.chats;
};

const getChat = async (accessToken, chatId = "", from = 0, length = 30) => {
  const resp = await fetch(
    `http://localhost:8080/chats/${chatId}?from=${from}&length=${length}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const result = await resp.json();

  if (!resp.ok) {
    throw { status: resp.status, message: result.message };
  }

  return result.chatroom.chat;
};

const createChatroom = async (
  accessToken,
  targetUid = "",
  chatName = ""
) => {
  const resp = await fetch(`http://localhost:8080/chats`, {
    body: JSON.stringify({
      "targetUid" : targetUid,
      chatName,
    }),
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await resp.json();

  if (!resp.ok) {
    throw { status: resp.status, message: result.message };
  }

  return result;
};

const addChatroomMember = async (
  accessToken,
  targetUid = "",
  chatId = ""
) => {
  const resp = await fetch(`http://localhost:8080/chats`, {
    body: JSON.stringify({
      memberUid: targetUid,
      chatId,
    }),
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await resp.json();

  if (!resp.ok) {
    throw { status: resp.status, message: result.message };
  }

  return result;
};

export { getChats, getChat, createChatroom, addChatroomMember };
