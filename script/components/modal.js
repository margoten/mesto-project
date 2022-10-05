document.body.addEventListener('keydown', function (evt) {
  if(evt.key == "Escape") {
    document.querySelectorAll(".popup_opened").forEach(popup => {
      closePopup(popup);
    });
  }
}); 

document.querySelectorAll(".popup_content").forEach(popup => {
  popup.addEventListener('click', function (evt) {
      evt.stopPropagation();
});
});
document.querySelectorAll(".popup").forEach(popup => {
  popup.addEventListener('click', function (evt) {
      closePopup(popup);
});
});