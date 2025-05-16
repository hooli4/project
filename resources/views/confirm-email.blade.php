<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="stylesheet" href="../css/styles.css">
  <title>Подтверждение регистрации</title>
</head>
<script src="../js/timer.js"></script>
<body>
  <header>
    <img src="/logo.png" alt="Лого" style="height: 40px; margin-right: 15px;">
    <div class="title">Tuskpanel</div>
    <div class="language-dropdown" id="languageDropdown">
      <div class="language-selected">Русский</div>
      <div class="language-options" id="languageOptions">
        <div>English</div>
      </div>
    </div>
  </header>
  <div class="container">
  <h2>Подтверждение почты</h2>
  <form id="register" onsubmit="return validateForm()">
    <br><br>
    <h3>На вашу почту отправлено письмо для подтверждения регистрации.</h3>
  </form><br><br><br>
  <button id="resendButton" onclick="handleResend()">Переотправить письмо</button>
  <p id="resendMessage" style="display: none; color: gray; margin-top: 10px;">
    <b>Письмо переотправлено на вашу почту</b>
  </p>
  <p id="timerText" style="display: none; color: gray;"></p>
</div>
  <footer>
    <div class="footer-links"><a>© 2025 Tuskpanel &nbsp;&nbsp;&nbsp; Все права защищены</a></div>
    <div class="footer-links">
      <a href="https://t.me/SVGNTaskObserver_bot" target="_blank"><b>Telegram</b></a> | 
      <a href="mailto:mail@tuskpanel.com"><b>mail@tuskpanel.com</b></a>
    </div> 
  </footer>
  <script src="../js/logic.js"></script>
</body>
</html>