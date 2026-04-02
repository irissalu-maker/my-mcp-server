export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    status: 'ok',
    message: 'MCP Server is running',
    mcp_endpoint: '/api/mcp',
    notion: process.env.NOTION_API_KEY ? 'configured' : 'missing',
    github: process.env.GITHUB_TOKEN ? 'configured' : 'missing'
  });
}
