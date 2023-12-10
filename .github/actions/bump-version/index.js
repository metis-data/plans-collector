import { getInput, setOutput } from "@actions/core";

async function main() {
  const lastTag = getInput("tag");

  let [component, version] = lastTag.split("@v");
  version = version.split(".").map((i) => Number.parseInt(i));
  version[2]++;

  setOutput("version", `${component}@v${version.join(".")}`);
  setOutput("tag", `${version.join(".")}`);
}

main();
