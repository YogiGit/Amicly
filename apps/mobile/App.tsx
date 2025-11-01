import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, RootState, AppDispatch } from './src/redux/store';
import { loadThemeFromStorage } from './src/redux/action/theme';
import { ZText } from './src/components/common/ZText';
import { ZButton } from './src/components/common/ZButton';

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, themeType } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    dispatch(loadThemeFromStorage());
  }, [dispatch]);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <StatusBar
        barStyle={theme.statusBarStyle}
        backgroundColor={theme.backgroundColor}
      />

      <View style={styles.content}>
        <ZText type="B32" style={styles.title}>
          Amicly
        </ZText>

        <ZText type="R16" style={styles.subtitle}>
          Safety-first teen AI companion
        </ZText>

        <ZText type="R14" style={styles.themeInfo}>
          Current theme: {themeType}
        </ZText>

        <View style={styles.buttonContainer}>
          <ZButton
            title="Get Started"
            variant="primary"
            size="large"
            onPress={() => console.log('Get Started pressed')}
          />
        </View>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  themeInfo: {
    marginBottom: 30,
    opacity: 0.7,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
