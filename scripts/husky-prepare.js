const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// The docs build runs `npm ci --only=production`, which omits devDependencies.
// Husky is a devDependency, so skip when its binary was not installed.
const bin = path.join(__dirname, "..", "node_modules", "husky", "bin.js");

if (fs.existsSync(bin)) {
  execFileSync(process.execPath, [bin], { stdio: "inherit" });
}
