import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar, Platform, Animated,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { sections, getAllCards, getCardsByCategory } from '../data/index';
import { loadProgress } from '../data/storage';

function SectionBlock({ section, progress, navigation, theme }) {
  const [expanded, setExpanded] = useState(true);
  const animHeight = React.useRef(new Animated.Value(1)).current;

  const toggle = () => {
    Animated.timing(animHeight, { toValue: expanded ? 0 : 1, duration: 250, useNativeDriver: false }).start();
    setExpanded(!expanded);
  };

  const getCategoryStats = (categoryId) => {
    const cards = getCardsByCategory(categoryId);
    const known = cards.filter(c => progress.known.includes(c.id)).length;
    return { total: cards.length, known, pct: cards.length > 0 ? Math.round((known / cards.length) * 100) : 0 };
  };

  const allSectionCards = section.categories.flatMap(cat => getCardsByCategory(cat.id));
  const sectionKnown = allSectionCards.filter(c => progress.known.includes(c.id)).length;
  const maxHeight = animHeight.interpolate({ inputRange: [0, 1], outputRange: [0, section.categories.length * 80] });
  const opacity = animHeight.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <View style={styles(theme).section}>
      <TouchableOpacity onPress={toggle} activeOpacity={0.8} style={styles(theme).sectionHeader}>
        <View style={styles(theme).sectionHeaderLeft}>
          <Text style={styles(theme).sectionEmoji}>{section.emoji}</Text>
          <View>
            <Text style={styles(theme).sectionTitle}>{section.label}</Text>
            <Text style={styles(theme).sectionMeta}>{allSectionCards.length} cards · {sectionKnown} learned</Text>
          </View>
        </View>
        <Text style={[styles(theme).chevron, !expanded && styles(theme).chevronClosed]}>⌃</Text>
      </TouchableOpacity>
      <Animated.View style={{ maxHeight, opacity, overflow: 'hidden' }}>
        {section.categories.map((cat) => {
          const stats = getCategoryStats(cat.id);
          return (
            <TouchableOpacity
              key={cat.id}
              style={styles(theme).categoryCard}
              onPress={() => navigation.navigate('Study', { categoryId: cat.id, categoryLabel: cat.label, shuffle: false })}
              activeOpacity={0.85}
            >
              <View style={styles(theme).categoryLeft}>
                <Text style={styles(theme).categoryEmoji}>{cat.emoji}</Text>
                <View>
                  <Text style={styles(theme).categoryName}>{cat.label}</Text>
                  <Text style={styles(theme).categoryMeta}>{stats.total} cards · {stats.known} learned</Text>
                </View>
              </View>
              <View style={styles(theme).categoryRight}>
                <Text style={styles(theme).categoryPct}>{stats.pct}%</Text>
                <View style={styles(theme).miniBar}>
                  <View style={[styles(theme).miniBarFill, { width: `${stats.pct}%` }]} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const [progress, setProgress] = useState({ known: [], practicing: [] });

  useFocusEffect(useCallback(() => { loadProgress().then(setProgress); }, []));

  const allCards = getAllCards();
  const totalCards = allCards.length;
  const knownCount = progress.known.length;
  const pct = totalCards > 0 ? Math.round((knownCount / totalCards) * 100) : 0;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={theme.colors.statusBar} backgroundColor={theme.colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles(theme).scroll}>

        <View style={styles(theme).header}>
          <Text style={styles(theme).headerEyebrow}>YOGA TEACHER TRAINING</Text>
          <Text style={styles(theme).headerTitle}>Study Cards</Text>
          <View style={styles(theme).divider} />
          <TouchableOpacity onPress={toggleTheme} style={styles(theme).themeToggle}>
            <Text style={styles(theme).themeToggleText}>{isDark ? '☀ Day' : '☽ Night'}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles(theme).progressCard]}>
          <LinearGradient
            colors={isDark ? [theme.colors.sageDark, '#2A3322'] : [theme.colors.sage, theme.colors.sageDark]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles(theme).progressGradient}
          >
            <View style={styles(theme).progressTop}>
              <View>
                <Text style={styles(theme).progressLabel}>OVERALL PROGRESS</Text>
                <Text style={styles(theme).progressNumber}>{pct}%</Text>
              </View>
              <View style={styles(theme).progressStats}>
                <Text style={styles(theme).progressStat}>{knownCount} learned</Text>
                <Text style={styles(theme).progressStat}>{totalCards - knownCount} to go</Text>
                <Text style={styles(theme).progressStat}>{totalCards} total</Text>
              </View>
            </View>
            <View style={styles(theme).progressBarBg}>
              <View style={[styles(theme).progressBarFill, { width: `${pct}%` }]} />
            </View>
          </LinearGradient>
        </View>

        {/* Action buttons */}
        <View style={styles(theme).actionBtns}>
          <TouchableOpacity
            style={[styles(theme).studyBtn, styles(theme).studyBtnPrimary]}
            onPress={() => navigation.navigate('Study', { categoryId: 'all', categoryLabel: 'All Cards', shuffle: false })}
            activeOpacity={0.85}
          >
            <Text style={styles(theme).studyBtnText}>Study all cards →</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles(theme).studyBtn, styles(theme).studyBtnShuffle]}
            onPress={() => navigation.navigate('Study', { categoryId: 'all', categoryLabel: 'All Cards', shuffle: true })}
            activeOpacity={0.85}
          >
            <Text style={styles(theme).studyBtnShuffleText}>⇄ Shuffle all</Text>
          </TouchableOpacity>
        </View>

        {sections.map((section) => (
          <SectionBlock key={section.id} section={section} progress={progress} navigation={navigation} theme={theme} />
        ))}

        <View style={styles(theme).footer}>
          <Text style={styles(theme).footerText}>✦ &nbsp; practice with presence &nbsp; ✦</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = (theme) => StyleSheet.create({
  scroll: { paddingHorizontal: theme.spacing.lg, paddingBottom: theme.spacing.xxxl },
  header: { paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingBottom: theme.spacing.lg, alignItems: 'center' },
  headerEyebrow: { fontFamily: theme.fonts.body, fontSize: 11, letterSpacing: 3, color: theme.colors.inkFaint, marginBottom: theme.spacing.sm },
  headerTitle: { fontFamily: theme.fonts.display, fontSize: 42, color: theme.colors.inkDark, letterSpacing: 1 },
  divider: { marginTop: theme.spacing.md, width: 40, height: 1, backgroundColor: theme.colors.sand },
  themeToggle: { marginTop: theme.spacing.md, paddingHorizontal: 16, paddingVertical: 6, borderRadius: theme.radius.full, borderWidth: 0.5, borderColor: theme.colors.inkFaint },
  themeToggleText: { fontFamily: theme.fonts.body, fontSize: 13, color: theme.colors.inkLight, letterSpacing: 1 },
  progressCard: { borderRadius: theme.radius.lg, overflow: 'hidden', marginBottom: theme.spacing.md },
  progressGradient: { padding: theme.spacing.lg },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: theme.spacing.md },
  progressLabel: { fontFamily: theme.fonts.body, fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,0.7)', marginBottom: 4 },
  progressNumber: { fontFamily: theme.fonts.display, fontSize: 52, color: '#FFFFFF', lineHeight: 56 },
  progressStats: { alignItems: 'flex-end', gap: 2 },
  progressStat: { fontFamily: theme.fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  progressBarBg: { height: 3, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 2 },
  progressBarFill: { height: 3, backgroundColor: '#FFFFFF', borderRadius: 2 },
  actionBtns: { flexDirection: 'row', gap: theme.spacing.sm, marginBottom: theme.spacing.xl },
  studyBtn: { flex: 1, padding: theme.spacing.md, borderRadius: theme.radius.md, borderWidth: 0.5, alignItems: 'center' },
  studyBtnPrimary: { backgroundColor: theme.colors.surface, borderColor: theme.colors.cardBorder },
  studyBtnShuffle: { backgroundColor: theme.colors.sagePale, borderColor: 'rgba(122,140,110,0.3)' },
  studyBtnText: { fontFamily: theme.fonts.bodyMedium, fontSize: 14, color: theme.colors.inkDark },
  studyBtnShuffleText: { fontFamily: theme.fonts.bodyMedium, fontSize: 14, color: theme.colors.sage },
  section: { marginBottom: theme.spacing.lg },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: theme.spacing.sm, marginBottom: theme.spacing.sm, borderBottomWidth: 0.5, borderBottomColor: theme.colors.sectionBorder },
  sectionHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionEmoji: { fontSize: 16, color: theme.colors.sage },
  sectionTitle: { fontFamily: theme.fonts.display, fontSize: 24, color: theme.colors.inkDark, letterSpacing: 0.5 },
  sectionMeta: { fontFamily: theme.fonts.body, fontSize: 12, color: theme.colors.inkLight, marginTop: 1 },
  chevron: { fontSize: 16, color: theme.colors.inkFaint },
  chevronClosed: { transform: [{ rotate: '180deg' }] },
  categoryCard: { backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding: theme.spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.sm, marginLeft: theme.spacing.md, borderWidth: 0.5, borderColor: theme.colors.cardBorder },
  categoryLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  categoryEmoji: { fontSize: 16, color: theme.colors.sage },
  categoryName: { fontFamily: theme.fonts.bodyMedium, fontSize: 15, color: theme.colors.inkDark, marginBottom: 2 },
  categoryMeta: { fontFamily: theme.fonts.body, fontSize: 12, color: theme.colors.inkLight },
  categoryRight: { alignItems: 'flex-end', gap: 6 },
  categoryPct: { fontFamily: theme.fonts.display, fontSize: 18, color: theme.colors.sage },
  miniBar: { width: 48, height: 2, backgroundColor: theme.colors.sagePale, borderRadius: 1 },
  miniBarFill: { height: 2, backgroundColor: theme.colors.sage, borderRadius: 1 },
  footer: { alignItems: 'center', paddingTop: theme.spacing.xl },
  footerText: { fontFamily: theme.fonts.displayItalic, fontSize: 14, color: theme.colors.inkFaint, letterSpacing: 1 },
});
