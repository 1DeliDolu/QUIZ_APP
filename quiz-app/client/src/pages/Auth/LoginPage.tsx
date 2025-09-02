import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        navigate('/')
      } else {
        setError('Email veya şifre hatalı!')
      }
    } catch (err) {
      setError('Login sırasında bir hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <div className="mb-4 p-3 bg-gray-100 rounded">
        <p className="text-sm font-medium mb-2">Demo Hesaplar:</p>
        <p className="text-xs">Admin: admin@quiz.com / admin123</p>
        <p className="text-xs">User: user@quiz.com / user123</p>
        <p className="text-xs text-green-600">✅ Artık MySQL veritabanına kaydediliyor!</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="email"
          className="border rounded w-full p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="border rounded w-full p-2"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="border rounded px-4 py-2 bg-blue-600 text-white w-full disabled:bg-gray-400"
        >
          {loading ? 'Giriş yapılıyor...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

