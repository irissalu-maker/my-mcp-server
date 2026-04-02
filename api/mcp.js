import { createMcpHandler } from '@vercel/mcp-adapter';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Client } from '@notionhq/client';
import { Octokit } from '@octokit/rest';
import { z } from 'zod';

const server = new McpServer({
  name: 'my-mcp-server',
  version: '1.0.0'
});

// -------------------------
// Notion Tools
// -------------------------

server.tool(
  'notion_read_database',
  'Query all pages from a Notion database',
  {
    database_id: z.string().optional().describe('Notion database ID (uses NOTION_DATABASE_ID env var if omitted)')
  },
  async ({ database_id }) => {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const dbId = database_id || process.env.NOTION_DATABASE_ID;
    if (!dbId) throw new Error('No database_id provided and NOTION_DATABASE_ID is not set');
    const response = await notion.databases.query({ database_id: dbId });
    return { content: [{ type: 'text', text: JSON.stringify(response, null, 2) }] };
  }
);

server.tool(
  'notion_create_page',
  'Create a new page in a Notion database',
  {
    title: z.string().describe('Title of the new page'),
    content: z.string().optional().describe('Body text for the page'),
    database_id: z.string().optional().describe('Target database ID (uses NOTION_DATABASE_ID env var if omitted)')
  },
  async ({ title, content, database_id }) => {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const dbId = database_id || process.env.NOTION_DATABASE_ID;
    if (!dbId) throw new Error('No database_id provided and NOTION_DATABASE_ID is not set');
    const response = await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        title: { title: [{ text: { content: title } }] }
      },
      children: content ? [{
        object: 'block',
        type: 'paragraph',
        paragraph: { rich_text: [{ type: 'text', text: { content } }] }
      }] : []
    });
    return { content: [{ type: 'text', text: JSON.stringify(response, null, 2) }] };
  }
);

server.tool(
  'notion_update_page',
  'Update the title of an existing Notion page',
  {
    page_id: z.string().describe('The ID of the page to update'),
    title: z.string().describe('New title for the page')
  },
  async ({ page_id, title }) => {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const response = await notion.pages.update({
      page_id,
      properties: {
        title: { title: [{ text: { content: title } }] }
      }
    });
    return { content: [{ type: 'text', text: JSON.stringify(response, null, 2) }] };
  }
);

// -------------------------
// GitHub Tools
// -------------------------

server.tool(
  'github_get_user',
  'Get the authenticated GitHub user profile',
  {},
  async () => {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const { data } = await octokit.users.getAuthenticated();
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  }
);

server.tool(
  'github_list_repos',
  'List repositories for the authenticated GitHub user',
  {
    per_page: z.number().optional().describe('Number of repos to return (max 100, default 30)')
  },
  async ({ per_page }) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const { data } = await octokit.repos.listForAuthenticatedUser({
      per_page: per_page || 30,
      sort: 'updated'
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  }
);

server.tool(
  'github_get_repo',
  'Get details about a specific GitHub repository',
  {
    owner: z.string().describe('Repository owner username or org'),
    repo: z.string().describe('Repository name')
  },
  async ({ owner, repo }) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const { data } = await octokit.repos.get({ owner, repo });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  }
);

server.tool(
  'github_list_issues',
  'List open issues for a GitHub repository',
  {
    owner: z.string().describe('Repository owner username or org'),
    repo: z.string().describe('Repository name'),
    state: z.enum(['open', 'closed', 'all']).optional().describe('Issue state filter (default: open)')
  },
  async ({ owner, repo, state }) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const { data } = await octokit.issues.listForRepo({
      owner,
      repo,
      state: state || 'open'
    });
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  }
);

export default createMcpHandler(server);
