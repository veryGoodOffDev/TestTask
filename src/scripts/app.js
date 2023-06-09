const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const mainFormContainer = $(".order-form"),
  overlayForm = $(".overlay"),
  closeFormButton = $("#close"),
  successButton = $("#success"),
  successMessage = $(".success-message"),
  body = $("body"),
  burgerMenuButton = $(".header__nav-burger"),
  navMenuList = $(".nav__menu-list"),
  root = $(":root"),
  chosenColor = $(".order-form__chosen-color-area"),
  quantity = $(".count"),
  textAreaComment = $(".order-form__textarea-comment"),
  customRadio = $$(".order-form__custom-radio"),
  cards = $$(".card"),
  buttonsBuyProduct = $$(".card__add")

  const themes = {
    dark: {
      "--header-bg-color": "rgba(0, 0, 0, .9)",
      "--text-color": "#ffffff",
      "--bg-color": "#000",
      "--bg-button-hover": " #f13232",
      "--bg-form-product": "rgb(10,10,10)",
      "--shadow-card":
        " rgba(238, 231, 231, 0.19) 0px 10px 20px, rgba(241, 227, 227, 0.23) 0px 6px 6px",
      "--logo-footer": "url('../img/Logo_02.png')",
      "--bg-color-label": "#ffffff",
      "--text-color-label": "#000",
    },
    light: {
      "--header-bg-color": "rgba(0, 0, 0, .9)",
      "--text-color": "#000",
      "--bg-color": "rgb(255, 255, 255)",
      "--bg-form-product": "rgb(255, 255, 255)",
      "--shadow-card": "0px -8px 15px 7px rgba(7, 7, 7, 0.27)",
      "--logo-footer": "url('../img/Logo_2_dark.png')",
      "--bg-color-label": "#000",
      "--text-color-label": "#ffffff",
    },
  };

burgerMenuButton.addEventListener("click", (e) => {
  navMenuList.classList.toggle("open");
  burgerMenuButton.classList.toggle("open");
  body.classList.toggle("modal-open");
  navMenuList.addEventListener("click", () => {
    navMenuList.classList.remove("open");
    burgerMenuButton.classList.remove("open");
    body.classList.remove("modal-open");
  });
});

let isDarkTheme = true;
changeTheme(isDarkTheme);
const switchTheme = $(".switch__theme");

switchTheme.addEventListener("click", () => {
  switchTheme.classList.toggle("swith_on");
  btnHandler();
});

function btnHandler() {
  isDarkTheme = !isDarkTheme;
  changeTheme(isDarkTheme);
}

function changeTheme(isDarkTheme) {
  const theme = isDarkTheme ? "dark" : "light";
  Object.entries(themes[theme]).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

buttonsBuyProduct.forEach((button) => {
  button.addEventListener("click", () => {
    openOverlay();
    customRadio.forEach((btn) => {
        btn.classList.remove("checked");
      });
    customRadio[0].classList.add("checked");
    chosenColor.style.backgroundColor = "black";
    quantity.value = "1";
    textAreaComment.value = "";
  });
});
closeFormButton.addEventListener("click", () => {
  closeOverlay();
});

successButton.addEventListener("click", () => {
  successMessage.classList.add("show-message");
  mainFormContainer.style.top = "200vh";
  const data = {
    quantity: quantity.value,
    chosen_color: chosenColor.style.backgroundColor,
    comment: textAreaComment.value,
  };
  setTimeout(() => {
    closeOverlay();
  }, 3000);
});

overlayForm.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.classList.contains("overlay")) {
    closeOverlay();
  }
});

const btnUp = $(".btn-up");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  if (scrollY > 400) {
    btnUp.classList.remove("btn-up_hide");
  } else {
    btnUp.classList.add("btn-up_hide");
  }
});

btnUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

function openOverlay() {
  mainFormContainer.classList.add("show");
  overlayForm.classList.add("show");
  setTimeout(() => {
    mainFormContainer.style.opacity = "1";
    overlayForm.style.backgroundColor = "rgba(0,0,0,0.9)";
  }, 300);
  body.classList.add("modal-open");
}
function closeOverlay() {
  mainFormContainer.style.opacity = "0";
  overlayForm.style.backgroundColor = "rgba(0,0,0,.0)";
  successMessage.classList.remove("show-message");
  setTimeout(() => {
    mainFormContainer.classList.remove("show");
    overlayForm.classList.remove("show");
    mainFormContainer.style.top = "50%";
  }, 300);
  body.classList.remove("modal-open");
}

const month = {
  1: "Января",
  2: "Февраля",
  3: "Марта",
  4: "Апреля",
  5: "Мая",
  6: "Июня",
  7: "Июля",
  8: "Августа",
  9: "Сентября",
  10: "Октября",
  11: "Ноября",
  12: "Декабря",
};

function getDateInfo(date) {
  let formatDate = [];
  const arrDate = date.split(".");
  const newDate = new Date(arrDate[2], arrDate[1] - 1, arrDate[0]);
  const days = {
    0: "Воскресенье",
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
  };
  const day = newDate.getDay();
  formatDate.push(days[day]);

  if (parseInt(arrDate[0]) >= 1 && parseInt(arrDate[0]) <= 7) {
    formatDate.push("1 неделя");
  } else if (parseInt(arrDate[0]) > 7 && parseInt(arrDate[0]) <= 14) {
    formatDate.push("2 неделя");
  } else if (parseInt(arrDate[0]) > 14 && parseInt(arrDate[0]) <= 21) {
    formatDate.push("3 неделя");
  } else if (parseInt(arrDate[0]) > 21 && parseInt(arrDate[0]) <= 28) {
    formatDate.push("4 неделя");
  } else if (parseInt(arrDate[0]) > 29) {
    formatDate.push("5 неделя");
  }
  formatDate.push(month[parseInt(arrDate[1])]);

  return `Date added: ${formatDate[0]}, ${formatDate[1]} ${
    formatDate[2]
  }, ${newDate.getFullYear()} года`;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

cards.forEach((card) => {
  const dateForCard = new Date(
    2023,
    getRandomNumber(0, 4),
    getRandomNumber(1, 28)
  ).toLocaleString("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const infodateCard = card.querySelector(".card__date-add-info");
  infodateCard.textContent = getDateInfo(dateForCard);
});

customRadio.forEach((btn) => {
  btn.addEventListener("click", ({ target }) => {
    customRadio.forEach((btn) => {
      btn.classList.remove("checked");
    });

    target.classList.add("checked");
    if (target.getAttribute("name") === "white") {
      target.style.setProperty("--bg-round", "white");
      chosenColor.style.backgroundColor = "white";
    } else if (target.getAttribute("name") === "black") {
      target.style.setProperty("--bg-round", "black");
      chosenColor.style.backgroundColor = "black";
    } else if (target.getAttribute("name") === "red") {
      target.style.setProperty("--bg-round", "red");
      chosenColor.style.backgroundColor = "red";
    }
  });
});
const allSsections = $$(".section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const links = $$(".nav__menu-link");
        links.forEach((link) => {
          let id = link.getAttribute("href").replace("#", "");
          if (id === entry.target.id) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.3,
  }
);
allSsections.forEach((sec) => observer.observe(sec));
