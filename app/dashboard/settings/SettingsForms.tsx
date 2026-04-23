"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SettingsForms({ currentEmail }: { currentEmail: string }) {
  return (
    <div className="space-y-6">
      <EmailForm currentEmail={currentEmail} />
      <PasswordForm />
      <DeleteForm />
    </div>
  );
}

function EmailForm({ currentEmail }: { currentEmail: string }) {
  const [email, setEmail] = useState(currentEmail);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const res = await fetch("/api/account/email", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (res.ok) {
      setMsg({ type: "ok", text: "Email updated" });
      setPassword("");
    } else setMsg({ type: "err", text: data.error || "Failed" });
  }

  return (
    <Section title="Change email">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="New email" type="email" value={email} onChange={setEmail} />
        <Field label="Current password" type="password" value={password} onChange={setPassword} />
        <ActionRow loading={loading} label="Update email" msg={msg} />
      </form>
    </Section>
  );
}

function PasswordForm() {
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirm) {
      setMsg({ type: "err", text: "Passwords do not match" });
      return;
    }
    setLoading(true);
    setMsg(null);
    const res = await fetch("/api/account/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (res.ok) {
      setMsg({ type: "ok", text: "Password updated" });
      setCurrent(""); setNew(""); setConfirm("");
    } else setMsg({ type: "err", text: data.error || "Failed" });
  }

  return (
    <Section title="Change password">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Current password" type="password" value={currentPassword} onChange={setCurrent} />
        <Field label="New password" type="password" value={newPassword} onChange={setNew} />
        <Field label="Confirm new password" type="password" value={confirm} onChange={setConfirm} />
        <ActionRow loading={loading} label="Update password" msg={msg} />
      </form>
    </Section>
  );
}

function DeleteForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!confirm) {
      setMsg({ type: "err", text: "Please confirm" });
      return;
    }
    setLoading(true);
    setMsg(null);
    const res = await fetch("/api/account", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else setMsg({ type: "err", text: data.error || "Failed" });
  }

  return (
    <Section title="Delete account" danger>
      <p className="text-sm text-[#f0e6d3]/60 mb-4">
        This will permanently delete your card and cannot be undone.
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Password" type="password" value={password} onChange={setPassword} />
        <label className="flex items-center gap-2 text-sm text-[#f0e6d3]/70">
          <input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} />
          I understand this is permanent
        </label>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl font-semibold bg-[#e8734a] text-white hover:bg-[#e8734a]/90 transition-colors disabled:opacity-60"
          >
            {loading ? "Deleting…" : "Delete account"}
          </button>
          {msg ? (
            <span className={`text-sm ${msg.type === "ok" ? "text-[#c8a96e]" : "text-[#e8734a]"}`}>{msg.text}</span>
          ) : null}
        </div>
      </form>
    </Section>
  );
}

function Section({ title, children, danger }: { title: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className={`text-xs uppercase tracking-[0.2em] mb-4 ${danger ? "text-[#e8734a]" : "text-[#c8a96e]"}`}>{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, type = "text", value, onChange }: { label: string; type?: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-[#f0e6d3]/50">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[#f0e6d3]/5 border border-[#f0e6d3]/15 text-[#f0e6d3] outline-none focus:border-[#c8a96e] transition-colors"
      />
    </label>
  );
}

function ActionRow({ loading, label, msg }: { loading: boolean; label: string; msg: { type: "ok" | "err"; text: string } | null }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2.5 rounded-xl font-semibold bg-[#f0e6d3] text-[#181614] hover:bg-[#c8a96e] transition-colors disabled:opacity-60"
      >
        {loading ? "Saving…" : label}
      </button>
      {msg ? (
        <span className={`text-sm ${msg.type === "ok" ? "text-[#c8a96e]" : "text-[#e8734a]"}`}>{msg.text}</span>
      ) : null}
    </div>
  );
}
