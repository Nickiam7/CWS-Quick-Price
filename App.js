import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import MainScreen from './screens/MainScreen';
import Header from './components/Header';

const fetchFonts = () => {
  return Font.loadAsync({
    'jo-sans-bold': require('./assets/fonts/JosefinSans-Bold.ttf')
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)} 
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title='Quick Price Template' />
      <MainScreen />      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
