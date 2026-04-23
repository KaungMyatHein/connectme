import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { BusinessCard } from "@/components/BusinessCard";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { parseSocial, type CardData } from "@/lib/card-data";
import { isReservedUsername } from "@/lib/auth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const uname = username.toLowerCase();
  if (isReservedUsername(uname)) return {};
  const user = await db.user.findUnique({
    where: { username: uname },
    include: { card: true },
  });
  if (!user || !user.card) return {};

  const fullName = `${user.card.firstName} ${user.card.lastName}`.trim();
  const subtitle = [user.card.title, user.card.organization].filter(Boolean).join(" · ");
  const title = fullName || `@${user.username}`;
  const description = subtitle || user.card.tagline || "Digital business card";
  const ogImageUrl = `/${user.username}/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/${user.username}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function PublicCardPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const uname = username.toLowerCase();
  if (isReservedUsername(uname)) notFound();

  const user = await db.user.findUnique({
    where: { username: uname },
    include: { card: true },
  });
  if (!user || !user.card) notFound();

  const card: CardData = {
    firstName: user.card.firstName,
    lastName: user.card.lastName,
    title: user.card.title,
    organization: user.card.organization,
    tagline: user.card.tagline,
    email: user.card.email,
    phone: user.card.phone,
    website: user.card.website,
    address: user.card.address,
    social: parseSocial(user.card.social),
    qrStyle: user.card.qrStyle,
  };

  return (
    <main className="relative min-h-screen bg-[#080808] flex flex-col items-center justify-center p-6 overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <BusinessCard card={card} />
        <Link
          href="/signup"
          className="text-xs uppercase tracking-[0.3em] text-[#f0e6d3]/50 hover:text-[#c8a96e] transition-colors"
        >
          Create your own card →
        </Link>
      </div>
    </main>
  );
}
