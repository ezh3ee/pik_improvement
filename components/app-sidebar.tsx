"use client";

import * as React from "react";

import { PIKLogo } from "@/components//logo";
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
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = {
  navMain: [
    {
      title: "Проекты",
      url: "#",
      items: [
        {
          title: "Карта",
          url: "/projects/map",
          isActive: false,
        },
        {
          title: "Список",
          url: "/projects/list",
          isActive: false,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname: string = usePathname();

  navigation.navMain[0].items.map((el) =>
    el.url === pathname ? (el.isActive = true) : (el.isActive = false)
  );

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <PIKLogo />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {navigation.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

// return (
//   <Sidebar variant="inset" {...props}>
//     <SidebarHeader>
//       <SidebarMenu>
//         <SidebarMenuItem>
//           <PIKLogo />
//         </SidebarMenuItem>
//       </SidebarMenu>
//     </SidebarHeader>
//     <SidebarContent>
//       <NavMain items={data.navMain} />
//     </SidebarContent>
//     <SidebarFooter>
//       <NavUser />
//     </SidebarFooter>
//   </Sidebar>
// );
// }
