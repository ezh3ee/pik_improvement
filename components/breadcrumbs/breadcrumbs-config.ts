export type BreadcrumbsConfig = {
  label: string;
  clickable: boolean;
  clickableWhen?: (ctx: {
    segment: string;
    index: number;
    segments: string[];
  }) => boolean;
};

export const BREADCRUMBS_CONFIG: Record<string, BreadcrumbsConfig> = {
  projects: {
    label: "Проекты",
    clickable: false,
    clickableWhen: ({ segments }) => segments[0] === "settings",
  },
  map: {
    label: "Карта",
    clickable: true,
  },
  list: {
    label: "Список",
    clickable: true,
  },
};
