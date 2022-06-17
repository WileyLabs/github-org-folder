#!/usr/bin/env node

/**
 * @copyright 2022 John Wiley & Sons, Inc.
 * @license MIT
 **/

const EleventyFetch = require('@11ty/eleventy-fetch');

const { promises: { readdir } } = require('fs');

const argv = require('yargs')
  .scriptName('gh-org-repos')
  .usage('$0 [path] [org]',
         'Match local folder to GitHub repo list.', (yargs) => {
    yargs.positional('path', {
      describe: 'Path to a directory to compare to GitHub',
      type: 'string',
      default: '.'
    });
    yargs.positional('org', {
      describe: 'GitHub orginization or username for repo list.',
      type: 'string'
    })
  })
  .help()
  .version()
  .argv;

(async () => {
  // get the list of folder names
  const directories = await (async () => {
    const dirs = await readdir(argv.path, { withFileTypes: true });
    return dirs.filter((d) => d.isDirectory()).map((d) => d.name).sort();
  })();

  // get the list of repo names
  const repos = await EleventyFetch(
    `https://api.github.com/orgs/${argv.org}/repos?per_page=1000`,
    { directory: '.cache', duration: '1d', type: 'json' }
  ).then((rv) => rv.map((repo) => repo.name).sort());

  // combine the list
  const everything = repos.concat(directories);
  // are in the current directory (assuming no renames...)
  console.log(' L', ' R');
  (new Set(everything.sort())).forEach((name) => {
    console.log(
      (directories.includes(name) ? '✅' : '❌'),
      (repos.includes(name) ? '✅' : '❌'),
      name
    );
  });
})();
