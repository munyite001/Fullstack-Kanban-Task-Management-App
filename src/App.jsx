/* eslint-disable no-unused-vars */
import './App.css'
import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Display from './components/Display'
import CreateBoardModal from './components/CreateBoardModal'

function App() {

  const [theme, setTheme] = useState('dark')

  const [showSideBar, setShowSideBar] = useState(true);

  const [showCreateBoardModal, setShowCreateBoardModal] = useState(true);

  const [boards, setBoards] = useState([
    {
      id: 1,
      name: 'Platform Launch',
      columns: [
        {
          id: 1,
          name: 'To Do',
          tasks: [
            {
              id: 1,
              name: 'Task 1',
              description: 'Task 1 Description',
              dueDate: '2021-10-20',
              status: 'to-do',
              subtasks: [
                { id: 1, name: 'Subtask 1', completed: false },
                { id: 2, name: 'Subtask 2', completed: true }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'In Progress',
          tasks: [
            {
              id: 2,
              name: 'Task 2',
              description: 'Task 2 Description',
              dueDate: '2021-10-22',
              status: 'in-progress',
              subtasks: [
                { id: 1, name: 'Subtask 1', completed: false },
                { id: 2, name: 'Subtask 2', completed: true }
              ]
            }
          ]
        },
        {
          id: 3,
          name: 'Completed',
          tasks: [
            {
              id: 3,
              name: 'Task 3',
              description: 'Task 3 Description',
              dueDate: '2021-10-25',
              status: 'completed',
              subtasks: [
                { id: 1, name: 'Subtask 1', completed: true },
                { id: 2, name: 'Subtask 2', completed: true }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Marketing Plan',
      columns: [
        {
          id: 1,
          name: 'To Do',
          tasks: [
            {
              id: 1,
              name: 'Task 1',
              description: 'Task 1 Description',
              dueDate: '2021-10-20',
              status: 'to-do',
              subtasks: [
                { id: 1, name: 'Subtask 1', completed: false },
                { id: 2, name: 'Subtask 2', completed: true }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'In Progress',
          tasks: [
            {
              id: 2,
              name: 'Task 2',
              description: 'Task 2 Description',
              dueDate: '2021-10-22',
              status: 'in-progress',
              subtasks: [
                { id: 1, name: 'Subtask 1', completed: false },
                { id: 2, name: 'Subtask 2', completed: true }
              ]
            }
          ]
        },
        {
          id: 3,
          name: 'Completed',
          tasks: [
            {
              id: 3,
              name: 'Task 3',
              description: 'Task 3 Description',
              dueDate: '2021-10-25',
              status: 'completed',
              subtasks: [
                { id: 1, name: 'Subtask 1', completed: true },
                { id: 2, name: 'Subtask 2', completed: true }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Road Map',
      columns: [
        {
          id: 1,
          name: 'To Do',
          tasks: [
            {
              id: 1,
              name: 'Task 1',
              description: 'Task 1 Description',
              dueDate: '2021-10-20',
              status: 'to-do',
              subtasks: [
                { id: 1, name: 'Subtask 1', completed: false },
                { id: 2, name: 'Subtask 2', completed: true }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'In Progress',
          tasks: [
            {
              id: 2,
              name: 'Task 2',
              description: 'Task 2 Description',
              dueDate: '2021-10-22',
              status: 'in-progress',
              subtasks: [
                { id: 1, name: 'Subtask 1', completed: false },
                { id: 2, name: 'Subtask 2', completed: true }
              ]
            }
          ]
        },
        {
          id: 3,
          name: 'Completed',
          tasks: [
            {
              id: 3,
              name: 'Task 3',
              description: 'Task 3 Description',
              dueDate: '2021-10-25',
              status: 'completed',
              subtasks: [
                { id: 1, name: 'Subtask 1', completed: true },
                { id: 2, name: 'Subtask 2', completed: true }
              ]
            }
          ]
        }
      ]
    }
  ]);

  
  const [activeBoard, setActiveBoard] = useState(boards[0] || {})


  useEffect(() => {
    //  Check user preferred color scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    //  Set Initial theme based on system preferrence
    setTheme(prefersDarkScheme.matches ? 'dark' : 'light');

    // Listener for changes in the prefers-color-scheme
    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    // Add event listener for changes
    prefersDarkScheme.addEventListener("change", handleThemeChange);

    // Cleanup the event listener when component unmounts
    return () => prefersDarkScheme.removeEventListener("change", handleThemeChange);

  },[])

  return (
    <div className='app'>
      {showCreateBoardModal && <CreateBoardModal setShowCreateBoardModal={setShowCreateBoardModal} setBoards={setBoards} boards={boards} />}
      <Sidebar 
        theme={theme} 
        boards={boards} 
        setTheme={setTheme} 
        activeBoard={activeBoard} 
        setActiveBoard={setActiveBoard}
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        setShowCreateBoardModal={setShowCreateBoardModal}
        />
      <Display 
        board={activeBoard} 
        showSideBar={showSideBar}
        theme={theme}
        />
    </div>
  )
}

export default App
