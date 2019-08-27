import { execSync } from "child_process";

export function gitStatusPorcelain(): string {
  return execSync("git status --porcelain")
    .toString()
    .trim();
}
