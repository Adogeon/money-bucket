export const getUserDetail = async (token) => {
  try {
    const fetchResponse = await fetch(`/api/user/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (fetchResponse.status !== 200) {
      throw new Error(fetchResponse.statusText);
    }
    return await fetchResponse.json();
  } catch (error) {
    console.log(error);
  }
};
