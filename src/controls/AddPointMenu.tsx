import { Menu } from "grommet";
import { Add } from "grommet-icons";

import type { MenuOption } from "./types.ts";

type AddPointMenuProps = {
  items: MenuOption[];
};

export function AddPointMenu({ items }: AddPointMenuProps) {
  return (
    <Menu
      icon={<Add />}
      items={items}
      label="Add"
      disabled={items.length === 0}
      dropAlign={{ top: "bottom", right: "right" }}
    />
  );
}
