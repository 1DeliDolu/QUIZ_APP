import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/auth"
import { useState } from "react"

export function AppNavigation() {
    const user = useAuthStore((s) => s.user)
    const logout = useAuthStore((s) => s.logout)
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (category: string) => {
        if (searchQuery.trim()) {
            console.log(`🔍 Searching in ${category}:`, searchQuery)
            // Burada gerçek arama işlemi yapılabilir
        }
    }

    return (
        <Menubar className="border-none bg-transparent p-0 space-x-1">
            <MenubarMenu>
                <MenubarTrigger className="px-4 py-2 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 hover:shadow-md data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-100 data-[state=open]:to-indigo-100 dark:data-[state=open]:from-blue-900/50 dark:data-[state=open]:to-indigo-900/50 data-[state=open]:text-blue-700 dark:data-[state=open]:text-blue-300">
                    📁 Datei
                </MenubarTrigger>
                <MenubarContent className="min-w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-2xl p-3">
                    <div className="p-2 mb-2">
                        <Input
                            placeholder="🔍 Datei durchsuchen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch('Datei')
                                }
                            }}
                            className="h-10 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
                        />
                    </div>
                    <MenubarSeparator className="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                    <MenubarItem asChild className="rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-200">
                        <Link to="/" className="flex items-center gap-2">
                            <span>🆕</span> Neue Registerkarte <MenubarShortcut className="text-blue-600 dark:text-blue-400 font-mono">T</MenubarShortcut>
                        </Link>
                    </MenubarItem>
                    <MenubarItem asChild className="rounded-lg hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/30 dark:hover:to-teal-900/30 transition-all duration-200">
                        <Link to="/cms" className="flex items-center gap-2">
                            <span>⚙️</span> CMS Öffnen
                        </Link>
                    </MenubarItem>
                    <MenubarSeparator className="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                    <MenubarItem className="rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-200">
                        <span>🖨️</span> Drucken <MenubarShortcut className="text-purple-600 dark:text-purple-400 font-mono">P</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger className="px-4 py-2 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 hover:text-green-700 dark:hover:text-green-300 transition-all duration-300 hover:shadow-md data-[state=open]:bg-gradient-to-r data-[state=open]:from-green-100 data-[state=open]:to-emerald-100 dark:data-[state=open]:from-green-900/50 dark:data-[state=open]:to-emerald-900/50 data-[state=open]:text-green-700 dark:data-[state=open]:text-green-300">
                    📚 Kurs
                </MenubarTrigger>
                <MenubarContent className="min-w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-2xl p-3">
                    <div className="p-2 mb-2">
                        <Input
                            placeholder="🔍 Kurs durchsuchen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch('Kurs')
                                }
                            }}
                            className="h-10 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-green-500/30 transition-all duration-200"
                        />
                    </div>
                    <MenubarSeparator className="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                    <MenubarItem asChild className="rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 dark:hover:from-blue-900/30 dark:hover:to-sky-900/30 transition-all duration-200">
                        <Link to="/grundlagen-des-testens" className="flex items-center gap-2">
                            <span>📖</span> Grundlagen des Testens
                        </Link>
                    </MenubarItem>
                    <MenubarItem asChild className="rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/30 dark:hover:to-indigo-900/30 transition-all duration-200">
                        <Link to="/statischer-test" className="flex items-center gap-2">
                            <span>🔍</span> Statischer Test
                        </Link>
                    </MenubarItem>
                    <MenubarItem asChild className="rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 transition-all duration-200">
                        <Link to="/testwerkzeuge" className="flex items-center gap-2">
                            <span>🛠️</span> Testwerkzeuge
                        </Link>
                    </MenubarItem>
                    <MenubarSeparator className="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                    <MenubarItem asChild className="rounded-lg hover:bg-gradient-to-r hover:from-yellow-50 hover:to-amber-50 dark:hover:from-yellow-900/30 dark:hover:to-amber-900/30 transition-all duration-200">
                        <Link to="/udemy" className="flex items-center gap-2">
                            <span>🎓</span> Udemy Kurs
                        </Link>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger className="px-4 py-2 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/30 dark:hover:to-indigo-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-300 hover:shadow-md data-[state=open]:bg-gradient-to-r data-[state=open]:from-purple-100 data-[state=open]:to-indigo-100 dark:data-[state=open]:from-purple-900/50 dark:data-[state=open]:to-indigo-900/50 data-[state=open]:text-purple-700 dark:data-[state=open]:text-purple-300">
                    ⚙️ Verwaltung
                </MenubarTrigger>
                <MenubarContent className="min-w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-2xl p-3">
                    <div className="p-2 mb-2">
                        <Input
                            placeholder="🔍 Verwaltung durchsuchen..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch('Verwaltung')
                                }
                            }}
                            className="h-10 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-purple-500/30 transition-all duration-200"
                        />
                    </div>
                    <MenubarSeparator className="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                    <MenubarItem asChild className="rounded-lg hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/30 dark:hover:to-teal-900/30 transition-all duration-200">
                        <Link to="/management-der-testaktivitaete" className="flex items-center gap-2">
                            <span>📊</span> Management der Testaktivitäten
                        </Link>
                    </MenubarItem>
                    <MenubarItem asChild className="rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 dark:hover:from-red-900/30 dark:hover:to-orange-900/30 transition-all duration-200">
                        <Link to="/risikomanagement" className="flex items-center gap-2">
                            <span>⚠️</span> Risikomanagement
                        </Link>
                    </MenubarItem>
                    <MenubarSeparator className="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                    <MenubarItem asChild className="rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 transition-all duration-200">
                        <Link to="/testueberwachung-teststeuerung-und-testabschluss" className="flex items-center gap-2">
                            <span>📈</span> Testüberwachung & Teststeuerung
                        </Link>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            {user && (
                <MenubarMenu>
                    <MenubarTrigger className="px-4 py-2 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/30 dark:hover:to-teal-900/30 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300 hover:shadow-md data-[state=open]:bg-gradient-to-r data-[state=open]:from-emerald-100 data-[state=open]:to-teal-100 dark:data-[state=open]:from-emerald-900/50 dark:data-[state=open]:to-teal-900/50 data-[state=open]:text-emerald-700 dark:data-[state=open]:text-emerald-300">
                        👤 Benutzer
                    </MenubarTrigger>
                    <MenubarContent className="min-w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-2xl p-3">
                        <div className="p-2 mb-2">
                            <Input
                                placeholder="🔍 Benutzer durchsuchen..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch('Benutzer')
                                    }
                                }}
                                className="h-10 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200"
                            />
                        </div>
                        <MenubarSeparator className="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                        <MenubarItem asChild className="rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-200">
                            <Link to="/profil" className="flex items-center gap-2">
                                <span>👤</span> Profil <MenubarShortcut className="text-blue-600 dark:text-blue-400 font-mono">U</MenubarShortcut>
                            </Link>
                        </MenubarItem>
                        <MenubarSeparator className="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                        <MenubarItem onClick={logout} className="rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/30 dark:hover:to-pink-900/30 transition-all duration-200 text-red-700 dark:text-red-400 cursor-pointer">
                            🚪 Abmelden <MenubarShortcut className="text-red-600 dark:text-red-400 font-mono">Q</MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            )}

            {!user && (
                <MenubarMenu>
                    <MenubarTrigger className="px-4 py-2 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 hover:shadow-md data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-100 data-[state=open]:to-purple-100 dark:data-[state=open]:from-blue-900/50 dark:data-[state=open]:to-purple-900/50 data-[state=open]:text-blue-700 dark:data-[state=open]:text-blue-300">
                        🔐 Anmelden
                    </MenubarTrigger>
                    <MenubarContent className="min-w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl rounded-2xl p-3">
                        <div className="p-2 mb-2">
                            <Input
                                placeholder="🔍 Anmeldung durchsuchen..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch('Anmelden')
                                    }
                                }}
                                className="h-10 rounded-xl border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
                            />
                        </div>
                        <MenubarSeparator className="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
                        <MenubarItem asChild className="rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-200">
                            <Link to="/login" className="flex items-center gap-2">
                                <span>🔐</span> Login
                            </Link>
                        </MenubarItem>
                        <MenubarItem asChild className="rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-200">
                            <Link to="/register" className="flex items-center gap-2">
                                <span>✨</span> Registrieren
                            </Link>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            )}
        </Menubar>
    )
}
