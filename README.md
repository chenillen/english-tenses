# Project - English Tenses

An interactive English Tense Learning App designed for beginners.

The goal is to create a beautiful, responsive, mobile-first educational application that teaches all major English tenses through visual timelines, examples, quizzes, and progress tracking.

⸻

Product Vision

Most English learners struggle with tenses because grammar books focus on rules instead of understanding time.

This application should help users visualize:

* Past
* Present
* Future

and understand:

* Simple
* Continuous
* Perfect
* Perfect Continuous

through interactive lessons.

The experience should feel closer to Duolingo, Linear, and modern educational apps rather than a traditional grammar textbook.

⸻

Target Users

Primary Users:

* English beginners
* ESL learners
* Middle school students
* High school students
* Adult learners

Language:

* English + Simplified Chinese

⸻

Tech Stack

Required:

* React
* Vite
* TailwindCSS
* Framer Motion

Optional:

* TypeScript
* React Router
* Zustand

Deployment:

* GitHub Pages

⸻

Design Principles

Mobile First

The application must be fully responsive.

Supported sizes:

Mobile

* 375px
* 390px
* 414px

Tablet

* 768px

Desktop

* 1024px+
* 1440px+

⸻

UI Style

Inspired by:

* Duolingo
* Linear
* Notion
* Raycast

Characteristics:

* Large rounded corners
* Clean typography
* Card-based layout
* Generous spacing
* Minimal color usage
* Fast interactions

Avoid:

* Heavy gradients
* Glassmorphism
* Excessive shadows
* 3D effects

⸻

Color System

Tense categories should have consistent colors.

Present

Blue

bg-blue-500

Past

Orange

bg-orange-500

Future

Purple

bg-purple-500

Continuous

Green

bg-green-500

Perfect

Red

bg-red-500

⸻

Core Features

1. Lesson Explorer

Display all lessons.

Example:

Lesson 1
Simple Present
Lesson 2
Simple Past
Lesson 3
Simple Future

Requirements:

* Grid layout on desktop
* Single column on mobile
* Progress indicators

⸻

1. Lesson Detail Page

Each lesson contains:

Concept

Explain the tense in simple language.

Timeline

Visual representation of time.

Grammar Formula

Positive

Negative

Question

Examples

English sentence

Chinese translation

Common Mistakes

Wrong example

Correct example

Quiz

Multiple choice questions

⸻

1. Progress Tracking

Store progress in localStorage.

Track:

* Completed lessons
* Quiz scores
* Learning percentage

Example:

Progress
████████░░
80%

⸻

1. Dark Mode

Support:

* Light Mode
* Dark Mode

Persist preference locally.

⸻

Required Components

Create reusable components.

Header

Contains:

* App title
* Progress
* Theme switch

⸻

LessonCard

Displays:

Lesson Number
Lesson Name
Completion Status

⸻

Timeline

Reusable visualization component.

Examples:

Simple Present

Past ─── Present ─── Future
            ●

Simple Past

Past ●───── Present ─── Future

Simple Future

Past ─── Present ─────● Future

Continuous

Past ──[■■■■]── Future

Perfect

●────────────►

Must be animated using Framer Motion.

⸻

QuizCard

Displays:

Question

Options

Immediate feedback

Example:

He ____ football every day.
A play
B plays
C playing

⸻

ProgressBar

Animated progress bar.

⸻

Animations

Use Framer Motion.

Requirements:

Page Transition

* Fade
* Slide

Duration:

300ms

⸻

Card Hover

Desktop only.

translateY(-4px)

⸻

Lesson Enter

opacity
translateY

⸻

Progress Update

Smooth animation.

⸻

Lesson Data Structure

All lessons must be data-driven.

Store lesson content separately.

Example:

{
  id: 1,
  slug: "simple-present",
  name: "Simple Present",
  chineseName: "一般现在时",
  category: "present",
  difficulty: 1,
  color: "blue",
  usage: [
    "Habits",
    "Facts",
    "Routines"
  ],
  formula: {
    positive: "Subject + Verb",
    negative: "Subject + do/does not + Verb",
    question: "Do/Does + Subject + Verb?"
  },
  examples: [
    {
      en: "I go to school every day.",
      cn: "我每天去学校。"
    }
  ],
  mistakes: [
    {
      wrong: "He play football.",
      correct: "He plays football."
    }
  ],
  quiz: [
    {
      question: "He ____ football every day.",
      options: [
        "play",
        "plays",
        "playing"
      ],
      answer: 1
    }
  ]
}

⸻

Lessons

Implement all 12 tenses.

Level 1

1. Simple Present
2. Simple Past
3. Simple Future

Level 2

1. Present Continuous
2. Past Continuous
3. Future Continuous

Level 3

1. Present Perfect
2. Past Perfect
3. Future Perfect

Level 4

1. Present Perfect Continuous
2. Past Perfect Continuous
3. Future Perfect Continuous

⸻

Routing

Routes:

/

Home page

/lesson/:slug

Lesson page

⸻

Accessibility

Must support:

* Keyboard navigation
* Focus states
* Screen readers
* Proper semantic HTML

⸻

Performance

Requirements:

* Lighthouse > 90
* Responsive
* Mobile optimized
* Fast first load

⸻

GitHub Pages

Configure deployment through GitHub Actions.

Requirements:

* Automatic deployment on push to main
* Production build using Vite
* Correct base path configuration

Repository:

english-tenses

Vite config:

base: "/english-tenses/"

⸻

Future Roadmap

Not required for MVP.

Potential future features:

* AI Grammar Coach
* Speech Synthesis
* Pronunciation Practice
* AI Quiz Generator
* Multi-language Support
* User Accounts
* Streak System
* Spaced Repetition
* PWA Offline Mode

⸻

MVP Definition

The project is considered complete when:

* All 12 tenses are implemented
* Responsive on mobile and desktop
* TailwindCSS styling complete
* Framer Motion animations complete
* Progress tracking works
* Quiz system works
* GitHub Pages deployment works
* Dark mode works
* Lighthouse score above 90
* Clean component architecture
