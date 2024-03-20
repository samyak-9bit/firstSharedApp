import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Platform } from 'react-native';
// @ts-ignore
import { buttonStyle } from './btnStyle';



interface TodoItem {
  task: string;
  id: number;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [err, setErr] = useState<string>('');

  const handleNewTaskChange = (text: string) => {
    setNewTask(text);
  };

  const addTask = () => {
    setErr('');
    if (newTask.trim() !== '') {
      const newTodo: TodoItem = {
        task: newTask,
        id: Date.now(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask('');
    } else {
      setErr('Task cannot be empty.');
    }
  };

  const deleteTask = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTask = (id: number, newTaskText: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, task: newTaskText } : todo
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Text style={styles.toolbarText}>Welcome! to your ToDo App</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.inputLabel}>Write a new task you want to add.</Text>
        <View style={styles.responsive}>
        <TextInput
          value={newTask}
          onChangeText={handleNewTaskChange}
          style={styles.input}
          testID='taskInput'
          placeholder="Enter here..."
        />
        <TouchableOpacity
          onPress={addTask}
          style={buttonStyle.button}
          testID='addTaskBtn'
        >
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.errorMessage}>{err}</Text>
        <View style={styles.tasksContainer} testID="taskText">
          {todos.map(todo => (
            <View key={todo.id} style={styles.taskContainer}>
              <View style={styles.taskContent}>
                <TextInput 
                  style={[
                    styles.taskText,
                    {
                      textDecorationLine: todo.completed ? 'line-through' : 'none',
                    },
                  ]}
                  value={todo.task}
                  onChangeText={(text) => editTask(todo.id, text)}
                  editable={!todo.completed}
                />
              </View>
              <View style={styles.btnContainer}>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Delete"
                    onPress={() => deleteTask(todo.id)}
                    color="red"
                    testID='dltTaskBtn'
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title={todo.completed ? 'Undo' : 'Done'}
                    onPress={() => toggleTaskCompletion(todo.id)}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(246, 241, 213)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(34,84,211)',
    height: 50,
    width: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    height: 40,
    width: 330,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'lucida sans',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  errorMessage: {
    fontSize: 15,
    fontWeight: '400',
    color: 'red',
    padding: 5,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    width: '100%',
  },
  taskContent: {
    flex: 1,
  },
  tasksContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal:10,
  },
  taskText: {
    minWidth: 100,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    marginHorizontal: 5,
  },
  responsive:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: Platform.OS==='web' ? 'row' : 'column'
  }
});

export default App;
