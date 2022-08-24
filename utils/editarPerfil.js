const myModal = document.getElementById('editarPerfilModal')
const myInput = document.getElementById('editarPerfilBtn')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})