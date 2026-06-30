/**
 * Dev server wrapper — disables Next.js segment explorer devtools that can
 * corrupt the React Client Manifest on Windows (segment-explorer-node 500s).
 */
import { spawn } from "child_process";
import { join } from "path";

process.env.NEXT_DISABLE_DEVTOOLS ??= "1";

const nextBin = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

const child = spawn(process.execPath, [nextBin, "dev"], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
