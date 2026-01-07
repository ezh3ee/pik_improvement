"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
import { BREADCRUMBS_CONFIG } from "./breadcrumbs-config";

export function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index, arr) => {
          const isLast = index === arr.length - 1;
          const url = "/" + arr.slice(0, index + 1).join("/");

          const isClickable = BREADCRUMBS_CONFIG[segment]?.clickableWhen
            ? BREADCRUMBS_CONFIG[segment]?.clickableWhen?.({
                segment,
                index,
                segments: arr,
              })
            : BREADCRUMBS_CONFIG[segment]?.clickable ?? false;

          return (
            <Fragment key={index}>
              <BreadcrumbItem className="hidden md:block">
                {!isLast && isClickable ? (
                  <BreadcrumbLink asChild>
                    <Link href={url}>
                      {BREADCRUMBS_CONFIG[segment]?.label ?? segment}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>
                    {BREADCRUMBS_CONFIG[segment]?.label ?? segment}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
