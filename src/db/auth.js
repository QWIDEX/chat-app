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

  if (!resp.ok) {
    throw { status: resp.status, message: result.message };
  }

  return result;
}

async function refreshAccessToken() {
  const resp = await fetch("http://localhost:8080/auth/refresh-token", {
    method: "GET",
    credentials: "include",
  });

  const result = await resp.json();

  if (!resp.ok) {
    throw { status: resp.status, message: result.message };
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

  if (!resp.ok) {
    throw { status: resp.status, message: result.message };
  }

  return result;
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export { login, refreshAccessToken, register, parseJwt };
