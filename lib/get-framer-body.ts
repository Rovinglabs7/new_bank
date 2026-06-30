import { readFileSync } from "fs";
import { join } from "path";

export function getFramerBodyHtml(): string {
  try {
    return readFileSync(join(process.cwd(), "public", "framer-body.html"), "utf-8");
  } catch {
    return "";
  }
}
