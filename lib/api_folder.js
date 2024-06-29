import axios from "./axios";

// 유저의 모든 폴더 조회
export const getFolders = async (token) => {
  const response = await axios.get(`/folders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 폴더 생성
export const createFolder = async (token, folderName) => {
  const response = await axios.post(
    `/folders`,
    { name: folderName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// 폴더 이름 수정
export const renameFolder = async (token, folderId, newName) => {
  const response = await axios.put(
    `/folders/${folderId}`,
    { name: newName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// 폴더 삭제
export const deleteFolder = async (token, folderId) => {
  const response = await axios.delete(`/folders/${folderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
