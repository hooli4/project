import React, { useState } from 'react'; /* Импортируем React и хук useState, который позволяет управлять состоянием компонентов.*/
import { motion, AnimatePresence } from 'framer-motion'; /* Импорт анимационных компонентов из библиотеки framer-motion:motion используется для анимации компонентов. AnimatePresence позволяет анимировать появление/исчезновение элементов.*/

export default function App() { /* Объявляется и экспортируется главный компонент App. */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'Тестовая доска',
      tasks: [],
    },
  ]);

  const [boardName, setBoardName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newSubtaskTitles, setNewSubtaskTitles] = useState({});

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());


  const handleCreateBoard = () => {
    setModalOpen(true);
  };

  const handleModalSubmit = () => {
    if (boardName.trim()) {
      const newBoard = {
        id: Date.now(),
        title: boardName,
        tasks: [],
      };
      setBoards(prev => [...prev, newBoard]);
    }
    setModalOpen(false);
    setBoardName('');
  };

  const handleAddSubtask = (boardId, taskId, subtaskTitle) => {
    if (!subtaskTitle.trim()) return;
  
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.map(task =>
                task.id === taskId
                  ? {
                      ...task,
                      subtasks: [...(task.subtasks || []), { id: Date.now(), title: subtaskTitle }]
                    }
                  : task
              )
            }
          : board
      )
    );
  
    setNewSubtaskTitles(prev => ({ ...prev, [taskId]: '' }));
  };

  const toggleCalendar = () => {
    setShowCalendar(prev => !prev);
    setShowTable(false);
  };
  
  const toggleTable = () => {
    setShowTable(prev => !prev);
    setShowCalendar(false);
  };  

  return (
    <div>
      <header className="header">
        <h1>Tuskpanel</h1>
        <nav className="nav">
          <button>Настройки</button>
          <button>Панель проектов</button>
          <button>Профиль</button>
        </nav>
      </header>
      <div className="toolbar">
        <button className="create-board-btn" onClick={handleCreateBoard}>Создать доску</button>
        <button className="toolbar-btn" onClick={toggleCalendar}>Календарь</button>
        <button className="toolbar-btn" onClick={toggleTable}>Таблица</button>
      </div>
      <AnimatePresence>
        {modalOpen && (
          <div className="modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="modal"
            >
              <h2>Создать доску</h2>
              <input
                type="text"
                className="input-field"
                placeholder="Введите название доски"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
              />
              <div className="modal-actions">
                <button
                  onClick={() => setModalOpen(false)}
                  className="cancel-btn"
                >
                  Отмена
                </button>
                <button
                  onClick={handleModalSubmit}
                  className="create-btn"
                >
                  Создать
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: sidebarOpen ? 250 : 50,
        }}
        transition={{ duration: 0.3 }} 
        className="sidebar"
      >
        <div className="sidebar-toggle">
          <button onClick={() => setSidebarOpen(prev => !prev)} className="sidebar-btn">
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>
        {sidebarOpen && (
          <>
            <h3>Участники проекта</h3>
            <ul>
              <li>Алексей</li>
              <li>Иван</li>
            </ul>
          </>
        )}
      </motion.div>
      <div className="content">
        <h1>Ваши доски</h1>
        <div className="board-list">
          {boards.map(board => (
            <div key={board.id} className="board">
              <h3>{board.title}</h3>
              <input
                type="text"
                className="task-input"
                placeholder="Новая задача"
                value={board.newTaskTitle || ''}
                onChange={(e) =>
                  setBoards(prev =>
                    prev.map(b =>
                      b.id === board.id
                        ? { ...b, newTaskTitle: e.target.value }
                      : b
                    )
                  )
                }
              />
              <button
                className="add-task-btn"
                onClick={() => {
                  if (!board.newTaskTitle?.trim()) return;
                  const newTask = {
                    id: Date.now(),
                    title: board.newTaskTitle,
                    subtasks: [],
                  };
                  setBoards(prev =>
                    prev.map(b =>
                      b.id === board.id
                        ? {
                            ...b,
                            tasks: [...b.tasks, newTask],
                            newTaskTitle: '',
                          }
                        : b
                    )
                  );
                }}
              >
                Добавить задачу
              </button>
              {board.tasks.map(task => (
                <div key={task.id} className="task">
                  <h4>{task.title}</h4>
                  <ol>
                    {(task.subtasks || []).map((sub) => (
                      <li key={sub.id}>
                        {sub.title}
                      </li>
                    ))}
                  </ol>
                  <input
                    type="text"
                    className="task-input"
                    placeholder="Новая подзадача"
                    value={newSubtaskTitles[task.id] || ''}
                    onChange={(e) =>
                      setNewSubtaskTitles({ ...newSubtaskTitles, [task.id]: e.target.value })
                    }
                  />
                  <button className="add-subtask-btn" onClick={() => handleAddSubtask(board.id, task.id, newSubtaskTitles[task.id])}>
                    Добавить подзадачу
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {showCalendar && (
        <div className="calendar-modal">
          <h2>Календарь</h2>
          <div className="calendar-controls">
            <input
              type="month"
              value={selectedDate.toISOString().slice(0, 7)}
              onChange={(e) => {
                const [year, month] = e.target.value.split('-');
                const newDate = new Date(selectedDate);
                newDate.setFullYear(+year, +month - 1);
                setSelectedDate(newDate);
              }}
            />
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
          <div className="calendar-week">
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date(selectedDate);
              date.setDate(date.getDate() + i);
              return (
                <div key={i} className="calendar-day">
                  <div className="calendar-weekday">{date.toLocaleDateString('ru-RU', { weekday: 'short' })}</div>
                  <div className="calendar-date">{date.toLocaleDateString('ru-RU')}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {showTable && (
        <div className="table-modal">
          <h2>Таблица досок</h2>
          <table className="board-table">
            <thead>
              <tr>
                <th>Название доски</th>
                <th>Количество задач</th>
              </tr>
            </thead>
            <tbody>
              {boards.map((board) => (
                <tr key={board.id}>
                  <td>{board.title}</td>
                  <td>{board.tasks.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}