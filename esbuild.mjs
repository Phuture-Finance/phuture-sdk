import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BUILD_CONFIGS = [
  {
    name: "esm",
    format: "esm",
    platform: "neutral",
    target: ["esnext"],
    entryPoints: ["src/index.ts"],
  },
  {
    name: "cjs",
    format: "cjs",
    platform: "node",
    target: ["node14"],
    entryPoints: ["src/index.ts"],
  },
];

const commonOptions = {
  bundle: true,
  sourcemap: true,
  minify: process.env.NODE_ENV === "production",
  logLevel: "info",
  metafile: true,
};

async function buildAll() {
  const builds = BUILD_CONFIGS.map((config) => build(config));
  const results = await Promise.all(builds);

  if (process.env.NODE_ENV === "production") {
    Promise.all(
      results.map(async (r) => {
        const analysis = esbuild.analyzeMetafile(r.metafile);
        console.info(analysis);
      })
    );
  }
}

async function build({ name, ...config }) {
  const outfile = resolve(__dirname, `dist/${name}.js`);
  console.log(`Building ${name}`);

  const buildOptions = {
    ...commonOptions,
    ...config,
    outfile,
    plugins: [nodeExternalsPlugin()],
  };

  if (process.argv.includes("--watch")) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
    console.log(`Watching ${name}`);
  } else {
    return esbuild.build(buildOptions);
  }
}

async function main() {
  try {
    await buildAll();
    console.log("Build completed successfully");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

main();
