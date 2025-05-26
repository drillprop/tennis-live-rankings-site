import Link from "next/link";
import { Button } from "@/components/shadcn/button";

export function Header() {
	return (
		<header className="flex border-b border-border bg-zinc-50 px-5 py-3">
			<nav className="mx-auto flex w-full max-w-screen-lg flex-row items-center gap-12">
				<h1 className="text-2xl font-bold text-zinc-900">
					<Link className="hover:underline" href="/">
						Live Tennis Rankings
					</Link>
				</h1>
				<div className="flex flex-row items-center gap-4">
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
