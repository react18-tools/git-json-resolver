const { execSync } = require("child_process");

// Publish canonical packages
["json-merge-resolver", "json-conflict-resolver", "git-conflict-resolver"].forEach(pkg => {
  execSync(`sed -i -e "s/name.*/name\\": \\"${pkg.replace(/\//g, "\\\\/")}\\",/" lib/package.json`);
  execSync("cd lib && npm publish --provenance --access public");
});
