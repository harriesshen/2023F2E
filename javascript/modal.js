const modal = document.getElementById("modal");

const headerTitle = document.getElementById("modal-header-title");
const cancel = document.getElementById("modal-header-cancel"); // 取消按鈕

const img = document.getElementById("modal-body-img");
const smallTitle = document.getElementById("modal-body-smallTitle");

const bodyRight = document.querySelector(".modal-body-right");
const title = document.getElementById("modal-body-title");
const date = document.getElementById("modal-body-date");
const desc = document.getElementById("modal-body-desc");

cancel.addEventListener("click", () => {
  console.log("modal cancel");
  modal.style.display = "none";
});

const openModal = (headerTitle, titleText, dateTime, imgSrc, description) => {
  console.log("this", this);
  modal.style.display = "block";
  headerTitle.textContent = headerTitle;
  smallTitle.textContent = titleText;
  img.src = `./images/${imgSrc}`;
  title.textContent = titleText;
  date.textContent = dateTime;
  desc.style.height = `${
    bodyRight.clientHeight - title.clientHeight - 20 - date.clientHeight - 20
  }px`;
  desc.textContent = description;
  console.log("title", title.clientHeight);
  console.log("date", date.clientHeight);
  console.log("desc", desc.clientHeight);
  console.log("bodyRight", bodyRight.clientHeight);
};

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.keyCode === 27) {
    modal.style.display = "none";
  }
});
