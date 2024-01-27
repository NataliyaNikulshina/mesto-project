export default function loadingForm(isLoading, evt) {
  const saveButton = evt.querySelector(".popup__button-save");
  if (isLoading) {
    saveButton.textContent = "Сохранение...";
  } else {
    saveButton.textContent = "Сохранить";
  }
}
