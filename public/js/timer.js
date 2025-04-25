let countdown = 60;
let timerInterval;

function handleResend() {
  const button = document.getElementById('resendButton');
  const message = document.getElementById('resendMessage');
  const timerText = document.getElementById('timerText');
  
  button.style.display = 'none';
  message.style.display = 'block';
  timerText.style.display = 'block';
  countdown = 60;
  timerText.textContent = `Повторная отправка будет доступна через ${countdown} сек.`;
  timerInterval = setInterval(() => {
    countdown--;
    timerText.textContent = `Повторная отправка будет доступна через ${countdown} сек.`;
    if (countdown <= 0) {
      clearInterval(timerInterval);
      button.style.display = 'inline-block';
      message.style.display = 'none';
      timerText.style.display = 'none';
    }
  }, 1000);
  console.log("Письмо переотправлено");
}