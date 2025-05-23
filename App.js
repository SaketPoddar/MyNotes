import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

//NotesApp(SignupPage)

const COLORS = {
  primary: "#1E90FF",
  secondary: "#00BFFF",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#ccc",
  error: "#d9534f",
};

const SimpleButton = ({ onPress, text, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSaveNote = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Note title cannot be empty!");
      return;
    }
    const newNote = { id: selectedNote?.id || Date.now(), title, content };
    setNotes((prevNotes) =>
      selectedNote
        ? prevNotes.map((note) => (note.id === selectedNote.id ? newNote : note))
        : [...prevNotes, newNote]
    );
    resetModalState();
  };

  const resetModalState = () => {
    setTitle("");
    setContent("");
    setModalVisible(false);
    setSelectedNote(null);
  };

  const handleDeleteNote = () => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== selectedNote.id));
    resetModalState();
  };

  return (
    <View style={styles.container}>
      {showLandingPage ? (
        <View style={styles.landingPage}>
          <View style={styles.header}>  
            <Text style={styles.title}>Welcome to My Notes</Text>
          </View>
          <View style={styles.welcomeContent}>
            <Text style={styles.landingText}>Organize your thoughts and ideas with ease!</Text>
            <SimpleButton onPress={() => setShowLandingPage(false)} text="Start Now" style={styles.startButton} />
          </View>
        </View>
      ) : (
        <>
          <View style={styles.header}>  
            <Text style={styles.headerTitle}>My Notes</Text>
          </View>
          <ScrollView style={styles.noteList}>
            {notes.map((note) => (
              <TouchableOpacity
                key={note.id}
                onPress={() => {
                  setSelectedNote(note);
                  setTitle(note.title);
                  setContent(note.content);
                  setModalVisible(true);
                }}
                style={styles.noteCard}
              >
                <Text style={styles.noteTitle}>{note.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <SimpleButton
            onPress={() => {
              resetModalState();
              setModalVisible(true);
            }}
            text="Add Note"
            style={styles.addButton}
          />
          <SimpleButton
            onPress={() => setShowLandingPage(true)}
            text="< Back"
            style={styles.backButton}
          />
        </>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter note title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.contentInput}
              multiline
              placeholder="Enter note content"
              value={content}
              onChangeText={setContent}
            />
            <View style={styles.buttonContainer}>
              <SimpleButton onPress={handleSaveNote} text="Save" />
              <SimpleButton onPress={resetModalState} text="Cancel" style={styles.cancelButton} />
              {selectedNote && (
                <SimpleButton
                  onPress={handleDeleteNote}
                  text="Delete"
                  style={styles.deleteButton}
                />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: { padding: moderateScale(20), alignItems: "center", backgroundColor: COLORS.primary },
  title: { fontSize: moderateScale(28), color: COLORS.white, fontWeight: "bold" },
  landingPage: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.white },
  welcomeContent: { alignItems: "center" },
  landingText: { fontSize: moderateScale(16), color: COLORS.black, marginBottom: moderateScale(20) },
  noteList: { marginTop: moderateScale(10), padding: moderateScale(10) },
  noteCard: { padding: moderateScale(15), marginBottom: moderateScale(10), backgroundColor: COLORS.gray, borderRadius: 8 },
  noteTitle: { fontSize: moderateScale(18), fontWeight: "bold", color: COLORS.black },
  button: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  buttonText: { color: COLORS.white, textAlign: "center", fontSize: moderateScale(16) },
  addButton: { position: "absolute", bottom: moderateScale(80), right: moderateScale(20) },
  backButton: { position: "absolute", bottom: moderateScale(140), right: moderateScale(20) },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContainer: { width: "90%", padding: 20, backgroundColor: COLORS.white, borderRadius: 10 },
  input: { borderBottomWidth: 1, marginBottom: moderateScale(10), fontSize: moderateScale(16) },
  contentInput: { borderWidth: 1, padding: 10, fontSize: moderateScale(16), marginBottom: 15 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
  cancelButton: { marginLeft: 10 },
  deleteButton: { marginLeft: 10, backgroundColor: COLORS.error },
  startButton: { marginTop: moderateScale(20) },
});

export default App;
