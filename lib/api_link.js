// lib/api/link.js
import axios from "@/lib/axios";

export const fetchLinks = async (token) => {
  const response = await axios.get("/links", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addLink = async (token, newLink) => {
  const response = await axios.post("/links", newLink, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const toggleFavorite = async (token, id, isFavorite) => {
  const response = await axios.put(
    `/links/${id}`,
    { favorite: !isFavorite },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getLinksByFolderId = async (folderId, page = 1, pageSize = 10) => {
  const response = await axios.get(`/folders/${folderId}/links`, {
    params: { page, pageSize },
  });
  return response.data;
};

export const getAllLinks = async (page = 1, pageSize = 10, search = "") => {
  const response = await axios.get("/links", {
    params: { page, pageSize, search },
  });
  return response.data;
};

export const createLink = async (token, url, folderId) => {
  const response = await axios.post(
    "/links",
    { url, folderId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const updateLink = async (token, linkId, favorite) => {
  const response = await axios.put(
    `/links/${linkId}`,
    { favorite },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteLink = async (token, linkId) => {
  const response = await axios.delete(`/links/${linkId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getFavorites = async (token, page = 1, pageSize = 10) => {
  const response = await axios.get("/favorites", {
    params: { page, pageSize },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
