//1. show categories from api
// https://openapi.programming-hero.com/api/phero-tube/categories

const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch((error) => console.log(error))
}
loadCategories()

const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => displayCard(data.videos))
    .catch((error) => console.log(error))
}
loadVideos()

const displayCategories = async (categories) => {
    categories.forEach((item) => {
        document.getElementById('category').innerHTML += `
        <button class="btn m-2">${item.category}</button>
        `
    })
}

const displayCard = (videos) => {
    
    videos.map((video) => {
        console.log(video);
        document.getElementById('videos').innerHTML += `
        <div class="card card-compact bg-base-100 shadow-xl">
        <figure class="h-[200px] relative">
        <img class="h-full w-full object-cover"
        src=${video.thumbnail} />
        ${video.others.posted_date?.length == 0 ? `<span class="absolute bottom-2 right-2 bg-gray-700 rounded text-white p-1">Now</span>` : `<span class="absolute bottom-2 right-2 bg-gray-700 rounded text-xs text-white p-1">${video.others.posted_date} ago</span>`}
        
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
                </div>
            </div>
        </div>
        </div>
        </div>
        `
    })
}