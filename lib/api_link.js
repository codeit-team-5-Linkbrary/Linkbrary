import axios from "./axios";

export const fetchLinks = async (token) => {
  try {
    const response = await axios.get(`/links`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const links = response.data.map((link) => {
      // 데이터 유효성 검사 - createdAt 필드가 null이 아닌지 확인
      if (link.createdAt && new Date(link.createdAt).getTime()) {
        return {
          ...link,
          createdAt: new Date(link.createdAt).toISOString(),
        };
      } else {
        console.warn(`Invalid createdAt value for link ${link.id}`);
        return {
          ...link,
          createdAt: null, // 또는 다른 fallback 값 설정
        };
      }
    });

    return links;
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
    return response.data; // 서버에서 업데이트된 링크 객체를 반환해야 합니다
  } catch (error) {
    console.error("Failed to update link:", error);
    throw error;
  }
};

export const deleteLink = async (token, linkId) => {
  const response = await axios.delete(`/links/${linkId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getFavorites = async (token, page, pageSize) => {
  try {
    const response = await axios.get(`/favorites`, {
      params: { page, pageSize, favorite: true },
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      links: response.data,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    throw error;
  }
};
