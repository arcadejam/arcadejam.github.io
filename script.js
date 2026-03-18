/* SCRIPT PARA LA CUENTA ATRÁS */

    // Establecer la fecha objetivo: 12 de Junio de 2026 a las 17:00:00
    const countDownDate = new Date("Jun 12, 2026 17:00:00").getTime();

    // Actualizar la cuenta atrás cada 1 segundo (1000 milisegundos)
    const x = setInterval(function () {

      // Obtener la fecha y hora actual
      const now = new Date().getTime();

      // Encontrar la distancia entre ahora y la fecha de cuenta atrás
      const distance = countDownDate - now;

      // Cálculos de tiempo para días, horas, minutos y segundos
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Añadir un '0' delante si el número es menor de 10 para mantener el formato 00
      const formatDays = days < 10 ? "0" + days : days;
      const formatHours = hours < 10 ? "0" + hours : hours;
      const formatMinutes = minutes < 10 ? "0" + minutes : minutes;
      const formatSeconds = seconds < 10 ? "0" + seconds : seconds;

      // Mostrar los resultados en los elementos correspondientes
      document.getElementById("days").innerHTML = formatDays;
      document.getElementById("hours").innerHTML = formatHours;
      document.getElementById("minutes").innerHTML = formatMinutes;
      document.getElementById("seconds").innerHTML = formatSeconds;

      // Si la cuenta atrás termina, escribe texto o déjalo a 00
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
      }
    }, 1000);

    