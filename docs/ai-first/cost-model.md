# Cost Model for AI Touchpoints

This document outlines the cost calculations for the two AI touchpoints we’ve selected: **Typeahead Search** and **Support Assistant**. The goal is to estimate the cost of using each AI feature and understand how to keep costs within budget.

## Assumptions
Before diving into the numbers, here are a few key assumptions:

- **Model**: We are using **GPT-4o-mini**, which costs $0.15 per 1,000 prompt tokens and $0.60 per 1,000 completion tokens.
- **Average tokens in**: On average, each search query will use around **10 tokens**.
- **Average tokens out**: Each response from the AI will use around **15 tokens**.
- **Requests per day**:
  - Typeahead search: **50,000 requests** per day.
  - Support assistant: **1,000 requests** per day.
- **Cache hit rate**:
  - Typeahead search: **70%** of requests will be served from the cache.
  - Support assistant: **30%** of requests will be served from the cache.

## Cost Calculation

### Typeahead Search
Typeahead search helps users find products quickly by showing suggestions as they type. Here’s the cost breakdown:

1. **Cost per action**:
   - For each search, the AI processes **10 tokens** for the prompt and **15 tokens** for the response.
   - **Cost per search**: 
     - Prompt: 10 tokens → $0.15 per 1,000 tokens = **$0.009**
     - Completion: 15 tokens → $0.60 per 1,000 tokens = **$0.009**
     - **Total per search**: $0.009 (prompt) + $0.009 (completion) = **$0.018** per search.

2. **Daily cost**:
   - Since there are **50,000 searches per day**, and **30% of requests are cached**:
     - **Uncached searches**: 50,000 * (1 - 0.70) = **15,000 uncached searches**.
     - **Daily cost**: $0.018 per search * 15,000 uncached searches = **$270 per day**.

### Support Assistant
The support assistant provides real-time help to users by answering questions about their orders, products, and more.

1. **Cost per action**:
   - Just like Typeahead search, the support assistant uses **10 tokens** for the prompt and **15 tokens** for the response.
   - **Cost per query**: 
     - Prompt: 10 tokens → $0.15 per 1,000 tokens = **$0.009**
     - Completion: 15 tokens → $0.60 per 1,000 tokens = **$0.009**
     - **Total per query**: $0.009 (prompt) + $0.009 (completion) = **$0.018** per query.

2. **Daily cost**:
   - Since there are **1,000 support queries per day**, and **70% of requests are cached**:
     - **Uncached queries**: 1,000 * (1 - 0.30) = **700 uncached queries**.
     - **Daily cost**: $0.018 per query * 700 uncached queries = **$12.60 per day**.

## Summary of Costs

Here’s the total cost breakdown for both touchpoints:

- **Typeahead Search**: 
  - **Cost per action** = $0.018 
  - **Daily cost** = $270
- **Support Assistant**:
  - **Cost per action** = $0.018 
  - **Daily cost** = $12.60

## Cost Levers (What to Do if We Exceed Budget)
If the costs are higher than expected, here are a few ways to reduce expenses:

- **For Typeahead Search**: 
  - We could reduce the context length (number of tokens) for each query, which would lower the cost per action.
  - Another option is to switch to a lower-cost model for lower-risk searches.
  
- **For Support Assistant**: 
  - We could reduce the number of tokens used per query, especially for simple queries, to cut down on costs.
  - Alternatively, we could reduce the number of uncached requests by improving cache hit rates.

