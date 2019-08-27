import { codechecks, CodeChecksReport } from "@codechecks/client";
import { pluralize } from "./utils";
import { gitStatusPorcelain } from "./git";

const STATUS_LINE_REGEXP = /^([^ ]{1,2}) (.*)/;

async function gitNoUncommitted(): Promise<void> {
  const output = gitStatusPorcelain();
  const lines = output.split("\n").map(str => str.trim()).filter(Boolean);

  const files = lines.map(line => {
    const match = line.match(STATUS_LINE_REGEXP);
    if (!match) throw new Error(`Didn't match line ${line}`);
    const [, change, path] = match;
    return { change, path };
  });

  const longDescription = `
| Change | Path |
| :----: | :--: |
${files.map(file => `| ${file.change} | ${file.path} |`).join("\n")}

Change format docs: https://git-scm.com/docs/git-status#_short_format
`;

  const report: CodeChecksReport = {
    longDescription,
    shortDescription: `Result: ${pluralize(files.length, ["files", "file", "files"])} changed`,
    name: "Git No Uncommitted",
    status: files.length > 0 ? "failure" : "success",
  };

  codechecks.report(report);
}

export default gitNoUncommitted;
