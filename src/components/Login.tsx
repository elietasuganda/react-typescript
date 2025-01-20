import React, { useState } from 'react';

// Interface untuk mengatur tipe data pada input login
interface LoginResponse {
  token: string;
  user: {
    // id: number;
    username: string;
    password: string;
  };
}

const Login: React.FC = () => {
  // State untuk form login
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  // State untuk loading dan error
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk menangani login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error jika ada

    try {
      // Mengirim permintaan ke API login
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Mengecek apakah status respons 200 (berhasil)
      if (!response.ok) {
        throw new Error('Login gagal. Periksa username dan password.');
      }

      const data: LoginResponse = await response.json();
      console.log('Login berhasil:', data);
      
      // Simpan token atau data ke localStorage (atau state global) untuk digunakan di halaman lain
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect atau tampilan setelah login berhasil (opsional)
      window.location.href = '/dashboard'; // Ganti ke halaman dashboard atau halaman lain
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-900">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;