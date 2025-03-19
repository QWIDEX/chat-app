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

export { getChats };
