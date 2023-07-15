import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import useAuth from '../hooks/useAuth';
import {getNotes} from '../store/slices/notes';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.notes);

  const {logout} = useAuth();

  const fetchNotes = async () => {
    console.log('fetching notes');
    const {data} = await axios.get('/api/notes/get_user_notes/');
    if (data) {
      dispatch(
        getNotes({
          notes: data,
        }),
      );
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNotePress = id => {
    console.log('note pressed', id);
    navigation.navigate('Note', {noteId: id});
  };

  const NoteItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          borderColor: 'white',
          borderWidth: 0.75,
          width: '45%',
          height: 122,
          borderRadius: 10,
          padding: 10,
          margin: 10,
          overflow: 'hidden',
        }}
        onPress={() => handleNotePress(item._id)}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => NoteItem({item});

  const handleAddNote = () => {
    // Navigate to NoteSceen
    navigation.navigate('Note');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{backgroundColor: '#171923'}}>
        <Appbar.Content title="Hinweis" />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>

      <FlatList
        data={Object.values(notes)}
        style={{padding: 10}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // set the number of columns to 2,
        renderItem={renderItem}
      />

      <FAB style={styles.fab} icon="plus" onPress={handleAddNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#374151',
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

export default Home;
