## Touchpoint: Typeahead Search

### Problem Statement
When users search for products, they want fast and relevant suggestions as they type. A slow or inaccurate search leads to frustration and lost conversions. Typeahead search allows users to see suggestions in real-time as they type, improving the speed and accuracy of their search experience.

### Happy Path
1. The user starts typing a product name in the search bar.
2. As the user types, the system fetches and displays product suggestions in real-time.
3. The user selects a suggestion from the dropdown list.
4. The selected product page opens, and the user can complete their purchase.

### Grounding & Guardrails
- **Source of truth**: Product data is fetched from the catalog database.
- **Retrieval scope**: Only show relevant product suggestions based on the input text.
- **Max context**: Limit suggestions to a maximum of 10 items.
- **Refuse outside scope**: If the query is irrelevant (e.g., misspelled, unrelated terms), the system should return no results instead of irrelevant suggestions.

### Human-in-the-loop
- **Escalation triggers**: If no suggestions are found, an automatic fallback will show a message like "No results found" and offer a contact support option.
- **UI surface**: A button will appear saying "Contact Support" if no results are found.
- **Reviewer and SLA**: If escalated, a support agent should respond within 5 minutes during business hours.

### Latency Budget
- **Typing delay**: 100 ms for the first input.
- **Suggestions display**: 200 ms for the display of results.
- **Total latency**: Aim for a total of **300 ms** (p95 target) from typing to result display.

### Error & Fallback Behavior
- If the API call fails to return suggestions, the system should show a "No results found" message, and the user can either try another search or contact support.

### PII Handling
- **What leaves the app**: No personally identifiable information (PII) is shared during the search process.
- **Redaction rules**: The system ensures that no sensitive data (e.g., payment info) is passed through the search.
- **Logging policy**: Only anonymized search queries will be logged for performance improvement.

### Success Metrics
- **Product Metrics**:
  - Conversion rate: Aiming for a 5% increase in conversion due to faster searches.
  - Session duration: Expect a 10% increase in session length because users find products more quickly.

- **Business Metric**:
  - Revenue per user: Aiming to increase revenue per user by 8% due to the improved search experience.

### Feasibility Note
- **Data availability**: Product data is available via the product catalog API.
- **API/tools to use**: We will use the `search-api` for real-time suggestions.
- **Next prototype step**: Implement the basic version of typeahead search and test with a small user group.


## Touchpoint: Support Assistant

### Problem Statement
Customers often need assistance while browsing the website. A support assistant can help users solve issues like order problems, product questions, or delivery inquiries instantly, improving the customer experience and reducing reliance on human agents.

### Happy Path
1. The user clicks on the "Support" button at the bottom of the page.
2. The support assistant opens in a chat window and greets the user with a message: "How can I assist you today?"
3. The user asks a question, for example, "What is the status of my order?"
4. The assistant fetches the relevant information (e.g., order status) from the system.
5. The assistant provides an answer, or if necessary, escalates to a human agent.
6. The user gets the support they need, and the interaction ends.

### Grounding & Guardrails
- **Source of truth**: Customer service data (order status, user account details).
- **Retrieval scope**: Only provide information related to orders, payments, and common FAQs.
- **Max context**: Limit the number of context tokens (e.g., conversation history) to ensure smooth performance.
- **Refuse outside scope**: The assistant should avoid providing support for issues like technical troubleshooting outside its scope.

### Human-in-the-loop
- **Escalation triggers**: If the assistant cannot answer after three tries, it will escalate to a human agent.
- **UI surface**: The user can click a "Request Human Support" button to escalate the conversation.
- **Reviewer and SLA**: Human agents should respond within 2 minutes during business hours.

### Latency Budget
- **Greeting delay**: 100 ms.
- **Response time**: 500 ms for each query (to retrieve data).
- **Total latency**: Aim for a total of **1200 ms** (p95 target).

### Error & Fallback Behavior
- If the assistant cannot retrieve the information, it will say: "Sorry, I couldn’t find the information you requested. Would you like to contact support?"

### PII Handling
- **What leaves the app**: Only the required information (e.g., order number) leaves the app. No sensitive PII should be exposed.
- **Redaction rules**: Redact any sensitive information, such as full names, addresses, or payment details.
- **Logging policy**: Ensure that all logs are anonymized and comply with privacy regulations.

### Success Metrics
- **Product Metrics**:
  - First-response time: Reduce the first-response time by 30%.
  - User satisfaction: Improve satisfaction scores for support interactions by 10%.

- **Business Metric**:
  - Cost reduction: Reduce support costs by 20% by handling more inquiries via the assistant.

### Feasibility Note
- **Data availability**: Order and account data are accessible via the customer service API.
- **API/tools to use**: We’ll use a natural language processing (NLP) service to power the assistant.
- **Next prototype step**: Integrate the assistant with our existing knowledge base to handle more complex queries.
