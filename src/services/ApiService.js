import axios from 'axios';

const apiUrl = 'https://vi9b42paw5.execute-api.ap-northeast-1.amazonaws.com/Stage';

export const fetchRecruitmentProgress = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching recruitment progress:', error);
    throw error;
  }
};

export const fetchRecruitmentById = async (dialogItem) => {
  try {
    const response = await axios.get(`https://5zswm8i35h.execute-api.ap-northeast-1.amazonaws.com/QA/`,
      {
        params: {
          cn_id: dialogItem.cn_id,
          status: dialogItem.status
        }
      });
    return response.data;
  } catch (error) {
    console.error('Error fetching recruitment by ID:', error);
    throw error;
  }
};

export const fetchRecruitmentList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/recruitmentiistsheet`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recruitment list:', error);
    throw error;
  }
};

export const postPlatFormData = async (formData) => {
  try {
    const response = await axios.post(`${apiUrl}/plat-form`, formData);
    return response.data;
  } catch (error) {
    console.error('Error sending form data:', error);
    throw error;
  }
};

export const fetchPlatFormList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/plat-form`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recruitment list:', error);
    throw error;
  }
};