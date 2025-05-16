<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Регистрация</title>
  @viteReactRefresh
  @vite(['resources/css/register.css', 'resources/js/Register.jsx'])
</head>
<body>

  <div id="react-root"></div>
  <footer>
    <div class="footer-links"><a>© 2025 Tuskpanel &nbsp;&nbsp;&nbsp; Все права защищены</a></div>
    <div class="footer-links">
      <a href="https://t.me/SVGNTaskObserver_bot" target="_blank"><b>Telegram</b></a> | 
      <a href="mailto:mail@tuskpanel.com"><b>mail@tuskpanel.com</b></a>
    </div> 
  </footer>
</body>
</html>
