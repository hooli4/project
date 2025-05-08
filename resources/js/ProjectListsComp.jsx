import React, { useState, useEffect } from 'react';

// Заготовка для fetch-запросов
const fetchUserProjects = async () => {
  // сделайте реальный запрос к API
  // например:
  // const res = await fetch('/api/projects', { headers: {...} });
  // return res.json();
  return [
    { id: 1, title: 'Проект 1', description: 'Описание проекта 1' },
    { id: 2, title: 'Проект 2', description: 'Описание проекта 2' },
  ];
};

const fetchInvitedProjects = async () => {
  // аналогично
  return [
    { id: 3, title: 'Приглашение 1', description: 'Описание приглашения 1' },
    { id: 4, title: 'Приглашение 2', description: 'Описание приглашения 2' },
  ];
};

const myProjects = [
  { id: 1, name: 'Проект 1' },
  { id: 2, name: 'Проект 2' },
  { id: 3, name: 'Проект 3' },
  { id: 4, name: 'Проект 4' },
  { id: 5, name: 'Проект 5' },
  { id: 6, name: 'Проект 6' },
  { id: 7, name: 'Проект 7' },
  { id: 8, name: 'Проект 8' },
];

const invitations = [
  { id: 1, name: 'Приглашение 1' },
  { id: 2, name: 'Приглашение 2' },
  { id: 3, name: 'Приглашение 3' },
  { id: 4, name: 'Приглашение 4' },
  { id: 5, name: 'Приглашение 5' },
  { id: 6, name: 'Приглашение 6' },
  { id: 7, name: 'Приглашение 7' },
  { id: 8, name: 'Приглашение 8' },
];

function Projects({ projects, currentPage, pageSize, onAccept, onReject }) {
  const startIndex = (currentPage - 1) * pageSize;
  const currentProjects = projects.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      {currentProjects.map(project => (
        <div
          key={project.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: 6,
            marginBottom: 12,
            backgroundColor: '#fff',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
          }}
        >
          <span style={{ fontSize: 16 }}>{project.name}</span>
          {onAccept && onReject && (
            <div>
              <button
                onClick={() => onAccept(project.id)}
                style={{
                  marginRight: 10,
                  padding: '6px 14px',
                  backgroundColor: '#4caf50',
                  border: 'none',
                  borderRadius: 4,
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#45a049')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4caf50')}
              >
                Принять
              </button>
              <button
                onClick={() => onReject(project.id)}
                style={{
                  padding: '6px 14px',
                  backgroundColor: '#f44336',
                  border: 'none',
                  borderRadius: 4,
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#d32f2f')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f44336')}
              >
                Отклонить
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ShowProjects() {
  const [activeTab, setActiveTab] = useState('projects');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalItems = activeTab === 'projects' ? myProjects.length : invitations.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const goPrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleAccept = (id) => {
    alert(`Приглашение ${id} принято!`);
  };

  const handleReject = (id) => {
    alert(`Приглашение ${id} отклонено!`);
  };
  const styles = {
    container: {
      maxWidth: 640,
      margin: '40px auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f7f8fa',
      padding: 24,
      borderRadius: 10,
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    },
    tabsContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 30,
      gap: 24,
    },
    tab: {
      padding: '12px 32px',
      fontSize: 18,
      cursor: 'pointer',
      borderRadius: 8,
      border: '2px solid transparent',
      transition: 'border-color 0.3s, background-color 0.3s',
      userSelect: 'none',
    },
    activeTab: {
      borderColor: '#0078d7',
      backgroundColor: '#e7f0fe',
      fontWeight: '700',
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      gap: 12,
      fontSize: 16,
      userSelect: 'none',
    },
    pagButton: {
      padding: '8px 16px',
      borderRadius: 6,
      border: '1px solid #0078d7',
      backgroundColor: '#0078d7',
      color: 'white',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background-color 0.3s, border-color 0.3s',
      disabled: {
        backgroundColor: '#cbd6e2',
        borderColor: '#cbd6e2',
        cursor: 'default',
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center', marginBottom: 24, color: '#333' }}>Проекты</h1>
      <div style={styles.tabsContainer}>
        <div
          onClick={() => { setActiveTab('projects'); setCurrentPage(1); }}
          style={{
            ...styles.tab,
            ...(activeTab === 'projects' ? styles.activeTab : { color: '#555' }),
          }}
        >
          Мои проекты
        </div>
        <div
          onClick={() => { setActiveTab('invitations'); setCurrentPage(1); }}
          style={{
            ...styles.tab,
            ...(activeTab === 'invitations' ? styles.activeTab : { color: '#555' }),
          }}
        >
          Приглашения
        </div>
      </div>

      <Projects
        projects={activeTab === 'projects' ? myProjects : invitations}
        currentPage={currentPage}
        pageSize={pageSize}
        onAccept={activeTab === 'invitations' ? handleAccept : null}
        onReject={activeTab === 'invitations' ? handleReject : null}
      />

      <div style={styles.pagination}>
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          style={{
            ...styles.pagButton,
            ...(currentPage === 1 ? { backgroundColor: '#cbd6e2', borderColor: '#cbd6e2', cursor: 'default' } : {}),
          }}
        >
          Назад
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          style={{
            ...styles.pagButton,
            ...(currentPage === totalPages ? { backgroundColor: '#cbd6e2', borderColor: '#cbd6e2', cursor: 'default' } : {}),
          }}
        >
          Вперед
        </button>
      </div>
    </div>
  );
}


export default ShowProjects;
