const baseUrl = import.meta.env.VITE_API_BASE_URL

const getUsers = async () => {
  const resp = await fetch(baseUrl + "/users", {
    method: "GET",
  });

  const result = await resp.json();

  if (!resp.ok) {
    throw { status: resp.status, name: "ApiError", message: result.message };
  }

  return result;
};

export { getUsers };
