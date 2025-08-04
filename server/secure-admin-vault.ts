import CryptoJS from 'crypto-js';
import fs from 'fs';
import path from 'path';

interface SecureCredential {
  email: string;
  password: string;
  role: string;
  status: string;
  createdAt: string;
}

class SecureAdminVault {
  private readonly vaultPath: string;
  private readonly masterKey: string;

  constructor() {
    this.vaultPath = path.join(process.cwd(), 'secure-vault.enc');
    // Use environment variable for production security
    this.masterKey = process.env.ADMIN_VAULT_KEY || 'ShtickySuperSecureAdminKey2025!@#';
  }

  // Encrypt and save credentials
  saveCredentials(credentials: SecureCredential[]): void {
    try {
      const jsonData = JSON.stringify(credentials, null, 2);
      const encrypted = CryptoJS.AES.encrypt(jsonData, this.masterKey).toString();
      
      // Add header with timestamp and verification
      const vaultData = {
        version: '1.0',
        encrypted: true,
        timestamp: new Date().toISOString(),
        data: encrypted
      };
      
      fs.writeFileSync(this.vaultPath, JSON.stringify(vaultData, null, 2));
      console.log('✓ Secure vault updated with encrypted credentials');
    } catch (error) {
      console.error('Failed to save secure vault:', error);
    }
  }

  // Decrypt and load credentials
  loadCredentials(): SecureCredential[] {
    try {
      if (!fs.existsSync(this.vaultPath)) {
        return [];
      }

      const vaultData = JSON.parse(fs.readFileSync(this.vaultPath, 'utf8'));
      const decrypted = CryptoJS.AES.decrypt(vaultData.data, this.masterKey);
      const jsonData = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (!jsonData) {
        throw new Error('Invalid master key or corrupted vault');
      }
      
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('Failed to load secure vault:', error);
      return [];
    }
  }

  // Add or update a credential
  updateCredential(email: string, password: string, role: string = 'user', status: string = 'active'): void {
    const credentials = this.loadCredentials();
    const existingIndex = credentials.findIndex(cred => cred.email === email);
    
    const newCredential: SecureCredential = {
      email,
      password,
      role,
      status,
      createdAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      credentials[existingIndex] = newCredential;
    } else {
      credentials.push(newCredential);
    }

    this.saveCredentials(credentials);
  }

  // Get credential by email
  getCredential(email: string): SecureCredential | null {
    const credentials = this.loadCredentials();
    return credentials.find(cred => cred.email === email) || null;
  }

  // List all credentials (for admin viewing)
  listCredentials(): SecureCredential[] {
    return this.loadCredentials();
  }

  // Generate secure backup
  generateBackup(): string {
    const credentials = this.loadCredentials();
    const backupData = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      credentials: credentials
    };
    
    return CryptoJS.AES.encrypt(JSON.stringify(backupData, null, 2), this.masterKey).toString();
  }
}

export const secureVault = new SecureAdminVault();

// Initialize with existing test credentials and production defaults
export function initializeVault() {
  secureVault.updateCredential('Admin', 'Admin', 'admin', 'system');
  secureVault.updateCredential('shrhersh@gmail.com', 'bluebird', 'user', 'approved');
  secureVault.updateCredential('pending@test.com', 'bluebird', 'user', 'pending');
  secureVault.updateCredential('myname@myname.com', 'userpassword', 'user', 'pending');
  secureVault.updateCredential('admin@shticky.app', 'AdminSecure2025', 'admin', 'active');
  
  // Initialize production admin account if not exists
  if (process.env.NODE_ENV === 'production' && process.env.PRODUCTION_ADMIN_EMAIL && process.env.PRODUCTION_ADMIN_PASSWORD) {
    secureVault.updateCredential(process.env.PRODUCTION_ADMIN_EMAIL, process.env.PRODUCTION_ADMIN_PASSWORD, 'admin', 'production');
  }
}