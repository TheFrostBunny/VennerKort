"use client"

import * as React from "react"
import Link from 'next/link'
import Image from 'next/image'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { HugeiconsIcon } from "@hugeicons/react"
import { MailSend01Icon, SentIcon, MailReceive01Icon, WorkHistoryIcon, UnfoldMoreIcon, ArrowRight01Icon, Globe02Icon, Settings02Icon, Mail01Icon } from "@hugeicons/core-free-icons"
import { Heart, Settings as SettingsIcon } from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-context'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/appwrite/auth-context';
import { AuthModal } from '@/components/auth/AuthModal';
import { LogOut } from 'lucide-react';

export function SidebarIconExample({ children }: { children?: React.ReactNode }) {
  const { lang, setLang, t } = useI18n()
  const [mounted, setMounted] = React.useState(false)
  const [currentPath, setCurrentPath] = React.useState("")

  React.useEffect(() => {
    setMounted(true)
    setCurrentPath(window.location.pathname)
  }, [])

  const { user, profileImageUrl, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const data = {
    // user: {
    //   name: "shadcn",
    //   email: "m@example.com",
    //   avatar: "/avatars/shadcn.jpg",
    // },
    navMain: [
      {
        title: t('card_app.card'),
        url: "#",
        icon: (
          <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
        ),
        isActive: true,
        items: [
          {
            title: t('nav.send'),
            url: "/send",
            icon: <HugeiconsIcon icon={SentIcon} strokeWidth={2} className="size-4" />,
          },
          {
            title: t('nav.receive'),
            url: "/receive",
            icon: <HugeiconsIcon icon={MailReceive01Icon} strokeWidth={2} className="size-4" />,
          },
          {
            title: t('nav.history'),
            url: "/history",
            icon: <HugeiconsIcon icon={WorkHistoryIcon} strokeWidth={2} className="size-4" />,
          },
        ],
      },
    ],
};


  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-pink-500 overflow-hidden">
                    <Image 
                      src="/logo.png" 
                      alt="HappySend Logo" 
                      width={32}
                      height={32}
                      className="size-8 object-contain"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold underline decoration-pink-500/30">HappySend</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{t('nav.product')}</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <CollapsibleTrigger>
                        {item.icon}
                        <span>{item.title}</span>
                        <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="ml-auto transition-transform duration-100 group-data-open/collapsible:rotate-90" />
                      </CollapsibleTrigger>
                    </SidebarMenuButton>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton 
                              asChild 
                               isActive={mounted && (currentPath === subItem.url || currentPath.startsWith(subItem.url + '/'))}
                            >
                              <Link href={subItem.url} className="flex items-center gap-2">
                                {subItem.icon}
                                {subItem.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={profileImageUrl || undefined} alt={user.name} />
                        <AvatarFallback className="rounded-lg uppercase bg-pink-100 text-pink-600 font-bold">
                          {user.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {user.name}
                        </span>
                        <span className="truncate text-xs">
                          {user.email}
                        </span>
                      </div>
                      <HugeiconsIcon icon={UnfoldMoreIcon} strokeWidth={2} />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>
                        <Item size="xs">
                          <ItemMedia>
                            <Avatar>
                              <AvatarImage src={profileImageUrl || undefined} alt={user.name} />
                              <AvatarFallback className="bg-pink-100 text-pink-600 font-bold">
                                {user.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </ItemMedia>
                          <ItemContent>
                            <ItemTitle>{user.name}</ItemTitle>
                            <ItemDescription> {user.email}</ItemDescription>
                          </ItemContent>
                        </Item>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                     <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center gap-2">
                          <SettingsIcon className="size-4" />
                          {t('customizer.settings')}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/wiki" className="flex items-center gap-2">
                          <HugeiconsIcon icon={Globe02Icon} strokeWidth={2} className="size-4" />
                          {t('nav.Wiki')}
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:text-red-600 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logg ut
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="p-2">
                   <AuthModal>
                     <Button variant="outline" className="w-full justify-start gap-2 border-dashed">
                       <HugeiconsIcon icon={Settings02Icon} className="w-4 h-4" />
                       Logg inn / Registrer
                     </Button>
                   </AuthModal>
                </div>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col overflow-hidden">
          {children || (
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
