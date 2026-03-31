export type BreadcrumbsConfig = {
  label: string;
  clickable: boolean;
  clickableWhen?: (ctx: {
    segment: string;
    index: number;
    segments: string[];
  }) => boolean;
  onClick?: (
    e: React.MouseEvent,
    ctx: { segment: string; url: string; action: () => void },
  ) => void;
};

export const BREADCRUMBS_CONFIG: Record<string, BreadcrumbsConfig> = {
  projects: {
    label: "Проекты",
    clickable: false,
    clickableWhen: ({ segments }) =>
      segments[0] === "settings" || segments[2] === "objects",
    onClick: (e, { action }) => {
      // preventing default behaviour of the link
      e.preventDefault();
      e.stopPropagation();

      action();
    },
  },
  map: {
    label: "Карта",
    clickable: true,
    clickableWhen: ({ segments }) => segments[2] !== "objects",
  },
  list: {
    label: "Список",
    clickable: true,
  },
  objects: {
    label: "Объекты",
    clickable: false,
  },
};
