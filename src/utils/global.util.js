import { v4 as uuidv4 } from "uuid";

export const generateId = () => uuidv4();

export const saveLocalStorage = (key, data) => {
  const dataJson = JSON.stringify(data);
  localStorage.setItem(key, dataJson);
};

export const getFromStorage = (key) => {
  const dataStored = localStorage.getItem(key);
  if (!dataStored) return null;
  const dataRestored = JSON.parse(dataStored);
  return dataRestored;
};

export const upperCasing = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const currentDate = () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
};
