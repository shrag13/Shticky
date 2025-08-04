# Secure Deployment Setup for Shticky Admin Vault

## Required Environment Variables for Production

To ensure secure access to the admin vault on the deployed GitHub version, set these environment variables:

### 1. Admin Vault Master Key
```bash
ADMIN_VAULT_KEY=your-super-secure-master-key-here
```
**IMPORTANT:** Use a strong, unique key (minimum 32 characters)

### 2. Production Admin Account (Optional)
```bash
PRODUCTION_ADMIN_EMAIL=your-admin@email.com
PRODUCTION_ADMIN_PASSWORD=your-secure-admin-password
```

## Replit Secrets Setup

1. Go to your Replit project
2. Click the "Secrets" tab (lock icon)
3. Add these secrets:
   - Key: `ADMIN_VAULT_KEY` 
     Value: `ShtickySuperSecureVaultKey2025!@#$%^&*`
   - Key: `PRODUCTION_ADMIN_EMAIL` (optional)
     Value: `admin@yoursite.com`
   - Key: `PRODUCTION_ADMIN_PASSWORD` (optional) 
     Value: `YourSecurePassword123!`

## GitHub Deployment Setup

### For Vercel/Netlify:
1. Go to your deployment platform settings
2. Add Environment Variables:
   ```
   ADMIN_VAULT_KEY=ShtickySuperSecureVaultKey2025!@#$%^&*
   PRODUCTION_ADMIN_EMAIL=admin@yoursite.com
   PRODUCTION_ADMIN_PASSWORD=YourSecurePassword123!
   ```

### For other platforms:
Add the same environment variables through your platform's configuration.

## Security Features

✅ **Encrypted Storage**: All passwords encrypted with AES-256  
✅ **Environment Variables**: Master key stored securely in environment  
✅ **Production Safety**: Separate production admin credentials  
✅ **Auto-Initialization**: Vault creates itself on first run  
✅ **Backup System**: Encrypted backup generation  

## Access Instructions

### Development:
- Admin Panel: `/admin-panel` (Username: Admin, Password: Admin)
- Secure Vault: Click "Secure Vault" tab or visit `/admin-vault`

### Production:
- Admin Panel: `/admin-panel` (Use production admin credentials)
- Secure Vault: Same interface, uses encrypted environment-based storage

## Troubleshooting

**Issue: "Invalid master key or corrupted vault"**
- Check that `ADMIN_VAULT_KEY` environment variable is set correctly
- Ensure the key is the same across deployments

**Issue: Can't access vault in production**
- Verify environment variables are set in deployment platform
- Check that the vault file has proper permissions
- Ensure the master key matches between environments

## Migration from Local to Production

1. **Export Local Vault**: Use the "Download Encrypted Backup" feature
2. **Set Environment Variables**: Configure `ADMIN_VAULT_KEY` in production
3. **Import Credentials**: Use the vault interface to add production credentials
4. **Verify Access**: Test admin panel and vault functionality

## Security Best Practices

- **Never commit** vault files to version control
- **Use strong master keys** (32+ characters, mixed case, numbers, symbols)
- **Rotate credentials** regularly in production
- **Monitor access logs** for unauthorized vault access
- **Keep backups secure** and encrypted