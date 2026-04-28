import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, ClipboardList, Users, Map, BarChart3, Bell, User, Mail, Sparkles,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const allItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, roles: ["admin", "ngo", "volunteer"] },
  { title: "Requests", url: "/requests", icon: ClipboardList, roles: ["admin", "ngo", "volunteer"] },
  { title: "Allocation", url: "/allocation", icon: Sparkles, roles: ["admin", "ngo"] },
  { title: "Volunteers", url: "/volunteers", icon: Users, roles: ["admin", "ngo"] },
  { title: "Map", url: "/map", icon: Map, roles: ["admin", "ngo", "volunteer"] },
  { title: "Analytics", url: "/analytics", icon: BarChart3, roles: ["admin", "ngo"] },
  { title: "Notifications", url: "/notifications", icon: Bell, roles: ["admin", "ngo", "volunteer"] },
] as const;

const accountItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Contact", url: "/contact", icon: Mail },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const { user } = useAuth();
  const role = user?.role ?? "volunteer";

  const items = allItems.filter((i) => (i.roles as readonly string[]).includes(role));
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b p-4">
        <Logo showText={!collapsed} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <NavLink to={item.url} className={cn("flex items-center gap-3 transition-smooth")}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
