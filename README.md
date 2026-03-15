# 🚗 TUYA Ride-Hailing Monorepo

## 📁 Structure

```
tuya-monorepo/
├── apps/
│   ├── driver-app/          # Next.js Driver App
│   ├── passenger-app/       # Next.js Passenger App
│   └── admin-dashboard/     # Next.js Admin Dashboard
├── packages/
│   ├── ui/                  # shadcn/ui components
│   ├── api/                 # API client & hooks
│   └── hooks/               # Custom React hooks
└── package.json
```

## 🚀 Getting Started

### Install Dependencies
```bash
cd /home/ubuntu/tuya-monorepo
pnpm install
```

### Development
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

## 📱 Apps

### Driver App
- Location tracking
- Ride acceptance
- Navigation
- Earnings management

### Passenger App
- Ride booking
- Real-time tracking
- Payment
- Rating system

### Admin Dashboard
- Driver management
- Trip monitoring
- Analytics & reports
- Fraud detection

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Maps:** Google Maps API
- **Real-time:** Socket.io
- **Database:** Supabase
- **Package Manager:** pnpm
- **Monorepo:** Turbo

## 📊 Timeline

- Phase 1: Setup (1 day)
- Phase 2: Driver App UI (3 days)
- Phase 3: Passenger App UI (3 days)
- Phase 4: Admin Dashboard (2 days)
- Phase 5: API Integration (2 days)
- Phase 6: Testing (2 days)

**Total: 10-12 days**
