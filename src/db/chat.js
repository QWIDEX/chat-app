const getChats = async (accessToken = "undefined") => {
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
  console.log(from, length)
  const resp = await fetch(`http://localhost:8080/chats/${chatId}?from=${from}&length=${length}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await resp.json();

  if (!resp.ok) {
    throw { status: resp.status, message: result.message };
  }

  return result.chatroom.chat;
}

export { getChats, getChat };
