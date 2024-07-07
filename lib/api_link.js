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
    return response.data; // 서버에서 업데이트된 링크 객체를 반환해야 합니다
  } catch (error) {
    console.error("Failed to update link:", error);
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