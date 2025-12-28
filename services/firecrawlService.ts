
/**
 * Firecrawl integration for dynamic web search.
 * Note: You will need an API key from firecrawl.dev
 */
export class FirecrawlService {
  private apiKey: string | undefined = process.env.FIRECRAWL_API_KEY;

  async searchAndCrawl(query: string): Promise<string> {
    if (!this.apiKey) {
      console.warn("FIRECRAWL_API_KEY is missing. Falling back to Gemini's internal knowledge.");
      return "";
    }

    try {
      // Step 1: Search for relevant URLs
      // Using Firecrawl's /search endpoint
      const searchResponse = await fetch('https://api.firecrawl.dev/v1/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({ query, limit: 3, lang: 'en' })
      });

      const searchData = await searchResponse.json();
      
      if (!searchData.success || !searchData.data || searchData.data.length === 0) {
        return "";
      }

      // Step 2: Combine snippets or crawl top results
      const context = searchData.data.map((item: any) => (
        `Source: ${item.url}\nTitle: ${item.title}\nContent: ${item.markdown || item.snippet}`
      )).join("\n\n---\n\n");

      return context;
    } catch (error) {
      console.error("Firecrawl Error:", error);
      return "";
    }
  }
}

export const firecrawl = new FirecrawlService();
