const getUsers = async () => {
  const resp = await fetch("http://localhost:8080/users", {
    method: "GET",
  });

  const result = await resp.json();

  if (!resp.ok) {
    throw { status: resp.status, message: result.message };
  }

  return result;
};

export { getUsers };
