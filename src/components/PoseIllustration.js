import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

const illustrations = {
  sukhasana: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="18" r="10" fill="none" stroke="#7A8C6E" stroke-width="2.5"/>
    <line x1="60" y1="28" x2="60" y2="65" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="38" y1="38" x2="82" y2="38" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="38" y1="38" x2="32" y2="72" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="82" y1="38" x2="88" y2="72" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 30 65 Q 40 85 60 80 Q 80 85 90 65" fill="none" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 30 65 Q 45 60 60 65 Q 75 60 90 65" fill="none" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="32" cy="73" r="4" fill="none" stroke="#7A8C6E" stroke-width="2"/>
    <circle cx="88" cy="73" r="4" fill="none" stroke="#7A8C6E" stroke-width="2"/>
  </svg>`,

  siddhasana: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="18" r="10" fill="none" stroke="#7A8C6E" stroke-width="2.5"/>
    <line x1="60" y1="28" x2="60" y2="65" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="36" y1="36" x2="84" y2="36" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="36" y1="36" x2="30" y2="68" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="84" y1="36" x2="90" y2="68" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 28 68 Q 44 58 60 63 Q 76 58 92 68" fill="none" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 33 75 Q 46 82 60 78 Q 74 82 87 75" fill="none" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="30" cy="69" r="4" fill="none" stroke="#7A8C6E" stroke-width="2"/>
    <circle cx="90" cy="69" r="4" fill="none" stroke="#7A8C6E" stroke-width="2"/>
    <circle cx="30" cy="69" r="1.5" fill="#7A8C6E"/>
    <circle cx="90" cy="69" r="1.5" fill="#7A8C6E"/>
  </svg>`,

  virasana: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="16" r="10" fill="none" stroke="#7A8C6E" stroke-width="2.5"/>
    <line x1="60" y1="26" x2="60" y2="62" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="36" y1="34" x2="84" y2="34" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="36" y1="34" x2="38" y2="65" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="84" y1="34" x2="82" y2="65" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="60" cy="66" rx="18" ry="7" fill="none" stroke="#7A8C6E" stroke-width="2.5"/>
    <line x1="42" y1="66" x2="36" y2="88" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="78" y1="66" x2="84" y2="88" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 32 88 Q 36 92 44 90" fill="none" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 88 88 Q 84 92 76 90" fill="none" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="40" cy="65" r="4" fill="none" stroke="#7A8C6E" stroke-width="2"/>
    <circle cx="80" cy="65" r="4" fill="none" stroke="#7A8C6E" stroke-width="2"/>
  </svg>`,

  padmasana: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="15" r="10" fill="none" stroke="#7A8C6E" stroke-width="2.5"/>
    <line x1="60" y1="25" x2="60" y2="62" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="34" y1="34" x2="86" y2="34" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="34" y1="34" x2="26" y2="74" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="86" y1="34" x2="94" y2="74" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 24 74 Q 36 60 60 66 Q 84 60 96 74" fill="none" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 24 74 Q 30 85 44 80" fill="none" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 96 74 Q 90 85 76 80" fill="none" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 44 80 Q 52 88 60 86 Q 68 88 76 80" fill="none" stroke="#7A8C6E" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="26" cy="75" r="4" fill="none" stroke="#7A8C6E" stroke-width="2"/>
    <circle cx="94" cy="75" r="4" fill="none" stroke="#7A8C6E" stroke-width="2"/>
    <circle cx="26" cy="75" r="1.5" fill="#7A8C6E"/>
    <circle cx="94" cy="75" r="1.5" fill="#7A8C6E"/>
  </svg>`,
};

export default function PoseIllustration({ pose, size = 100 }) {
  const svg = illustrations[pose];
  if (!svg) return null;
  return (
    <View style={{ width: size, height: size }}>
      <SvgXml xml={svg} width={size} height={size} />
    </View>
  );
}
