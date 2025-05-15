import React, { useState, useRef } from 'react';

const styles = {
    card: {
        backgroundColor: '#C0C0C0',
        border: '4px solid #black',
        padding: 10,
        borderRadius: 5,
        margin: '5px 0',
        minWidth: 150, // Задаем минимальную ширину
        position: 'sticky',
    },
    moveButton: {
        width: 25,
        height:25,
        cursor: 'pointer',
        fontSize: '13px',
        borderRadius: 10,
        border: '3px inset black',
        color: 'black',
        margin: '0 3px',
        padding: '0',
        backgroundColor: '#808080',
    },
    body: {
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        flexGrow: 1,
        minHeight: 'calc(100vh - 120px)',
        backgroundColor: 'lightgray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    buttonBase: {
        backgroundColor: '#808080',
        border: '6px inset black',
        borderRadius: 20,
        padding: 10,
        cursor: 'pointer',
        aspectRatio: '1 / 1',
        position: 'relative',
        width: 80,
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
    },
    buttonAdd: {
        border: '6px inset black',
        borderRadius: 15,
        fontSize: 16,
        width: '80%',
        margin: 5,

    },
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        padding: 20,
        borderRadius: 10,
        zIndex: 1001,
        minWidth: 320,
    },
    input: {
        padding: 8,
        border: '6px inset black',
        borderRadius: 15,
        fontSize: 16,
        width: '80%',
        marginBottom: 10,
        margin: 5,
    },
    
    desk: {
        position: 'relative',
        backgroundColor: '#DCDCDC',
        padding: 10,
        border: '4px solid black',
        borderRadius: 10,
        width:200,
        minHeight: 100,
        margin: 20,
    },
    sticker: {
        position: 'relative',
        backgroundColor: '#DCDCDC',
        padding: 10,
        border: '4px solid black',
        borderRadius: 10,
        width: 100,
        margin: 20,
    },
    deleteBtn: {
        position: 'absolute',
        top: 5,
        right: 5,
        cursor: 'pointer',
        color: 'red',
        fontWeight: 'bold',
        fontSize: '16px',
    },
    buttonclose: {
        border: '6px inset black',
        borderRadius: 15,
        fontSize: 16,
        margin: 5,
        display: 'inline-flex',
        gap: 10,
    },
    buttonclose1: {
        border: '6px inset black',
        borderRadius: 15,
        fontSize: 12,
        margin: 5,
        display: 'inline-flex',
        gap: 10,
    }
};

function App() {
    const [boards, setBoards] = useState([]);
    const [stickers, setStickers] = useState([]);
    const [newBoardTitle, setNewBoardTitle] = useState('');
    const [newBoardDescription, setNewBoardDescription] = useState('');
    const [newStickerTitle, setNewStickerTitle] = useState('');
    const [newStickerDescription, setNewStickerDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(null);
    const [newCardText, setNewCardText] = useState('');
    const [newCardDescription, setNewCardDescription] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState({ visible: false, id: null, type: null });
    const [newCardPriority, setNewCardPriority] = React.useState(-1); // 0 - низкий, 1 - средний, 2 - высокий
    const [newCardStatus, setNewCardStatus] = React.useState(-1);
    // Для управления редактированием карточки - сохраним id редактируемой карточки и ее поля
    const [editingCardId, setEditingCardId] = React.useState(null);
    const [editingCardData, setEditingCardData] = React.useState({ text: '', description: '', priority: 1, status: 'Ожидание' });

    const dragData = useRef({ draggingId: null, draggingType: null, offsetX: 0, offsetY: 0 });

    const openModal = (name) => setModalVisible(name);
    const closeModal = () => {
        setModalVisible(null);
        setNewBoardTitle('');
        setNewBoardDescription('');
        setNewStickerTitle('');
        setNewStickerDescription('');
    };

    const createBoard = () => {
        if (newBoardTitle.trim() === '') return;
        const newBoard = {
            id: Date.now(),
            title: newBoardTitle,
            description: newBoardDescription,
            cards: [],
            x: window.innerWidth / 2 - 120,

            y: window.innerHeight / 2 - 100,
        };
        setBoards((prev) => [...prev, newBoard]);
        closeModal();
    };

    const createSticker = () => {
        if (newStickerTitle.trim() === '') return;
        const newSticker = {
            id: Date.now(),
            title: newStickerTitle,
            x: window.innerWidth / 2 - 120,
            y: window.innerHeight / 2 - 50,
        };
        setStickers((prev) => [...prev, newSticker]);
        closeModal();
    };

    function addCardToBoard(boardId) {
        if (!newCardText.trim()) return;

        // Ищем нужную доску
        setBoards((prevBoards) =>
            prevBoards.map((board) => {
                if (board.id === boardId) {
                    const newCard = {
                        id: Date.now(), // или иной уникальный id
                        text: newCardText,
                        description: newCardDescription,
                        priority: newCardPriority,  // добавлено
                        status: newCardStatus,      // добавлено
                    };
                    return { ...board, cards: [...board.cards, newCard] };
                }
                return board;
            })
        );

        // Очистим поля
        setNewCardText('');
        setNewCardDescription('');
        setNewCardPriority(0);
        setNewCardStatus(-1);
    }

    function getPriorityColor(priority) {
        switch (priority) {
            case 0: return 'green';
            case 1: return 'yellow';
            case 2: return 'red';
        }
    }
    function getPriorityText(priority) {
        switch (priority) {
            case 0: return 'Низкий';
            case 1: return 'Средний';
            case 2: return 'Высокий';
        }
    }

    function getstatusColor(status) {
        switch (status) {
            case -1: return 'black';
            case 0: return 'black';
            case 1: return 'yellow';
            case 2: return 'green';
            default: return 'black';
        }
    }
    function getstatusText(status) {
        switch (status) {
            case -1: return 'Неизвестно';
            case 0: return 'Ожидание';
            case 1: return 'В разработке';
            case 2: return 'Завершён';
            default: return 'Неизвестно';
        }
    }
    function getPriorityBorderColor(priority) {
        // Можно например сделать цветной бордер слева у карточки в зависимости от приоритета
        return { borderLeft: `4px solid ${getPriorityColor(priority)}`, paddingLeft: '8px' };
    }

    function getstatusBorderColor(status) {
        // Можно например сделать цветной бордер слева у карточки в зависимости от приоритета
        return { borderLeft: `4px solid ${getstatusColor(status)}`, paddingLeft: '8px' };
    }

    function saveCardEdits(boardId, cardId) {
        setBoards(prevBoards =>
            prevBoards.map(board => {
                if (board.id === boardId) {
                    const newCards = board.cards.map(card => {
                        if (card.id === cardId) {
                            return {
                                ...card,
                                text: editingCardData.text,
                                description: editingCardData.description,
                                priority: editingCardData.priority,
                                status: editingCardData.status
                            };
                        }
                        return card;
                    });
                    return { ...board, cards: newCards };
                }
                return board;
            })
        );
        setEditingCardId(null);
    }


    const onMouseDown = (type, id, e) => {
        if (e.target.tagName === 'INPUT') return; // предотвратить перетаскивание, если щелкаем на поле ввода

        e.preventDefault();
        dragData.current.draggingId = id;
        dragData.current.draggingType = type;

        let item;
        if (type === 'board') item = boards.find(b => b.id === id);
        else if (type === 'sticker') item = stickers.find(s => s.id === id);
        if (!item) return;

        dragData.current.offsetX = e.clientX - item.x;
        dragData.current.offsetY = e.clientY - item.y;

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
        if (dragData.current.draggingId === null) return;
        const { draggingId, draggingType, offsetX, offsetY } = dragData.current;
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;

        if (draggingType === 'board') {
            setBoards(prev => prev.map(b => b.id === draggingId ? { ...b, x: newX, y: newY } : b));
        } else if (draggingType === 'sticker') {
            setStickers(prev => prev.map(s => s.id === draggingId ? { ...s, x: newX, y: newY } : s));
        }
    };

    const onMouseUp = () => {
        dragData.current.draggingId = null;
        dragData.current.draggingType = null;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };

    const deleteObject = (id, type) => {
        if (type === 'board') {
            setBoards(prev => prev.filter(b => b.id !== id));
        } else if (type === 'sticker') {
            setStickers(prev => prev.filter(s => s.id !== id));
        } else if (type === 'card') {
            const boardIndex = boards.findIndex(b => b.cards.some(c => c.id === id));
            if (boardIndex !== -1) {
                const board = boards[boardIndex];
                setBoards(prev => {
                    const updatedCards = board.cards.filter(c => c.id !== id);
                    return prev.map(b => b.id === board.id ? { ...b, cards: updatedCards } : b);
                });
            }
        }
        setDeleteConfirmation({ visible: false, id: null, type: null });
    };

    const showDeleteConfirmation = (id, type) => {
        setDeleteConfirmation({ visible: true, id, type });
    };

    const closeDeleteConfirmation = () => {
        setDeleteConfirmation({ visible: false, id: null, type: null });
    };

    const getDeleteConfirmationText = () => {
        switch (deleteConfirmation.type) {
            case 'board':
                return "Вы уверены, что хотите удалить эту доску?";
            case 'sticker':
                return "Вы уверены, что хотите удалить этот стикер?";
            case 'card':
                return "Вы уверены, что хотите удалить эту карточку?";
            default:
                return "";
        }
    };

    const moveCard = (boardId, cardId, direction) => {
        const boardIndex = boards.findIndex(b => b.id === boardId);
        if (boardIndex === -1) return;

        const board = boards[boardIndex];
        const cards = [...board.cards];
        const cardIndex = cards.findIndex(c => c.id === cardId);
        if (cardIndex === -1) return;

        if (direction === 'up' && cardIndex > 0) {
            // Перемещаем карточку вверх
            const temp = cards[cardIndex - 1];
            cards[cardIndex - 1] = cards[cardIndex];
            cards[cardIndex] = temp;
        } else if (direction === 'down' && cardIndex < cards.length - 1) {
            // Перемещаем карточку вниз
            const temp = cards[cardIndex + 1];
            cards[cardIndex + 1] = cards[cardIndex];
            cards[cardIndex] = temp;
        }

        setBoards(prev =>
            prev.map((b, index) =>
                index === boardIndex ? { ...b, cards } : b
            )
        );
    };

    function LeftSidebar() {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: '100px',          // ширина панели
                backgroundColor: 'black',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',            // отступ между кнопками
                zIndex: 1000,
                color: 'white',
            }}>
                <button style={{
                    backgroundColor: '#808080',
                    border: '6px inset black',
                    borderRadius: 20,
                    padding: 10,
                    cursor: 'pointer',
                    aspectRatio: '1 / 1',
                    position: 'relative',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>Профиль</button>

                <button style={{
                    backgroundColor: '#808080',
                    border: '6px inset black',
                    borderRadius: 20,
                    padding: 10,
                    cursor: 'pointer',
                    aspectRatio: '1 / 1',
                    position: 'relative',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>Настройки</button>
            </div>
        );
    }

    return (
        <div style={styles.body}>

            <main style={styles.main}>
                {/* Блок кнопок справа по центру */}
                <div style={{
                    position: 'absolute',
                    right: 20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <button style={styles.buttonBase} onClick={() => openModal('board')}>
                        <strong>Доска</strong>
                    </button>
                    <button style={styles.buttonBase} onClick={() => openModal('sticker')}>
                        <strong>Стикер</strong>
                    </button>
                </div>
                <>
                    <LeftSidebar />
                    {/* основной контент страницы */}
                    <div style={{ marginLeft: '80px', padding: '16px' }}>
                        {/* тут ваш основной контент, с отступом слева равным ширине панели */}
                    </div>
                </>


                {/* Рендер досок */}
                {boards.map((board) => (
                    <div
                        key={board.id}
                        style={{ ...styles.desk, left: board.x, top: board.y, position: 'absolute' }} // Если хотите оставлять возможность смещения
                        onMouseDown={(e) => onMouseDown('board', board.id, e)}
                    >
                        <div style={styles.deleteBtn} onClick={() => showDeleteConfirmation(board.id, 'board')}>✖️</div>
                        <strong>{board.title}</strong>
                        <div>{board.description}</div>
                        <div>
                            {board.cards.map((card) => {
                                const isEditing = editingCardId === card.id;

                                return (
                                    <div key={card.id} style={{ ...styles.card, borderLeft: getPriorityBorderColor(card.priority)}}>

                                        {isEditing ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editingCardData.text}
                                                    onChange={e => setEditingCardData({ ...editingCardData, text: e.target.value })}
                                                    style={styles.input}
                                                />
                                                <input
                                                    value={editingCardData.description}
                                                    onChange={e => setEditingCardData({ ...editingCardData, description: e.target.value })}
                                                    style={styles.input}
                                                />
                                                <label>
                                                    Приоритет:
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="2"
                                                        step="1"
                                                        value={editingCardData.priority}
                                                        onChange={e => setEditingCardData({ ...editingCardData, priority: +e.target.value })}
                                                        style={{ width: '100%' }}
                                                    />
                                                </label>
                                                <div>
                                                    {editingCardData.priority === 0 && <span style={{ color: 'green' }}>Низкий</span>}
                                                    {editingCardData.priority === 1 && <span style={{ color: 'yellow' }}>Средний</span>}
                                                    {editingCardData.priority === 2 && <span style={{ color: 'red' }}>Высокий</span>}
                                                </div>
                                                    <label>
                                                        Статус:
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="2"
                                                            step="1"
                                                            value={editingCardData.status}
                                                            onChange={e => setEditingCardData({ ...editingCardData, status: +e.target.value })}
                                                            style={{ width: '100%' }}
                                                        />
                                                    </label>
                                                    <div>
                                                        {editingCardData.status === 0 && <span style={{ color: 'black' }}>Ожидание</span>}
                                                        {editingCardData.status === 1 && <span style={{ color: 'yellow' }}>В разработке</span>}
                                                        {editingCardData.status === 2 && <span style={{ color: 'green' }}>Завершён</span>}
                                                    </div>

                                                <button style={styles.buttonclose1} onClick={() => saveCardEdits(board.id, card.id)}><strong>Сохранить</strong></button>
                                                <button style={styles.buttonclose1} onClick={() => setEditingCardId(null)}><strong>Отмена</strong></button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    style={styles.moveButton}
                                                    onClick={() => moveCard(board.id, card.id, 'up')}
                                                    disabled={board.cards.length <= 1}
                                                >
                                                    ↑
                                                </button>
                                                <button
                                                    style={styles.moveButton}
                                                    onClick={() => moveCard(board.id, card.id, 'down')}
                                                    disabled={board.cards.length <= 1}
                                                >
                                                    ↓
                                                </button>
                                                <div style={styles.deleteBtn} onClick={() => showDeleteConfirmation(card.id, 'card')}>✖️</div>

                                                <strong>{card.text}</strong><br />
                                                {card.description}<br />

                                                <div>
                                                    Приоритет: <strong style={{ color: getPriorityColor(card.priority) }}>{getPriorityText(card.priority)}</strong>
                                                </div>
                                                <div>
                                                        Статус: <strong style={{ color: getstatusColor(card.status) }}>{getstatusText(card.status)}</strong>
                                                </div>
                                                    <button style={styles.buttonclose} onClick={() => {
                                                    setEditingCardId(card.id);
                                                    setEditingCardData({
                                                        text: card.text,
                                                        description: card.description,
                                                        priority: card.priority,
                                                        status: card.status
                                                    });
                                                    }}><strong>Редактировать</strong></button>
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                            <input
                                type="text"
                                placeholder="Название карточки"
                                value={newCardText}
                                onChange={(e) => setNewCardText(e.target.value)}

                                style={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Описание карточки"
                                value={newCardDescription}
                                onChange={(e) => setNewCardDescription(e.target.value)}
                                style={styles.input}
                            />
                            <label>
                                Приоритет:
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    step="1"
                                    value={newCardPriority}
                                    onChange={(e) => setNewCardPriority(+e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </label>
                            <div>
                                {newCardPriority === 0 && <span style={{ color: 'green' }}>Низкий</span>}
                                {newCardPriority === 1 && <span style={{ color: 'yellow' }}>Средний</span>}
                                {newCardPriority === 2 && <span style={{ color: 'red' }}>Высокий</span>}
                            </div>


                            <center>
                                <button style={styles.buttonAdd} onClick={() => addCardToBoard(board.id)}>Добавить карточку</button>
                            </center>
                        </div>
                    </div>
                ))}

                {/* Рендер стикеров */}
                {stickers.map((sticker) => (
                    <div
                        key={sticker.id}
                        style={{ ...styles.sticker, left: sticker.x, top: sticker.y, position: 'absolute' }} // Если хотите оставлять возможность смещения
                        onMouseDown={(e) => onMouseDown('sticker', sticker.id, e)}
                    >
                        <div style={styles.deleteBtn} onClick={() => showDeleteConfirmation(sticker.id, 'sticker')}>✖️</div>
                        <strong>{sticker.title}</strong>
                    </div>
                ))}

                {/* Модальные окна */}
                {modalVisible && (
          <>
                        <div style={styles.modalOverlay} onClick={closeModal} />
                        {modalVisible === 'board' && (
                            <div style={{ ...styles.modal, left: 'calc(100% - 340px)', top: 'calc(50% - 100px)' }} onClick={e => e.stopPropagation()}>
                                <h3><center>Создать доску</center></h3>
                                <center>
                                <input
                                    type="text"
                                    placeholder="Название доски"
                                    value={newBoardTitle}
                                    onChange={(e) => setNewBoardTitle(e.target.value)}
                                    style={styles.input}
                                />
                                <input
                                    type="text"
                                    placeholder="Описание доски"
                                    value={newBoardDescription}
                                    onChange={(e) => setNewBoardDescription(e.target.value)}
                                    style={styles.input}
                                />
                                <button style={styles.buttonAdd}onClick={createBoard}>Создать доску</button>

                                    <button style={styles.buttonAdd} onClick={closeModal}>Закрыть</button>
                                </center>
                            </div>
                        )}
                        {modalVisible === 'sticker' && (
                            <div style={{ ...styles.modal, left: 'calc(100% - 340px)', top: 'calc(50% - 100px)' }} onClick={e => e.stopPropagation()}>
                                <center>
                                    <h3>Создать стикер</h3>
                                </center>
                                <center>
                                    <input
                                        type="text"
                                        placeholder="Название стикера"
                                        value={newStickerTitle}
                                        onChange={(e) => setNewStickerTitle(e.target.value)}
                                        style={styles.input}
                                        />
                                </center>
                                <center>
                                    <button style={styles.buttonAdd} onClick={createSticker}>Создать стикер</button>
                                    <button style={styles.buttonAdd} onClick={closeModal}>Закрыть</button>
                                </center>
                            </div>
                        )}
                    </>
                )}

                {/* Подтверждение удаления */}
                {deleteConfirmation.visible && (
                    <>
                        <div style={styles.modalOverlay} onClick={closeDeleteConfirmation} />
                        <div style={styles.modal} onClick={e => e.stopPropagation()}>
                            <h3>Подтверждение удаления</h3>
                            <p>{getDeleteConfirmationText()}</p>
                            <center>
                                <button style={styles.buttonclose} onClick={() => deleteObject(deleteConfirmation.id, deleteConfirmation.type)}>Да</button>
                                <button style={styles.buttonclose} onClick={closeDeleteConfirmation}>Нет</button>
                            </center>
                        </div>
                    </>
                )}
            </main>

            
        </div>
    );
}

export default App;