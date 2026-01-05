"use client";

import React, { useState, useRef } from 'react';
import { Settings as SettingsIcon, Globe, Check, Heart, Info, Rocket, User, Upload, X, Loader2, Link as LinkIcon, Pencil } from 'lucide-react';
import { SidebarIconExample } from '@/components/sidebar';
import { useI18n } from '@/lib/i18n/i18n-context';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/appwrite/auth-context';
import { uploadProfileImage } from '@/lib/appwrite/client';
import { STORAGE_BUCKET_PROFILE_IMAGES } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { lang, setLang, t } = useI18n();
  const { user, profileImageUrl, updateProfileImage } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [savingUrl, setSavingUrl] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <SidebarIconExample>
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex-1 flex flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto w-full transition-colors bg-white dark:bg-zinc-950 overflow-y-auto scrollbar-hide">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-zinc-400" />
              {t('customizer.settings')}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('customizer.settings_desc')}</p>
          </div>

          <div className="grid gap-6">
            {user && (
              <section className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{t('customizer.profile_image_title')}</h2>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('customizer.profile_image_desc')}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <Avatar className="h-24 w-24 rounded-full">
                      <AvatarImage src={profileImageUrl || undefined} alt={user.name} />
                      <AvatarFallback className="rounded-full uppercase bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 font-bold text-2xl">
                        {user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0 shadow-lg border-2 border-white dark:border-zinc-900 bg-pink-500 hover:bg-pink-600 text-white"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">{t('customizer.profile_image_edit')}</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>{t('customizer.profile_image_edit_title')}</DialogTitle>
                          <DialogDescription>
                            {t('customizer.profile_image_edit_desc')}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                          {/* Preview */}
                          <div className="flex justify-center">
                            <Avatar className="h-32 w-32 rounded-full">
                              <AvatarImage src={profileImageUrl || undefined} alt={user.name} />
                              <AvatarFallback className="rounded-full uppercase bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 font-bold text-3xl">
                                {user.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          </div>

                          {/* Upload File Section */}
                          <div className="space-y-2">
                            <Label>{t('customizer.profile_image_upload_file')}</Label>
                            <div className="flex gap-2">
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                aria-label={t('customizer.profile_image_upload')}
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;

                                  // Validate file size (max 5MB)
                                  if (file.size > 5 * 1024 * 1024) {
                                    toast.error(t('customizer.profile_image_error_size'));
                                    return;
                                  }

                                  // Validate file type
                                  if (!file.type.startsWith('image/')) {
                                    toast.error(t('customizer.profile_image_error_type'));
                                    return;
                                  }

                                  setUploading(true);
                                  try {
                                    const uploadedUrl = await uploadProfileImage(user.$id, file, STORAGE_BUCKET_PROFILE_IMAGES);
                                    await updateProfileImage(uploadedUrl);
                                    toast.success(t('customizer.profile_image_success'));
                                    setIsEditDialogOpen(false);
                                  } catch (error: any) {
                                    console.error("Failed to upload profile image", error);
                                    toast.error(t('customizer.profile_image_error'), {
                                      description: error.message || t('customizer.profile_image_error_desc')
                                    });
                                  } finally {
                                    setUploading(false);
                                    if (fileInputRef.current) {
                                      fileInputRef.current.value = '';
                                    }
                                  }
                                }}
                              />
                              <Button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                variant="outline"
                                className="gap-2 flex-1"
                              >
                                {uploading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {t('customizer.profile_image_uploading')}
                                  </>
                                ) : (
                                  <>
                                    <Upload className="w-4 h-4" />
                                    {t('customizer.profile_image_upload')}
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                              <span className="bg-white dark:bg-zinc-950 px-2 text-zinc-500 dark:text-zinc-400">
                                {t('customizer.profile_image_or')}
                              </span>
                            </div>
                          </div>

                          {/* URL Section */}
                          <div className="space-y-2">
                            <Label htmlFor="image-url">{t('customizer.profile_image_url_label')}</Label>
                            <div className="flex gap-2">
                              <Input
                                id="image-url"
                                type="url"
                                placeholder={t('customizer.profile_image_url_placeholder')}
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                disabled={savingUrl}
                                className="flex-1"
                              />
                              <Button
                                onClick={async () => {
                                  if (!imageUrl.trim()) {
                                    toast.error(t('customizer.profile_image_url_empty'));
                                    return;
                                  }

                                  // Validate URL format
                                  try {
                                    new URL(imageUrl);
                                  } catch {
                                    toast.error(t('customizer.profile_image_url_invalid'));
                                    return;
                                  }

                                  // Validate that it's an image URL (basic check)
                                  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
                                  const isImageUrl = imageExtensions.some(ext => 
                                    imageUrl.toLowerCase().includes(ext)
                                  ) || imageUrl.includes('image') || imageUrl.includes('img');

                                  if (!isImageUrl) {
                                    toast.error(t('customizer.profile_image_url_not_image'));
                                    return;
                                  }

                                  setSavingUrl(true);
                                  try {
                                    await updateProfileImage(imageUrl.trim());
                                    setImageUrl('');
                                    toast.success(t('customizer.profile_image_success'));
                                    setIsEditDialogOpen(false);
                                  } catch (error: any) {
                                    console.error("Failed to save profile image URL", error);
                                    toast.error(t('customizer.profile_image_error'), {
                                      description: error.message || t('customizer.profile_image_error_desc')
                                    });
                                  } finally {
                                    setSavingUrl(false);
                                  }
                                }}
                                disabled={savingUrl || !imageUrl.trim()}
                                variant="outline"
                                className="gap-2"
                              >
                                {savingUrl ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {t('customizer.profile_image_saving')}
                                  </>
                                ) : (
                                  <>
                                    <LinkIcon className="w-4 h-4" />
                                    {t('customizer.profile_image_url_save')}
                                  </>
                                )}
                              </Button>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              {t('customizer.profile_image_url_hint')}
                            </p>
                          </div>

                          {/* Remove Button */}
                          {profileImageUrl && (
                            <Button
                              onClick={async () => {
                                try {
                                  await updateProfileImage('');
                                  setImageUrl('');
                                  toast.success(t('customizer.profile_image_removed'));
                                  setIsEditDialogOpen(false);
                                } catch (error: any) {
                                  console.error("Failed to remove profile image", error);
                                  toast.error(t('customizer.profile_image_error'));
                                }
                              }}
                              variant="outline"
                              className="gap-2 text-red-500 hover:text-red-600 hover:border-red-500 w-full"
                            >
                              <X className="w-4 h-4" />
                              {t('customizer.profile_image_remove')}
                            </Button>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
                  </div>
                </div>
              </section>
            )}

            <section className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{t('customizer.language_select')}</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('customizer.language_desc')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setLang('nb')}
                  className={cn(
                    "group flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                    lang === 'nb' 
                      ? "bg-white dark:bg-zinc-800 border-pink-500 shadow-sm" 
                      : "bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🇳🇴</span>
                    <div>
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">Norsk (Bokmål)</div>
                      <div className="text-xs text-zinc-500">Standard språk</div>
                    </div>
                  </div>
                  {lang === 'nb' && <Check className="w-5 h-5 text-pink-500" />}
                </button>

                <button
                  onClick={() => setLang('en')}
                  className={cn(
                    "group flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                    lang === 'en' 
                      ? "bg-white dark:bg-zinc-800 border-pink-500 shadow-sm" 
                      : "bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">🇺🇸</span>
                    <div>
                      <div className="font-bold text-zinc-900 dark:text-zinc-100">English</div>
                      <div className="text-xs text-zinc-500">International language</div>
                    </div>
                  </div>
                  {lang === 'en' && <Check className="w-5 h-5 text-pink-500" />}
                </button>
              </div>
            </section>
            
            <section className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{t('customizer.about_title')}</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('about.subtitle')}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t('about.description')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-pink-500">
                      <Rocket className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">{t('about.mission_title')}</span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {t('about.mission_desc')}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-blue-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">{t('about.creator_title')}</span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {t('about.creator_desc')}
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-[10px] text-zinc-400 font-medium">
                  <div className="flex flex-col gap-0.5">
                    <span>© {new Date().getFullYear()} HappySend</span>
                    <button 
                      onClick={() => window.location.href = '/changelog'}
                      className="text-pink-500 hover:text-pink-600 font-bold flex items-center gap-1 transition-colors"
                    >
                      <Rocket className="w-3 h-3" />
                      {t('customizer.view_changes')}
                    </button>
                  </div>
                  <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full uppercase tracking-widest">{t('about.version')}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </SidebarIconExample>
  );
}
