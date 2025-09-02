import { Link } from "react-router-dom"
import { AppNavigation } from "./AppNavigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { Search, Settings, Bell } from "lucide-react"
import { useState } from "react"

export function TopNavbar() {
    const { isAdmin, isAuthenticated, user, logout } = useAuth()
    const [isSearchFocused, setIsSearchFocused] = useState(false)

    return (
        <div className="flex h-16 items-center justify-between px-6 bg-gradient-to-r from-slate-50/95 to-blue-50/95 dark:from-slate-900/95 dark:to-blue-900/95 backdrop-blur-xl supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-slate-50/60 supports-[backdrop-filter]:to-blue-50/60 dark:supports-[backdrop-filter]:from-slate-900/60 dark:supports-[backdrop-filter]:to-blue-900/60 border-b border-gradient-to-r from-blue-200/50 to-purple-200/50 shadow-sm">
            {/* Left Section - Brand + Navigation */}
            <div className="flex items-center gap-6">
                {/* Ultra Modern Brand with Animated Effects */}
                <Link
                    to="/"
                    className="group flex items-center gap-3 text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300"
                >
                    <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-lg font-black shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
                        Q
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                    </div>
                    <span className="relative">
                        QUIZ App
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </span>
                </Link>

                {/* Navigation */}
                <AppNavigation />
            </div>

            {/* Right Section - Search + User Actions */}
            <div className="flex items-center gap-4">
                {/* Ultra Modern Search with Glassmorphism */}
                <div className={`relative transition-all duration-500 ease-out ${isSearchFocused ? 'w-96' : 'w-72'}`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur transition-all duration-500 ${isSearchFocused ? 'scale-110 opacity-100' : 'scale-100 opacity-0'}`}></div>
                    <div className="relative">
                        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-all duration-300 ${isSearchFocused ? 'text-blue-600 scale-110' : 'text-muted-foreground'}`} />
                        <Input
                            type="search"
                            placeholder=" Überall suchen..."
                            className={`pl-12 pr-6 h-12 rounded-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg hover:shadow-xl focus:shadow-2xl focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 text-base font-medium ${isSearchFocused ? 'ring-2 ring-blue-500/30 scale-105' : 'ring-1 ring-slate-200/50 dark:ring-slate-700/50'}`}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                        <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-medium px-2 py-1 rounded-md bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 transition-all duration-300 ${isSearchFocused ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}`}>
                            
                        </div>
                    </div>
                </div>

                {/* Premium Admin Panel Link */}
                {isAuthenticated && isAdmin && (
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="group h-11 px-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/40 dark:hover:to-teal-900/40 border border-emerald-200/50 dark:border-emerald-700/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                        <Link to="/cms" className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-emerald-600 group-hover:rotate-45 transition-transform duration-300" />
                            <span className="font-semibold text-emerald-700 dark:text-emerald-300">Admin Panel</span>
                        </Link>
                    </Button>
                )}

                {/* Futuristic Notifications */}
                {isAuthenticated && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="relative h-11 w-11 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/40 dark:hover:to-red-900/40 border border-orange-200/50 dark:border-orange-700/50 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                    >
                        <Bell className="h-4 w-4 text-orange-600 group-hover:animate-pulse" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full text-xs flex items-center justify-center text-white font-bold animate-pulse shadow-lg">
                            3
                        </span>
                        <div className="absolute -inset-1 bg-gradient-to-br from-orange-400/30 to-red-400/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                )}

                {/* Ultra Premium User Section */}
                {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                        <div className="group flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 hover:from-slate-100 hover:to-blue-100 dark:hover:from-slate-700 dark:hover:to-blue-800 border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white text-lg font-black shadow-lg group-hover:shadow-xl transition-all duration-300">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                        Hallo, {user?.name || 'User'} 👋
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <div className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-emerald-500' : 'bg-blue-500'} animate-pulse`}></div>
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                            {isAdmin ? '🔐 Admin' : '👤 Benutzer'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={logout}
                            variant="outline"
                            size="sm"
                            className="h-11 px-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/40 dark:hover:to-pink-900/40 border border-red-200/50 dark:border-red-700/50 text-red-700 dark:text-red-300 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            🚪 Logout
                        </Button>
                    </div>
                ) : (
                    // No login buttons here - handled by AppNavigation menu
                    <div className="flex items-center gap-3">
                        {/* Login is now handled by the navigation menu only */}
                    </div>
                )}
            </div>
        </div>
    )
}