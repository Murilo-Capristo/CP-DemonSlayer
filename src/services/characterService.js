import axios from 'axios';

const API_URL = 'https://www.demonslayer-api.com/api/v1/characters?limit=45';

export const getCharacters = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};