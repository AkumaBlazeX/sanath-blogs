# Understanding MCP (Model Context Protocol)

## Introduction

A new term that's been gaining attention in the AI world is **MCP** – **Model Context Protocol**. To understand MCP and its significance, let's first take a quick journey through the evolution of LLMs and how we interact with them today.

## 1. The First Evolution: LLMs (Large Language Models)

The first big revolution came with the introduction of **LLMs** – large models trained on massive datasets, giving them what we can imagine as a "big head full of past data". These models are excellent at understanding and generating human-like text.

https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/MCP-Blog-Images/First.png
*An illustration showing the concept of a large model with vast past knowledge.*

## 2. RAG Models: Enhancing LLMs

Soon after, the concept of **RAG** – **Retrieval-Augmented Generation** – was introduced.  
RAG means the model first **retrieves** relevant information from an external source, and then **generates** a response based on that, converting it into natural human language.

This was a game-changer. Companies began feeding LLMs with their own data using RAG pipelines, allowing for dynamic and relevant responses.

## 3. The Tooling Era: Connecting LLMs with Real-World Tools

As OpenAI and other big players emerged, the next step was **tool integration**.  
LLMs, by themselves, cannot take actions like reading emails or searching the web. So we started giving them **tools**.

A great example is the **web search tool** in ChatGPT – it allows the LLM to research current data. Then came platforms like **n8n**, **Make**, and **Zapier**, which enabled integration with 500+ apps.

However, there were two major limitations for non-technical users:

1. **Manual Node Configuration**: Each step or "node" in a workflow needs to be manually described.
    
2. **Lack of Adaptability**: If the task changes, the workflow is often not reusable.

https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/MCP-Blog-Images/Second.jpeg  
*A workflow showing manual configuration in n8n – e.g., summarizing emails and sending them.*

## 4. Enter MCP: The Missing Link

This is where **MCP (Model Context Protocol)** comes in.

MCP acts as a **broker between LLMs and tools**, making it easier for the model to know **what to do** and **how to do it**, **without you needing to explicitly define every detail**.

https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/MCP-Blog-Images/Third.png
*Architecture of MCP: Tools at the bottom, MCP Server in the middle, and MCP Clients (like you) on top.*  
(Source: [Norah Sakal's Blog on MCP](https://norahsakal.com/blog/mcp-vs-api-model-context-protocol-explained/))

### Before MCP:

> If you asked an LLM: "Get me the latest emails,"  
> ❌ It wouldn't know how – it has no access to your Gmail or database.

### After MCP:

> You ask: "Get me the latest emails."  
> ✅ The MCP server routes this request to the right tool (like Gmail), retrieves the data, and the LLM uses that to respond.  
> And **you**, the client, remain in full control.

This architecture enables tool makers like GitHub, Google, etc., to build **MCP-compatible integrations**, making things seamless.

## 5. Hands-On Example: Building Your MCP Workflow

Let's build a simple **MCP server** using **Cursor AI** and **Zapier MCP**.

1. Go to the [Zapier Actions Site](https://actions.zapier.com/) and follow the documentation.
    
2. Create an MCP project and connect it with Cursor AI.
    
3. In your Cursor settings, you'll see your connected MCP (like the image below).

https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/MCP-Blog-Images/Fourth.jpeg
*Zapier MCP connected to Cursor.*

## 6. Adding Actions via Zapier

Next, you can start adding **actions**. For example, connect your Gmail.

https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/MCP-Blog-Images/Fifth.jpeg 
*Gmail added as an action in Zapier.*

Now, inside any Cursor project, you can use natural language like:

> "Send an email to John with this message."

And it will send the email using the pre-defined action.

https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/MCP-Blog-Images/Sixth.jpeg
*A test example in Cursor where an email was sent just by using natural language.*

## 7. Final Output

https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/MCP-Blog-Images/Seventh.jpeg
*Screenshot of the email received as a meeting reminder – triggered by MCP through Cursor.*

## Conclusion

MCP is still in its **early stages**, but it has the potential to transform how we interact with AI and tools. Instead of coding or manually describing workflows, we can now just talk to our AI agent — and it will **understand, retrieve, and act**.

We believe that in the coming years, companies across the globe will embrace MCP to offer seamless integration between their APIs and AI interfaces.
