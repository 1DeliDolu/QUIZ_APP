import { ReactNode } from 'react'
import { TopNavbar } from "@/components/TopNavbar"

interface AppLayoutProps {
    children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-background sticky top-0 z-50">
                <TopNavbar />
            </header>
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    )
}
