# CertiChain - Blockchain Certificate Verification

A production-ready frontend application for blockchain-based certificate verification system built with React, TypeScript, and Tailwind CSS.

## Features

### Landing Page
- Modern hero section with gradient background
- Feature showcase (OCR, Blockchain, Verification)
- Benefits section highlighting key advantages
- Call-to-action sections
- Responsive design

### Admin Dashboard (Issuer Panel)
- File upload with drag-and-drop support
- OCR data extraction simulation
- Certificate data preview
- Document hash generation
- Blockchain storage simulation
- Transaction hash display
- Success/error states with visual feedback
- Sidebar navigation

### User Verification Page
- Certificate upload interface
- Real-time verification processing
- Visual feedback (Valid/Invalid)
- Extracted data display
- OCR confidence metrics
- Document hash display
- Step-by-step verification guide

### Authentication
- Admin login with form validation
- User login interface
- Session management with localStorage
- Protected routes

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── FileUpload.tsx
│   ├── ResultCard.tsx
│   ├── Toast.tsx
│   ├── ToastContainer.tsx
│   └── LoadingSpinner.tsx
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── AdminLogin.tsx
│   ├── UserLogin.tsx
│   ├── AdminDashboard.tsx
│   └── VerifyCertificate.tsx
├── hooks/              # Custom hooks
│   └── useToast.tsx
├── App.tsx             # Main app with routing
└── main.tsx            # Entry point
```

## Routes

- `/` - Landing page
- `/admin/login` - Admin authentication
- `/admin/dashboard` - Admin dashboard (protected)
- `/user/login` - User authentication
- `/verify` - Certificate verification

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React (icons)

## Design Features

- Fully responsive layout (mobile, tablet, desktop)
- Modern gradient backgrounds
- Smooth transitions and hover effects
- Loading states and spinners
- Toast notifications
- Drag-and-drop file upload
- Color-coded status indicators
- Professional card layouts
- Consistent spacing and typography

## Mock Data

The application currently uses simulated data for:
- OCR extraction
- Blockchain storage
- Certificate verification
- Hash generation

These can be easily replaced with actual API calls when backend is ready.

## Getting Started

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Next Steps

To connect with a real backend:

1. Replace mock data in `AdminDashboard.tsx` with actual OCR API calls
2. Connect blockchain storage functions to smart contracts
3. Implement real verification logic in `VerifyCertificate.tsx`
4. Add actual authentication with JWT tokens
5. Connect to database for certificate history
6. Add environment variables for API endpoints
