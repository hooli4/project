import React, { useState, useEffect } from 'react';

import axios from 'axios';

function Projects({ projects, currentPage, pageSize, onAccept, onReject, projects_str }) {
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
          <a href={`http://project/project/${project.id}`}><span style={{ fontSize: 16 }}>{project.title}</span></a>
          {!onAccept && onReject && (
          <div>
            <button
              onClick={() => onReject(project.id)}
              style={{
                marginRight: 10,
                padding: '6px 14px',
                backgroundColor: '#f44336',
                border: 'none',
                borderRadius: 4,
                color: 'white',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background-color 0.3s',
              }}
            >
              Уйти из проекта
            </button>
            </div>
          )}
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
      {currentProjects.length == 0 && projects_str == 'myProjects' && (
          <p>Проекты отсутствуют</p>
      )}
      {currentProjects.length == 0 && projects_str == 'invitations' && (
          <p>Приглашения отсутствуют</p>
      )}
    </div>
  );
}

function CreateProjectModal({ onClose, onConfirm }) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleConfirm = () => {
    onConfirm({ title: projectName, description: projectDescription });
    onClose(); // Закрываем форму после подтверждения
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContainerStyle}>
        <h3 style={{color : 'black'}}>Создать проект</h3>
        <input
          type="text"
          placeholder="Название проекта"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Описание проекта"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          style={{ ...inputStyle, minHeight: '60px' }}
        />
        <div>
          <button onClick={handleConfirm} style={confirmButtonStyle}>Подтвердить</button>
          <button onClick={onClose} style={cancelButtonStyle}>Отмена</button>
        </div>
      </div>
    </div>
  );
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContainerStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  width: '400px',
};

const inputStyle = {
  display: 'block',
  marginBottom: '10px',
  width: '100%',
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
};

const confirmButtonStyle = {
  marginRight: '10px',
  padding: '10px 20px',
  backgroundColor: '#4caf50',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'background-color 0.3s',
};

const cancelButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#f44336',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'background-color 0.3s',
};


function ShowProjects() {

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [myProjects, setProjects] = useState([]);
const [invitations, setInvitations] = useState([]);
const [isCreateProjectModalVisible, setCreateProjectModalVisible] = useState(false);

const token = localStorage.getItem('token');
const csrftoken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const fetchProjectsAndInvitations = () => {
  setLoading(true);
  setError(null);
  Promise.all([
    axios.get('http://project/api/projects/getList', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    axios.get('http://project/api/invitations/getList', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ])
  .then(([projectsResponse, invitationsResponse]) => {
    setProjects(projectsResponse.data.data);
    setInvitations(invitationsResponse.data.data);
  })
  .catch(error => {
    setError('Ошибка при загрузке данных');
    console.error(error);
  })
  .finally(() => {
    setLoading(false);
  });
}

useEffect(() => {
  fetchProjectsAndInvitations();
}, [token, csrftoken]);

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
    axios.post(`http://project/api/invitations/acceptInvitation/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      fetchProjectsAndInvitations();
    });
  };

  const handleReject = (id) => {
    axios.delete(`http://project/api/invitations/leaveProject/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      fetchProjectsAndInvitations();
    });
  };

  const handleCreateProject = (project) => {
    axios.post('http://project/api/projects/create', project, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      fetchProjectsAndInvitations(); 
    })
    .catch(err => {
      console.error(err);
      alert('Ошибка при создании проекта');
    });
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


  if (error) return <p>{error}</p>

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
        <button 
        onClick={() => setCreateProjectModalVisible(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: 4,
          color: 'white',
          cursor: 'pointer',
          marginBottom: '20px',
        }}>
        Создать проект
      </button>
      {isCreateProjectModalVisible && (
        <CreateProjectModal 
          onClose={() => setCreateProjectModalVisible(false)} 
          onConfirm={handleCreateProject} 
        />
      )}
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
        onReject={handleReject}
        projects_str={activeTab === 'projects' ? 'myProjects' : 'invitations'}
      />

      {totalItems > 0 && (
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
      )}
    </div>
  );

}

export default ShowProjects;
