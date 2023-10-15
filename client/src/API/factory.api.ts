export const createRequest = async (
  url: string,
  auth: string | null,
  method: string = "GET",
  body?: any
): Promise<any> => {
  const optionObj: Record<string, any> = {
    method,
    headers: {
      Authorization: `Bearer ${auth ?? ""}`,
    },
  };

  if (body !== undefined) {
    optionObj.headers["Content-Type"] = "application/json";
    optionObj.body = JSON.stringify(body);
  }

  return await fetch(url, optionObj);
};

export const handleResponse = async (response: Response): Promise<any> => {
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error("Something went horribly wrong");
  }
};
