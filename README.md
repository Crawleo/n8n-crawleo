# @crawleo/n8n-nodes-crawleo

n8n community node for Crawleo's real-time search and crawling APIs. Crawleo returns structured SERP data and clean AI-ready web content, making it useful for agents, RAG pipelines, SEO workflows, lead generation, and automation.

## Supported Crawleo endpoints

This node uses Crawleo's documented REST API at `https://api.crawleo.dev` and supports:

- **Bing Search API** (`GET /search`): Bing-powered web search with optional auto-crawling and Markdown/HTML/text output for LLM and RAG workflows.
- **Google Search API** (`GET /google-search`): Structured Google SERP data for organic results, knowledge graphs, People Also Ask, news, images, places, and shopping.
- **Google Maps API** (`GET /google-maps`): Structured place/business data including address, rating, phone number, website, coordinates, opening hours, place ID, and CID.
- **Crawler API** (`GET /crawl`): Direct URL crawling with optional JavaScript rendering, screenshots, geolocation, and multiple output formats.
- **Headful Browser API** (`GET /headful-browser`): Premium headed-browser crawling with residential proxy geolocation and anti-bot evasion for sites that block standard crawlers.

## Getting a Crawleo API key

1. Sign in at [crawleo.dev/login](https://www.crawleo.dev/login).
2. Create an API key from your dashboard.

## Configuring credentials in n8n

1. In n8n, open **Credentials** → **New**.
2. Search for **Crawleo API**.
3. Add your API key.
4. Leave **Base URL** as `https://api.crawleo.dev` unless Crawleo support gives you a custom endpoint.
5. Save the credential.

The node sends both `x-api-key` and `X-Client-Source: n8n` headers. Saved credentials using the older `/api/v1` base URL are normalized by the node before requests are sent.

## Usage

### Bing Search

Use **Resource: Search** → **Operation: Bing Search** when you want live Bing web results and optional page content extraction.

Required:

| Parameter | API name | Description |
| --- | --- | --- |
| Query | `query` | Search query string. |

Options:

| Parameter | API name | Description |
| --- | --- | --- |
| Max Pages | `max_pages` | Maximum number of search result pages. Each page costs 10 credits. |
| Result Count | `count` | Number of search results to return. |
| Language | `setLang` | Language code such as `en`, `es`, `fr`, or `de`. |
| Country Code | `cc` | Country code such as `US`, `GB`, or `DE`. |
| Geolocation | `geolocation` | Geographic location for localized results. Use `random` for randomized geolocation. |
| Device | `device` | Device type: `desktop`, `mobile`, or `tablet`. |
| Auto Crawling | `auto_crawling` | Crawl each search result URL and include page content. |
| Copilot Answer | `copilot_answer` | Include Copilot AI answer cards. |
| Questions and Answers | `questions_answers` | Include People Also Ask cards. |
| Related Queries | `related_queries` | Include related search suggestions. |
| Sidebar | `sidebar` | Include sidebar/knowledge panel/local result data. |
| Direct Answer | `direct_answer` | Include direct answer boxes and instant answers. |
| Raw HTML | `raw_html` | Return original HTML source for crawled pages. |
| Enhanced HTML | `enhanced_html` | Return cleaned HTML with ads/scripts/tracking removed. |
| Page Text | `page_text` | Return plain text content. |
| Markdown | `markdown` | Return structured Markdown for RAG/LLM workflows. |

### Google Search

Use **Resource: Search** → **Operation: Google Search** for structured Google SERP workflows such as SEO monitoring, competitor research, news monitoring, images, places, and shopping.

Required:

| Parameter | API name | Description |
| --- | --- | --- |
| Query | `q` | Google search query. |

Options:

| Parameter | API name | Description |
| --- | --- | --- |
| Country | `gl` | ISO 3166-1 alpha-2 country, default `us`. |
| Language | `hl` | IETF language tag, default `en`. |
| Freshness Filter | `tbs` | Past hour/day/week/month/year filters (`qdr:h`, `qdr:d`, `qdr:w`, `qdr:m`, `qdr:y`). |
| Page | `page` | 1-indexed page number. |
| Results Per Page | `num` | Number of results, 1–100. |
| Search Type | `type` | `search`, `news`, `images`, `places`, or `shopping`. |

### Google Maps

Use **Resource: Search** → **Operation: Google Maps** for structured place and business discovery.

Required:

| Parameter | API name | Description |
| --- | --- | --- |
| Query | `q` | Business name, landmark, address, keyword, or category plus location. |

Options:

| Parameter | API name | Description |
| --- | --- | --- |
| Language | `hl` | Language code for returned place text. |
| Location Bias | `ll` | Bias format `@latitude,longitude,zoomz`, e.g. `@48.8566,2.3522,15z`. |
| Place ID | `placeId` | Google Place ID for a direct place lookup. |
| CID | `cid` | Google numeric business/customer ID. |

### Crawler

Use **Resource: Crawler** → **Operation: Crawler** for direct URL crawling.

Required:

| Parameter | API name | Description |
| --- | --- | --- |
| URLs | `urls` | One or more URLs. Multiple values are sent as a comma-separated list. |

Options:

| Parameter | API name | Description |
| --- | --- | --- |
| Render JavaScript | `render_js` | Browser rendering for JavaScript-heavy sites. Costs 10 credits per URL instead of 1. |
| Geolocation | `geolocation` | ISO country code for crawl geolocation, e.g. `us`, `gb`, or `de`. |
| Raw HTML | `raw_html` | Return raw HTML source. |
| Enhanced HTML | `enhanced_html` | Return cleaned/sanitized HTML. |
| Page Text | `page_text` | Return plain-text extraction. |
| Markdown | `markdown` | Return Markdown conversion. |
| Screenshot | `screenshot` | Capture a screenshot. Requires JavaScript rendering. |
| Full Page Screenshot | `screenshot_full_page` | Capture full page instead of viewport only. Requires screenshot. |

### Headful Browser

Use **Resource: Crawler** → **Operation: Headful Browser** only when standard crawling is blocked or you need advanced anti-bot evasion.

Required:

| Parameter | API name | Description |
| --- | --- | --- |
| URLs | `urls` | One or more URLs. Multiple values are sent as a comma-separated list. |

Options:

| Parameter | API name | Description |
| --- | --- | --- |
| Country | `country` | Residential proxy geolocation, default `us`. |
| Output Format | `output_format` | `markdown`, `enhanced_html`, `raw_html`, or `page_text`. |
| Screenshot | `screenshot` | Capture a full-page screenshot and return a screenshot URL. |

## Troubleshooting

| Error Code | Description | Suggested Action |
| --- | --- | --- |
| 400 Bad Request | Missing or invalid parameters | Check required fields and parameter formats. |
| 401 Unauthorized | Missing or invalid API key | Verify or regenerate your key. |
| 402 Payment Required | Insufficient credits | Check your Crawleo subscription and remaining credits. |
| 403 Forbidden | Inactive account or insufficient permissions | Check account status. |
| 429 Too Many Requests | Credits exhausted or concurrent limit reached | Reduce concurrency or retry later. |
| 500 Internal Server Error | Crawleo service issue | Retry after a short delay. |

## Pricing and credit notes

- Bing Search: 10 credits per results page.
- Google Search: 10 credits per request.
- Google Maps: 30 credits per request.
- Crawler HTTP request: 1 credit per URL.
- Crawler JavaScript rendering: 10 credits per URL.
- Headful Browser: 50 credits per successful URL.

See [crawleo.dev/pricing](https://www.crawleo.dev/pricing) for current plan details.

## Resources

- Documentation: https://docs.crawleo.dev
- API introduction: https://docs.crawleo.dev/api-reference/introduction
- MCP overview: https://docs.crawleo.dev/mcp/overview
- Website: https://crawleo.dev
