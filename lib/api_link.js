import axios from "./axios";

// 유저의 전체 링크 조회
export const fetchLinks = async (token, page = 1, pageSize = 100) => {
  try {
    const response = await axios.get(`/links`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching links:", error);
    throw error;
  }
};

// 폴더에 속한 링크 조회
export const getLinksByFolderId = async (
  token,
  folderId,
  page = 1,
  pageSize = 100
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

// 링크 생성
export const createLink = async (token, url, folderId) => {
  try {
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
  } catch (error) {
    console.error("Error creating link:", error);
    throw error;
  }
};

// 링크의 즐겨찾기 설정
export const updateLink = async (token, linkId, favorite) => {
  try {
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
  } catch (error) {
    console.error("Error updating link:", error);
    throw error;
  }
};

// 링크 삭제
export const deleteLink = async (token, linkId) => {
  try {
    const response = await axios.delete(`/links/${linkId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting link:", error);
    throw error;
  }
};

// 유저의 즐겨찾기 링크 조회
export const getFavorites = async (token, page = 1, pageSize = 100) => {
  try {
    const response = await axios.get(`/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};
