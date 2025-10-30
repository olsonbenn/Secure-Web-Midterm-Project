function loadData(data){
    for (let game of data.pages) {
        let div = document.createElement("div");
        div.classList.add("col-sm-6", "col-md-4", "col-lg-3");
        div.innerHTML = `
        <div class="card mb-4" style="width: 100%;">
            <img src=${game.index.image-url} class="card-img-top" alt="image of board game" width="100" />
            <div class="card-body">
                <h5 class="card-title">${game.index.title}</h5>
                <p class="card-text">
                    <strong>Year:</strong> ${game.index.year}
                    Wikipedia Page: ${game.index.wiki-url}
                </p>
            </div>
        </div>
        `;
        let mainContainer = document.getElementById("card-container");
        mainContainer.appendChild(div);
    }
}

const fetchData = () => {
    console.log("Begin");
    fetch('https://github.com/olsonbenn/Secure-Web-Midterm-Project/blob/main/Midterm/data.JSON')
    .then((response)=> response.json())
    .then((data)=> loadData(data))
    .catch((error)=> console.log("Error :", error));
}

//fetchData();