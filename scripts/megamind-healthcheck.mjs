import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const requiredPaths = [
  "README.md",
  "package.json",
  "tsconfig.json",
  "src",
  ".megamind/execution-body.yml",
];

const missingPaths = requiredPaths.filter(
  (relative) => !fs.existsSync(path.join(root, relative)),
);

let packageJson = null;
let packageError = null;
try {
  packageJson = JSON.parse(
    fs.readFileSync(path.join(root, "package.json"), "utf8"),
  );
} catch (error) {
  packageError = String(error);
}

const requiredScripts = ["build", "test", "lint", "cli"];
const availableScripts = packageJson?.scripts ?? {};
const missingScripts = requiredScripts.filter((name) => !availableScripts[name]);
const declaredLicense = packageJson?.license ?? null;
const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
const nodeOk = Number.isInteger(nodeMajor) && nodeMajor >= 20;
const structurallyReady =
  nodeOk &&
  missingPaths.length === 0 &&
  missingScripts.length === 0 &&
  packageError === null &&
  declaredLicense === "AGPL-3.0";

const report = {
  body_id: "hyperagent",
  check_type: "static_zero_secret",
  node: process.versions.node,
  node_ok: nodeOk,
  missing_paths: missingPaths,
  missing_package_scripts: missingScripts,
  package_error: packageError,
  declared_license: declaredLicense,
  structurally_ready: structurallyReady,
  runtime_tested: false,
  next_commands: [
    "yarn install --frozen-lockfile",
    "yarn build",
    "yarn test",
    "yarn cli --help",
  ],
  truth_note:
    "This check does not install packages, read environment secrets, open a browser, contact a provider, or execute a web mission.",
};

console.log(JSON.stringify(report, null, 2));
process.exit(structurallyReady ? 0 : 1);
