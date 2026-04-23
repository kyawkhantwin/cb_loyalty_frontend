# LoyaltyOS Admin Dashboard

A high-scale, modern loyalty and merchant management system built with Next.js 15, HeroUI, and a strict Feature-Sliced Architecture.

## 🏗️ Architecture: The "Feature-First" Design

This project follows a strict **Feature-Based Architecture**. Every domain (e.g., `members`, `wallet`, `merchants`) is a self-contained module that owns its UI, logic, state, and API communication.

### 1. Thin Routing Layer (`app/`)
The `app/` directory is strictly for routing and layouts. It contains **no business logic**. Every `page.tsx` is simply a re-export of the feature's implementation:
```tsx
// app/members/page.tsx
export { MembersPage as default } from "@/features/members/public-api";
```

### 2. Feature Implementation (`src/features/[name]`)
Each feature is a standalone module with a fixed anatomy:
- `page.tsx`: The primary entry point component for the route.
- `public-api.ts`: Gatekeeper for the feature; only exports what is needed externally.
- `/api`: TanStack Query hooks.
- `/components`: Atomic UI elements (Buttons, Chips, small fragments).
- `/sections`: Larger compositions (Tables, Dashboard grids).
- `/services`: **Pure business logic** and API calls (The "Brain").
- `/store`: Zustand state slices.
- `/types`: Strict TypeScript interfaces.

### 3. The Dependency Rule
Features **never** import from the internal folders of other features. Communication only happens via the `public-api.ts` of the target feature.

---

## 📏 Coding Standards: "The 4-Line Ideal"

We follow a strict **Clean Code** philosophy to ensure the codebase remains maintainable as it scales.

- **4-Line Max**: Functions aim to be no longer than **4 lines**.
- **Functional Composition**: Logic is extracted into tiny, named utility functions or sub-components.
- **Thin Components**: UI components focus solely on rendering. Logic resides in Services, Hooks, or Zustand.
- **Surgical Imports**: HeroUI components are imported individually (e.g., `@heroui/table`) to minimize bundle size and ensure clear dependencies.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Architecture**: HeroUI (Individual Packages) + Framer Motion
- **State**: Zustand (Local Persistence)
- **Data Fetching**: TanStack Query v5 + Axios
- **Icons**: Lucide React
- **Styles**: Tailwind CSS v4

---

## 📂 Project Structure Map

```text
src/
├── app/           # Thin Routing Layer (Exports Only)
├── config/        # Global config (API_ROUTES)
├── features/      # Self-contained modules
│   └── members/
│       ├── page.tsx        # Implementation
│       ├── public-api.ts   # Gatekeeper
│       ├── services/       # Pure Logic
│       └── components/     # Atomic UI
├── lib/           # Base Axios Client
├── providers/     # Tech Stack Providers
└── shared/        # Cross-cutting utilities
```

## 🛠️ Development

```bash
pnpm install    # Install optimized packages
pnpm dev        # Run dashboard
pnpm tsc        # Verify zero errors
```

