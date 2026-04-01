//  this file means ki hume kab call krna hh env ko , as means hume sirf ek baar hi call krna hh env  ko

import dotenv from "dotenv";

let loaded = false;

export function loadEnv(): void {
  if (loaded) return;
  dotenv.config();
  loaded = true;
}
loadEnv();

