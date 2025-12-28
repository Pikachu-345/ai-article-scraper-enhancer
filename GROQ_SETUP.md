# Get Groq API Key (Free)

## Step 1: Create Account
1. Visit https://console.groq.com
2. Click "Sign Up" or "Get Started"
3. Sign up with your email, Google, or GitHub account
4. Verify your email if required

## Step 2: Navigate to API Keys
1. After logging in, you'll be on the Groq Console
2. Click on your profile icon (top right)
3. Select "API Keys" from the menu
   - Or directly go to: https://console.groq.com/keys

## Step 3: Create API Key
1. Click "Create API Key" button
2. Give it a name (e.g., "BeyondChats Project")
3. Click "Create"
4. **IMPORTANT**: Copy the API key immediately!
   - It will only be shown once
   - Store it securely

## Step 4: Update Enhancement Script .env
Paste the API key in `enhancement-script/.env`:
```env
GROQ_API_KEY=gsk_your_actual_api_key_here
```

## Step 5: Verify It Works
```bash
cd enhancement-script
npm start --help
```

## Free Tier Limits
- **Models**: LLaMA 3.3 70B, Mixtral 8x7B, and more
- **Rate Limit**: ~30 requests per minute
- **Daily Limit**: ~14,400 requests per day

## Available Models
For this project, we use:
```env
GROQ_MODEL=llama-3.3-70b-versatile
```

Other options:
- `llama-3.3-70b-versatile` (recommended - best balance)
- `llama-3.1-70b-versatile`
- `mixtral-8x7b-32768`
- `gemma-7b-it`

## Troubleshooting
- **"Invalid API key"**: Make sure you copied the entire key including `gsk_` prefix
- **Rate limit errors**: Add delays between requests in the script
- **No credits**: Groq is free, but check your account status at console.groq.com
