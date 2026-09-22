# fi-orders-api

Sample Orders API -- Node.js + Express service used as the high-coverage,
larger sample project in the `fi-sandbox` GitHub/Azure DevOps integration
sandbox. Not a production service; there is no deployment target for it.

## Structure

- `src/routes` -- Express route handlers
- `src/services` -- order + pricing business logic
- `src/repositories` -- in-memory persistence
- `src/validators` -- request payload validation
- `src/middleware` -- Express error handling
- `src/utils` -- small helpers (id generation, logging)
- `src/app.js` -- Express app factory (used directly by tests via supertest)
- `src/server.js` -- process entry point, starts the HTTP listener

## Development

```bash
npm install
npm test -- --coverage
```

`src/utils/logger.js` and `src/server.js` are intentionally left without unit
tests (see the comment at the top of each file) -- a console wrapper and a
process bootstrap with no branching logic worth covering.
