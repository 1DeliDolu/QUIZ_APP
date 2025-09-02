import {
    BookOpen,
    GraduationCap,
    Settings,
    TestTube,
    Users,
    FileText,
    Shield,
    Eye,
    Wrench,
    Video,
    LayoutDashboard
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

const items = [
    {
        title: "Einführung",
        url: "/",
        icon: BookOpen,
    },
    {
        title: "Einführung in diesen Lehrplan",
        url: "/einfuehrung-in-diesen-lehrplan",
        icon: GraduationCap,
    },
    {
        title: "Grundlagen des Testens",
        url: "/grundlagen-des-testens",
        icon: TestTube,
    },
    {
        title: "Softwareentwicklungslebenszyklus",
        url: "/softwareentwicklungslebenszyklus",
        icon: Settings,
    },
    {
        title: "Statischer Test",
        url: "/statischer-test",
        icon: FileText,
    },
    {
        title: "Management der Testaktivitäten",
        url: "/management-der-testaktivitaete",
        icon: Users,
    },
    {
        title: "Risikomanagement",
        url: "/risikomanagement",
        icon: Shield,
    },
    {
        title: "Testüberwachung, Teststeuerung und Testabschluss",
        url: "/testueberwachung-teststeuerung-und-testabschluss",
        icon: Eye,
    },
    {
        title: "Testwerkzeuge",
        url: "/testwerkzeuge",
        icon: Wrench,
    },
    {
        title: "Udemy",
        url: "/udemy",
        icon: Video,
    },
    {
        title: "CMS",
        url: "/cms",
        icon: LayoutDashboard,
    },
]

export function AppSidebar() {
    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <GraduationCap className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">QUIZ</span>
                        <span className="truncate text-xs">Lernplattform</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Kursinhalt</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="p-2 text-xs text-muted-foreground">
                    © 2025 QUIZ App
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
