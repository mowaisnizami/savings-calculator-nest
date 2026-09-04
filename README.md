# Portfolio Pulse API

The NestJS backend for **Portfolio Pulse**, a compact full-stack portfolio tracker. It provides validated holding CRUD and derived portfolio-performance metrics for the companion [Angular dashboard](https://github.com/mowaisnizami/savings-calculator-ng).

## What it demonstrates

- Resource-oriented NestJS modules, controllers and services
- Strict DTO validation with unknown fields rejected
- CORS and a versionable `/api` boundary
- Deterministic seeded demo data
- Server-side cost-basis, market-value and return calculations
- Unit and end-to-end test coverage plus GitHub Actions CI

> Persistence is intentionally in memory for a zero-setup demo. Restarting the API restores the three seed holdings. A database adapter is the natural next production step.

## Run locally

Requires Node.js 20 or newer.

```bash
npm ci
npm run start:dev
```

The API runs at `http://localhost:3000/api`. Start the Angular repository separately on port 4200.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api` | Health information |
| `GET` | `/api/holdings` | List holdings |
| `GET` | `/api/holdings/summary` | Aggregated performance |
| `GET` | `/api/holdings/:id` | Get one holding |
| `POST` | `/api/holdings` | Add a holding |
| `PATCH` | `/api/holdings/:id` | Update supplied fields |
| `DELETE` | `/api/holdings/:id` | Remove a holding |

Example payload:

```json
{
  "symbol": "MSFT",
  "name": "Microsoft Corporation",
  "assetType": "STOCK",
  "units": 4,
  "averagePrice": 410,
  "currentPrice": 425
}
```

Asset types are `STOCK`, `ETF`, `MUTUAL_FUND`, and `CASH`. Prices must be non-negative and units must be greater than zero.

## Verify

```bash
npm test -- --runInBand
npm run test:e2e
npm run build
```

## Architecture

```text
Angular dashboard  ──HTTP/JSON──>  NestJS controllers
                                         │
                                  DTO validation
                                         │
                                  Holdings service
                                   ├─ CRUD store
                                   └─ summary math
```

## Environment

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3000` | HTTP port |
| `CORS_ORIGIN` | all origins | Comma-separated allowed frontend origins |

## License

MIT
