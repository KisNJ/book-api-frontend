export const getIndexPage = async () => {
  const res = fetch("http://localhost:3100/api");
  const data = (await res).json();
  return data;
};
