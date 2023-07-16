import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Appbar, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {dispatch} from '../store';
import {addNote, deleteNote, updateNote} from '../store/slices/notes';
import {openSnackbar} from '../store/slices/snackbar';

const NoteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const notes = useSelector(state => state.notes.notes);
  const [note, setNote] = useState({title: '', content: ''});
  const [currentNoteId, setCurrentNoteId] = useState(null);

  useEffect(() => {
    if (route.params?.noteId && currentNoteId !== route.params?.noteId) {
      setCurrentNoteId(route.params.noteId);
      setNote({
        title: notes[route.params.noteId].title,
        content: notes[route.params.noteId].content,
      });
    }
  }, [notes, route.params?.noteId]);

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleSaveNote = async () => {
    try {
      if (currentNoteId) {
        const {data} = await axios.post(
          `/api/notes/update_note/${currentNoteId}`,
          note,
        );
        dispatch(
          updateNote({
            note: data,
          }),
        );
      } else {
        const {data} = await axios.post('/api/notes/create_note/', note);
        dispatch(
          addNote({
            note: data,
          }),
        );
      }
      navigation.navigate('Home', {refresh: true});
    } catch (error) {
      console.error(error);
      dispatch(
        openSnackbar({
          visible: true,
          message: 'Failed to save note',
        }),
      );
    }
  };

  const handleDeleteNote = async () => {
    try {
      const {data} = await axios.post(
        `/api/notes/delete_note/${currentNoteId}`,
      );
      dispatch(
        deleteNote({
          id: data._id,
        }),
      );
      navigation.navigate('Home', {refresh: true});
    } catch (error) {
      console.error(error);
      dispatch(
        openSnackbar({
          visible: true,
          message: 'Failed to delete note',
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="arrow-left" onPress={handleBack} />
        <Appbar.Content title="" />
        <Appbar.Action icon="pin" onPress={() => {}} />
        {currentNoteId && (
          <Appbar.Action icon="delete" onPress={handleDeleteNote} />
        )}
        <Appbar.Action icon="content-save" onPress={handleSaveNote} />
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
