import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { BusinessCard } from "@/components/BusinessCard";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { parseSocial, type CardData } from "@/lib/card-data";
import { isReservedUsername } from "@/lib/auth";

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
      <div className="relative z-10">
        <BusinessCard card={card} />
      </div>
    </main>
  );
}
