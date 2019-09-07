//main Ui class
class Ui {
  showMassege(msgText, className) {
    const msg = `<div class="alert ${className}" role="alert">
    ${msgText}
    </div>`;
    this.card.insertAdjacentHTML("beforebegin", msg);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);   
  }
}
//export the Ui class
export const ui = new Ui();
