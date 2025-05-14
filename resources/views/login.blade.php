<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Авторизация</title>
  @viteReactRefresh
  @vite(['resources/css/login.css', 'resources/js/Login.jsx'])
</head>
<body>

  <div id="react-root"></div>
  <footer>
        <div><b>© 2025 Tuskpanel &nbsp;&nbsp;&nbsp; Все права защищены</b></div>
        <div className="footer-links">
          <a href="https://t.me/tuskpanel"><b>Telegram</b></a> |
          <a href="mailto:support@tuskpanel.com"><b>support@tuskpanel.com</b></a>
        </div>
    </footer>
</body>
</html>