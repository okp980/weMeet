/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import Logo from '../assets/svgs/trademark.svg';
import Facebook from '../assets/svgs/facebook.svg';
import Apple from '../assets/svgs/apple.svg';
import Google from '../assets/svgs/google.svg';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 40,
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Logo width={108} height={100} />
        </View>
        <View style={{flex: 0.3, width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              justifyContent: 'space-between',
            }}>
            <View style={styles.line} />
            <Text>sign up with</Text>
            <View style={styles.line} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#E8E6EA',
                padding: 16,
              }}>
              <Facebook width={30} height={30} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#E8E6EA',
                padding: 16,
              }}>
              <Google width={30} height={30} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#E8E6EA',
                padding: 16,
              }}>
              <Apple width={30} height={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 2,
    width: '33%',
    backgroundColor: '#E8E6EA',
  },
});

export default App;
