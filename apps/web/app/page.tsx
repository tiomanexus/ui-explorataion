import Link from "next/link";
import { flowRegistry } from "@/flows/registry";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-foreground">Prototype flows</h1>
      <p className="mt-2 text-muted">Pick a flow to preview.</p>

      <ul className="mt-8 flex flex-col gap-3">
        {flowRegistry.map((flow) => (
          <li key={flow.slug}>
            <Link
              href={`/${flow.slug}`}
              className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:bg-surface-secondary"
            >
              <div className="font-medium text-surface-foreground">{flow.name}</div>
              <div className="text-sm text-muted">{flow.description}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
