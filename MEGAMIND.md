# HyperAgent as a Megamind Execution Body

HyperAgent provides Playwright-based browser execution, natural-language actions, structured extraction, multi-page operation, and MCP-enabled workflows. It remains an external body around the Stealth agents.

## Agent mapping

- **Stealth Shadow:** observation and compression of browser state.
- **Stealth Phantom:** continuity across pages and sessions.
- **Stealth Viper:** precise actions and bounded corrections.
- **Stealth Polaris:** navigation, pathfinding, and goal alignment.

## Static readiness

```bash
node scripts/megamind-healthcheck.mjs
```

The check verifies Node 20+, repository structure, required package scripts, valid `package.json`, and the declared AGPL-3.0 license. It does not install dependencies, read environment secrets, open a browser, or contact a provider.

## Controlled setup

```bash
yarn install --frozen-lockfile
yarn build
node scripts/megamind-healthcheck.mjs
yarn test
```

## Controlled launch surface

```bash
yarn cli --help
```

Use an ephemeral browser profile and an explicit domain allowlist for actual missions. Human approval is required before purchases, account changes, messages, uploads, submissions, destructive actions, or access to private information.

## License boundary

This repository declares **AGPL-3.0**. Megamind should treat HyperAgent as an external process or separately distributed component unless the complete deployment intentionally complies with AGPL obligations. Do not copy HyperAgent implementation code into permissively licensed Megamind core without a deliberate license decision.

## Browser receipt

Each mission should record:

- exact source revision and model route;
- allowed domains and browser-profile scope;
- material actions and confirmations;
- extracted artifact hashes;
- blocked, retried, or failed actions;
- final browser state and exit status.

## Truth boundary

Passing the static check proves that the adapter contract and expected build surface are present. It does not prove Playwright installation, browser compatibility, provider access, anti-bot behavior, or successful execution against any particular website.
