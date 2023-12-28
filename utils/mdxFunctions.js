import fs from 'fs';
import path from 'path';

import { bundleMDX } from 'mdx-bundler';

export async function getAllProjectDetails() {
  const projectsDirectory = path.join(process.cwd(), 'content/projects');
  const filenames = fs.readdirSync(projectsDirectory);

  const projectDetails = filenames.map(async (filename) => {
    const filePath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const { frontmatter } = await bundleMDX({ source: fileContents });

    return {
      details: frontmatter,
    };
  });

  return {
    props: {
      projects: await Promise.all(projectDetails),
    },
  };
}
