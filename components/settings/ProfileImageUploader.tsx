"use client";

import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Link as LinkIcon, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { uploadProfileImage } from "@/lib/appwrite/client";
import { useAuth } from "@/lib/appwrite/auth-context";

interface ProfileImageUploaderProps {
  currentImageUrl?: string;
  userName: string;
  onImageChange: (imageUrl: string) => Promise<void>;
  t: (key: string) => string;
}

export function ProfileImageUploader({ currentImageUrl, userName, onImageChange, t }: ProfileImageUploaderProps) {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState(currentImageUrl || "");
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const PROFILE_IMAGES_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_PROFILE_IMAGES_BUCKET_ID || 'profile-images';

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith('image/')) {
      toast.error(t('customizer.profile_image_error_type') || 'Kun bildefiler er tillatt');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('customizer.profile_image_error_size') || 'Bildet er for stort. Maksimal størrelse er 5MB');
      return;
    }

    setUploading(true);
    try {
      const uploadedUrl = await uploadProfileImage(user.$id, file, PROFILE_IMAGES_BUCKET_ID);
      await onImageChange(uploadedUrl);
      setImageUrl(uploadedUrl);
      toast.success(t('customizer.profile_image_success') || 'Profilbilde oppdatert!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(t('customizer.profile_image_error') || 'Kunne ikke oppdatere profilbilde');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlSubmit = async () => {
    if (!imageUrl.trim()) {
      toast.error(t('customizer.profile_image_url_empty') || 'Vennligst skriv inn en URL');
      return;
    }

    try {
      new URL(imageUrl);
    } catch {
      toast.error(t('customizer.profile_image_url_invalid') || 'Ugyldig URL-format');
      return;
    }

    setUploading(true);
    try {
      await onImageChange(imageUrl);
      toast.success(t('customizer.profile_image_success') || 'Profilbilde oppdatert!');
      setIsUrlMode(false);
    } catch (error) {
      toast.error(t('customizer.profile_image_error') || 'Kunne ikke oppdatere profilbilde');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    setUploading(true);
    try {
      await onImageChange("");
      setImageUrl("");
      toast.success(t('customizer.profile_image_removed') || 'Profilbilde fjernet');
    } catch (error) {
      toast.error(t('customizer.profile_image_error') || 'Kunne ikke fjerne profilbilde');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="relative">
        <Avatar className="h-32 w-32 sm:h-40 sm:w-40 rounded-full ring-4 ring-zinc-100 dark:ring-zinc-800">
          <AvatarImage src={imageUrl || currentImageUrl || undefined} alt={userName} />
          <AvatarFallback className="rounded-full uppercase bg-gradient-to-br from-pink-400 to-pink-600 text-white font-bold text-4xl">
            {userName.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        {(imageUrl || currentImageUrl) && (
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-0 right-0 h-8 w-8 rounded-full"
            onClick={handleRemoveImage}
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {isUrlMode ? (
        <div className="w-full space-y-3">
          <div className="space-y-2">
            <Label htmlFor="image-url">{t('customizer.profile_image_url_label') || 'Bilde-URL'}</Label>
            <Input
              id="image-url"
              type="url"
              placeholder={t('customizer.profile_image_url_placeholder') || 'https://eksempel.no/bilde.jpg'}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={uploading}
            />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {t('customizer.profile_image_url_hint') || 'Lim inn en direkte lenke til et bilde på nettet'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleUrlSubmit} disabled={uploading} className="flex-1">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : (t('customizer.profile_image_url_save') || 'Bruk URL')}
            </Button>
            <Button variant="outline" onClick={() => { setIsUrlMode(false); setImageUrl(currentImageUrl || ""); }} disabled={uploading}>
              {t('customizer.cancel') || 'Avbryt'}
            </Button>
          </div>
        </div>
      ) : !(imageUrl || currentImageUrl) ? (
        <div className="w-full space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <Button
            variant="default"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t('customizer.profile_image_uploading') || 'Laster opp...'}
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                {t('customizer.profile_image_upload') || 'Last opp bilde'}
              </>
            )}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-50 dark:bg-zinc-900 px-2 text-zinc-500 dark:text-zinc-400">
                {t('customizer.profile_image_or') || 'eller'}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsUrlMode(true)}
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            {t('customizer.profile_image_url_label') || 'Legg til bilde-URL'}
          </Button>
        </div>
      ) : (
        <div className="w-full">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {t('customizer.profile_image_uploading') || 'Laster opp...'}
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                {t('customizer.profile_image_change') || 'Endre bilde'}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
