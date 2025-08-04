# Portfolio Website with Firebase Admin

A modern, Apple-inspired portfolio website built with Next.js, TypeScript, and Firebase. Features a dynamic project management system with admin authentication.

## Features

- 🎨 **Modern Apple-inspired design** - Clean, minimalist interface with smooth animations
- 🔐 **Firebase Authentication** - Secure admin login system
- 📱 **Responsive Design** - Works perfectly on all devices
- 🌙 **Dark Mode Support** - Automatic theme switching
- 📂 **Dynamic Project Management** - Add, edit, and delete projects with images
- 🚀 **Tech Stack Display** - Showcase your skills with interactive cards
- 📸 **Image Upload** - Firebase Storage integration for project images
- ⚡ **Fast Performance** - Built with Next.js App Router

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Deployment**: Vercel (recommended)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd portfolio-next
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Enable Storage
6. Get your config keys from Project Settings

### 4. Configure Environment Variables

Update the `.env.local` file with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Set your admin email for authentication
NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email@example.com
```

### 5. Create Admin User

1. Go to Firebase Authentication
2. Add a new user with your admin email and password
3. Make sure the email matches `NEXT_PUBLIC_ADMIN_EMAIL` in your env file

### 6. Set up Firestore Rules

In Firebase Console > Firestore Database > Rules, use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to projects for everyone
    match /projects/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "your_admin_email@example.com";
    }
  }
}
```

### 7. Set up Storage Rules

In Firebase Console > Storage > Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "your_admin_email@example.com";
    }
  }
}
```

### 8. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Usage

### Admin Access

1. Go to `/admin/login`
2. Sign in with your admin credentials
3. Access the dashboard at `/admin/dashboard`

### Managing Projects

- **Add Project**: Click "Add New Project" in the admin dashboard
- **Edit Project**: Click "Edit" on any project card
- **Delete Project**: Click "Delete" on any project card
- **Upload Images**: Use the file upload in the project form

### Customization

1. **Personal Information**: Update your name and details in `src/app/page.tsx`
2. **Tech Stack**: Modify the available technologies in `src/types/project.ts`
3. **Styling**: Customize colors and styles in `src/app/globals.css`
4. **Content**: Update sections in `src/app/page.tsx`

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin pages
│   │   ├── login/         # Admin login
│   │   ├── dashboard/     # Project management
│   │   └── projects/      # Add/edit projects
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
├── contexts/              # React contexts
├── lib/                   # Utilities and configs
├── services/              # Firebase services
└── types/                 # TypeScript types
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Important Notes

- Make sure to update Firebase Auth domain with your production URL
- Update CORS settings in Firebase if needed
- Test admin functionality in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help setting up the project, feel free to open an issue or reach out!
