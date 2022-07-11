export default function promiseClick(button) {
  // ваш код...

  return new Promise((fn) =>{

    button.addEventListener('click', fn, { once: true });

  });
}
