import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
    id: string
    email: string
    role: 'admin' | 'user'
    name: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isAdmin: boolean
    login: (email: string, password: string) => Promise<boolean>
    register: (email: string, password: string, name: string) => Promise<boolean>
    logout: () => void
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini al
    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:4006/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (data.success && data.user) {
                setUser(data.user)
                localStorage.setItem('user', JSON.stringify(data.user))
                return true
            }
            return false
        } catch (error) {
            console.error('Login error:', error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const register = async (email: string, password: string, name: string): Promise<boolean> => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:4006/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name })
            })

            const data = await response.json()

            if (data.success && data.user) {
                setUser(data.user)
                localStorage.setItem('user', JSON.stringify(data.user))
                return true
            }
            return false
        } catch (error) {
            console.error('Register error:', error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
