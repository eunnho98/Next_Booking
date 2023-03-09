import axios from '.';

// 파일 업로드
export const uploadFileAPI = (file: FormData) =>
  axios.post('/api/files/upload', file);
