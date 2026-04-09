import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Dimensions, StatusBar, Platform,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { SvgXml } from 'react-native-svg';
import { useTheme } from '../context/ThemeContext';
import { flashcards } from '../data/index';
import { loadProgress, markCard as markCardStorage } from '../data/storage';

const { width } = Dimensions.get('window');

const illustrations = {
  sukhasana: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="18" r="10" fill="none" stroke="#8FA882" stroke-width="2.5"/>
    <line x1="60" y1="28" x2="60" y2="65" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="38" y1="38" x2="82" y2="38" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="38" y1="38" x2="32" y2="72" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="82" y1="38" x2="88" y2="72" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 30 65 Q 40 85 60 80 Q 80 85 90 65" fill="none" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 30 65 Q 45 60 60 65 Q 75 60 90 65" fill="none" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="32" cy="73" r="4" fill="none" stroke="#8FA882" stroke-width="2"/>
    <circle cx="88" cy="73" r="4" fill="none" stroke="#8FA882" stroke-width="2"/>
  </svg>`,
  siddhasana: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="18" r="10" fill="none" stroke="#8FA882" stroke-width="2.5"/>
    <line x1="60" y1="28" x2="60" y2="65" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="36" y1="36" x2="84" y2="36" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="36" y1="36" x2="30" y2="68" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="84" y1="36" x2="90" y2="68" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 28 68 Q 44 58 60 63 Q 76 58 92 68" fill="none" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 33 75 Q 46 82 60 78 Q 74 82 87 75" fill="none" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="30" cy="69" r="4" fill="none" stroke="#8FA882" stroke-width="2"/>
    <circle cx="90" cy="69" r="4" fill="none" stroke="#8FA882" stroke-width="2"/>
    <circle cx="30" cy="69" r="1.5" fill="#8FA882"/>
    <circle cx="90" cy="69" r="1.5" fill="#8FA882"/>
  </svg>`,
  virasana: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="16" r="10" fill="none" stroke="#8FA882" stroke-width="2.5"/>
    <line x1="60" y1="26" x2="60" y2="62" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="36" y1="34" x2="84" y2="34" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="36" y1="34" x2="38" y2="65" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="84" y1="34" x2="82" y2="65" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="60" cy="66" rx="18" ry="7" fill="none" stroke="#8FA882" stroke-width="2.5"/>
    <line x1="42" y1="66" x2="36" y2="88" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="78" y1="66" x2="84" y2="88" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 32 88 Q 36 92 44 90" fill="none" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 88 88 Q 84 92 76 90" fill="none" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="40" cy="65" r="4" fill="none" stroke="#8FA882" stroke-width="2"/>
    <circle cx="80" cy="65" r="4" fill="none" stroke="#8FA882" stroke-width="2"/>
  </svg>`,
  padmasana: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="15" r="10" fill="none" stroke="#8FA882" stroke-width="2.5"/>
    <line x1="60" y1="25" x2="60" y2="62" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="34" y1="34" x2="86" y2="34" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="34" y1="34" x2="26" y2="74" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="86" y1="34" x2="94" y2="74" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 24 74 Q 36 60 60 66 Q 84 60 96 74" fill="none" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 24 74 Q 30 85 44 80" fill="none" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 96 74 Q 90 85 76 80" fill="none" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 44 80 Q 52 88 60 86 Q 68 88 76 80" fill="none" stroke="#8FA882" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="26" cy="75" r="4" fill="none" stroke="#8FA882" stroke-width="2"/>
    <circle cx="94" cy="75" r="4" fill="none" stroke="#8FA882" stroke-width="2"/>
    <circle cx="26" cy="75" r="1.5" fill="#8FA882"/>
    <circle cx="94" cy="75" r="1.5" fill="#8FA882"/>
  </svg>`,
};

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function StudyScreen({ route, navigation }) {
  const { categoryId, categoryLabel, shuffle } = route.params;
  const { theme, isDark } = useTheme();
  const CARD_WIDTH = width - theme.spacing.lg * 2;
  const CARD_HEIGHT = CARD_WIDTH * 1.4;

  const baseCards = categoryId === 'all' ? flashcards : flashcards.filter(c => c.category === categoryId);
  const cards = useMemo(() => shuffle ? shuffleArray(baseCards) : baseCards, []);

  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState({ known: [], practicing: [] });
  const [sessionKnown, setSessionKnown] = useState(0);

  const flipAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => { loadProgress().then(setProgress); }, []);

  const frontInterpolate = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] });
  const backInterpolate = flipAnim.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '360deg'] });

  const flip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isFlipped) {
      Animated.spring(flipAnim, { toValue: 0, useNativeDriver: true, tension: 60, friction: 8 }).start();
    } else {
      Animated.spring(flipAnim, { toValue: 180, useNativeDriver: true, tension: 60, friction: 8 }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const nextCard = (isKnown) => {
    Haptics.impactAsync(isKnown ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light);
    const card = cards[index];
    markCardStorage(card.id, isKnown, progress).then(updated => {
      setProgress(updated);
      if (isKnown && !progress.known.includes(card.id)) setSessionKnown(s => s + 1);
    });
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: isKnown ? -width : width, duration: 250, useNativeDriver: true }),
    ]).start(() => {
      flipAnim.setValue(0);
      setIsFlipped(false);
      slideAnim.setValue(0);
      if (index < cards.length - 1) {
        setIndex(i => i + 1);
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      } else {
        navigation.navigate('Complete', { total: cards.length, sessionKnown, categoryLabel, categoryId, shuffle });
      }
    });
  };

  const card = cards[index];
  const isCardKnown = progress.known.includes(card?.id);
  const hasIllustration = card?.illustration && illustrations[card.illustration];

  const s = makeStyles(theme, CARD_WIDTH, CARD_HEIGHT);

  return (
    <View style={s.container}>
      <StatusBar barStyle={theme.colors.statusBar} />
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Text style={s.backText}>←</Text>
        </TouchableOpacity>
        <View style={s.topCenter}>
          <Text style={s.topCategory}>{categoryLabel}{shuffle ? ' · ⇄' : ''}</Text>
          <Text style={s.topCounter}>{index + 1} of {cards.length}</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <View style={s.dotsRow}>
        {cards.slice(0, Math.min(cards.length, 20)).map((c, i) => (
          <View key={c.id} style={[s.dot, i === index && s.dotActive, progress.known.includes(c.id) && s.dotKnown]} />
        ))}
      </View>

      <View style={s.cardContainer}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}>
          <TouchableOpacity activeOpacity={1} onPress={flip}>
            <Animated.View style={[s.card, s.cardFront, { transform: [{ rotateY: frontInterpolate }] }, isCardKnown && s.cardKnown]}>
              <Text style={s.cardSideLabel}>QUESTION</Text>
              <View style={s.cardDivider} />
              {hasIllustration && <View style={s.illustrationWrap}><SvgXml xml={illustrations[card.illustration]} width={80} height={80} /></View>}
              <Text style={[s.cardFrontText, hasIllustration && s.cardFrontTextSmall]}>{card?.front}</Text>
              <Text style={s.tapHint}>tap to reveal</Text>
              {isCardKnown && <View style={s.knownBadge}><Text style={s.knownBadgeText}>✓ learned</Text></View>}
            </Animated.View>

            <Animated.View style={[s.card, s.cardBack, { transform: [{ rotateY: backInterpolate }] }]}>
              <Text style={s.cardSideLabel}>ANSWER</Text>
              <View style={s.cardDivider} />
              {hasIllustration && <View style={s.illustrationWrap}><SvgXml xml={illustrations[card.illustration]} width={80} height={80} /></View>}
              <Text style={s.cardBackText}>{card?.back}</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={s.actionsRow}>
        <TouchableOpacity style={[s.actionBtn, s.actionPractice]} onPress={() => nextCard(false)} activeOpacity={0.85}>
          <Text style={s.actionIcon}>↺</Text>
          <Text style={s.actionLabelPractice}>Practice again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.actionBtn, s.actionKnown]} onPress={() => nextCard(true)} activeOpacity={0.85}>
          <Text style={s.actionIcon}>✓</Text>
          <Text style={s.actionLabelKnown}>I know this</Text>
        </TouchableOpacity>
      </View>
      <Text style={s.swipeHint}>{isFlipped ? 'tap below to continue' : 'tap the card to see the answer'}</Text>
    </View>
  );
}

const makeStyles = (theme, CARD_WIDTH, CARD_HEIGHT) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingTop: Platform.OS === 'ios' ? 56 : 40, paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.md },
  backBtn: { width: 44, height: 44, alignItems: 'flex-start', justifyContent: 'center' },
  backText: { fontSize: 24, color: theme.colors.inkMid },
  topCenter: { flex: 1, alignItems: 'center' },
  topCategory: { fontFamily: theme.fonts.bodyMedium, fontSize: 13, color: theme.colors.inkDark, letterSpacing: 0.5 },
  topCounter: { fontFamily: theme.fonts.body, fontSize: 12, color: theme.colors.inkFaint, marginTop: 2 },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 5, paddingHorizontal: theme.spacing.lg, marginBottom: theme.spacing.lg, flexWrap: 'wrap' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.backgroundDeep, borderWidth: 0.5, borderColor: theme.colors.inkFaint },
  dotActive: { backgroundColor: theme.colors.inkMid, transform: [{ scale: 1.3 }] },
  dotKnown: { backgroundColor: theme.colors.sage, borderColor: theme.colors.sage },
  cardContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: theme.spacing.lg },
  card: { width: CARD_WIDTH, height: CARD_HEIGHT, backfaceVisibility: 'hidden', borderRadius: theme.radius.xl, padding: theme.spacing.xl, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5 },
  cardFront: { backgroundColor: theme.colors.surface, borderColor: theme.colors.cardBorder },
  cardKnown: { borderColor: 'rgba(122,140,110,0.3)' },
  cardBack: { backgroundColor: theme.colors.surfaceWarm, borderColor: theme.colors.cardBorderBack, position: 'absolute', top: 0, left: 0 },
  cardSideLabel: { fontFamily: theme.fonts.body, fontSize: 10, letterSpacing: 3, color: theme.colors.inkFaint, marginBottom: theme.spacing.sm },
  cardDivider: { width: 24, height: 1, backgroundColor: theme.colors.sand, marginBottom: theme.spacing.md, opacity: 0.6 },
  illustrationWrap: { marginBottom: theme.spacing.md, opacity: 0.85 },
  cardFrontText: { fontFamily: theme.fonts.display, fontSize: 28, color: theme.colors.inkDark, textAlign: 'center', lineHeight: 38, letterSpacing: 0.3 },
  cardFrontTextSmall: { fontSize: 22, lineHeight: 32 },
  cardBackText: { fontFamily: theme.fonts.body, fontSize: 16, color: theme.colors.inkMid, textAlign: 'center', lineHeight: 26 },
  tapHint: { position: 'absolute', bottom: theme.spacing.lg, fontFamily: theme.fonts.bodyLight, fontSize: 12, color: theme.colors.inkFaint, letterSpacing: 1 },
  knownBadge: { position: 'absolute', top: theme.spacing.md, right: theme.spacing.md, backgroundColor: theme.colors.knownBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: theme.radius.full },
  knownBadgeText: { fontFamily: theme.fonts.body, fontSize: 11, color: theme.colors.known },
  actionsRow: { flexDirection: 'row', gap: theme.spacing.sm, paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.md },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: theme.spacing.md, borderRadius: theme.radius.md, borderWidth: 0.5 },
  actionPractice: { backgroundColor: theme.colors.terracottaPale, borderColor: 'rgba(181,116,90,0.3)' },
  actionKnown: { backgroundColor: theme.colors.knownBg, borderColor: 'rgba(122,140,110,0.3)' },
  actionIcon: { fontSize: 18, color: theme.colors.inkMid },
  actionLabelPractice: { fontFamily: theme.fonts.bodyMedium, fontSize: 14, color: theme.colors.terracotta },
  actionLabelKnown: { fontFamily: theme.fonts.bodyMedium, fontSize: 14, color: theme.colors.sage },
  swipeHint: { fontFamily: theme.fonts.bodyLight, fontSize: 12, color: theme.colors.inkFaint, textAlign: 'center', paddingBottom: theme.spacing.xl, letterSpacing: 0.5 },
});
