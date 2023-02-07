module.exports = {
  branches: ["main"],
  plugins: [
    // 1. check if the commit should trigger a release
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          {
            // release on all commits
            message: "*",
            release: "patch",
          },
        ],
      },
    ],
    // 2. generate release notes based on the commits
    "@semantic-release/release-notes-generator",
    // 3. update the changelog file with the release notes
    "@semantic-release/changelog",
    // 4. update the package.json with the new version
    [
      "@semantic-release/npm",
      {
        // we will publish manually in the next step
        npmPublish: false,
      },
    ],
    // 5. publish the package to npm
    [
      "@semantic-release/exec",
      {
        publishCmd: "cd ./dist && npm publish --access public",
      },
    ],
    // 6. commit the changes to the repository
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
      },
    ],
    // 7. create a GitHub release
    "@semantic-release/github",
  ],
};
