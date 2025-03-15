async function login(email, password) {
  const resp = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: "include",
  });

  const result = await resp.json();

  if (resp.status === 401) {
    throw result;
  } else if (!resp.ok) {
    console.log(result);
    throw { message: "Something went wrong" };
  }

  return result;
}

async function refreshAccessToken() {
  const resp = await fetch("http://localhost:8080/auth/refresh-token", {
    method: "GET",
    credentials: "include",
  });

  const result = await resp.json();

  if (resp.status === 401) {
    throw result;
  } else if (!resp.ok) {
    console.log(result);
    throw { message: "Something went wrong" };
  }

  return result;
}

async function register(username, email, password) {
  const resp = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
    credentials: "include",
  });

  const result = await resp.json();

  if (resp.status === 409) {
    throw result;
  } else if (!resp.ok) {
    console.log(result);
    throw { message: "Something went wrong" };
  }

  return result;
}

export { login, refreshAccessToken, register };
