import Link from "next/link";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="flex px-5 py-3 border-b border-border bg-zinc-50">
      <nav className="flex flex-row gap-12 items-center w-full">
        <h1 className="text-2xl text-zinc-900 font-bold">
          <Link className="hover:underline" href="/">
            Live Tennis Rankings
          </Link>
        </h1>
        <div className="flex flex-row gap-4 items-center">
          <Button asChild variant="link">
            <Link href="/wta-live-ranking">WTA</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/wta-live-ranking">ATP</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
