import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState } from 'react'
import React from 'react'

function App() {

  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        text: 'Doctors Appointment',
        day: '2/14/2021',
        reminder: true
      }, {
        id: 2,
        text: 'Meeting',
        day: '3/10/2021',
        reminder: true
      }, {
        id: 3,
        text: 'Dance',
        day: '4/2/2021',
        reminder: false
      },
    ])

  //delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    )
  }

  return (
    <div className="container">
      <h1>React</h1>
      <Header title='Hello' />
      <AddTask/>
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'Nothing here'
      )}
    </div>
  );
}

// This is using classes
// class App extends React.Component {
//   render() {
//     return <h1> hello from class </h1>
//   }
// }

export default App;
