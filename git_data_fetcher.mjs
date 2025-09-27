import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const openSource = {
  githubConvertedToken: process.env.GITHUB_TOKEN,
  githubUserName: process.env.GITHUB_USERNAME,
};

// Validate environment variables
if (!openSource.githubConvertedToken || !openSource.githubUserName) {
  console.error("Error: GITHUB_TOKEN or GITHUB_USERNAME environment variables are not set");
  process.exit(1);
}

// GraphQL queries with parameterized login to avoid injection
const queries = {
  pr: {
    query: `
      query($userName: String!) {
        user(login: $userName) {
          pullRequests(last: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
            totalCount
            nodes {
              id
              title
              url
              state
              mergedBy {
                avatarUrl
                url
                login
              }
              createdAt
              number
              changedFiles
              additions
              deletions
              baseRepository {
                name
                url
                owner {
                  avatarUrl
                  login
                  url
                }
              }
            }
          }
        }
      }
    `,
    variables: { userName: openSource.githubUserName }
  },
  issue: {
    query: `
      query($userName: String!) {
        user(login: $userName) {
          issues(last: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
            totalCount
            nodes {
              id
              closed
              title
              createdAt
              url
              number
              assignees(first: 100) {
                nodes {
                  avatarUrl
                  name
                  url
                }
              }
              repository {
                name
                url
                owner {
                  login
                  avatarUrl
                  url
                }
              }
            }
          }
        }
      }
    `,
    variables: { userName: openSource.githubUserName }
  },
  org: {
    query: `
      query($userName: String!) {
        user(login: $userName) {
          repositoriesContributedTo(last: 100) {
            totalCount
            nodes {
              owner {
                login
                avatarUrl
                __typename
              }
            }
          }
        }
      }
    `,
    variables: { userName: openSource.githubUserName }
  },
  pinned_projects: {
    query: `
      query($userName: String!) {
        user(login: $userName) {
          pinnedItems(first: 6, types: REPOSITORY) {
            totalCount
            nodes {
              ... on Repository {
                id
                name
                createdAt
                url
                description
                isFork
                languages(first: 10) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { userName: openSource.githubUserName }
  }
};

const languages_icons = {
  Python: "logos-python",
  "Jupyter Notebook": "logos-jupyter",
  HTML: "logos-html-5",
  CSS: "logos-css-3",
  JavaScript: "logos-javascript",
  "C#": "logos-c-sharp",
  Java: "logos-java",
  Shell: "simple-icons:shell",
  Ruby: "logos:ruby",
  PHP: "logos-php",
  Dockerfile: "simple-icons:docker",
  Rust: "logos-rust",
};

const baseUrl = "https://api.github.com/graphql";
const headers = {
  "Content-Type": "application/json",
  Authorization: `bearer ${openSource.githubConvertedToken}`,
};

// Utility function to make API requests
async function fetchGitHubData(queryName, queryData) {
  try {
    console.log(`Fetching ${queryName} data...`);

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(queryData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const data = JSON.parse(text);

    // Check for GraphQL errors
    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ${queryName}:`, error.message);
    throw error;
  }
}

// Process PR data
async function processPRData() {
  try {
    const data = await fetchGitHubData("Pull Request", queries.pr);
    const prNodes = data.data.user.pullRequests.nodes;

    const cropped = {
      data: prNodes,
      open: prNodes.filter(pr => pr.state === "OPEN").length,
      closed: prNodes.filter(pr => pr.state === "CLOSED").length,
      merged: prNodes.filter(pr => pr.state === "MERGED").length,
      totalCount: prNodes.length
    };

    await fs.promises.writeFile(
      "./src/shared/opensource/pull_requests.json",
      JSON.stringify(cropped, null, 2)
    );
    console.log("✓ Pull Request data saved successfully\n");
  } catch (error) {
    console.error("Failed to process PR data:", error.message);
  }
}

// Process Issue data
async function processIssueData() {
  try {
    const data = await fetchGitHubData("Issue", queries.issue);
    const issueNodes = data.data.user.issues.nodes;

    const cropped = {
      data: issueNodes,
      open: issueNodes.filter(issue => !issue.closed).length,
      closed: issueNodes.filter(issue => issue.closed).length,
      totalCount: issueNodes.length
    };

    await fs.promises.writeFile(
      "./src/shared/opensource/issues.json",
      JSON.stringify(cropped, null, 2)
    );
    console.log("✓ Issues data saved successfully\n");
  } catch (error) {
    console.error("Failed to process Issue data:", error.message);
  }
}

// Process Organization data
async function processOrgData() {
  try {
    const data = await fetchGitHubData("Organization", queries.org);
    const orgs = data.data.user.repositoriesContributedTo.nodes;

    const newOrgs = {
      data: orgs
        .filter(org => org && org.owner && org.owner.__typename === "Organization")
        .map(org => org.owner)
    };

    await fs.promises.writeFile(
      "./src/shared/opensource/organizations.json",
      JSON.stringify(newOrgs, null, 2)
    );
    console.log("✓ Organization data saved successfully\n");
  } catch (error) {
    console.error("Failed to process Organization data:", error.message);
  }
}

// Process Pinned Projects data
async function processPinnedProjectsData() {
  try {
    const data = await fetchGitHubData("Pinned Projects", queries.pinned_projects);
    const projects = data.data.user.pinnedItems.nodes;

    const newProjects = {
      data: projects.map(project => ({
        ...project,
        languages: project.languages.nodes
          .filter(lang => lang.name in languages_icons)
          .map(lang => ({
            name: lang.name,
            iconifyClass: languages_icons[lang.name]
          }))
      }))
    };

    await fs.promises.writeFile(
      "./src/shared/opensource/projects.json",
      JSON.stringify(newProjects, null, 2)
    );
    console.log("✓ Pinned Projects data saved successfully\n");
  } catch (error) {
    console.error("Failed to process Pinned Projects data:", error.message);
  }
}

// Main execution function
async function main() {
  try {
    console.log("Starting GitHub data fetch...\n");

    // Run all requests in parallel for better performance
    await Promise.allSettled([
      processPRData(),
      processIssueData(),
      processOrgData(),
      processPinnedProjectsData()
    ]);

    console.log("All data fetch operations completed!");
  } catch (error) {
    console.error("Unexpected error in main:", error);
  }
}

// Execute the main function
main();
