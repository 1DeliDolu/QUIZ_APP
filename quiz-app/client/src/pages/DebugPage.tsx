import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'

interface ApiUser {
    id: string
    email: string
    name: string
    role: string
    createdAt: string
}

export default function DebugPage() {
    const { user, isAuthenticated, isAdmin } = useAuth()
    const [registeredUsers, setRegisteredUsers] = useState<ApiUser[]>([])
    const [_error, setError] = useState('')

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:4006/api/auth/users')
            const data = await response.json()

            if (data.success) {
                setRegisteredUsers(data.users)
            } else {
                setError('Kullanıcılar yüklenemedi')
            }
        } catch (err) {
            setError('Server bağlantı hatası')
            console.error('Fetch users error:', err)
        }
    }
    useEffect(() => {
        if (isAuthenticated) {
            fetchUsers()
        }
    }, [isAuthenticated])

    const clearAllData = () => {
        localStorage.removeItem('user')
        window.location.reload()
    }

    if (!isAuthenticated) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Debug Sayfası</h1>
                <p className="text-red-600">Bu sayfayı görüntülemek için giriş yapmalısınız.</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">🔍 Debug Sayfası</h1>

            {/* Current User Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-3">👤 Mevcut Kullanıcı</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <strong>İsim:</strong> {user?.name || 'N/A'}
                    </div>
                    <div>
                        <strong>Email:</strong> {user?.email || 'N/A'}
                    </div>
                    <div>
                        <strong>Rol:</strong> {user?.role || 'N/A'}
                        {isAdmin && <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded">ADMIN</span>}
                    </div>
                    <div>
                        <strong>ID:</strong> {user?.id || 'N/A'}
                    </div>
                </div>
            </div>

            {/* Registered Users */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-3">📊 Kayıtlı Kullanıcılar ({registeredUsers.length})</h2>

                {registeredUsers.length === 0 ? (
                    <p className="text-gray-600">Henüz kayıtlı kullanıcı bulunmuyor.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">İsim</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Rol</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Kayıt Tarihi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registeredUsers.map((user: any, index: number) => (
                                    <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="border border-gray-300 px-4 py-2 font-mono text-sm">{user.id}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-sm">
                                            {new Date(parseInt(user.id)).toLocaleString('tr-TR')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* LocalStorage Data */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-3">💾 LocalStorage Verileri</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-medium mb-2">Current User:</h3>
                        <pre className="bg-white p-3 rounded border text-sm overflow-auto">
                            {JSON.stringify(user, null, 2)}
                        </pre>
                    </div>
                    <div>
                        <h3 className="font-medium mb-2">Registered Users:</h3>
                        <pre className="bg-white p-3 rounded border text-sm overflow-auto max-h-60">
                            {JSON.stringify(registeredUsers, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Console Commands */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-3">⌨️ Konsol Komutları</h2>
                <p className="text-sm text-gray-600 mb-3">Tarayıcı konsolunda (F12) aşağıdaki komutları çalıştırabilirsiniz:</p>
                <div className="space-y-2 font-mono text-sm">
                    <div className="bg-white p-2 rounded border">
                        <code>JSON.parse(localStorage.getItem('registeredUsers') || '[]')</code>
                        <span className="text-gray-500 ml-2">// Tüm kayıtlı kullanıcıları göster</span>
                    </div>
                    <div className="bg-white p-2 rounded border">
                        <code>JSON.parse(localStorage.getItem('user') || 'null')</code>
                        <span className="text-gray-500 ml-2">// Mevcut kullanıcıyı göster</span>
                    </div>
                    <div className="bg-white p-2 rounded border">
                        <code>localStorage.clear()</code>
                        <span className="text-gray-500 ml-2">// Tüm verileri temizle</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-3 text-red-800">⚠️ Tehlikeli İşlemler</h2>
                <button
                    onClick={clearAllData}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                    Tüm Verileri Temizle
                </button>
                <p className="text-sm text-red-600 mt-2">
                    Bu işlem tüm kayıtlı kullanıcıları ve oturum verilerini silecektir!
                </p>
            </div>
        </div>
    )
}
