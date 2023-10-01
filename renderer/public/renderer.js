// export { world }
let hello = document.getElementById('test');
console.log('show', hello);
console.log('kaj kore');

// console.log(versions.node());
window.myAPI.send('myChannel', 'Hello from renderer');
window.myAPI.on('myChannel', (data) => {
  console.log('Received data:', data);
});
