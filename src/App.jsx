/* eslint-disable no-unused-vars */
import './App.css'
import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Display from './components/Display'
import CreateBoardModal from './components/CreateBoardModal'
import UpdateBoard from './components/UpdateBoard'
import TaskModal from './components/TaskModal'
import TaskDetails from './components/TaskDetails'
import UpdateTask from './components/UpdateTaskDetails'

function App() {

  const [theme, setTheme] = useState('dark')

  const [showSideBar, setShowSideBar] = useState(true);

  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

  const [showUpdateBoardModal, setShowUpdateBoardModal] = useState(false);

  const [showTaskModal, setShowTaskModal] = useState(false);

  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


  const [boards, setBoards] = useState(() => {
    const storedBoards = localStorage.getItem("boards");
    return storedBoards ? JSON.parse(storedBoards) :
    [
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
    ]
  });


  const isAnyModalOpen = showCreateBoardModal || showUpdateBoardModal || showTaskModal || showTaskDetailsModal || showUpdateTaskModal;
  
  const [activeBoard, setActiveBoard] = useState(boards.length > 0 ? boards[0] : null);

  useEffect(() => {
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : 'auto';

    //  Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isAnyModalOpen])

  useEffect(() => {

    window.addEventListener('resize', () => {
      setIsMobile(window.innerWidth < 768);
    });

  }, [isMobile])

  useEffect(() => {
    // Whenever boards change, save them to local storage
    localStorage.setItem("boards", JSON.stringify(boards));

    const updatedBoard = boards.find(board => board.id === activeBoard.id);
    if (updatedBoard) {
      setActiveBoard(updatedBoard);
    }

  }, [boards, activeBoard]);

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
      {showUpdateTaskModal &&
        <UpdateTask 
          selectedTask={selectedTask}
          activeBoard={activeBoard}
          setShowUpdateTaskModal={setShowUpdateTaskModal}
          setBoards={setBoards}
          boards={boards}
          theme={theme}
        />
      }
      {showTaskDetailsModal && 
        <TaskDetails 
          theme={theme}
          selectedTask={selectedTask}
          setShowTaskDetailsModal={setShowTaskDetailsModal}
          boards={boards}
          setBoards={setBoards}
          setShowUpdateTaskModal={setShowUpdateTaskModal}
        />
      }
      {showCreateBoardModal && 
        <CreateBoardModal 
          setShowCreateBoardModal={setShowCreateBoardModal} 
          setBoards={setBoards} 
          boards={boards} 
          theme={theme}
          setActiveBoard={setActiveBoard}
          />}
      {showUpdateBoardModal && 
        <UpdateBoard 
          setShowUpdateBoardModal={setShowUpdateBoardModal}
          setBoards={setBoards} 
          boards={boards} 
          theme={theme}
          activeBoard={activeBoard}
          setActiveBoard={setActiveBoard}
          />}
      {showTaskModal &&
        <TaskModal 
          setShowTaskModal={setShowTaskModal}
          theme={theme}
          boards={boards}
          setBoards={setBoards}
          activeBoard={activeBoard}
          />
      }
      <Sidebar 
        theme={theme} 
        boards={boards} 
        setTheme={setTheme} 
        activeBoard={activeBoard} 
        setActiveBoard={setActiveBoard}
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        setShowCreateBoardModal={setShowCreateBoardModal}
        isMobile={isMobile}
        />
      <Display 
        activeBoard={activeBoard} 
        showSideBar={showSideBar}
        theme={theme}
        setShowTaskModal={setShowTaskModal}
        boards={boards}
        setBoards={setBoards}
        setActiveBoard={setActiveBoard}
        setShowUpdateBoardModal={setShowUpdateBoardModal}
        setSelectedTask={setSelectedTask}
        setShowTaskDetailsModal={setShowTaskDetailsModal}
        />
    </div>
  )
}

export default App
