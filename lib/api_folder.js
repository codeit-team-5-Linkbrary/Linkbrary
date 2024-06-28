// lib/api/folder.js
import axios from "../axios";

export const getFolders = async () => {
  const response = await axios.get("/folders");
  return response.data;
};

export const getFolderById = async (folderId) => {
  const response = await axios.get(`/folders/${folderId}`);
  return response.data;
};

export const createFolder = async (folderName) => {
  const response = await axios.post("/folders", { name: folderName });
  return response.data;
};

export const updateFolder = async (folderId, folderName) => {
  const response = await axios.put(`/folders/${folderId}`, {
    name: folderName,
  });
  return response.data;
};

export const deleteFolder = async (folderId) => {
  const response = await axios.delete(`/folders/${folderId}`);
  return response.data;
};
