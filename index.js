import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)

getImageBtn.addEventListener('click', renderCat)

memeModalCloseBtn.addEventListener('click', closeModal)

function closeModal(){
    memeModal.style.display = 'none'
}

memeModal.addEventListener('click', function(e){
    if(e.target === memeModal){
        closeModal()
    }
})

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function getMatchingCatsArray(){     
        const checkedRadio = document.querySelector('input[type="radio"]:checked')

        if(!checkedRadio){
            return []
        }

        const selectedEmotion = checkedRadio.value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  

function getCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return [catsArray[0]] // Wrap single item in array
    }
    else{
        return catsArray
    }
}

function renderCat(){
    const catsArray = getCatObject()

    if(!catsArray || catsArray.length === 0){
        memeModalInner.innerHTML = '<p>No matching cats found!</p>'
        memeModal.style.display = 'flex'
        return
    }

     memeModalInner.innerHTML = ''

     for(let cat of catsArray){
         memeModalInner.innerHTML += `
            <img 
            class="cat-img" 
            src="./images/${cat.image}"
            alt="${cat.alt}"
            >
        `
     }

    memeModal.style.display = 'flex'
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)




