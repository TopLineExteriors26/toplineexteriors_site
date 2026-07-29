import Link from "next/link";
import { Container } from "@/components/ui/Container";

export type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-paper">
      <Container className="pb-0 pt-4">
        <ol className="m-0 flex flex-wrap list-none items-center gap-1.5 p-0 font-body text-[13px] font-medium text-muted">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {isLast || !item.href ? (
                  <span
                    className={isLast ? "text-text" : undefined}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="text-muted no-underline">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
