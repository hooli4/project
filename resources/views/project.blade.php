<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Проект</title>
  @viteReactRefresh
  @vite(['resources/js/Project.jsx'])
</head>
<body style="margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'">
  <div id="react-root"></div>
</body>
</html>