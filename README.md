# Social Support Portal

A government social support application allowing citizens to apply for financial assistance through a secure, guided multi-step form with AI writing assistance.

Built with React 18, TypeScript, Material UI, React Hook Form, and OpenAI GPT-3.5-turbo.

---

## Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- OpenAI API key ([platform.openai.com](https://platform.openai.com))

---

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Eslamallam/social-support-portal.git
cd social-support-portal
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file from the example:

```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:

```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

> The API key must have **Model capabilities** permission enabled.
> It is only used for the AI writing assistant in Step 3.
> See [Security](./ARCHITECTURE.md#security) in [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

5. Start the development server:

```bash
pnpm dev
```

6. Open [http://localhost:5173](http://localhost:5173)

---

## Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm lint       # Run ESLint
pnpm format     # Run Prettier
```

---

## Environment Variables

| Variable              | Required | Description                                        |
| --------------------- | -------- | -------------------------------------------------- |
| `VITE_OPENAI_API_KEY` | Yes      | OpenAI API key (model capabilities only)           |
| `VITE_APP_NAME`       | No       | App name override (default: Social Support Portal) |

---

## Documentation

For architecture decisions, project structure, and technical details see [ARCHITECTURE.md](./ARCHITECTURE.md).
