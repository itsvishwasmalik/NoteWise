import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';

const NoteScreen = () => {
  const [note, setNote] = useState({title: '', content: ''});

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="arrow-left" onPress={() => {}} />
        <Appbar.Content title="" />
        <Appbar.Action icon="pin" onPress={() => {}} />
        <Appbar.Action icon="content-save" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.content}>
        <View style={styles.note}>
          <TextInput
            mode="outlined"
            style={styles.title}
            placeholder="Title"
            value={note.title}
            onChangeText={text => {
              setNote({...note, title: text});
            }}
            textColor={'#d1d5db'}
            theme={{
              colors: {
                primary: '#d1d5db',
                onSurfaceVariant: 'transparent',
                background: '#374151',
              },
            }}
            cursorColor="#d1d5db"
            outlineColor="transparent"
            activeOutlineColor="transparent"
            showSoftInputOnFocus={true}
            focusable={true}
            placeholderTextColor="#9ca3af"
          />
          <TextInput
            mode="outlined"
            value={note.content}
            onChangeText={text => {
              setNote({...note, content: text});
            }}
            style={[styles.noteText]}
            textColor={'#d1d5db'}
            theme={{
              colors: {
                primary: '#d1d5db',
                onSurfaceVariant: 'transparent',
                background: '#374151',
              },
            }}
            cursorColor="#d1d5db"
            outlineColor="transparent"
            activeOutlineColor="transparent"
            placeholder="Note"
            placeholderTextColor="#9ca3af"
            multiline={true}
            numberOfLines={5}
            scrollEnabled={true}
            borderBottomWidth={0}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#374151',
  },
  header: {
    backgroundColor: '#374151',
  },
  content: {
    flex: 1,
    backgroundColor: '#374151',
    padding: 10,
  },
  note: {
    padding: 5,
  },
  title: {
    color: '#d1d5db',
    backgroundColor: '#374151',
    fontWeight: 'semibold',
    fontSize: 20,
  },
  noteText: {
    color: '#d1d5db',
    fontSize: 16,
    backgroundColor: '#374151',
    borderColor: 'transparent',
  },
});

export default NoteScreen;
