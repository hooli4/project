<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.5/awesomplete.css" />
  <title>Профиль</title>
</head>
<body>
  <header>
    <div class="header-left">
      <img src="./logo.png" alt="Лого">
      <div class="title">Tuskpanel</div>
    </div>
    <div class="header-right">
      <a href="/logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Выйти</a>
      <div class="language-dropdown" id="languageDropdown">
        <div class="language-selected">Русский</div>
        <div class="language-options" id="languageOptions">
          <div>English</div>
        </div>
      </div>
    </div>
  </header>

  <main>
    <div class="profile-container">
      <h2>Информация профиля:</h2><br><br><br>
      <div class="profile-info">
        <div class="profile-icon">
          <i class="fas fa-user"></i>
        </div>
        <div class="profile-details">
          <p id="username"><i class="fas fa-user"></i> Имя пользователя</p>
          <p id="email"><i class="fas fa-envelope"></i> Имяпочты@почта.ру</p>
          <p id="city"><i class="fas fa-map-marker-alt"></i> Город</p>
          <p id="role"><i class="fas fa-briefcase"></i> Разработчик</p>
          <button class="edit-btn" onclick="openModal()">Редактировать профиль</button>
        </div>
      </div>
      <div class="profile-about"><br>
        <h3>О пользователе</h3>
        <p id="aboutText">Пусто.</p>
      </div><br><br>
      <div class="projects-container">
        <a href="/projectList" class="edit-btn">Панель проектов</a>
      </div>
    </div>
  </main>
  <div class="modal" id="editModal">
    <div class="modal-content">
      <h3>Редактировать профиль</h3>
      <input type="text" id="editName" placeholder="Имя пользователя" />
      <input type="email" id="editEmail" placeholder="Email" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.5/awesomplete.min.js"></script>
      <input id="editCity" class="awesomplete" placeholder="Город"/>
      <script>
        new Awesomplete("#editCity", {
          list: ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань", "Ханты-Мансийск"]
        });
      </script>
      <textarea id="editAbout" placeholder="Описание (необязательно)"></textarea>
      <button class="save-btn" onclick="saveProfile()">Сохранить</button>
      <button class="close-btn" onclick="closeModal()">Отмена</button>
    </div>
  </div>
  <footer>
    <div class="footer-links"><a>© 2025 Tuskpanel &nbsp;&nbsp;&nbsp; Все права защищены</a></div>
    <div class="footer-links">
      <a href="https://t.me/SVGNTaskObserver_bot" target="_blank"><b>Telegram</b></a> | 
      <a href="mailto:mail@tuskpanel.com"><b>mail@tuskpanel.com</b></a>
    </div> 
  </footer>
  <script src="../js/logic.js"></script>
  <script>
    function openModal() {
      const modal = document.getElementById('editModal');
      modal.classList.add('show');
      const usernameText = document.getElementById('username').innerText.replace(/.*\s/, '');
      const emailText = document.getElementById('email').innerText.replace(/.*\s/, '');
      const cityText = document.getElementById('city').innerText.replace(/.*\s/, '');
      const aboutText = document.getElementById('aboutText').innerText;

      document.getElementById('editName').value = usernameText;
      document.getElementById('editEmail').value = emailText;
      const selectCity = document.getElementById('editCity');
      let foundCity = false;
      for (let i = 0; i < selectCity.options.length; i++) {
        if (selectCity.options[i].value === cityText) {
          selectCity.selectedIndex = i;
          foundCity = true;
          break;
        }
      }
      if (!foundCity) {
        selectCity.selectedIndex = 0;
      }

      document.getElementById('editAbout').value = aboutText;
    }

    function closeModal() {
      const modal = document.getElementById('editModal');
      modal.classList.remove('show');
    }

    function saveProfile() {
      const name = document.getElementById('editName').value.trim();
      const email = document.getElementById('editEmail').value.trim();
      const city = document.getElementById('editCity').value;
      const about = document.getElementById('editAbout').value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name.length < 5) {
        alert('Имя должно содержать не менее 5 символов.');
        return;
      }
      if (!emailRegex.test(email)) {
        alert('Введите корректный email.');
        return;
      }
      if (!city) {
        alert('Пожалуйста, выберите город из списка.');
        return;
      }

      document.getElementById('username').innerHTML = `<i class="fas fa-user"></i> ${name}`;
      document.getElementById('email').innerHTML = `<i class="fas fa-envelope"></i> ${email}`;
      document.getElementById('city').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${city}`;
      document.getElementById('aboutText').innerText = about;
      closeModal();
    }

  </script>
</body>
</html>
