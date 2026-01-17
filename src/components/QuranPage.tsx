import React from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { QuranImages } from '../constants/imageMap';
import { useQuranPage } from '../hooks/useQuranPage';

const { width } = Dimensions.get('window');
// Aspect ratio 1440 / 232 = 6.206
const LINE_ASPECT_RATIO = 1440 / 232;
const LINE_HEIGHT = width / LINE_ASPECT_RATIO;

interface Props {
  pageNumber: number;
  activeChapter?: number;
  activeVerse?: number | null;
}

export const QuranPage: React.FC<Props> = ({ pageNumber, activeChapter, activeVerse }) => {
  const { page, loading } = useQuranPage(pageNumber);
  const images = QuranImages[pageNumber];

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!images) {
    return <View style={styles.container} />;
  }

  const renderHighlights = (lineIndex: number) => {
    if (!page || !activeVerse || !activeChapter) return null;

    const versesToHighlight = page.verses1441.filter(v => 
      v.chapter?.number === activeChapter && v.number === activeVerse
    );

    return versesToHighlight.map(v => {
      const highlights = v.highlights1441.filter(h => h.line === lineIndex);
      return highlights.map((h, i) => {
        const left = width * (1.0 - h.right);
        const w = width * (h.right - h.left);
        
        return (
          <View
            key={`${v.verseID}-${i}`}
            style={{
              position: 'absolute',
              left: left,
              width: w,
              height: '100%',
              backgroundColor: 'rgba(88, 168, 105, 0.4)', // Quran green highlight
              borderRadius: 4,
            }}
          />
        );
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.linesContainer}>
        {images.map((source, index) => (
          <View key={index} style={{ width, height: LINE_HEIGHT }}>
            <Image
              source={source}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
            {renderHighlights(index)}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
  },
  linesContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
});
