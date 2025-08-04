import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Shield, Download, Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SecureCredential {
  email: string;
  password: string;
  role: string;
  status: string;
  createdAt: string;
}

export default function SecureVault() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});
  const [newCredential, setNewCredential] = useState({
    email: '',
    password: '',
    role: 'user',
    status: 'active'
  });

  const { data: credentials, isLoading } = useQuery<SecureCredential[]>({
    queryKey: ['/api/admin/vault/credentials'],
  });

  const addCredentialMutation = useMutation({
    mutationFn: (data: typeof newCredential) => 
      apiRequest("POST", "/api/admin/vault/add", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/vault/credentials'] });
      setNewCredential({ email: '', password: '', role: 'user', status: 'active' });
      toast({ title: "Credential added to secure vault" });
    },
    onError: () => {
      toast({ title: "Failed to add credential", variant: "destructive" });
    }
  });

  const generateBackupMutation = useMutation({
    mutationFn: () => apiRequest("GET", "/api/admin/vault/backup"),
    onSuccess: (data) => {
      const blob = new Blob([data.backup], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `secure-backup-${new Date().toISOString().split('T')[0]}.enc`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast({ title: "Encrypted backup downloaded" });
    }
  });

  const togglePasswordVisibility = (email: string) => {
    setShowPasswords(prev => ({ ...prev, [email]: !prev[email] }));
  };

  if (isLoading) {
    return <div className="p-8">Loading secure vault...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Secure Admin Vault</h1>
          </div>
          <Button
            onClick={() => generateBackupMutation.mutate()}
            disabled={generateBackupMutation.isPending}
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Encrypted Backup</span>
          </Button>
        </div>

        {/* Add New Credential */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add New Credential</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={newCredential.email}
                  onChange={(e) => setNewCredential(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={newCredential.password}
                  onChange={(e) => setNewCredential(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="password"
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={newCredential.role}
                  onChange={(e) => setNewCredential(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full p-2 border rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={() => addCredentialMutation.mutate(newCredential)}
                  disabled={!newCredential.email || !newCredential.password || addCredentialMutation.isPending}
                  className="w-full"
                >
                  Add to Vault
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credentials List */}
        <Card>
          <CardHeader>
            <CardTitle>Encrypted Credentials ({credentials?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {credentials?.map((cred, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <Label className="text-sm font-semibold">Email</Label>
                      <p className="font-mono text-sm">{cred.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Password</Label>
                      <div className="flex items-center space-x-2">
                        <p className="font-mono text-sm bg-white p-2 rounded border flex-1">
                          {showPasswords[cred.email] ? cred.password : "•".repeat(cred.password.length)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePasswordVisibility(cred.email)}
                          className="h-8 w-8 p-0"
                        >
                          {showPasswords[cred.email] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Role</Label>
                      <Badge variant={cred.role === 'admin' ? 'default' : 'secondary'}>
                        {cred.role}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Status</Label>
                      <Badge variant={cred.status === 'active' ? 'default' : 'secondary'}>
                        {cred.status}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-semibold">Created</Label>
                      <p className="text-xs text-gray-600">
                        {new Date(cred.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-yellow-600 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800">Security Features</h3>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• All credentials encrypted with AES-256 encryption</li>
                <li>• Stored in encrypted file with master key protection</li>
                <li>• Automatic backup generation with timestamp</li>
                <li>• Password visibility controls for secure viewing</li>
                <li>• File excluded from version control (.gitignore)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}