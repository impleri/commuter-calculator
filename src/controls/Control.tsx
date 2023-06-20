import { Box } from "grommet";
import type { BoxExtendedProps } from "grommet";
import type { FC } from "react";
import styled from "styled-components";

import { colors } from "../theme";

type ControlProps = BoxExtendedProps & {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
};

export const Control = styled<FC<ControlProps>>(Box)`
  position: absolute;
  ${({ top }) => (top ? `top: ${top};` : "")}
  ${({ bottom }) => (bottom ? `bottom: ${bottom};` : "")}
  ${({ right }) => (right ? `right: ${right};` : "")}
  ${({ left }) => (left ? `left: ${left};` : "")}
  z-index: 1000;
  background-color: ${colors.secondary};
  color: ${colors.brand};
`;
