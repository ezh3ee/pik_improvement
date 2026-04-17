"use client";

import { BREADCRUMBS_CONFIG } from "@/components/breadcrumbs/breadcrumbs-config";
import {
  Step as ComplexStep,
  useComplexStore,
} from "@/components/map/state/complex-store";
import { useGeoreferenceStore } from "@/components/map/state/georeference-store";
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

export function Breadcrumbs() {
  const currentObjectStep = useComplexStore((state) => state.step);
  const setComplexStep = useComplexStore((state) => state.setStep);
  const isGeorefVisible = useGeoreferenceStore((state) => state.isVisible);
  const toggleGeoRefVisibility = useGeoreferenceStore(
    (state) => state.toggleVisible,
  );

  let segments = useSelectedLayoutSegments();
  segments = [...segments];

  if (currentObjectStep !== ComplexStep.None && !segments.includes("objects")) {
    segments.push("objects");
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index, arr) => {
          const isLast = index === arr.length - 1;
          const url = "/" + arr.slice(0, index + 1).join("/");

          const handleCustomClick = (e: React.MouseEvent) => {
            if (BREADCRUMBS_CONFIG[segment]?.onClick) {
              BREADCRUMBS_CONFIG[segment]?.onClick(e, {
                segment,
                url,
                action: () => {
                  setComplexStep(ComplexStep.None);
                  if (isGeorefVisible) toggleGeoRefVisibility();
                },
              });
            }
          };

          const isClickable = BREADCRUMBS_CONFIG[segment]?.clickableWhen
            ? BREADCRUMBS_CONFIG[segment]?.clickableWhen?.({
                segment,
                index,
                segments: arr,
              })
            : (BREADCRUMBS_CONFIG[segment]?.clickable ?? false);

          return (
            <Fragment key={index}>
              <BreadcrumbItem className="hidden md:block">
                {!isLast && isClickable ? (
                  <BreadcrumbLink asChild onClickCapture={handleCustomClick}>
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
