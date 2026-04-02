# my-mcp-server

![MCP Server](https://img.shields.io/badge/MCP-Server-blue)  
![License](https://img.shields.io/badge/License-MIT-green)

An advanced Model Context Protocol (MCP) server designed to streamline cross-functional platform capabilities for agentic AI systems. This server enables seamless integration across multi-agent platforms including Notion, Claude, OpenAI, Vercel, and other AI-powered clients, providing unified access to diverse tools and resources.

## 🎯 Overview

**my-mcp-server** is a flexible MCP server that acts as a central hub for agentic AI applications. It abstracts the complexity of managing multiple platform integrations and provides a unified interface for AI agents to access cross-functional capabilities—from data retrieval and processing to task execution and workflow orchestration.

### Key Use Cases
- **Multi-Agent Orchestration**: Coordinate multiple AI agents across different platforms
- **Cross-Platform Integration**: Unify capabilities from Notion, Claude, OpenAI, Vercel, and more
- **Workflow Automation**: Streamline complex business processes with agentic AI
- **Data Aggregation**: Centralize data access from diverse sources
- **Tool Management**: Provide a standardized interface for tool discovery and execution

## ✨ Features

- **Protocol Compliance**: Full Model Context Protocol (MCP) implementation
- **Multi-Platform Support**: Native integration with major AI platforms and services
- **Extensible Architecture**: Plugin-based system for easy capability expansion
- **Resource Management**: Efficient handling of resources and context
- **Error Handling**: Robust error handling and recovery mechanisms
- **Logging & Monitoring**: Comprehensive logging for debugging and monitoring
- **Type Safety**: Full TypeScript support with type definitions

## 📋 Requirements

- Node.js 18.x or higher
- npm or yarn package manager
- Basic understanding of MCP protocol
- Platform credentials (for integrated services)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/irissalu-maker/my-mcp-server.git
cd my-mcp-server
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your platform credentials:
```env
# Claude Configuration
CLAUDE_API_KEY=your_claude_api_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Notion Configuration
NOTION_TOKEN=your_notion_token
NOTION_DATABASE_IDS=db_id_1,db_id_2

# Vercel Configuration
VERCEL_TOKEN=your_vercel_token
VERCEL_TEAM_ID=your_team_id

# Server Configuration
MCP_SERVER_PORT=3000
MCP_SERVER_HOST=localhost
LOG_LEVEL=info
```

### 4. Build the Project
```bash
npm run build
# or
yarn build
```

### 5. Start the Server
```bash
npm start
# or
yarn start
```

The server will start on `http://localhost:3000` by default.

## 💡 Usage

### Basic Example

```typescript
import { MCPServer } from './server';

const server = new MCPServer({
  name: 'my-mcp-server',
  version: '1.0.0',
  capabilities: ['notion', 'openai', 'vercel']
});

// Register resources
server.registerResource('notion_documents', {
  fetch: async () => {
    // Implementation to fetch Notion documents
  }
});

// Start the server
server.start().then(() => {
  console.log('MCP Server is running');
});
```

### Connecting from Claude
```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "node",
      "args": ["/path/to/my-mcp-server/dist/index.js"],
      "env": {
        "CLAUDE_API_KEY": "your_api_key"
      }
    }
  }
}
```

### Available Resources

#### Notion
- **notion_databases**: List all connected Notion databases
- **notion_pages**: Query pages from Notion
- **notion_create_page**: Create new pages in Notion

#### OpenAI
- **openai_models**: List available models
- **openai_completions**: Generate text completions
- **openai_embeddings**: Generate embeddings

#### Vercel
- **vercel_projects**: List all Vercel projects
- **vercel_deployments**: Fetch deployment history
- **vercel_logs**: Access deployment logs

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│     AI Client (Claude, OpenAI, etc)     │
└─────────────────┬───────────────────────┘
                  │ MCP Protocol
┌─────────────────▼───────────────────────┐
│          MCP Server Core                │
│  (Request Routing & Protocol Handling)  │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┼─────────┐
        │         │         │
┌───────▼──┐ ┌───▼────┐ ┌──▼───────┐
│  Notion  │ │ OpenAI │ │  Vercel  │
│ Adapter  │ │Adapter │ │ Adapter  │
└──────────┘ └────────┘ └──────────┘
        │         │         │
┌───────▼─────────▼─────────▼──────┐
│   External APIs & Services       │
└────────────────────────────────────┘
```

## 🔧 Development

### Project Structure
```
my-mcp-server/
├── src/
│   ├── server.ts          # Main MCP server
│   ├── adapters/          # Platform adapters
│   │   ├── notion.ts
│   │   ├── openai.ts
│   │   └── vercel.ts
│   ├── resources/         # Resource definitions
│   ├── tools/             # Tool implementations
│   └── utils/             # Utility functions
├── tests/                 # Test files
├── dist/                  # Compiled JavaScript
├── .env.example           # Environment template
├── package.json
└── README.md
```

### Running Tests
```bash
npm run test
# or with coverage
npm run test:coverage
```

### Linting and Formatting
```bash
npm run lint
npm run format
```

## 📚 API Documentation

### Resource Discovery
```bash
curl http://localhost:3000/resources
```

### Tool Execution
```bash
curl -X POST http://localhost:3000/tools/execute \
  -H "Content-Type: application/json" \ 
  -d '{\n    "toolName": "openai_completions",\n    "params": {\n      "prompt": "Hello, world!",\n      "maxTokens": 100\n    }\n  }'
```

## 🤝 Contributing

We welcome contributions! To contribute to this project:

1. **Fork the Repository**
```bash
git clone https://github.com/yourusername/my-mcp-server.git
```

2. **Create a Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Commit Your Changes**
```bash
git commit -m "Add your feature description"
```

4. **Push to Your Branch**
```bash
git push origin feature/your-feature-name
```

5. **Open a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Ensure all tests pass

### Development Guidelines
- Write TypeScript with strict mode enabled
- Add tests for new features
- Update documentation accordingly
- Follow the existing code style
- Use meaningful commit messages

## 🐛 Troubleshooting

### Common Issues

**Issue**: Server fails to start
- **Solution**: Check that all required environment variables are set in your `.env` file

**Issue**: Connection timeout with external services
- **Solution**: Verify API credentials are correct and services are accessible from your network

**Issue**: Missing resources
- **Solution**: Ensure the adapter for the service is properly initialized

For more help, check the [Issues](https://github.com/irissalu-maker/my-mcp-server/issues) page.

## 📖 Additional Resources

- [MCP Protocol Documentation](https://modelcontextprotocol.io)
- [Notion API Docs](https://developers.notion.com)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Vercel API Docs](https://vercel.com/docs/api)
- [Claude Integration Guide](https://claude.ai/docs)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**irissalu-maker** - [GitHub Profile](https://github.com/irissalu-maker)

## 🙏 Acknowledgments

- Thanks to Anthropic for the Model Context Protocol specification
- Community contributions and feedback
- All platform partners for API documentation and support

---

**Last Updated**: 2026-04-01 02:19:49

For questions or support, please open an issue on the [GitHub Issues](https://github.com/irissalu-maker/my-mcp-server/issues) page.
