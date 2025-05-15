import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'Тестовая доска',
      description: 'Описание доски',
      tasks: [],
      members: ['Алексей', 'Иван'],
    },
  ]);

  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [newSubtaskTitles, setNewSubtaskTitles] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleCreateBoard = () => {
    setModalOpen(true);
  };
  const handleModalSubmit = () => {
    if (boardName.trim()) {
      const newBoard = {
        id: Date.now(),
        title: boardName,
        description: boardDescription,
        tasks: [],
        members: [],
      };
      setBoards(prev => [...prev, newBoard]);
    }
    setModalOpen(false);
    setBoardName('');
    setBoardDescription('');
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
                      subtasks: [...(task.subtasks || []), { id: Date.now(), title: subtaskTitle }],
                    }
                  : task
              ),
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
  const cancelEditTask = () => {
    setEditingTask(null);
    setEditingTaskData({
      title: '',
      description: '',
      status: 'В ожидании',
      priority: 'Средний',
      deadline: '',
    });
  };
  const deleteTask = (boardId, taskId) => {
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.filter(task => task.id !== taskId),
            }
          : board
      )
    );
    if (editingTask?.taskId === taskId && editingTask?.boardId === boardId) {
      cancelEditTask();
    }
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
        <button className="create-board-btn" onClick={handleCreateBoard}>
          Создать доску
        </button>
        <button className="toolbar-btn" onClick={toggleCalendar}>
          Календарь
        </button>
        <button className="toolbar-btn" onClick={toggleTable}>
          Таблица
        </button>
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
                onChange={e => setBoardName(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Описание доски"
                value={boardDescription}
                onChange={e => setBoardDescription(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={() => setModalOpen(false)} className="cancel-btn">
                  Отмена
                </button>
                <button onClick={handleModalSubmit} className="create-btn">
                  Создать
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: sidebarOpen ? 250 : 50 }}
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
              <h4>Название доски:</h4>
              <input
                type="text"
                className="board-title-input"
                value={board.title}
                onChange={e =>
                  setBoards(prev =>
                    prev.map(b => (b.id === board.id ? { ...b, title: e.target.value } : b))
                  )
                }
              />
              <h4>Описание доски:</h4>
              <textarea
                className="board-description"
                placeholder="Описание доски"
                value={board.description}
                onChange={e =>
                  setBoards(prev =>
                    prev.map(b => (b.id === board.id ? { ...b, description: e.target.value } : b))
                  )
                }
              />
              <h4>Участники:</h4>
              <ul>
                {board.members.map((member, i) => (
                  <li key={i}>{member}</li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Имя участника"
                value={board.newMember || ''}
                onChange={e =>
                  setBoards(prev =>
                    prev.map(b => (b.id === board.id ? { ...b, newMember: e.target.value } : b))
                  )
                }
              />
              <button
                className="add-task-btn"
                onClick={() => {
                  if (!board.newMember?.trim()) return;
                  setBoards(prev =>
                    prev.map(b =>
                      b.id === board.id
                        ? {
                            ...b,
                            members: [...b.members, b.newMember],
                            newMember: '',
                          }
                        : b
                    )
                  );
                }}
              >
                Добавить участника
              </button>
              <button
                className="add-cart-btn"
                onClick={() =>
                  setShowTaskForm(prev => ({ ...prev, [board.id]: !prev[board.id] }))
                }
              >
                {showTaskForm[board.id] ? 'Скрыть карточку' : 'Добавить карточку'}
              </button>

              {showTaskForm[board.id] && (
                <>
                  <h4>Название карточки:</h4>
                  <input
                    type="text"
                    className="task-input"
                    placeholder="Карточка"
                    value={board.newTaskTitle || ''}
                    onChange={e =>
                      setBoards(prev =>
                        prev.map(b =>
                          b.id === board.id ? { ...b, newTaskTitle: e.target.value } : b
                        )
                      )
                    }
                  />
                  <h4>Описание карточки:</h4>
                  <textarea
                    className="task-input"
                    placeholder="Описание"
                    value={board.newTaskDescription || ''}
                    onChange={e =>
                      setBoards(prev =>
                        prev.map(b =>
                          b.id === board.id ? { ...b, newTaskDescription: e.target.value } : b
                        )
                      )
                    }
                  />
                  <h4>Статус карточки:</h4>
                  <select
                    className="task-input"
                    value={board.newTaskStatus || 'В ожидании'}
                    onChange={e =>
                      setBoards(prev =>
                        prev.map(b =>
                          b.id === board.id ? { ...b, newTaskStatus: e.target.value } : b
                        )
                      )
                    }
                  >
                    <option>В ожидании</option>
                    <option>В работе</option>
                    <option>Завершено</option>
                  </select>
                  <h4>Приоритет карточки:</h4>
                  <select
                    className="task-input"
                    value={board.newTaskPriority || 'Средний'}
                    onChange={e =>
                      setBoards(prev =>
                        prev.map(b =>
                          b.id === board.id ? { ...b, newTaskPriority: e.target.value } : b
                        )
                      )
                    }
                  >
                    <option>Низкий</option>
                    <option>Средний</option>
                    <option>Высокий</option>
                  </select>
                  <h4>Время окончания карточки:</h4>
                  <input
                    type="date"
                    className="task-input"
                    value={board.newTaskDeadline || ''}
                    onChange={e =>
                      setBoards(prev =>
                        prev.map(b =>
                          b.id === board.id ? { ...b, newTaskDeadline: e.target.value } : b
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
                        description: board.newTaskDescription || '',
                        status: board.newTaskStatus || 'В ожидании',
                        priority: board.newTaskPriority || 'Средний',
                        deadline: board.newTaskDeadline || '',
                        subtasks: [],
                      };
                      setBoards(prev =>
                        prev.map(b =>
                          b.id === board.id
                            ? {
                                ...b,
                                tasks: [...b.tasks, newTask],
                                newTaskTitle: '',
                                newTaskDescription: '',
                                newTaskStatus: 'В ожидании',
                                newTaskPriority: 'Средний',
                                newTaskDeadline: '',
                              }
                            : b
                        )
                      );
                      setShowTaskForm(prev => ({ ...prev, [board.id]: false }));
                    }}
                  >
                    Сохранить карточку
                  </button>
                </>
              )}
              <button
                className="delete-board-btn"
                onClick={() => setBoards(prev => prev.filter(b => b.id !== board.id))}
              >
                Удалить доску
              </button>
              {board.tasks.map(task => (
                <div key={task.id} className="task">
                  <h4>
                    <strong>Название карточки:</strong> {task.title}
                  </h4>
                  <p>
                    <strong>Описание карточки:</strong> {task.description}
                  </p>
                  <p>
                    <strong>Статус:</strong> {task.status}
                  </p>
                  <p>
                    <strong>Приоритет:</strong> {task.priority}
                  </p>
                  {task.deadline && (
                    <p>
                      <strong>Дедлайн:</strong> {task.deadline}
                    </p>
                  )}
                  <div className="subtasks">
                    <h4>Подзадачи:</h4>
                    <ol className="subtasks-list">
                      {task.subtasks?.map((subtask) => (
                        <li key={subtask.id} className="subtask">
                          {subtask.title}
                        </li>
                      ))}
                    </ol>
                    <input
                      type="text"
                      placeholder="Добавить подзадачу"
                      value={newSubtaskTitles[task.id] || ''}
                      onChange={e =>
                        setNewSubtaskTitles(prev => ({
                          ...prev,
                          [task.id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      className="add-task-btn"
                      onClick={() => handleAddSubtask(board.id, task.id, newSubtaskTitles[task.id] || '')}
                    >
                      Добавить подзадачу
                    </button>
                  </div>
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
                  <div className="calendar-weekday">
                    {date.toLocaleDateString('ru-RU', { weekday: 'short' })}
                  </div>
                  <div className="calendar-date">
                    {date.toLocaleDateString('ru-RU')}
                  </div>
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
                <th>Количество карточек</th>
              </tr>
            </thead>
            <tbody>
              {boards.map((board) => (
                <tr key={board.id}>
                  <td>{board.title}</td>
                  <td>{board.tasks?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}			
