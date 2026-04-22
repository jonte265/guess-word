"use client";

import useWordStore from "@/app/store/store";
import { ModeToggle } from "../ModeToggle";
import Link from "next/link";

export default function HeaderNav() {
  const wordStore = useWordStore();

  return (
    <header className="flex flex-row flex-wrap justify-between items-center p-4 max-w-2xl mx-auto">
      <Link href="/">
        <h2 className="font-bold">Ordle</h2>
      </Link>
      <p>
        Win streak: <strong>{wordStore.winStreak} 🏆</strong>
      </p>
      <ModeToggle />
    </header>
  );
}
