export function changeText(newText: string): void {
  const typewriterElement = document.getElementById("typewriter");
  if (!typewriterElement) return;

  // 1) Obtenemos estilos computados
  const styles = getComputedStyle(typewriterElement);
  const originalFontSize = parseFloat(styles.fontSize); // en px

  // 2) Medimos ancho del texto al font-size original
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;
  context.font = `${styles.fontSize} ${styles.fontFamily}`;
  const textWidth = context.measureText(newText).width;

  // 3) Medimos ancho del contenedor padre
  const parent = typewriterElement.parentElement;
  const parentWidth = parent ? parent.getBoundingClientRect().width : textWidth;

  // 4) Calculamos factor de escala si hace falta
  let scale = 1;
  if (textWidth > parentWidth) {
    scale = parentWidth / textWidth;
  }

  // 5) Ancho que usaremos en la animación (width final)
  const animationWidth = textWidth * scale;

  // 6) Duración y pasos de la animación
  const charCount = newText.length;
  const duration = Math.max(1, charCount * 0.08);

  // 7) Clonamos el elemento para reiniciar la animación
  const newElement = typewriterElement.cloneNode(true) as HTMLElement;
  newElement.id = "typewriter";

  // 8) Ajustamos font-size escalado (si scale < 1)
  newElement.style.fontSize = `${originalFontSize * scale}px`;

  // 9) Inyectamos variables CSS y ancho inline
  newElement.style.setProperty("--typewriter-width", `${animationWidth}px`);
  newElement.style.setProperty("--steps", charCount.toString());
  newElement.style.setProperty("--duration", `${duration}s`);
  newElement.style.width = `${animationWidth}px`;

  // 10) Ponemos el nuevo texto y reemplazamos en el DOM
  newElement.textContent = newText;
  typewriterElement.parentNode?.replaceChild(newElement, typewriterElement);
}

// Función para el loop automático
export function startTypewriterLoop(
  phrases: string[],
  pauseDuration: number = 2000
): void {
  let currentIndex = 0;
  let isRunning = false;

  function nextPhrase(): void {
    if (!isRunning) return;

    const currentPhrase = phrases[currentIndex];
    changeText(currentPhrase);

    // Calcular duración total de la animación
    const animationDuration = Math.max(1, currentPhrase.length * 0.08) * 1000;
    const totalDelay = animationDuration + pauseDuration;

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % phrases.length;
      nextPhrase();
    }, totalDelay);
  }

  function start(): void {
    if (isRunning) return;
    isRunning = true;
    nextPhrase();
  }

  // Iniciar el loop
  start();
}
