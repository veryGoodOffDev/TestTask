const mainFormContainer = document.querySelector('.form__product')
const buttonsBuyProduct = document.querySelectorAll('.card__add')
const overlayForm = document.querySelector('.form__overlay')
const closeFormButton = document.querySelector('#close')
const successButton = document.querySelector('#success')
const successMessage = document.querySelector('.success__message')
const body = document.querySelector('body')
const burgerMenuButton = document.querySelector('.header__nav-burger')
const navMenuList = document.querySelector('.nav__menu-list')
const root = document.querySelector(':root')
const cards = document.querySelectorAll('.card')



const themes = {
    dark:{
            '--header-bg-color':'rgba(0, 0, 0, .9)',
            '--text-color':'#ffffff',
            '--bg-color':'#000',
            '--bg-button-hover':' #f13232',
            '--bg-form-product':'rgb(10,10,10)',
            '--shadow-card':' rgba(238, 231, 231, 0.19) 0px 10px 20px, rgba(241, 227, 227, 0.23) 0px 6px 6px',
            '--logo-footer': "url('../img/Logo_02.png')",
            '--bg-color-label': '#ffffff',
            '--text-color-label':'#000',
    },
    light:{
            '--header-bg-color':'rgba(0, 0, 0, .9)',
            '--text-color':'#000',
            '--bg-color':'rgb(255, 255, 255)',
            '--bg-form-product':'rgb(255, 255, 255)',
            '--shadow-card':'0px -8px 15px 7px rgba(7, 7, 7, 0.27)',
            '--logo-footer': "url('../img/Logo_2_dark.png')",
            '--bg-color-label': '#000',
            '--text-color-label':'#ffffff',
    }
}

burgerMenuButton.addEventListener('click', (e)=> {
    navMenuList.classList.toggle('open')
    burgerMenuButton.classList.toggle('open')
    body.classList.toggle('modal-open')
    navMenuList.addEventListener('click', ()=> {
        navMenuList.classList.remove('open')
        burgerMenuButton.classList.remove('open')
        body.classList.remove('modal-open')
    })
})

let isDarkTheme = true;
changeTheme(isDarkTheme)
const switchTheme = document.querySelector('.switch__theme')

switchTheme.addEventListener('click', ()=> {
    switchTheme.classList.toggle('swith_on')
    btnHandler()
})


function btnHandler() {
    isDarkTheme = !isDarkTheme;
    changeTheme(isDarkTheme)
}

function changeTheme(isDarkTheme) {
    const theme = isDarkTheme ? 'dark' : 'light'
    Object.entries(themes[theme]).forEach(([key, value]) => {
        root.style.setProperty(key, value)
    })
}

buttonsBuyProduct.forEach((button) => {
    button.addEventListener('click', () => {openOverlay()})
})
closeFormButton.addEventListener('click', ()=> {closeOverlay()})

successButton.addEventListener('click', () => {
    successMessage.classList.add('show-message')
    mainFormContainer.style.top = '200vh'
    setTimeout(()=> {
        closeOverlay()
    },3000)
})

overlayForm.addEventListener('click', (e)=> {
    e.stopPropagation()
    if(e.target.classList.contains('form__overlay')) {
        closeOverlay()
    } return
})

const btnUp = document.querySelector('.btn-up')
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    if(scrollY > 400) {
        btnUp.classList.remove('btn-up_hide')
    } else {
        btnUp.classList.add('btn-up_hide')
    }
})

btnUp.addEventListener('click', ()=> {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
})


function openOverlay() {
    mainFormContainer.classList.add('show')
    overlayForm.classList.add('show')
    setTimeout(()=> {
        mainFormContainer.style.opacity = 1;
        overlayForm.style.backgroundColor = 'rgba(0,0,0,0.9)'
    },300)
    body.classList.add('modal-open')
}
function closeOverlay() {
    mainFormContainer.style.opacity = 0;
    overlayForm.style.backgroundColor = 'rgba(0,0,0,.0)'
    successMessage.classList.remove('show-message')
            setTimeout(()=> {
                mainFormContainer.classList.remove('show')
                overlayForm.classList.remove('show')
                mainFormContainer.style.top = '50%'

            },300)
            body.classList.remove('modal-open')
}




const month = {
    1:'Января', 2:'Февраля',3:'Марта',4:'Апреля',5:'Мая',6:'Июня',7:'Июля',8:'Августа',9:'Сентября',10:'Октября',11:'Ноября',12:'Декабря'
}


function getDateInfo(date) {
    let formatDate = []
   const arrDate = date.split('.')
   const newDate = new Date(arrDate[2], arrDate[1]-1, arrDate[0])
   const days = {
    0:'Воскресенье', 1:'Понедельник', 2:'Вторник', 3:'Среда', 4:'Четверг', 5:'Пятница', 6:'Суббота',
   }
   const day = newDate.getDay()
   formatDate.push(days[day])

   if(parseInt(arrDate[0])>=1 && parseInt(arrDate[0])<=7) {
    formatDate.push('1 неделя') 
   } else if (parseInt(arrDate[0])>7 && parseInt(arrDate[0])<=14) {
    formatDate.push('2 неделя')
   } else if (parseInt(arrDate[0])>14 && parseInt(arrDate[0])<=21) {
    formatDate.push('3 неделя')
   } else if (parseInt(arrDate[0])>21 && parseInt(arrDate[0])<=28) {
    formatDate.push('4 неделя')
   } else if (parseInt(arrDate[0])>29) {
    formatDate.push('5 неделя')
   }
   formatDate.push(month[parseInt(arrDate[1])])

    return `Date added: ${formatDate[0]}, ${formatDate[1]} ${formatDate[2]}, ${newDate.getFullYear()} года`
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random()*(max-min)+min) 
}



cards.forEach((card)=> {
    const dateForCard = new Date(2023, getRandomNumber(0,4), getRandomNumber(1,28)).toLocaleString('ru-RU',{year: 'numeric', month: 'numeric', day: 'numeric'})
    const infodateCard = card.querySelector('.card__date-add-info')
    infodateCard.textContent = getDateInfo(dateForCard)
})