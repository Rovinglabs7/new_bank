import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const OUT = join(process.cwd(), "public", "ramp-lottie");

const FILES = [
  {
    name: "homepage-card-expenses.lottie",
    url: "https://assets.ramp.com/nextjs/lottie/home/refresh/homepage-card-expenses-mobile-0413.lottie",
  },
  {
    name: "homepage-procure-to-pay.lottie",
    url: "https://assets.ramp.com/nextjs/lottie/home/refresh/homepage-procure-to-pay-0423-mobile.lottie",
  },
  {
    name: "homepage-accounting-automation.lottie",
    url: "https://cdn.air.inc/d121e557-9dbe-427b-bb5b-b7f607d6e5c2",
  },
  {
    name: "home-old-way.lottie",
    url: "https://assets.ramp.com/nextjs/lottie/home/refresh/home_old_way.lottie?v=2",
  },
  {
    name: "home-new-way.lottie",
    url: "https://assets.ramp.com/nextjs/lottie/home/refresh/home_new_way.lottie?v=3",
  },
  {
    name: "finance-policy-agent.lottie",
    url: "https://cdn.air.inc/e754352b-9997-49c5-a5fa-bca8f3d3e646",
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
