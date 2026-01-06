import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface ProfileCardProps {
  name: string;
  email: string;
  profileImageUrl?: string;
  onEditProfileImage?: () => void;
  children?: React.ReactNode; // For username edit etc.
}

export function ProfileCard({ name, email, profileImageUrl, onEditProfileImage, children }: ProfileCardProps) {
  return (
    <section className="p-3 sm:p-4 md:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400">
            <Avatar className="h-6 w-6">
              <AvatarImage src={profileImageUrl || undefined} alt={name} />
              <AvatarFallback className="rounded-full uppercase bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 font-bold text-base">
                {name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Profil</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Endre profilbilde og brukernavn</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <Avatar className="h-24 w-24 rounded-full">
            <AvatarImage src={profileImageUrl || undefined} alt={name} />
            <AvatarFallback className="rounded-full uppercase bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 font-bold text-2xl">
              {name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          {onEditProfileImage && (
            <Button
              size="sm"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0 shadow-lg border-2 border-white dark:border-zinc-900 bg-pink-500 hover:bg-pink-600 text-white"
              onClick={onEditProfileImage}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Endre profilbilde</span>
            </Button>
          )}
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{name}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{email}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
