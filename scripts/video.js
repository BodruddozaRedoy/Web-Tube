//1. show categories from api
// https://openapi.programming-hero.com/api/phero-tube/categories

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.log(error))
}
loadCategories()

const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then(data => displayCard(data.videos))
    .catch((error) => console.log(error))
}
loadVideos()

const loadCategoryVideos = (id) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => displayCard(data.category))
    .catch((error) => console.log(error))
    const activeBtn = document.getElementById(`btn-${id}`)
    activeBtn.classList.add("bg-red-500")
    activeBtn.classList.add("text-white")

}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn")
    for(let btn of buttons){
    btn.classList.remove("bg-red-500")
        console.log(btn);
    }
}

const displayCategories = async (categories) => {
    categories.forEach((item) => {
        document.getElementById('category').innerHTML += `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn m-2 category-btn">${item.category}</button>
        `
    })
}

const getTimeString = (time) => {
    const day = parseInt(time / 86400)
    const hour = parseInt(time / 3600)
    const minitue = parseInt(time / 60)
    return `${day} day ${hour} hour ${minitue} min`
}

const loadDetails = async (videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.video)
}

const displayDetails = (video) => {
    console.log(video);
    const detailsContainer = document.getElementById("modal-content").innerHTML = `
    <img src=${video.thumbnail}/>
    <p class="my-2">${video.description}</p>
    `

    document.getElementById("customModal").showModal()
}

const displayCard = (videos) => {
    const videoContainer = document.getElementById('videos')
    videoContainer.innerHTML = ""

    if (videos.length == 0) {
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="assets/icon.png"/>
        <p class="font-bold text-xl">No Content Here in this Category</p>
        </div>
        `
        return
    }
    videoContainer.classList.add("grid")

    videos.map((video) => {
        // console.log(video);
        videoContainer.innerHTML += `
        <div class="card card-compact bg-base-100 shadow-xl">
        <figure class="h-[200px] relative">
        <img class="h-full w-full object-cover "
        src=${video.thumbnail} />
        ${video.others.posted_date?.length == 0 ? `<span class="absolute bottom-2 right-2 bg-gray-700 rounded text-white p-1 text-xs">Now</span>` : `<span class="absolute bottom-2 right-2 bg-gray-700 rounded text-xs text-white p-1">${getTimeString(video.others.posted_date)} ago</span>`}
        
        </figure>
        <div class="card-body">
        <div class="flex gap-2">
                <img class="w-10 rounded-full h-10 object-cover" src=${video.authors[0].profile_picture} alt="">
                <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                <p class="text-gray-400">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt="">` : ""}
                </div>
                <p class="text-gray-400">${video.others.views}</p>
                <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm">Details</button>
                </div>
            </div>
        </div>
        </div>
        </div>
        `
    })
}

document.getElementById("search-input").addEventListener("keyup", (e)=>{
    loadVideos(e.target.value);
})