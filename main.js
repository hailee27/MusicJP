//data muisc
const songs = [
        {   
            name: 'Kẻ Theo Đuổi Ánh Sáng[Ver. by 1967]',
            singer: 'Huy Vạc ft. Tiến Nguyễn x Ryan',
            path: 'music/song10.mp3',
            image: 'http://img.youtube.com/vi/WbYxjVdZYrg/hqdefault.jpg'
        },
        {   
            name: 'Tabun(Haven`t)',
            singer: 'Yoasobi',
            path: 'music/haven`t.mp3',
            image: 'img/haven`t.jpg'
        },
        {   
            name: 'Hazakura',
            singer: 'Kie Kitano',
            path: 'music/song3.mp3',
            image: 'img/song3.jpg'
        },
        {   
            name: 'Yoru ni kakeru',
            singer: 'Yoasobi',
            path: 'music/song2.mp3',
            image: 'img/song2.jpg'
        },
        {   
            name: 'Best Friend',
            singer: 'Lefty Hand Cream',
            path: 'music/song4.mp3',
            image: 'img/song4.jpg'
        },
        {   
            
            name: 'インドア系ならトラックメイカー',
            singer: 'Yunomi',
            path: 'music/song5.mp3',
            image: 'img/song5.jpg'
        },
        {   
            name: '打上花火',
            singer: 'DAOKO×米津玄師',
            path: 'music/song6.mp3',
            image: 'img/song6.jpg'
        },
        {   
            name: 'Hand in Hand',
            singer: 'Hatsune Miku',
            path: 'music/song7.mp3',
            image: 'img/song7.jpg'
        },
        {   
            name: 'Lemon',
            singer: 'Kenshi Yonezu',
            path: 'music/song8.mp3',
            image: 'img/song8.jpg'
        },
        {   
            name: 'Shelter',
            singer: 'Porter Robinson & Madeon ',
            path: 'music/song9.mp3',
            image: 'img/song9.jpg'
        }
    ]
//Khai bao bien    
var currentIndex = 0; 
var isPlaying = false;
var isRepeat = false;
var isRandom = false;
const $ = document.querySelector.bind(document)
const header = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const listSong = $('.playlist')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const singers = $('.singer');
const progress = $('#progress')
const durationTime = $('.durationtime')
const stepTime = $('.steptime')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const random = $('.btn-random')
const repeat = $('.btn-repeat')
const playList = $('.playlist')


// ham xu ly su kien
function handleEvents(){

    //xu ly click play btn
    playBtn.onclick = function(){
        if(!isPlaying){
            audio.play()
        }else{
            audio.pause()
        }
    }

    // xu ly play
    audio.onplay = function(){
        isPlaying = true
        cdAnimation.play()
        player.classList.add('playing')
    }
    //xu lý pause
    audio.onpause = function(){
        isPlaying = false
        cdAnimation.pause()
        player.classList.remove('playing')
    }

    // xu ly tien do Song 
    audio.ontimeupdate = function(){
        // Hien thi tong thoi gian cua bai hat
        var minutes = parseInt(audio.duration/60 ,10)
        var seconds = parseInt(audio.duration%60)
        if(audio.duration){
        // Hien thi tong thoi gian cua bai hat       
                durationTime.textContent = `${minutes}:${seconds} `
                //Tien do chay cua bai hat
                const timePercents = Math.floor(audio.currentTime/audio.duration*100)
                progress.value = timePercents
                progress.style.background = 'linear-gradient(to right, #ec1f55 0%, #ec1f55 ' + timePercents + '%, #d3d3d3 ' + timePercents + '%, #d3d3d3 100%)'
 
            }
        // thoi gian chay
        var mins = Math.floor(audio.currentTime/60)
        var secs = Math.floor(audio.currentTime%60)
        if(secs < 10) {
            secs = '0' + String(secs)
        }
        stepTime.textContent = `${mins}:${secs}`
        
    }

    //Tua bai hat
    progress.oninput = function(e){
        seekTime = e.target.value;
        audio.currentTime = Math.floor(audio.duration*seekTime/100);
    }

    // xu ly next bai hat 
    nextBtn.onclick = function(){
        if(isRandom){
            playRandom()
        }else{
            nextSong();
        }
        scrollView()
        
    }

    //xu ly prev bai hat
    prevBtn.onclick = function(){
        if(isRandom){
            playRandom()
        }else{
            prevSong()
        }
        scrollView()
}

    // Cd quay
    const cdAnimation = cdThumb.animate([
        {transform:'rotate(360deg)'}
    ],{
        duration: 10000,
        iterations: Infinity
    })
    cdAnimation.pause()

    //xu ly active random Song
    random.onclick = function(){
        if(!isRandom){
            isRandom = true                                                                 
            random.classList.add('active')
        }else{
            isRandom = false
            random.classList.remove('active')
        }
    }

    //xu ly active repeat Song
    repeat.onclick = function(){
        if(!isRepeat){
            isRepeat = true
            repeat.classList.add('active')
        }else{
            isRepeat = false
            repeat.classList.remove('active')
        }
    }

    //xu ly end bai hat  
    audio.onended = function(){
        if(isRepeat){
            audio.play();
        }else{
            nextBtn.click()    
        }
    }
    // chon bai hat 
    playList.onclick = function(e){
        const nodeSong = e.target.closest('.song:not(.active)')
        const nodeOption = e.target.closest('.option')
        if(nodeSong || nodeOption){
            if(nodeSong){
                currentIndex = Number(nodeSong.getAttribute('data-index'))
                loadSong()
                audio.play();

            }
            if(nodeOption){

            }
        }   
    }

}
function scrollView() {
    setTimeout(function(){
        $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: "end",
            inline: "center"
        });
    },100)
}
//Hàm lùi bài hát
function prevSong() {
    currentIndex--
    if(currentIndex < 0){
        currentIndex = songs.length - 1
    }
    loadSong()
    audio.play()
}
// hàm tiến bài hát
function nextSong() {
    currentIndex++
    if(currentIndex > songs.length - 1){
        currentIndex = 0
    }
    loadSong()
    audio.play()
}
// hàm play random
function playRandom() {
    var newIndex 
    do{
        newIndex = Math.floor(Math.random()*songs.length);
    }
    while(newIndex===currentIndex)
    currentIndex=newIndex;
    loadSong();
    audio.play();
}

//Load song detail
function loadSong() {
    header.textContent = currentSong.name
    cdThumb.style.backgroundImage = `url('${currentSong.image}')`
    singers.textContent = currentSong.singer
    audio.src = currentSong.path
    renderSong()

}

// Ham render list song
function renderSong() {
   const list = songs.map(function(song,index) {
        return `
        <div class="song ${index === currentIndex ? 'active' : ''}" data-index="${index}">
        <div class="thumb" style="background-image: url('${song.image}')">
        </div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
        </div>     
        `
    })
    listSong.innerHTML = list.join('\n')
}

// Song index
function defineProperties() {
    Object.defineProperty(this, 'currentSong', {
        get: function() {
            return songs[currentIndex]
        }
    })
}
// dark mode
function darkMode() {
    const mode = $('.switch input[type="checkbox"]')
    mode.onclick = function() {
        if(!mode.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            console.log('dark')
        }else {
            document.documentElement.setAttribute('data-theme', 'light');
            console.log('ligt')
        }
    }
}
// Ham khoi dong tat ca cac function
function start() {
    // hien thi list song
    renderSong()
    // song index
    defineProperties()
    // song detail
    loadSong()
    // ham xu Ly
    handleEvents();
    // dark darkMode
    darkMode()
}
start();