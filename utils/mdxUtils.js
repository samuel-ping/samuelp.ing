import fs from 'fs';
import path from 'path';

import { bundleMDX } from 'mdx-bundler';

import { DateSorter, FormatDateStr } from '@lib/dateUtils';

/**
 * Returns the FrontMatter for the projects. If n is specified, returns the n most recent projects.
 * @param {*} n Number of projects to return
 * @returns
 */
export async function getProjectDetails(n) {
  const projectsDirectory = path.join(process.cwd(), 'content/projects');
  const filenames = fs.readdirSync(projectsDirectory);

  const projectDetails = filenames.map(async (filename) => {
    const filePath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const { frontmatter } = await bundleMDX({ source: fileContents });

    frontmatter['dates'] = FormatDateStr(frontmatter.start, frontmatter.end);

    return {
      details: frontmatter,
    };
  });

  const unsortedProjects = await Promise.all(projectDetails);
  const sortedProjects = unsortedProjects.sort(DateSorter);

  return {
    props: {
      projects: n === undefined ? sortedProjects : sortedProjects.slice(0, n),
    },
  };
}
