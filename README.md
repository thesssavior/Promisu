# Promisu - Keep Your Promises to Yourself (MVP)

A streamlined Next.js webapp for making promises to yourself and keeping them. This MVP focuses on the 2 core features: **creating promises** and **daily journaling**.

![Promisu Banner](https://via.placeholder.com/800x200/4F46E5/FFFFFF?text=Promisu+-+Keep+Your+Promises+to+Yourself)

## 🎯 MVP Features

**Making promises to yourself, and keeping them.**

This MVP focuses on:
1. **Creating Promises** - Set commitments like "Post on X for 30 days"
2. **Daily Journal** - Check off promises daily and add notes

Core functionality:
- ✅ User authentication (email/password + Google OAuth)
- ✅ Promise creation with duration, time, and place
- ✅ Daily journal with completion tracking
- ✅ Notes and reflection for each promise
- ✅ Real-time data sync with Supabase

## ✨ Features

### 📝 Promise Creation
- Create promises with specific time and place constraints
- Set duration (days) for your commitment
- Categories for organization (Personal, Health, Work, etc.)
- Optional descriptions for additional context

### 📅 Daily Journal
- Auto-generated daily view showing today's promises
- Mark promises as complete with a single click
- Add personal notes and reflections
- Track your daily progress across all promises

### 📊 Progress Tracking
- Visual progress bars for each promise
- Streak counters to maintain momentum
- Completion statistics
- Status tracking (Active, Completed, Failed, Paused)

### 🎨 Beautiful UI
- Modern, clean design with Tailwind CSS
- Responsive layout for desktop and mobile
- Intuitive navigation between journal and promise views
- Gradient backgrounds and smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/promisu.git
cd promisu
```

2. Install dependencies:
```bash
npm install
```

3. **Set up Supabase**:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the contents of `supabase-schema.sql`
   - Enable Email authentication in Auth settings
   - (Optional) Set up Google OAuth provider

4. **Environment Variables**: Create `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email + OAuth)
- **State Management**: React hooks + Supabase real-time

## 📱 Usage

### Creating Your First Promise

1. Click "New Promise" in the header
2. Enter your promise title (e.g., "Daily post on X for 30 days")
3. Set duration, time, and place preferences
4. Choose a category
5. Click "Create Promise"

### Daily Journal Workflow

1. Start each day by viewing your journal
2. See all active promises for today
3. Complete each promise and add notes
4. Reflect on your progress and challenges

### Example Promise

**Title**: "Daily post on X for 30 days"
- **Duration**: 30 days
- **Time**: 9:00 AM (specific)
- **Place**: Home office (specific)
- **Category**: Social Media

The app will generate daily journal entries showing "Post on X" in your todo list, with the specified time and place as reminders.

## 🎨 Color Scheme

- Primary: Blue (#4F46E5)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Gradient: Blue to Purple
- Background: Light blue gradient

## 📦 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/
│   │   ├── card.tsx        # Reusable card component
│   │   └── button.tsx      # Reusable button component
│   ├── PromiseCard.tsx     # Individual promise display
│   ├── NewPromiseForm.tsx  # Promise creation form
│   └── DailyJournal.tsx    # Daily journal view
├── lib/
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript type definitions
```

## 🚀 Deployment

Ready for deployment to Vercel:

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

Your Supabase database is already set up and will work with the deployed app.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ for self-improvement and accountability**
