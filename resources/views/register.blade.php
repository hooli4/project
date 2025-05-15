<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="stylesheet" href="../css/styles.css">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <title>Регистрация</title>
</head>
<body>

  <header>
    <div></div>
    <div class="site-title">Tuskpanel</div>
    <div class="language-dropdown" id="languageDropdown">
      <div class="language-selected">Русский</div>
      <div class="language-options" id="languageOptions">
        <div>English</div>
      </div>
    </div>
  </header>

  <div class="container">
    <h2>Регистрация</h2>
    <form id="reg_form">
      @csrf
      <input type="text" placeholder="Логин" name="name"/>
      <input type="email" placeholder="Почта" name="email"/>
      <input type="password" placeholder="Пароль" name="password"/>
      <div class="reg">
        <button type="submit">Регистрация</button>
      </div>
    </form>

    <div class="error-container"></div>
  </div>

  </div>

  <footer>
    <div><b>© 2025 Tuskpanel &nbsp&nbsp&nbsp Все права защищены</b></div>
    <div class="footer-links">
      <a href="https://t.me/tuskpanel"><b>Telegram</b></a> | 
      <a href="mailto:support@tuskpanel.com"><b>support@tuskpanel.com</b></a>
    </div>
  </footer>
  <script src="../js/logic.js"></script>
  <script>
    $(document).ready(function() {
      $('#reg_form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
          url: '{{ route('api_reg') }}',
          method: 'POST',
          data: $(this).serialize(),
          success: function(response) {
            if (response.success) {
              $('.error-container').empty();
              window.location.href = '{{ route('confirm-email') }}';
            }
          },
          error: function(xhr) {
            $('.error-container').empty();

            const errors = xhr.responseJSON.errors;

            $.each(errors, function(field, messages) {
              $.each(messages, function(index, message) {
                $('.error-container').append('<p>' + message + '</p>');
              });
            });
          }
        });
      })
    });
  </script>
</body>
</html>
