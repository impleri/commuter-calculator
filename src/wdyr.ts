/// <reference types="@welldone-software/why-did-you-render" />
import React from "react";

import { ENABLE_WDYR_DEBUG } from "./config.ts";

if (ENABLE_WDYR_DEBUG) {
  const { default: wdyr } = await import(
    "@welldone-software/why-did-you-render"
  );

  wdyr(React, {
    include: [/.*/],
    exclude: [/^BrowserRouter/, /^Link/, /^Route/],
    trackHooks: true,
    trackAllPureComponents: false,
  });
}
