export function changeText(newText: string): void {
  const typewriterElement = document.getElementById("typewriter");
  if (!typewriterElement) return;

  const charCount = newText.length;
  const duration = Math.max(1, charCount * 0.08);

  // Calcular ancho real del texto
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  const styles = getComputedStyle(typewriterElement);
  context.font = `${styles.fontSize} ${styles.fontFamily}`;
  const textWidth = context.measureText(newText).width;

  const newElement = typewriterElement.cloneNode(true) as HTMLElement;
  newElement.id = "typewriter";

  // Establecer el ancho real del texto para la animación
  newElement.style.setProperty("--typewriter-width", `${textWidth}px`);
  newElement.style.setProperty("--steps", charCount.toString());
  newElement.style.setProperty("--duration", `${duration}s`);
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
