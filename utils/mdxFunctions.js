import fs from 'fs';
import path from 'path';

import { bundleMDX } from 'mdx-bundler';

import SortCards, { MonthToAbbreviation } from '@lib/cardSorter';

/**
 * Returns the FrontMatter for the projects. If n is specified, returns the n most recent projects.
 * @param {*} n Number of projects to return.
 * @returns
 */
export async function getProjectDetails(n) {
  const projectsDirectory = path.join(process.cwd(), 'content/projects');
  const filenames = fs.readdirSync(projectsDirectory);

  const projectDetails = filenames.map(async (filename) => {
    const filePath = path.join(projectsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const { frontmatter } = await bundleMDX({ source: fileContents });

    frontmatter['dates'] = formatDateStr(frontmatter.start, frontmatter.end);

    return {
      details: frontmatter,
    };
  });

  const unsortedProjects = await Promise.all(projectDetails);
  const sortedProjects = SortCards(unsortedProjects);

  return {
    props: {
      projects: n === undefined ? sortedProjects : sortedProjects.slice(0, n),
    },
  };
}

/**
 * Takes in start and end dates (format: "<month> <year>") and formats it into a presentable date range.
 * @param {*} start
 * @param {*} end
 */
const formatDateStr = (start, end) => {
  const startMonth = MonthToAbbreviation[start.split(' ')[0]];
  const startYear = start.split(' ')[1];
  const endMonth = MonthToAbbreviation[end.split(' ')[0]];
  const endYear = end.split(' ')[1];

  var dateString = '';
  if (start === end) {
    // project was completed within a month (start month is same as end month)
    dateString = `${startMonth} ${startYear}`;
  } else if (end == '') {
    // project hasn't been completed
    dateString = `${startMonth} ${startYear} - Present`;
  } else {
    // project was completed in different months
    dateString = `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  }

  return dateString;
};
