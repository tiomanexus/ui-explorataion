import Link from "next/link";
import { flowRegistry } from "@/flows/registry";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-foreground">Prototype flows</h1>
      <p className="mt-2 text-muted-foreground">Pick a flow to preview.</p>

      <ul className="mt-8 flex flex-col gap-3">
        {flowRegistry.map((flow) => (
          <li key={flow.slug}>
            <Link
              href={`/${flow.slug}`}
              className="block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
            >
              <div className="font-medium text-card-foreground">{flow.name}</div>
              <div className="text-sm text-muted-foreground">{flow.description}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
