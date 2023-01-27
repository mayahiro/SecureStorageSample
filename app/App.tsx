/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

const save = async (input1: string, input2: string, input3: string) => {
  try {
    await RNSecureStorage.set('key1', input1, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });

    await RNSecureStorage.set('key2', input2, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });

    await RNSecureStorage.set('key3', input3, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
  } catch (e) {
    console.error(e);
  }
};

interface Output {
  output1: string;
  output2: string;
  output3: string;
}

const load = async (): Promise<Output> => {
  let output1 = '';
  let output2 = '';
  let output3 = '';

  try {
    if (await RNSecureStorage.exists('key1')) {
      output1 = await RNSecureStorage.get('key1');
    }

    if (await RNSecureStorage.exists('key2')) {
      output2 = await RNSecureStorage.get('key2');
    }

    if (await RNSecureStorage.exists('key3')) {
      output3 = await RNSecureStorage.get('key3');
    }
  } catch (e) {
    console.error(e);
  }

  return {
    output1,
    output2,
    output3,
  };
};

const clear = async () => {
  try {
    if (await RNSecureStorage.exists('key1')) {
      await RNSecureStorage.remove('key1');
    }

    if (await RNSecureStorage.exists('key2')) {
      await RNSecureStorage.remove('key2');
    }

    if (await RNSecureStorage.exists('key3')) {
      await RNSecureStorage.remove('key3');
    }
  } catch (e) {
    console.error(e);
  }
};

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const [output1, setOutput1] = useState('');
  const [output2, setOutput2] = useState('');
  const [output3, setOutput3] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.sectionContainer}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: isDarkMode ? Colors.white : Colors.black,
                },
              ]}>
              Input
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setInput1}
              value={input1}
            />
            <TextInput
              style={styles.input}
              onChangeText={setInput2}
              value={input2}
            />
            <TextInput
              style={styles.input}
              onChangeText={setInput3}
              value={input3}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: isDarkMode ? Colors.white : Colors.black,
                },
              ]}>
              Output
            </Text>
            <Text
              style={[
                styles.sectionDescription,
                {
                  color: isDarkMode ? Colors.light : Colors.dark,
                },
              ]}>
              {output1}
            </Text>
            <Text
              style={[
                styles.sectionDescription,
                {
                  color: isDarkMode ? Colors.light : Colors.dark,
                },
              ]}>
              {output2}
            </Text>
            <Text
              style={[
                styles.sectionDescription,
                {
                  color: isDarkMode ? Colors.light : Colors.dark,
                },
              ]}>
              {output3}
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            <Button
              title="Save"
              onPress={async () => {
                await save(input1, input2, input3);
              }}
            />
            <Button
              title="Load"
              onPress={async () => {
                const output = await load();
                setOutput1(output.output1);
                setOutput2(output.output2);
                setOutput3(output.output3);
              }}
            />
            <Button
              title="Clear"
              onPress={async () => {
                await clear();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
