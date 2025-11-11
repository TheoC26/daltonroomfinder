# Authentication Setup Guide

This guide will help you set up Google OAuth authentication for your Dalton Room Finder application using Supabase.

## Prerequisites

1. A Supabase account and project
2. Access to the Google Cloud Console (for OAuth setup)

## Step 1: Supabase Project Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select an existing one
3. Navigate to **Settings** > **API** in your Supabase project
4. Copy your **Project URL** and **anon/public key**

## Step 2: Environment Variables

1. Copy `.env.example` to `.env` in your project root:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace the placeholder values:
   ```env
   PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
   VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key
   ```

## Step 3: Google OAuth Setup in Supabase

1. In your Supabase project, go to **Authentication** > **Providers**
2. Find **Google** and click **Configure**
3. Enable Google OAuth
4. You'll need to set up a Google OAuth application:

### Google Cloud Console Setup:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the **Google+ API** (if not already enabled)
4. Go to **APIs & Services** > **Credentials**
5. Click **Create Credentials** > **OAuth 2.0 Client IDs**
6. Choose **Web Application**
7. Add these redirect URLs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - `http://localhost:5173/auth/callback` (for local development)
8. Copy the **Client ID** and **Client Secret**

### Back in Supabase:

1. Paste the **Client ID** and **Client Secret** from Google
2. Save the configuration

## Step 4: Database Setup (Optional)

If you want to use the room caching feature, create a table in your Supabase database:

```sql
CREATE TABLE room_cache (
  id INTEGER PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Step 5: Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173`
3. You should be redirected to the login page
4. Try logging in with a Google account
5. Only accounts ending in `@dalton.org` should have access

## Troubleshooting

### Common Issues:

1. **"Invalid login credentials"**: Check your Supabase URL and anon key
2. **OAuth redirect error**: Ensure your redirect URLs are correctly configured in Google Cloud Console
3. **Environment variables not loading**: Make sure your `.env` file is in the project root and not committed to git

### Email Domain Restriction:

The application is configured to only allow users with `@dalton.org` email addresses. If you need to change this:

1. Edit `src/lib/auth.js` - modify the `hasValidDaltonEmail` function
2. Update `src/hooks.server.js` - modify the email domain check
3. Update the unauthorized page message in `src/routes/unauthorized/+page.svelte`

## Security Notes

- Never commit your `.env` file to version control
- The `.env.example` file is safe to commit as it contains no real credentials
- Consider using Supabase Row Level Security (RLS) for additional data protection
- The anon key is safe to expose to the client as it has limited permissions

## Next Steps

Once authentication is working:

1. Consider setting up Row Level Security in Supabase
2. Implement user roles if needed
3. Add additional OAuth providers if required
4. Set up production environment variables in your deployment platform