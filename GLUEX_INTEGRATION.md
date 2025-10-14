# GlueX Widget Integration for LBP Token Purchase

This document describes the integration of the GlueX widget into the LBP (Liquidity Bootstrapping Pool) swap interface to allow users to purchase HWAVE tokens with any asset.

## Overview

The integration replaces the existing `SwapForm` component in the LBP detail page with a GlueX widget that:
- Allows users to buy HWAVE tokens with any asset (not just the LBP pair assets)
- Uses Hyperwave brand colors and styling
- Locks the destination token to HWAVE and the destination chain to the pool's chain
- Uses the existing wallet connection from the app
- Uses the compact variant for space efficiency

## Implementation Status

✅ **Completed:**
- Environment variable configuration
- GlueX config added to app.config.ts
- GlueXLbpWidget component created with proper structure
- LbpSwap component updated to use GlueX widget
- Hyperwave theme configuration prepared
- Placeholder UI implemented

⏳ **Pending (requires GlueX packages):**
- Actual GlueX widget rendering
- SDK integration
- Package installation

## Files Modified

### 1. Package Dependencies
- `apps/frontend-v3/package.json` - Added GlueX packages

### 2. Environment Configuration
- `apps/frontend-v3/.env.example` - Added GlueX credentials template
- `packages/lib/config/app.config.ts` - Added GlueX config export

### 3. Widget Component
- `packages/lib/modules/lbp/GlueXLbpWidget.tsx` - New GlueX widget wrapper

### 4. LBP Integration
- `packages/lib/modules/pool/LbpDetail/LbpSwap.tsx` - Replaced SwapForm with GlueX widget

## Configuration Details

### Environment Variables
```bash
NEXT_PUBLIC_GLUEX_INTEGRATOR_ID=your_integrator_id
NEXT_PUBLIC_GLUEX_API_KEY=your_api_key
```

### Widget Configuration
The widget is configured with:
- **Variant:** Compact
- **Theme:** Hyperwave brand colors
  - Primary: `#21F1A6` (Hyperwave green)
  - Secondary: `#6300B9` (Hyperwave purple)
  - Background: `#051212` (Hyper Dark)
  - Gradient: `linear-gradient(135deg, #21F1A6 0%, #6300B9 100%)`
- **Locked Settings:**
  - Destination token: HWAVE (from pool's projectToken)
  - Destination chain: Pool's chain
- **User Tracking:** Uses connected wallet address

## Next Steps

### 1. Install GlueX Packages
Once the GlueX packages are available:
```bash
cd apps/frontend-v3
pnpm install @gluex/widget @gluex/sdk
```

### 2. Update Widget Component
In `packages/lib/modules/lbp/GlueXLbpWidget.tsx`:
1. Uncomment the import statements:
   ```typescript
   import { GlueXWidget } from '@gluex/widget'
   import { GlueXSDK } from '@gluex/sdk'
   ```

2. Uncomment the SDK initialization code:
   ```typescript
   return new GlueXSDK({
     integratorId: glueXConfig.integratorId,
     apiKey: glueXConfig.apiKey,
     userId: userAddress || 'anonymous',
     referrer: userAddress || '',
     rpcUrls: {
       [getChainId(pool.chain)]: wagmiConfig.transports[getChainId(pool.chain)]?.config?.url || '',
     },
     chains: [getChainId(pool.chain)],
     debug: process.env.NODE_ENV === 'development',
   })
   ```

3. Replace the placeholder UI with the actual widget:
   ```typescript
   return (
     <div style={{ 
       background: '#051212',
       borderRadius: '12px',
       overflow: 'hidden',
       border: '1px solid #1A2A2A'
     }}>
       <GlueXWidget config={widgetConfig} />
     </div>
   )
   ```

### 3. Test Integration
1. Set up environment variables with actual GlueX credentials
2. Test the widget in the LBP detail page
3. Verify:
   - Widget renders correctly
   - Theme matches Hyperwave branding
   - Destination token is locked to HWAVE
   - Destination chain is locked to pool's chain
   - Wallet connection works properly

## Widget Behavior

### User Experience
- Users can select any token to swap from
- Destination token (HWAVE) is locked and cannot be changed
- Destination chain is locked to the pool's chain
- Widget uses the same wallet connection as the rest of the app
- Compact variant provides a clean, space-efficient interface

### Technical Details
- SDK configured with integrator ID and API key
- User tracking enabled with wallet address
- RPC endpoints configured from existing wagmi config
- Debug mode enabled in development
- Proper error handling for missing credentials

## Troubleshooting

### Common Issues
1. **Widget not rendering:** Check environment variables are set correctly
2. **Theme not applied:** Verify theme configuration in widgetConfig
3. **Wallet connection issues:** Ensure wagmi config is properly passed
4. **Token/chain not locked:** Check toToken and chains configuration

### Debug Information
The widget includes console warnings for:
- Missing GlueX credentials
- SDK initialization failures
- Configuration errors

## Support

For issues with the GlueX integration:
1. Check the GlueX documentation: https://docs.gluex.xyz/
2. Verify environment variables are correctly set
3. Ensure GlueX packages are properly installed
4. Check browser console for error messages
