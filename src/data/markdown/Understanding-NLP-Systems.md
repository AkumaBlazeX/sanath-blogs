---
title: "Understanding NLP Systems: From Preprocessing to RAG"
summary: "A comprehensive deep dive into the core components of modern Natural Language Processing. Learn how text is tokenized, embedded, attended to, and ultimately transformed into intelligent responses through models like RAG. Whether you're building a chatbot, search engine, or research tool—this guide unpacks it all."
date: "April 8, 2025"
imageUrl: "https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/Title.png"
tags:
  - "NLP"
  - "AI"
  - "Chatbot"
  - "Transformers"
  - "Text Embeddings"
  - "RAG"
  - "Attention Mechanism"
  - "Language Models"
  - "Information Retrieval"
  - "Tutorial"
targetAudience:
  - "Data Scientists"
  - "AI Engineers"
  - "ML Enthusiasts"
  - "Technical Writers"
  - "Chatbot Developers"
---



Natural Language Processing (NLP) has revolutionized the way machines understand and respond to human language. From powering intelligent assistants to helping researchers sift through vast amounts of text, NLP stands at the intersection of linguistics, data, and AI. In this blog, we’ll unpack some of the most essential building blocks of NLP—from foundational preprocessing techniques to cutting-edge models like RAG. Whether you're a beginner or brushing up your skills, this guide will give you an in-depth understanding of how language is interpreted by machines.

## Stemming and Lemmatization

One of the first steps in processing text is simplifying it. But simplification isn’t just about removing words—it’s about distilling them to their most meaningful forms.

**Stemming** is a rule-based process that chops off prefixes or suffixes to reduce words to their "root" form. However, these roots may not always be valid dictionary words. For instance, the word `flies` might be stemmed to `fli`, which isn't meaningful on its own but computationally efficient.  
**Lemmatization**, on the other hand, takes context into account and converts words into their **base or dictionary form**, preserving their grammatical meaning. So `flies` becomes `fly`, and `running` becomes `run`, both of which are valid.

> ⚠️ **Tip:** Use stemming for high-speed, large-volume tasks, and lemmatization for tasks where accuracy matters more—like sentiment analysis or chatbot response generation.

[Image 1](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/1.jpeg)
A side-by-side table of stemming vs lemmatization with input/output examples.

## Tokenization: Breaking Language into Building Blocks

Before we can analyze text, we must **split it into manageable pieces**. Tokenization is the process of chopping text into units called tokens, which could be words, characters, or subwords.

- **Word Tokenization** separates each word based on whitespace and punctuation.  
    _Example:_ "I love Python." becomes ["I", "love", "Python"].
    
- **Subword Tokenization** is especially powerful for handling rare or unknown words. Instead of discarding unfamiliar words, it breaks them down into known sub-parts.  
    _Example:_ `unbelievable` ➝ ["un", "believ", "able"]
    

This granularity helps models generalize better, especially across different languages and technical terms.

[image 2.1](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/2.1.jpeg)
[image 2.2](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/2.2.jpeg)
[image 2.3](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/2.3.jpeg)
Visual of tokenization types: sentence, word, subword, character.



## Word Embeddings: Giving Numbers Meaning

Words need to be converted into numbers for a model to process them—but not just any numbers. These vectors need to **encode semantic meaning**.

Enter **embeddings**—dense vector representations of words. Words that appear in similar contexts end up with similar vectors. This enables models to understand relationships like:

nginx

CopyEdit

`king - man + woman ≈ queen`

This vector math reveals how embeddings **capture meaning, gender, context, and even analogies**, all in high-dimensional space. These representations are learned using algorithms like Word2Vec, GloVe, or are directly baked into modern models like BERT.

[image3.1](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/3.1.jpeg)
[image3.2](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/3.2.jpeg)
2D projection of word embeddings showing clusters (e.g., royal terms together, sports terms together).


## Attention Mechanism: Mimicking Human Focus

When we read a sentence, we instinctively **focus more on certain words** depending on context. The **attention mechanism** brings this human-like prioritization to machine learning.

It works by **assigning importance weights** to different words in the input based on their relevance to each other. For instance, in the sentence “The cat is jumping high,” attention might focus more on “cat” and “jumping” than on “the” or “is”.

This mechanism powers many breakthroughs in NLP because it allows models to dynamically emphasize important parts of the input.

[image4.1](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/4.1.jpeg)
[image4.2](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/4.2.jpeg)
[image4.3](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/4.3.jpeg)
A heatmap showing attention weights across words in a sentence.

## Transformers: The Brains Behind Modern NLP

Before transformers, models processed words **sequentially**, which made understanding long-term dependencies hard. Transformers **look at the entire sentence at once**, analyzing relationships between every word pair.

Here’s how they work:

1. **Embeddings + Positional Encoding**: Each word is turned into a vector and tagged with its position.
    
2. **Attention Layers**: The model figures out which words are most important to each other.
    
3. **Feed-forward Layers**: These layers refine the understanding at deeper levels.
    

This parallel architecture is what powers today’s NLP superstars like BERT, GPT, and T5. It's **fast, context-aware**, and scales beautifully.

[image5](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/5.jpeg)
Diagram of transformer architecture with embedding, attention, and output layers.

## Measuring Text Similarity

Understanding how similar two pieces of text are is crucial for applications like duplicate detection, question-answering, or recommendations. Several metrics help with this:

- **Cosine Similarity** looks at the angle between word vectors. A smaller angle (closer to 1) means higher similarity.
    
- **Jaccard Similarity** compares how many common words two sentences have vs. how many total unique words they contain.
    
- **Euclidean Distance** measures how far apart the vectors are in space—closer means more similar.
    

Each has its use cases, but cosine similarity tends to dominate in NLP tasks involving embeddings.

[image6](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/6.jpeg)
Geometric visualization comparing cosine similarity and Euclidean distance.

## Information Retrieval: Finding What Matters

Search engines, chatbots, and document scanners rely on **information retrieval** to locate the most relevant content.

It involves:

1. **Document Representation**: Turning large amounts of unstructured text into searchable form.
    
2. **Scoring & Ranking**: Calculating relevance between query and documents.
    
3. **Indexing**: Like a book index, this allows fast lookup instead of reading everything.
    

> 🧠 **Tip:** Strong retrieval = faster, more accurate results.

[image7](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/7.jpeg)
Diagram of IR pipeline: query ➝ document store ➝ ranked results.

## Retrieval Models in RAG (Retrieval-Augmented Generation)

**RAG** combines the power of two models:

- A **retriever** that fetches relevant documents based on the query
    
- A **generator** that crafts a human-like response based on those documents
    

### Traditional Retrieval Models

- **TF-IDF** gives higher importance to rare but significant terms.
    
- **BM25** builds on TF-IDF with tuning for document length and term saturation.
    

> Example: The term “warming” might be common in a climate document set, but it’ll get higher relevance when paired with unique query contexts.

### Dense Retrieval

Dense models like **DPR (Dense Passage Retrieval)** learn to map questions and answers into the same vector space using embeddings. Even if the words differ, they can still match on meaning.

[image8](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/8.jpeg)
Dual-encoder DPR architecture: one for query, one for documents.

## Generative Models: Crafting Human-like Answers

Once information is retrieved, **generative models** like GPT step in. They don’t just copy—they create. Given retrieved documents and a prompt, they generate **fluent, coherent, and informative responses**.

- **Coherence** ensures every sentence fits logically
    
- **Completeness** guarantees all angles are covered
    
- **Adaptability** lets the model personalize responses to context
    

This phase is crucial in making responses sound natural and complete.

[image9](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/9.jpeg)
Flow of generation from prompt to context to final answer.

## RAG Pipeline: Factual, Fast, and Fluent

Putting it all together:

1. **User Query**: "What are the benefits of meditation?"
    
2. **Retriever**: Finds documents discussing mental health, focus, and relaxation.
    
3. **Scoring**: Ranks documents based on semantic similarity.
    
4. **Generator**: Produces a natural-sounding summary of the key points.
    
5. **Final Output**: "Meditation improves focus, reduces stress, and enhances emotional well-being."
    

This combination ensures not only relevance but also **depth and clarity**—ideal for research, customer support, and education.

[image10](https://eetbqplrrpfakagerrag.supabase.co/storage/v1/object/public/blog-images/Blog-5/10.jpeg)
Full RAG workflow chart with arrows from input ➝ retrieval ➝ ranking ➝ generation ➝ output.
