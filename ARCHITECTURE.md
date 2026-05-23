# Architecture

Technical decisions, project structure, and design rationale for the Social Support Portal.

---

## Tech Stack

| Category             | Technology                   |
| -------------------- | ---------------------------- |
| Framework            | React 18 + TypeScript + Vite |
| UI Library           | Material UI v6               |
| Form Handling        | React Hook Form + Zod        |
| State Management     | React Context + useReducer   |
| API Calls            | Axios                        |
| Internationalisation | react-i18next                |
| AI Integration       | OpenAI GPT-3.5-turbo         |
| Notifications        | notistack                    |
| Package Manager      | pnpm                         |
| Code Quality         | ESLint + Prettier + Husky    |

---

## Project Structure

```
src/
├── app/                          # App-level infrastructure
│   ├── providers/                # React context providers
│   │   ├── AppProviders.tsx      # Root provider composition
│   │   ├── AppThemeProvider.tsx  # MUI theme with RTL support
│   │   ├── AppSnackbarProvider.tsx
│   │   └── AppErrorBoundaryProvider.tsx
│   └── router/                   # Route definitions
│
├── features/                     # Feature-based modules
│   ├── ai-assistant/             # OpenAI integration (self-contained)
│   │   ├── components/
│   │   │   ├── AISuggestionModal.tsx
│   │   │   └── AISuggestionModal.styles.ts
│   │   ├── constants/
│   │   │   └── fieldPrompts.ts   # EN + AR prompts per field
│   │   ├── hooks/
│   │   │   └── useAIAssistant.ts
│   │   ├── services/
│   │   │   └── openai.service.ts
│   │   └── types/
│   │       └── openai.types.ts
│   │
│   └── support-application/      # Main form feature
│       ├── components/
│       │   ├── ApplicationFormProvider.tsx
│       │   ├── ApplicationStepper.tsx
│       │   ├── FormNavigation.tsx
│       │   ├── FormWizard.tsx
│       │   ├── SituationTextField.tsx
│       │   └── StepRenderer.tsx
│       ├── constants/
│       │   ├── defaultValues.ts
│       │   ├── formSteps.ts
│       │   ├── stepFieldMap.ts
│       │   └── storageKeys.ts
│       ├── contexts/
│       │   └── FormWizardContext.tsx
│       ├── hooks/
│       │   ├── useApplicationForm.ts
│       │   ├── useFormPersistence.ts
│       │   └── useStepManager.ts
│       ├── schemas/
│       │   ├── application.schema.ts
│       │   ├── financialInformation.schema.ts
│       │   ├── personalInformation.schema.ts
│       │   └── situationDetails.schema.ts
│       ├── steps/
│       │   ├── PersonalInfoStep.tsx
│       │   ├── FinancialInfoStep.tsx
│       │   └── SituationDetailsStep.tsx
│       └── types/
│           └── application.types.ts
│
├── pages/
│   └── ApplicationPage.tsx       # Page layout wrapper
│
├── shared/                       # Reusable across features
│   ├── api/
│   │   └── apiClient.ts          # Axios instance with interceptors
│   ├── components/
│   │   ├── form/
│   │   │   ├── FormTextField.tsx
│   │   │   ├── FormSelectField.tsx
│   │   │   └── FormNumberField.tsx
│   │   ├── AppHeader.tsx
│   │   ├── LoadingOverlay.tsx
│   │   └── SuccessDialog.tsx
│   ├── config/
│   │   └── env.ts                # Centralised environment config
│   ├── hooks/
│   │   └── useSnackbar.ts
│   └── utils/
│       └── countries.ts          # i18n-iso-countries helper
│
└── i18n/                         # Internationalisation
    ├── locales/
    │   ├── en.json
    │   └── ar.json
    └── index.ts
```

---

## Form Steps

### Step 1 — Personal Information

Full name, National ID, date of birth, gender, phone number, email, address, city, state, and country (searchable autocomplete with flags from flagcdn.com, translated via i18n-iso-countries).

### Step 2 — Family and Financial Information

Marital status, number of dependents, employment status, monthly income (AED), and housing status.

### Step 3 — Situation Details

Three textarea fields with AI writing assistance:

- Current Financial Situation (max 500 characters)
- Employment Circumstances (max 400 characters)
- Reason for Applying (max 300 characters)

Each field has a **Help Me Write** button that sends a contextual prompt to OpenAI and returns a suggestion the user can accept, edit, try again, or discard.

---

## Architecture Decisions

### Feature-based architecture

The project organises code by feature rather than by type. Each feature owns its own components, hooks, schemas, types, and constants.

In a larger government portal with multiple modules (social support, identity verification, document upload, application tracking), this entire `features/` directory would sit inside a `social-support` domain alongside other top-level domains. The current flat structure keeps things simple for the scope of this assignment while demonstrating the same organisational principles that scale to enterprise applications.

### Form validation strategy

Validation is controlled explicitly per step using React Hook Form's `trigger()` with a `stepFieldMap`:

| Step   | Validated on | Fields            |
| ------ | ------------ | ----------------- |
| Step 1 | Next click   | `personalInfo`    |
| Step 2 | Next click   | `familyFinancial` |
| Step 3 | Submit click | `situation`       |

This prevents premature error display on situation fields while maintaining correct validation at the point of submission. A custom `hasAttemptedSubmit` flag in `FormWizardContext` controls when Step 3 errors are visible, decoupling error display from React Hook Form's internal `isSubmitted` state.

### State management

Form state is managed with React Hook Form's `FormProvider` and a custom `FormWizardContext`. No external state management library was needed — the form is linear and the context pattern is sufficient. Zustand and Redux were considered and ruled out as over-engineering for this scope.

### Cross-feature dependency

The `support-application` feature imports from `ai-assistant` intentionally. The dependency is strictly one-directional — `ai-assistant` never imports from `support-application`. In a larger application, shared AI utilities would live in a `shared/ai` module to fully decouple features.

### LocalStorage persistence

Two separate keys manage persistence:

| Key                           | Value                         |
| ----------------------------- | ----------------------------- |
| `social-support-form-data`    | All form field values as JSON |
| `social-support-current-step` | Current step index as string  |

Both are cleared after successful submission. The persistence hook uses React Hook Form's `watch()` to auto-save on every field change. The step key is managed separately inside `useStepManager`.

### Environment configuration

All environment variables are accessed through a single `src/shared/config/env.ts` file. `import.meta.env` is never used directly outside this file. The `env` object groups configuration by concern (`openAI`, `app`) and is typed with `as const` for readonly safety.

### API client

A single Axios instance (`openAIClient`) is configured in `shared/api/apiClient.ts` with:

- Base URL and timeout from `env.ts`
- API key injected via request interceptor
- Centralised error logging via response interceptor

Services import the client directly and only define request payloads. No Axios configuration lives outside the client file.

### Reusable form components

Three shared form field components wrap React Hook Form's `Controller`:

- `FormTextField` — text, email, tel, date, number inputs
- `FormSelectField` — select with options array
- `FormNumberField` — numeric input with automatic string-to-number conversion

All components read `control` from props and handle error display internally. The `hideErrorsUntilSubmit` prop on `FormTextField` allows Step 3 fields to suppress errors until the user attempts submission.

---

## AI Integration

The AI writing assistant uses OpenAI `gpt-3.5-turbo` via the chat completions endpoint.

**Request flow:**

```
SituationDetailsStep
→ handleAIAssist (builds contextual prompt)
→ useAIAssistant (manages state)
→ generateSuggestion (service)
→ openAIClient (axios instance)
→ env.openAI (configuration)
```

**Prompt strategy:**

- If the field is empty: use a pre-written field-specific prompt from `fieldPrompts.ts`
- If the field has content: ask the model to improve the existing text
- Language instruction appended to every prompt to enforce response language
- System prompt switches entirely to Arabic when `i18n.language === 'ar'`

**Error handling:**

| Error          | Cause                       | User message            |
| -------------- | --------------------------- | ----------------------- |
| `timeout`      | Request exceeded 15 seconds | "The request timed out" |
| `unauthorized` | Invalid API key             | "Invalid API key"       |
| `rate_limit`   | Too many requests (429)     | "Too many requests"     |
| `network`      | No response from server     | "Network error"         |
| `unknown`      | Anything else               | "Something went wrong"  |

All errors close the modal and surface via notistack Snackbar — non-blocking so the user can retry.

---

## Internationalisation

The app supports English (LTR) and Arabic (RTL) via `react-i18next`.

Language switching triggers:

- MUI theme `direction` update (`ltr` or `rtl`)
- `stylis-plugin-rtl` flips CSS properties automatically
- Font switches from Inter (EN) to Cairo (AR)
- Country names update via `i18n-iso-countries`
- OpenAI prompts switch to Arabic

---

## Security

The OpenAI API key is stored in a `.env` file and called directly from the frontend for the purposes of this assignment. In a production government application this would never be acceptable. The API key would live on a backend server and the frontend would call an internal proxy endpoint to eliminate the risk of key exposure in the browser.

The API key used during development is scoped to **Model capabilities only** (restricted key) so it cannot access billing, account management, or other OpenAI resources.

An Error Boundary wraps the application at the root level to catch unexpected runtime errors gracefully. Async API errors from OpenAI are handled separately through try/catch with specific error states for timeout, authentication failure, and rate limiting.

---

## Testing

Testing was listed as optional in the assignment brief. Due to time constraints tests were not implemented in this submission, however the project is fully configured to support them with Vitest and React Testing Library.

**Proposed testing strategy:**

**Unit tests:**

- Zod validation schemas — all valid and invalid input combinations
- `useStepManager` — navigation, LocalStorage persistence, boundary conditions
- `useAIAssistant` — loading states, error type mapping, suggestion handling
- `useFormPersistence` — save, restore, and clear operations

**Integration tests:**

- Full form wizard flow — fill all 3 steps and submit successfully
- Step validation — verify Next is blocked when required fields are empty
- LocalStorage restore — verify form data and step persist after browser refresh
- Language switching — verify RTL layout and Arabic translations

**E2E tests (Cypress or Playwright):**

- Complete application submission flow end to end
- AI assistant modal — open, accept, edit, discard, regenerate
- Mobile responsive behaviour at 375px viewport

---

## Acknowledgements

- [OpenAI](https://openai.com) — AI writing assistance
- [flagcdn.com](https://flagcdn.com) — Country flag images
- [i18n-iso-countries](https://github.com/michaelwittig/node-i18n-iso-countries) — Country name translations
- [Material UI](https://mui.com) — Component library
- [notistack](https://notistack.com) — Snackbar notifications
