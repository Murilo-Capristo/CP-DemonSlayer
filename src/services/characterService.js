import axios from 'axios';

const API_URL = 'https://www.demonslayer-api.com/api/v1/characters';

export const getCharacters = async () => {
  try {
    const response = await axios.get(`${API_URL}?limit=45`);
    console.log('API response:', response.data);
    return response.data.content;
  } catch (err) {
    console.error("Erro Axios:", JSON.stringify(err, null, 2));
    throw err;
  }
};
