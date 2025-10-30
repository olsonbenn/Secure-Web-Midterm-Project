function loadData(data){
    for (let game of data.pages.index) {
        let div = document.createElement("div");
        div.classList.add("col-sm-6", "col-md-4", "col-lg-3");
        div.innerHTML = `
        <div class="card mb-4" style="width: 100%;">
            <img src=${game.image_url} class="card-img-top" alt="image of board game" width="100" />
            <div class="card-body">
                <h5 class="card-title">${game.title}</h5>
                <p class="card-text">
                    <strong>Year:</strong> ${game.year}
                    Wikipedia Page: ${game.wiki_url}
                </p>
            </div>
        </div>
        `;
        let mainContainer = document.getElementById("card-container");
        mainContainer.appendChild(div);
    }
}

const fetchData = () => {
    fetch("https://olsonbenn.github.io/Secure-Web-Midterm-Project/Midterm/data.JSON")
    .then((response)=> response.json())
    .then((data)=> loadData(data))
    .catch((error)=> console.log("Error :"+error));
}

fetchData();