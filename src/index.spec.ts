import gitNoUncommitted from "./index";
import { gitStatusPorcelain } from "./git";
import { codechecks } from "@codechecks/client";

jest.mock("./git");
jest.mock("@codechecks/client", () => ({ codechecks: { report: jest.fn() } }));

afterEach(() => {
  jest.clearAllMocks();
});

describe("gitNoUncommitted", () => {
  it("reports success when there's no uncommitted files", async () => {
    (gitStatusPorcelain as jest.Mock).mockReturnValue("");

    await gitNoUncommitted();

    expect(codechecks.report).toHaveBeenCalledWith({
      longDescription: `
| Change | Path |
| :----: | :--: |


Change format docs: https://git-scm.com/docs/git-status#_short_format
`,
      name: "Git No Uncommitted",
      shortDescription: "Result: 0 files changed",
      status: "success",
    });
  });

  it("reports failure when some files are uncommitted", () => {
    (gitStatusPorcelain as jest.Mock).mockReturnValue(`D package-lock.json
M package.json
M src/index.ts
?? src/utils.ts
?? yarn.lock`);

    gitNoUncommitted();

    expect(codechecks.report).toHaveBeenCalledWith({
      longDescription: `
| Change | Path |
| :----: | :--: |
| D | package-lock.json |
| M | package.json |
| M | src/index.ts |
| ?? | src/utils.ts |
| ?? | yarn.lock |

Change format docs: https://git-scm.com/docs/git-status#_short_format
`,
      name: "Git No Uncommitted",
      shortDescription: "Result: 5 file changed",
      status: "failure",
    });
  });
});
