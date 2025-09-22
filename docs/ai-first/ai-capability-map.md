# AI Capability Map

## Candidate Capabilities

| Capability          | Intent (user)          | Inputs (this sprint) | Risk 1–5 (tag) | p95 ms | Est. cost/action | Fallback | Selected |
|---------------------|------------------------|----------------------|----------------|--------|------------------|----------|----------|
| Typeahead search     | Fast product search    | Product data, session info | 2              | 300    | $0.15            | Fallback to normal search | Selected |
| Support assistant    | Instant support response| Customer queries     | 3              | 1200   | $0.60            | Escalate to human if needed | Selected |
| Personalization      | Personalized offers    | User preferences, browsing history | 3              | 500    | $0.25            | Fallback to default offers |          |
| Price recommendations| Price guidance for purchases | Product data, inventory | 1              | 600    | $0.30            | N/A      |          |

### Why these two
I selected **Typeahead search** and **Support assistant** because they directly impact key KPIs such as conversion rate and customer satisfaction. Typeahead search will improve the user experience by enabling faster product discovery, while the support assistant will reduce the need for manual intervention and improve response times. Both features have low integration risk and align with business goals of enhancing user engagement and reducing customer service costs.
