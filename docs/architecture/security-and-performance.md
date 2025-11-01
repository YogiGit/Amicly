# Security and Performance

## Security Requirements

**Frontend Security:**
- CSP Headers: `default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://api.amicly.com https://voice.amicly.com;`
- XSS Prevention: React Native built-in XSS protection + input sanitization for all teen conversations
- Secure Storage: Expo SecureStore for authentication tokens, encrypted local storage for conversation cache

**Backend Security:**
- Input Validation: Joi schema validation for all API inputs with teen-specific content filtering
- Rate Limiting: 100 requests/minute per teen user, 10 requests/minute for crisis reporting to prevent abuse
- CORS Policy: `https://app.amicly.com, https://staging.amicly.com` with credential support for family authentication

**Authentication Security:**
- Token Storage: HttpOnly cookies for parent dashboard, Expo SecureStore for mobile tokens
- Session Management: 24-hour JWT expiration with refresh token rotation, immediate revocation for safety escalations
- Password Policy: NIST-compliant password requirements with teen-friendly guidance

## Performance Optimization

**Frontend Performance:**
- Bundle Size Target: <50MB for mobile app to support older Android devices
- Loading Strategy: Lazy loading for conversation history, preloading for crisis resources
- Caching Strategy: Redux Persist for offline conversation access, ServiceWorker for parent dashboard PWA

**Backend Performance:**
- Response Time Target: <3 seconds for AI conversation, <500ms for voice transcription
- Database Optimization: Read replicas for parent dashboard, write optimization for real-time conversations
- Caching Strategy: ElastiCache for conversation context, CloudFront for voice file delivery
