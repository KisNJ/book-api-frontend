export const getIndexPage = async () => {
  const res = fetch("http://localhost:3100/api");
  const data = (await res).json();
  return data;
};
interface formDataSignUp {
  username: string;
  password: string;
  confirmPassword: string;
}
export const signUp = async (formData: formDataSignUp) => {
  const response = await fetch("http://localhost:3100/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  return response;
};
interface formDatalogIn {
  username: string;
  password: string;
}
export const logIn = async (formDataLogin: formDatalogIn) => {
  const response = await fetch("http://localhost:3100/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formDataLogin),
  });
  return response;
};
export const logOut = async () => {
  const response = await fetch("http://localhost:3100/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return response;
};
