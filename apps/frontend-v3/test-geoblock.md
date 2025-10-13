# Testing Geoblocking

## How to Test Locally

Since IP geolocation only works on Vercel's edge network, you'll need to test this after deployment.
However, you can test the blocked page locally:

1. Start your development server:

   ```bash
   pnpm dev:bal
   ```

2. Navigate to `http://localhost:3000/blocked` to see the blocked page

## Testing on Vercel

### Method 1: Deploy and Test with VPN

1. Deploy your app to Vercel
2. Use a VPN to connect to a blocked country (Canada, Cuba, Iran, North Korea, Russia, Syria, or
   Venezuela)
3. Visit your deployed app - you should see the blocked page

### Method 2: Test with Different IPs

1. Deploy your app to Vercel
2. Ask friends/colleagues in different countries to test
3. Use online tools that can simulate requests from different countries

### Method 3: Temporary Testing (Add Your IP to Blocked List)

For testing purposes, you can temporarily add your country code to the `BLOCKED_COUNTRIES` array in
the middleware file, deploy, test, then remove it.

## Expected Behavior

- **Blocked countries**: Users see the "Access Restricted" page
- **Non-blocked countries**: Users see the normal app
- **Unknown location**: Users see the normal app (fail-open approach)

## Blocked Countries

- CA (Canada)
- CU (Cuba)
- IR (Iran)
- KP (North Korea)
- RU (Russia)
- SY (Syria)
- VE (Venezuela)
