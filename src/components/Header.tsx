"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "ホーム" },
  { href: "/compare", label: "エアコンを比較" }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded border border-blue-200 bg-blue-50 text-2xl text-blue-700">
            AC
          </span>
          <span>
            <span className="block text-2xl font-bold tracking-normal text-slate-950">
              エアコンまとめ買い比較
            </span>
            <span className="block text-sm font-medium text-slate-500">
              3台まとめて、最適な組み合わせを見つける
            </span>
          </span>
        </Link>
        <nav className="flex gap-8 text-base font-bold">
          {tabs.map((tab) => {
            const isActive =
              tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`border-b-4 px-1 pb-3 ${
                  isActive
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-slate-900 hover:text-blue-700"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
