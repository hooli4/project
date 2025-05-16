<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Проекты</title>
    @viteReactRefresh
    @vite(['resources/css/index.css', 'resources/js/ProjectLists.jsx'])
</head>
<body>
    <div id="react-root"></div>
</body>
</html>
