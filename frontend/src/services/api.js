import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const articleService = {
    async getAllArticles(isUpdated) {
        const params = {};
        if (isUpdated !== undefined) {
            params.isUpdated = isUpdated;
        }
        const response = await api.get('/articles', { params });
        return response.data.data;
    },

    async getArticle(id) {
        const response = await api.get(`/articles/${id}`);
        return response.data.data;
    },

    async scrapeArticles(count = 5) {
        const response = await api.post('/articles/scrape/beyondchats', { count });
        return response.data.data;
    }
};

export default api;
