import { Link } from "react-router-dom"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"

export function TopNavbar() {
    const { isAdmin, isAuthenticated, user, logout } = useAuth()
    const sidebar = useSidebar()

    const handleToggle = () => {
        console.log("Sidebar toggle clicked!")
        console.log("Current state:", sidebar?.state)
        console.log("Current open:", sidebar?.open)
        sidebar?.toggleSidebar()
    }

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background z-50">
            {/* Sidebar trigger */}
            <SidebarTrigger className="-ml-1" onClick={handleToggle} />

            {/* Brand name */}
            <div className="flex items-center gap-2 px-2">
                <Link to="/" className="text-lg font-bold">
                    QUIZ App
                </Link>
            </div>            {/* Spacer */}
            <div className="flex-1" />

            {/* Navigation and user actions */}
            <div className="flex items-center gap-4">
                {/* Navigation links */}
                <nav className="flex items-center gap-4">
                    <Link to="/" className="text-sm font-medium hover:text-primary">
                        Home
                    </Link>
                    {isAdmin && (
                        <Link to="/cms" className="text-sm font-medium hover:text-primary">
                            CMS
                        </Link>
                    )}
                    {isAuthenticated && (
                        <Link to="/debug" className="text-sm font-medium hover:text-primary">
                            Debug
                        </Link>
                    )}
                </nav>

                {/* Search */}
                <div className="flex items-center gap-2">
                    <Input
                        type="search"
                        placeholder="Suche..."
                        className="w-64"
                    />
                    <Button variant="outline" size="sm">
                        Suche
                    </Button>
                </div>

                {/* Auth section */}
                <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                        <>
                            <span className="text-sm text-muted-foreground">
                                Merhaba, {user?.name}
                            </span>
                            <Button
                                onClick={logout}
                                variant="outline"
                                size="sm"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="outline" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button size="sm">
                                    Register
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
