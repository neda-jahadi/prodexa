import { Breadcrumb } from "@chakra-ui/react";
import { Link as RouterLink, useMatches } from "react-router-dom";

type Crumb = { to?: string; label: string };

type CrumbHandle = {
  crumb?: (match: any) => Crumb | null;
};

export default function Breadcrumbs() {
  const matches = useMatches();
  console.log("Matches are:", matches);

  const crumbs = matches
    .map((match) => {
      const handle = match.handle as CrumbHandle | undefined;
      return handle?.crumb ? handle.crumb(match) : null;
    })
    .filter(Boolean) as Crumb[];

  if (crumbs.length === 0) return null;
  console.log("crumbs are:", crumbs);

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <Breadcrumb.Item key={index}>
              {crumb.to && !isLast ? (
                <Breadcrumb.Link asChild>
                  <RouterLink to={crumb.to}>{crumb.label}</RouterLink>
                </Breadcrumb.Link>
              ) : (
                <Breadcrumb.CurrentLink>{crumb.label}</Breadcrumb.CurrentLink>
              )}

              {!isLast && <Breadcrumb.Separator />}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
