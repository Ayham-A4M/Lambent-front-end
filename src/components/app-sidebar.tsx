import * as React from "react"
import { NavLink } from "react-router-dom"
import Logo from "./ui/logo"
import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import useUser from "@/hooks/useUser"
import { urls } from "@/helper/urls"

// This is sample data.
const data = {
  // versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "hello world",
      url: "/hello-world"
    },
    {
      title: "home",
      url: "/"
    },
    {
      title: "weclome",
      url: "/welcome"
    }

  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const USER=useUser();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b-2">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-0">
          {
            USER &&
            urls[USER?.role]?.map((item) => (

              <SidebarMenuItem key={item.title} className="h-auto" >
                <SidebarMenuButton className="rounded-none p-0 h-auto border-b-2">
                  <NavLink to={item.url}
                    className={(({ isActive }) => (`${isActive ? "bg-popover dark:bg-accent " : ""}   text-[1.1rem] text-popover-foreground  flex items-center justify-between py-3.5 px-5 w-full font-light`))}>
                    {item.title}
                    <div className={`w-fit p-2 rounded-[.5rem] bg-slate-200 dark:bg-slate-700`}>
                      {
                      <item.icon className={`${item.icon_talwind_color}`}/>
                    }
                    </div>
                  </NavLink>

                </SidebarMenuButton>
              </SidebarMenuItem>
            ))
          }
        </SidebarMenu>

        {/* We create a SidebarGroup for each parent. */}
        {/* {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))} */}



      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
