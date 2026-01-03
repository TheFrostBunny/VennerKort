"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/lib/appwrite/auth-context';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const authSchema = z.object({
  email: z.string().email({ message: "Ugyldig e-postadresse" }),
  password: z.string().min(8, { message: "Passordet må være minst 8 tegn" }),
  name: z.string().optional(),
});

type AuthFormValues = z.infer<typeof authSchema>;

export function AuthModal({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { login, register, loading } = useAuth();
  
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    }
  });

  const onSubmit = async (data: AuthFormValues) => {
    try {
      if (activeTab === 'login') {
        await login(data.email, data.password);
        toast.success("Velkommen tilbake!", { description: "Du er nå logget inn." });
      } else {
        await register(data.email, data.password, data.name || 'Ukjent');
        toast.success("Konto opprettet!", { description: "Velkommen til HappySend!" });
      }
      setIsOpen(false);
    } catch (error: any) {
        console.error(error);
      toast.error("Feil oppstod", { 
        description: error.message || "Kunne ikke logge inn. Sjekk at e-post og passord er riktig."
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="outline">Logg inn</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold tracking-tight">
            {activeTab === 'login' ? 'Logg inn' : 'Opprett konto'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === 'login' 
              ? 'Få tilgang til dine lagrede kort og delinger.' 
              : 'Start din reise med HappySend i dag.'}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Logg inn</TabsTrigger>
            <TabsTrigger value="register">Registrer</TabsTrigger>
          </TabsList>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
            {activeTab === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">Navn</Label>
                <Input id="name" {...form.register('name')} placeholder="Ola Nordmann" />
                {form.formState.errors.name && <span className="text-xs text-red-500">{form.formState.errors.name.message}</span>}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">E-post</Label>
              <Input id="email" type="email" {...form.register('email')} placeholder="ola@eksempel.no" />
              {form.formState.errors.email && <span className="text-xs text-red-500">{form.formState.errors.email.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Passord</Label>
              <Input id="password" type="password" {...form.register('password')} />
              {form.formState.errors.password && <span className="text-xs text-red-500">{form.formState.errors.password.message}</span>}
            </div>

            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={form.formState.isSubmitting || loading}>
              {form.formState.isSubmitting || loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {activeTab === 'login' ? 'Logg inn' : 'Registrer'}
            </Button>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
