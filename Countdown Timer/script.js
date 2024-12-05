const secondSound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Beep sound

    document.getElementById('start-btn').addEventListener('click', function () {
      const eventName = document.getElementById('event-name').value;
      const eventDate = document.getElementById('event-date').value;
      const eventMessage = document.getElementById('event-message');
      const header = document.querySelector('.display-4');

      if (eventName && eventDate) {
        document.getElementById('date-input').style.display = 'none';
        eventMessage.style.display = 'block';
        header.style.display = 'none';
        document.getElementById('share-btn').style.display = 'inline-block';
        startCountdown(eventName, eventDate);
      } else {
        alert('Please enter both event name and date.');
      }
    });

    function startCountdown(eventName, eventDate) {
      const targetDate = new Date(eventDate).getTime();
      const timerInterval = setInterval(function () {
        const currentDate = new Date().getTime();
        const timeLeft = targetDate - currentDate;
        const eventMessage = document.getElementById('event-message');

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          eventMessage.textContent = `${eventName} has started!`;
          document.getElementById('timer').style.display = 'none';
          return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = formatTime(days);
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);
        document.getElementById('timer').style.display = 'flex';
        eventMessage.textContent = `Countdown to ${eventName}`;

        // Play sound every second
        secondSound.play();
      }, 1000);
    }

    function formatTime(time) {
      return time < 10 ? '0' + time : time;
    }

    function shareLink() {
      const link = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(function () {
          alert('Link copied to clipboard!');
        }).catch(function () {
          alert('Failed to copy link!');
        });
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = link;
        textArea.style.position = 'absolute';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
      }
    }