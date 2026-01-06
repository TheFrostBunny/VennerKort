"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProfileImageUploader } from "./ProfileImageUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/appwrite/auth-context";

interface ProfileEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: (key: string) => string;
}

export function ProfileEditModal({ open, onOpenChange, t }: ProfileEditModalProps) {
  const { user, profileImageUrl, updateProfileImage, updateUsername } = useAuth();
  const [username, setUsername] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;

    const hasUsernameChanged = username.trim() !== user.name && username.trim() !== '';
    
    if (!hasUsernameChanged) {
      onOpenChange(false);
      return;
    }

    setSaving(true);
    try {
      if (hasUsernameChanged) {
        await updateUsername(username.trim());
      }
      toast.success(t('customizer.profile_updated') || 'Profil oppdatert!');
      onOpenChange(false);
    } catch (error) {
      toast.error(t('customizer.profile_update_error') || 'Kunne ikke oppdatere profil');
    } finally {
      setSaving(false);
    }
  };

  // Reset username when modal opens
  React.useEffect(() => {
    if (open && user) {
      setUsername(user.name || '');
    }
  }, [open, user]);

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('customizer.edit_profile') || 'Rediger Profil'}</DialogTitle>
          <DialogDescription>
            {t('customizer.edit_profile_desc') || 'Oppdater ditt brukernavn og profilbilde'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Image */}
          <ProfileImageUploader
            currentImageUrl={profileImageUrl ?? undefined}
            userName={user.name || ''}
            onImageChange={updateProfileImage}
            t={t}
          />

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">{t('customizer.username_label') || 'Brukernavn'}</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('customizer.username_label') || 'Brukernavn'}
              disabled={saving}
            />
          </div>

          {/* Email (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email">{t('customizer.current_email') || 'E-post'}</Label>
            <Input
              id="email"
              type="email"
              value={user.email || ''}
              disabled
              className="bg-zinc-100 dark:bg-zinc-800 cursor-not-allowed"
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {t('customizer.email_readonly_note') || 'E-post kan ikke endres for øyeblikket'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="flex-1"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t('customizer.profile_image_saving') || 'Lagrer...'}
                </>
              ) : (
                t('customizer.save_changes') || 'Lagre endringer'
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              {t('customizer.cancel') || 'Avbryt'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
