const createPostCall = (url, auth, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const createGetCall = (url, auth) => {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
};

const handleResponse = async (response) => {
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error("Something went horribly wrong");
  }
};

export const addTransaction = async (newTransaction, token) => {
  try {
    const fetchResponse = await createPostCall(
      `api/transaction/`,
      token,
      newTransaction
    );
    const result = await handleResponse(fetchResponse);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getMonthTransactions = async (token, month) => {
  let monthyear;
  if (!month) {
    const tDate = new Date();
    monthyear =
      `${tDate.getMonth() + 1}`.padStart(2, "0") + `${tDate.getFullYear()}`;
    console.log(monthyear);
  } else {
    monthyear = month;
  }

  try {
    const fetchResponse = createGetCall(`api/transaction/${monthyear}`, token);
    const result = await handleResponse(fetchResponse);
    return result;
  } catch (error) {
    console.log(error);
  }
};
