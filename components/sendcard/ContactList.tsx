import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/appwrite/auth-context";

interface Contact {
  $id: string;
  name: string;
  address: string;
}

interface ContactListProps {
  onSelect: (contact: Contact) => void;
}

export const ContactList: React.FC<ContactListProps> = ({ onSelect }) => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/contacts?userId=${user.$id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setContacts(data.contacts);
        else setError(data.error || "Kunne ikke hente kontakter");
      })
      .catch(() => setError("Kunne ikke hente kontakter"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleSave = async () => {
    if (!user || !name || !address) return;
    setLoading(true);
    setError(null);
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.$id, name, address }),
    });
    const data = await res.json();
    if (data.success) {
      setContacts((prev) => [...prev, data.contact]);
      setName("");
      setAddress("");
    } else {
      setError(data.error || "Kunne ikke lagre kontakt");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-sm mb-2">Favorittkontakter</h3>
        {loading && <div>Laster...</div>}
        {error && <div className="text-red-500 text-xs">{error}</div>}
        <ul className="space-y-1">
          {contacts.map((c) => (
            <li key={c.$id}>
              <Button
                variant="outline"
                className="w-full flex justify-between"
                onClick={() => onSelect(c)}
              >
                <span>{c.name}</span>
                <span className="text-xs text-zinc-400">{c.address}</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
        <h4 className="font-semibold text-xs mb-1">Legg til ny kontakt</h4>
        <Input
          placeholder="Navn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Adresse (e-post eller fysisk)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleSave} disabled={loading || !name || !address}>
          Lagre kontakt
        </Button>
      </div>
    </div>
  );
};
