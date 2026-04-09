# YTT Flashcards 🧘

A minimal, elegant flashcard app for Yoga Teacher Training — built with React Native & Expo.

---

## Quick Start (5 minutes)

### 1. Install prerequisites (once)
- Install **Node.js**: https://nodejs.org (choose LTS version)
- Install **Expo Go** on your phone (App Store / Google Play)

### 2. Set up the project
Open Terminal (Mac) or Command Prompt (Windows), then:

```bash
cd YTTFlashcards
npm install
npx expo start
```

### 3. Open on your phone
- Scan the QR code shown in the terminal with your phone camera (iOS) or the Expo Go app (Android)
- The app opens instantly — no App Store needed!

---

## Adding New Content

Open `src/data/flashcards.js` to add cards and categories.

### Add a new category:
```js
{ id: 'vinyasa', label: 'Vinyasa Yoga', emoji: '◇' },
```

### Add new cards:
```js
{
  id: 'vin_01',
  category: 'vinyasa',
  front: 'What does Vinyasa mean?',
  back: '"To place in a special way" — linking breath with movement.',
},
```

---

## App Structure

```
YTTFlashcards/
├── App.js                    # Entry point & navigation
├── src/
│   ├── theme/index.js        # Colors, fonts, spacing
│   ├── data/
│   │   ├── flashcards.js     # ← ADD YOUR CONTENT HERE
│   │   └── storage.js        # Progress persistence
│   └── screens/
│       ├── HomeScreen.js     # Overview & categories
│       ├── StudyScreen.js    # Flip card study mode
│       └── CompleteScreen.js # Session summary
```

---

## Monetization Options (later)

- **One-time purchase** on App Store / Google Play (~$4.99)
- **Freemium**: Free basic deck, paid advanced decks (In-App Purchase)
- **Subscription**: Unlock all future content packs
- **B2B**: License to yoga schools / YTT programs

---

## Publishing (when ready)

1. Create an Apple Developer account ($99/year) or Google Play account ($25 one-time)
2. Run `npx expo build:ios` or `npx expo build:android`
3. Submit to the respective store

For help publishing, just ask Claude! 🙏
