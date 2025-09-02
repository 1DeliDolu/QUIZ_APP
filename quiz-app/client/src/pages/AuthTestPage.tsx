import { useAuth } from '../contexts/AuthContext'

export default function AuthTestPage() {
    const { user, isAuthenticated, isAdmin, loading } = useAuth()

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Auth Test Sayfası</h1>

            <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                <div><strong>Loading:</strong> {loading ? 'true' : 'false'}</div>
                <div><strong>Is Authenticated:</strong> {isAuthenticated ? 'true' : 'false'}</div>
                <div><strong>Is Admin:</strong> {isAdmin ? 'true' : 'false'}</div>
                <div><strong>User:</strong></div>
                <pre className="bg-white p-2 rounded text-xs overflow-auto">
                    {user ? JSON.stringify(user, null, 2) : 'null'}
                </pre>
            </div>

            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">localStorage kontrol:</h2>
                <pre className="bg-white p-2 rounded text-xs overflow-auto">
                    {localStorage.getItem('user') || 'empty'}
                </pre>
            </div>

            <div className="mt-4 space-x-2">
                <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded inline-block">Login</a>
                <a href="/cms" className="bg-green-500 text-white px-4 py-2 rounded inline-block">CMS</a>
            </div>
        </div>
    )
}
