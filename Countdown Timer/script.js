const secondSound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Beep sound

document.getElementById('start-btn').addEventListener('click', () => {
  const eventName = document.getElementById('event-name').value;
  const eventDate = document.getElementById('event-date').value;

  if (!eventName || !eventDate) {
    alert('Please enter both event name and date.');
    return;
  }

  document.getElementById('date-input').style.display = 'none';
  document.querySelector('.display-4').style.display = 'none';
  document.getElementById('event-message').style.display = 'block';
  document.getElementById('share-btn').style.display = 'inline-block';

  startCountdown(eventName, new Date(eventDate).getTime());
});

function startCountdown(eventName, targetDate) {
  const eventMessage = document.getElementById('event-message');
  const timer = document.getElementById('timer');

  const timerInterval = setInterval(() => {
    const timeLeft = targetDate - new Date().getTime();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      eventMessage.textContent = `${eventName} has started!`;
      timer.style.display = 'none';
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    ['days', 'hours', 'minutes', 'seconds'].forEach((unit, i) => {
      document.getElementById(unit).textContent = [days, hours, minutes, seconds][i].toString().padStart(2, '0');
    });

    timer.style.display = 'flex';
    eventMessage.textContent = `Countdown to ${eventName}`;
    secondSound.play();
  }, 1000);
}

function shareLink() {
  const link = window.location.href;
  navigator.clipboard
    ? navigator.clipboard.writeText(link).then(() => alert('Link copied to clipboard!')).catch(() => alert('Failed to copy link!'))
    : (() => {
        const textArea = document.createElement('textarea');
        textArea.value = link;
        document.body.append(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
        alert('Link copied to clipboard!');
      })();
}
