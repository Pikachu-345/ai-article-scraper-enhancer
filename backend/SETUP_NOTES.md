# Backend Setup Notes

## MongoDB Setup
MongoDB is not installed locally. We'll use **MongoDB Atlas** (free cloud service) for the database.

### Quick Setup:
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free M0 cluster
4. Create a database user
5. Get connection string and update `.env` file

For now, the backend is complete and ready to run once MongoDB Atlas is configured.

## Testing Backend Locally
Once MongoDB is set up:
```bash
npm run dev
```

Then test scraping:
```bash
curl -X POST http://localhost:5000/api/articles/scrape/beyondchats
```
