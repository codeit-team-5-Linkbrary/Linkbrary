import axios from "./axios";

export const fetchLinks = async (token) => {
  try {
    const response = await axios.get(`/links`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching links:", error);
    throw error;
  }
};

export const getLinksByFolderId = async (
  token,
  folderId,
  page = 1,
  pageSize = 10
) => {
  try {
    const response = await axios.get(`/folders/${folderId}/links`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching links by folder:", error);
    throw error;
  }
};

export const createLink = async (token, url, folderId) => {
  const response = await axios.post(
    `/links`,
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
  const response = await axios.get(`/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { page, pageSize },
  });
  return response.data;
};
