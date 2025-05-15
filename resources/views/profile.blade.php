<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" /> <!-- Добавление Font Awesome для иконок -->
  <title>Профиль</title>
  <style>
    body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
    }

    main {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .profile-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 10px;
    }

    .profile-info {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .profile-icon {
        margin-right: 20px;
    }

    .projects-container {
        width: 100%;
    }

    .projects-list {
        list-style: none;
        padding: 0;
    }

    .projects-list li {
        margin: 10px 0;
    }

    .avatar-upload {
        margin: 20px 0;
        position: relative;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #ccc; 
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .avatar-upload img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .file-input {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0; 
        cursor: pointer;
    }
  </style>
</head>
<body>
  <header>
    <div></div>
    <div class="title">Tuskpanel</div>
    <div class="language-dropdown" id="languageDropdown">
      <div class="language-selected">Русский</div>
      <div class="language-options" id="languageOptions">
        <div>English</div>
      </div>
    </div>
  </header>

  <main>
    <div class="profile-container">
      <div class="profile-info">
        <div class="profile-icon">
          <div class="avatar-upload">
            <img id="avatar" src="https://via.placeholder.com/120" alt="">
            <input type="file" class="file-input" accept="image/*" onchange="previewAvatar(event)">
          </div>
        </div>
        <div class="profile-details">
          <h2>Имя пользователя</h2>
          <p>Email: user@example.com</p>
        </div>
      </div>
      <div class="projects-container">
        <h3>Существующие проекты</h3>
        <ul class="projects-list">
        </ul>
      </div>
    </div>
  </main>
  <footer>
    <div><b>© 2025 Tuskpanel &nbsp&nbsp&nbsp Все права защищены</b></div>
    <div class="footer-links">
      <a href="#"><b>Telegram</b></a> | 
      <a href="mailto:tuskpanel.com"><b>@tuskpanel.com</b></a>
    </div>
  </footer>
  <script src="../js/logic.js"></script>
  <script>
    function previewAvatar(event) {
      const avatar = document.getElementById('avatar');
      const file = event.target.files[0];
      
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          avatar.src = e.target.result; 
        };
        reader.readAsDataURL(file);
      }
    }
  </script>
</body>
</html>
