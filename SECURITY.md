# Security Guidelines for TUYA Platform

## 🔒 Environment Variables

### Never Commit Secrets
- ✅ All `.env*` files are in `.gitignore`
- ✅ Use Vercel/Platform environment variables dashboard
- ✅ Never hardcode API keys, passwords, or tokens

### Required Environment Variables

#### Backend (packages/backend)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret (min 32 characters)
- `GOOGLE_MAPS_API_KEY` - Google Maps API key
- `SOCKET_IO_CORS_ORIGIN` - Allowed CORS origins

#### Passenger App (apps/passenger-app)
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_SOCKET_URL` - WebSocket URL

#### Driver App (apps/driver-app)
- `VITE_API_URL` - Backend API URL
- `VITE_SOCKET_URL` - WebSocket URL

#### Admin Dashboard (apps/admin-dashboard)
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_SOCKET_URL` - WebSocket URL

## 🛡️ Security Best Practices

### 1. Database Security
- Use strong passwords (min 16 characters)
- Enable SSL connections
- Use Supabase security features
- Rotate credentials regularly

### 2. API Security
- Use HTTPS only
- Implement rate limiting
- Validate all inputs
- Use CORS properly
- Implement JWT expiration

### 3. Code Security
- No hardcoded secrets
- No console.log of sensitive data
- Use environment variables
- Validate environment variables on startup

### 4. Deployment Security
- Use Vercel Environment Variables
- Enable branch protection
- Use GitHub Secrets for CI/CD
- Monitor deployment logs

## 🔑 Setting Up Environment Variables

### On Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add each required variable
3. Select appropriate environments (Production, Preview, Development)
4. Deploy

### Locally (Development):
1. Copy `.env.example` to `.env.local`
2. Fill in actual values
3. Never commit `.env.local`

## 🚨 If a Secret is Exposed

1. **Immediately rotate the secret**
2. **Update in all platforms**
3. **Check git history** for exposure
4. **Use git-filter-repo** if needed
5. **Notify all team members**

## 📋 Checklist Before Deployment

- [ ] No `.env` files committed
- [ ] All secrets in environment variables
- [ ] JWT_SECRET is strong (32+ chars)
- [ ] Database URL uses SSL
- [ ] CORS origins are correct
- [ ] No console.log of sensitive data
- [ ] Rate limiting enabled
- [ ] HTTPS enforced

## 🔗 References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Vercel Security](https://vercel.com/docs/security)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/nodejs-security/)
