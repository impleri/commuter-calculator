import type { ThemeType } from "grommet";

export const LAYERS: Readonly<Record<string, number>> = {
  map: 1,
  points: 10,
  lines: 25,
  cards: 20,
};

export const colors = {
  brand: "#9E6F21",
  accent: "#FFEEB3",
  primary: "#B8E7E1",
  secondary: "#D4FAFC",
};

export const theme: ThemeType = {
  global: {
    font: {
      family: "Lora",
    },
    drop: {
      zIndex: LAYERS.cards,
    },
    colors: {
      ...colors,
      white: "#fefefe",
      text: "brand",
    },
  },
  button: {
    border: {
      radius: "5px",
    },
    default: {
      background: {
        color: "secondary",
      },
      padding: {
        horizontal: "1rem",
        vertical: "1rem",
      },
    },
  },
  card: {
    header: {
      background: "accent",
      pad: "small",
    },
    body: {
      background: "secondary",
      pad: "small",
    },
    footer: {
      background: "secondary",
      gap: "none",
      pad: "small",
    },
  },
  menu: {
    background: "secondary",
  },
};
