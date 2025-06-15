"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../buttons";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shadcn/sidebar";
import { Separator } from "@/components/shadcn/separator";

export function AppSidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  const isCustomer = session?.user?.role === "customer";
  const isEmployee =
    session?.user?.role === "employee" || session?.user?.role === "admin";

  const customerItems = [
    { title: "Home", src: "/home_icon.svg", route: "/" },
    { title: "Cart", src: "/cart_icon_dark.svg", route: "/cart" },
    { title: "Purchases", src: "/purchases_icon.svg", route: "/recent" },
  ];

  const employeeItems = [
    { title: "Users", src: "/users_icon.svg", route: "/users" },
    { title: "Products", src: "/products.svg", route: "/products" },
    { title: "Orders", src: "/orders_icon.svg", route: "/orders" },
  ];

  const menuItems = isCustomer
    ? customerItems
    : isEmployee
    ? employeeItems
    : [];

  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex flex-col items-start gap-4 mt-2 pl-2">
            <h6>
              {isCustomer
                ? "Customer Menu"
                : isEmployee
                ? "Employee Menu"
                : "Application"}
            </h6>
            <h6>Email: {session?.user.email}</h6>
            <h6>Contact Number: {session?.user.contactNumber}</h6>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Separator />
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-none">
                    <button
                      onClick={() => router.push(item.route)}
                      className="flex items-center gap-3 w-full p-2 py-6 cursor-pointer"
                    >
                      <Image
                        src={item.src}
                        alt={`${item.title.toLowerCase()}_icon`}
                        width={35}
                        height={35}
                        className="w-[35px] h-[35px]"
                      />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Separator className="mb-4" />
              <SidebarMenuItem className="px-2">
                <Button
                  onClick={handleSignOut}
                  size="full"
                  interaction="store"
                  className="group"
                >
                  <span className="text-background font-semibold group-hover:text-accent">
                    Sign out
                  </span>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
