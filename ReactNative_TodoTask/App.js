import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [taskStatus, setTaskStatus] = useState('Todo');

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    };
    loadTasks();
  }, []);

  const saveTasks = async (newTasks) => {
    setTasks(newTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = async () => {
    if (task.length > 0) {
      const newTasks = [...tasks, { id: Date.now().toString(), text: task, status: taskStatus }];
      setTask('');
      setTaskStatus('Todo');
      await saveTasks(newTasks);
    }
  };

  const updateTask = async () => {
    if (task.length > 0) {
      const updatedTasks = tasks.map((t) =>
        t.id === currentTaskId ? { ...t, text: task, status: taskStatus } : t
      );
      setTask('');
      setIsEditing(false);
      setCurrentTaskId(null);
      setTaskStatus('Todo');
      await saveTasks(updatedTasks);
    }
  };

  const deleteTask = async (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    await saveTasks(newTasks);
  };

  const editTask = (id, text, status) => {
    setIsEditing(true);
    setCurrentTaskId(id);
    setTask(text);
    setTaskStatus(status);
  };

  const changeStatus = async (id, status) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, status } : t
    );
    await saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={task}
        onChangeText={setTask}
      />
      <Picker
        selectedValue={taskStatus}
        style={styles.picker}
        onValueChange={(itemValue) => setTaskStatus(itemValue)}
      >
        <Picker.Item label="Todo" value="Todo" />
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Done" value="Done" />
      </Picker>
      <Button
        title={isEditing ? "Update Task" : "Add Task"}
        onPress={isEditing ? updateTask : addTask}
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.text} - {item.status}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => editTask(item.id, item.text, item.status)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:"center",
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 17,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 15,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    paddingLeft:10,
    borderColor: '#ccc',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 17,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    color: 'green',
    marginRight: 10,
    fontSize: 17,
    marginTop: 20,
  },
  deleteButton: {
    color: 'red',
    marginRight: 10,
    fontSize: 17,
    marginTop: 20,
  },
});
