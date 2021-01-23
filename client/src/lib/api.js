import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export function getFileContent(fileName) {
  const filePath = join(process.cwd(), "src/content/", fileName); // /path/to/project/root/src/content/fileName
  const fileContent = fs.readFileSync(filePath);
  const fileData = matter(fileContent);

  return fileData;
}
