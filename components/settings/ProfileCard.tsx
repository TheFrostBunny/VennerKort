"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, User } from "lucide-react";
import { ProfileEditModal } from "./ProfileEditModal";
import { useI18n } from "@/lib/i18n/i18n-context";

interface ProfileCardProps {
  name: string;
  email: string;
  profileImageUrl?: string;
}

export function ProfileCard({ name, email, profileImageUrl }: ProfileCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { t } = useI18n();

  return (
    <>
      <section className="p-4 sm:p-5 md:p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Profil</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Endre profilbilde og brukernavn</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <Avatar className="h-28 w-28 sm:h-32 sm:w-32 rounded-full ring-4 ring-zinc-100 dark:ring-zinc-800 transition-all">
              <AvatarImage src={profileImageUrl || undefined} alt={name} />
              <AvatarFallback className="rounded-full uppercase bg-gradient-to-br from-pink-400 to-pink-600 text-white font-bold text-3xl">
                {name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute bottom-0 right-0 h-9 w-9 rounded-full p-0 shadow-lg border-2 border-white dark:border-zinc-900 bg-pink-500 hover:bg-pink-600 text-white transition-all hover:scale-110"
              onClick={() => setIsEditModalOpen(true)}
              aria-label="Endre profil"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center space-y-1">
            <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{name}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{email}</p>
          </div>
        </div>
      </section>

      <ProfileEditModal 
        open={isEditModalOpen} 
        onOpenChange={setIsEditModalOpen}
        t={t}
      />
    </>
  );
}
