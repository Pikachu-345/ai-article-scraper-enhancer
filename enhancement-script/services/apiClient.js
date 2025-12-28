const axios = require('axios');

class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL || process.env.API_BASE_URL || 'http://localhost:5000/api';
        this.client = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async getArticles(params = {}) {
        try {
            const response = await this.client.get('/articles', { params });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching articles:', error.message);
            throw error;
        }
    }

    async getArticle(id) {
        try {
            const response = await this.client.get(`/articles/${id}`);
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching article ${id}:`, error.message);
            throw error;
        }
    }

    async updateArticle(id, data) {
        try {
            const response = await this.client.put(`/articles/${id}`, data);
            return response.data.data;
        } catch (error) {
            console.error(`Error updating article ${id}:`, error.message);
            throw error;
        }
    }

    async createArticle(data) {
        try {
            const response = await this.client.post('/articles', data);
            return response.data.data;
        } catch (error) {
            console.error('Error creating article:', error.message);
            throw error;
        }
    }
}

module.exports = APIClient;
