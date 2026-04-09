import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

export default function CompleteScreen({ route, navigation }) {
  const { total, sessionKnown, categoryLabel, categoryId, shuffle } = route.params;
  const { theme, isDark } = useTheme();
  const pct = total > 0 ? Math.round((sessionKnown / total) * 100) : 0;

  const getMessage = () => {
    if (pct >= 80) return { title: 'Beautiful practice.', sub: 'Your dedication is showing.' };
    if (pct >= 50) return { title: 'Good progress.', sub: 'Keep returning to the mat.' };
    return { title: 'Every step matters.', sub: 'Consistency is the path.' };
  };
  const msg = getMessage();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={isDark ? ['#2A3322', '#1A1F14'] : [theme.colors.sageDark, theme.colors.sage]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View style={s.inner}>
          <Text style={s.eyebrow}>{categoryLabel.toUpperCase()}</Text>
          <Text style={s.symbol}>◎</Text>
          <Text style={s.title}>{msg.title}</Text>
          <Text style={s.sub}>{msg.sub}</Text>
          <View style={s.statsCard}>
            <View style={s.statRow}>
              <Text style={s.statNum}>{sessionKnown}</Text>
              <Text style={s.statLabel}>cards learned this session</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statRow}>
              <Text style={s.statNum}>{total - sessionKnown}</Text>
              <Text style={s.statLabel}>still practicing</Text>
            </View>
          </View>
          <TouchableOpacity style={s.btnPrimary} onPress={() => navigation.navigate('Study', { categoryId, categoryLabel, shuffle: false })} activeOpacity={0.85}>
            <Text style={s.btnPrimaryText}>Practice again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnShuffle} onPress={() => navigation.navigate('Study', { categoryId, categoryLabel, shuffle: true })} activeOpacity={0.85}>
            <Text style={s.btnShuffleText}>⇄ Shuffle & repeat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnSecondary} onPress={() => navigation.navigate('Home')} activeOpacity={0.85}>
            <Text style={s.btnSecondaryText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const s = StyleSheet.create({
  inner: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, paddingTop: Platform.OS === 'ios' ? 60 : 40 },
  eyebrow: { fontFamily: 'Jost_400Regular', fontSize: 11, letterSpacing: 3, color: 'rgba(255,255,255,0.6)', marginBottom: 24 },
  symbol: { fontSize: 40, color: 'rgba(255,255,255,0.4)', marginBottom: 16 },
  title: { fontFamily: 'CormorantGaramond_600SemiBold', fontSize: 40, color: '#FFFFFF', textAlign: 'center', marginBottom: 8, letterSpacing: 0.5 },
  sub: { fontFamily: 'CormorantGaramond_500Medium_Italic', fontSize: 18, color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginBottom: 40 },
  statsCard: { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 24, paddingVertical: 24, paddingHorizontal: 32, width: '100%', marginBottom: 24, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.2)' },
  statRow: { alignItems: 'center', paddingVertical: 8 },
  statNum: { fontFamily: 'CormorantGaramond_600SemiBold', fontSize: 48, color: '#FFFFFF', lineHeight: 52 },
  statLabel: { fontFamily: 'Jost_400Regular', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  statDivider: { height: 0.5, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 4 },
  btnPrimary: { backgroundColor: '#FFFFFF', borderRadius: 999, paddingVertical: 14, paddingHorizontal: 48, marginBottom: 12 },
  btnPrimaryText: { fontFamily: 'Jost_500Medium', fontSize: 15, color: '#556248', letterSpacing: 0.5 },
  btnShuffle: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 999, paddingVertical: 12, paddingHorizontal: 32, marginBottom: 8, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.3)' },
  btnShuffleText: { fontFamily: 'Jost_500Medium', fontSize: 14, color: '#FFFFFF', letterSpacing: 0.5 },
  btnSecondary: { paddingVertical: 8, paddingHorizontal: 16, marginTop: 4 },
  btnSecondaryText: { fontFamily: 'Jost_400Regular', fontSize: 14, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.5 },
});
