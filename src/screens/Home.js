import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {Appbar, FAB, List, TextInput, Button} from 'react-native-paper';

const HomeScreen = () => {
  const [notes, setNotes] = useState([
    {id: '1', title: 'Note 1', content: 'This is the first note.'},
    {id: '2', title: 'Note 2', content: 'This is the second note.'},
    {id: '3', title: 'Note 3', content: 'This is the third note.'},
    {id: '4', title: 'Note 4', content: 'This is the fourth note.'},
    {id: '5', title: 'Note 5', content: 'This is the fifth note.'},
    {id: '6', title: 'Note 6', content: 'This is the sixth note.'},
    {id: '7', title: 'Note 7', content: 'This is the seventh note.'},
    {id: '8', title: 'Note 8', content: 'This is the eighth note.'},
    {id: '9', title: 'Note 9', content: 'This is the ninth note.'},
    {id: '10', title: 'Note 10', content: 'This is the tenth note.'},
  ]);
  const [newNote, setNewNote] = useState({title: '', content: ''});
  const [editNote, setEditNote] = useState(null);

  const NoteItem = ({item, handleDeleteNote, setEditNote}) => {
    return (
      <View
        style={{
          backgroundColor: 'grey',
          width: '45%',
          height: 100,
          borderRadius: 10,
          padding: 10,
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
          <Text style={styles.content}>{item.content}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEditNote(item)}></TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item}) =>
    NoteItem({item, handleDeleteNote, setEditNote});

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      const id = String(notes.length + 1);
      const note = {id, ...newNote};
      setNotes([...notes, note]);
      setNewNote({title: '', content: ''});
    }
  };

  const handleEditNote = () => {
    if (editNote.title && editNote.content) {
      const updatedNotes = notes.map(note =>
        note.id === editNote.id ? editNote : note,
      );
      setNotes(updatedNotes);
      setEditNote(null);
    }
  };

  const handleCancelEdit = () => {
    setEditNote(null);
  };

  const handleDeleteNote = id => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{backgroundColor: '#171923'}}>
        <Appbar.Content title="Hinweis" />
      </Appbar.Header>

      <FlatList
        data={notes}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // set the number of columns to 2,
        renderItem={renderItem}
      />

      <FAB style={styles.fab} icon="plus" onPress={handleAddNote} />

      {/* <TextInput
        label="Title"
        value={editNote?.title}
        onChangeText={text => setEditNote({...editNote, title: text})}
      />

      <TextInput
        label="Content"
        value={editNote?.content}
        onChangeText={text => setEditNote({...editNote, content: text})}
      /> */}

      {editNote && (
        <View style={styles.editButtons}>
          <Button
            style={styles.editButton}
            mode="contained"
            onPress={handleEditNote}>
            Save
          </Button>
          <Button
            style={styles.editButton}
            mode="outlined"
            onPress={handleCancelEdit}>
            Cancel
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2596be',
    color: 'grey',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  editButton: {
    marginHorizontal: 8,
  },
});

export default HomeScreen;
