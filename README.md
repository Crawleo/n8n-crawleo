# @crawleo/n8n-nodes-crawleo

n8n nodes for Crawleo's privacy-first, real-time web search and crawling APIs. Crawleo returns clean, AI-ready web content with strict zero-retention data handling, making it ideal for agents, RAG pipelines, and automation workflows.

## Features

- **Search API**: Real-time web search with language, country, geolocation, and device targeting. Supports AI-enhanced HTML, raw HTML, plain text, Markdown, and optional auto-crawling of results.
- **Crawler API**: Crawl multiple URLs in one request, including JavaScript-rendered pages, and return the same formats as search (AI-enhanced HTML, raw HTML, text, Markdown).
- **LLM-friendly outputs**: Clean, ad-free HTML or Markdown to minimize post-processing and token usage.
- **Privacy-first**: No data selling, no AI training on user data, and zero-retention by design.

## Getting a Crawleo API Key

1. Sign in at [crawleo.dev/login](https://www.crawleo.dev/login).
2. Create an API key from your dashboard.

## Configuring Credentials in n8n

1. In n8n, open **Credentials** → **New**.
2. Search for **Crawleo API**.
3. Add your API key and (optionally) adjust the base URL if you’re using a private deployment.
4. Save the credential.

## Usage

### Crawleo Search
1. Add the **Crawleo** node to your workflow and choose the **Search** resource.
2. Select your Crawleo credential.
3. Enter a query and any optional search parameters (language, country, device, output formats, auto crawling).
4. Run the workflow to receive real-time results.

### Crawleo Crawler
1. Add the **Crawleo** node and choose the **Crawler** resource.
2. Select your Crawleo credential.
3. Provide one or more URLs and choose the output formats you need (AI-enhanced HTML, raw HTML, text, Markdown).
4. Run the workflow to fetch the crawled content.

## Parameters

### Crawleo Search Parameters

| Parameter | Description |
|-----------|-------------|
| Query | The search query to execute (required) |
| Max Pages (`max_pages`) | Maximum number of search result pages to crawl (min 1) |
| Result Count (`count`) | Number of results to return |
| Language (`setLang`) | Preferred language for results (ISO code, e.g. en, es) |
| Country Code (`cc`) | Country code for localized search (ISO-2) |
| Geolocation (`geolocation`) | Bias results to a location. Allowed: random, pl, gb, jp, de, fr, es, us. |
| Device (`device`) | Device profile to simulate (desktop, mobile, tablet) |
| AI-Enhanced HTML (`enhanced_html`) | Return cleaned, ad-free HTML optimized for LLMs (default true) |
| Raw HTML (`raw_html`) | Return the original HTML source for each result |
| Page Text (`page_text`) | Return extracted plain text for each result |
| Markdown (`markdown`) | Return extracted text in Markdown format (default true) |

### Crawleo Crawler Parameters

| Parameter | Description |
|-----------|-------------|
| URLs (`urls`) | One or more URLs to crawl (required) |
| AI-Enhanced HTML (`enhanced_html`) | Return cleaned, ad-free HTML for each URL (default true) |
| Raw HTML (`raw_html`) | Return the original HTML for each URL |
| Page Text (`page_text`) | Return extracted text for each URL |
| Markdown (`markdown`) | Return extracted text in Markdown format (default true) |

## Troubleshooting

| Error Code | Description | Suggested Action |
|------------|-------------|------------------|
| 400 Bad Request | Invalid parameters | Check required fields and formats |
| 401 Unauthorized | Missing or invalid API key | Verify or regenerate your key |
| 429 Too Many Requests | Rate limit exceeded | Reduce frequency or implement backoff |
| 500 Internal Server Error | Server-side issue | Retry after a short delay |

## Pricing

Crawleo uses subscription-based pricing. See [crawleo.dev/pricing](https://www.crawleo.dev/pricing) for details.

## Resources

- Docs: https://www.crawleo.dev/docs
- MCP Endpoint: https://www.crawleo.dev/mcp
- Website: https://crawleo.dev

## License

MIT
