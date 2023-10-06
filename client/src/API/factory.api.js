export const createPostCall = (url, auth, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const createGetCall = (url, auth) => {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
};

export const handleResponse = async (response) => {
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error("Something went horribly wrong");
  }
};
