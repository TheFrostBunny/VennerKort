import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil } from "lucide-react";

interface UsernameEditProps {
  username: string;
  onSave: (newUsername: string) => Promise<void>;
  label?: string;
  saveLabel?: string;
  cancelLabel?: string;
  editLabel?: string;
}

export function UsernameEdit({
  username,
  onSave,
  label = "Brukernavn",
  saveLabel = "Lagre",
  cancelLabel = "Avbryt",
  editLabel = "Endre",
}: UsernameEditProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(username);
  const [saving, setSaving] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-2 mt-4">
      <label htmlFor="username-input" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      {!editing ? (
        <div className="flex items-center gap-2">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{username}</span>
          <Button size="icon" variant="ghost" onClick={() => { setEditing(true); setValue(username); }}>
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="flex w-full gap-2">
          <Input
            id="username-input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            className="flex-1"
            disabled={saving}
          />
          <Button
            onClick={async () => {
              if (!value.trim() || value === username) return;
              setSaving(true);
              await onSave(value.trim());
              setSaving(false);
              setEditing(false);
            }}
            disabled={saving || !value.trim() || value === username}
            variant="outline"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saveLabel}
          </Button>
          <Button
            onClick={() => { setEditing(false); setValue(username); }}
            variant="ghost"
            type="button"
          >
            {cancelLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
