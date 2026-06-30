import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const OUT = join(process.cwd(), "public", "ramp-files");

const FILES = [
  {
    name: "integration-globe-sprite.webp",
    url: "https://ramp.com/_next/static/media/integration-globe-sprite.0kn.a9g_ec2b7.webp",
  },
];

mkdirSync(OUT, { recursive: true });

for (const file of FILES) {
  const dest = join(OUT, file.name);
  if (existsSync(dest)) {
    console.log(`skip ${file.name} (exists)`);
    continue;
  }
  const res = await fetch(file.url, { redirect: "follow" });
  if (!res.ok) {
    console.error(`FAIL ${file.name}: ${res.status}`);
    process.exitCode = 1;
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
  console.log(`wrote ${file.name} (${buf.length} bytes)`);
}

console.log("Done.");
