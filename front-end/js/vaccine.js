var objJson = [];

const URL = `https://vaccine-info-ze-gotinha.herokuapp.com/vaccines`;

function getVaccines(){
    fetch(URL)
    .then((resposta) => resposta.json())
    .then((data) => fillData(data))
    .catch((erro) => console.error(erro));
}

getVaccines();

function vaccined() {}

var listing_table = document.getElementById("table-list-content");

listing_table.innerHTML = "";

function createButtonVaccinated(vaccinated) {
    const buttonVac = document.createElement("button");
    let favoriteIcon = document.createElement("i");
    favoriteIcon.className = "far fa-star";
    buttonVac.innerHTML = favoriteIcon;
    document.body.appendChild(buttonVac);
  }

function fillData(list) {
    list.forEach((element, index) => {
        let linha = document.createElement("tr");
        
        let itemLinhaId = document.createElement("td");
        itemLinhaId.innerText = element.id;
        
        let itemLinhaNome = document.createElement("td");
        itemLinhaNome.innerText = element.name;

        let itemLinhaExpectedDate = document.createElement("td");
        itemLinhaExpectedDate.innerText = element.expected_date;

        let itemLinhaVaccinated = document.createElement("td");
        let itemLinhaDelete = document.createElement("td");

        const buttonVac = document.createElement("button");
        
        buttonVac.addEventListener("click", function () {
          fetch(`${URL}/${element.id}/vaccinated`, {
            method: "PATCH",
            body: JSON.stringify({ vaccinated: !element.vaccinated }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((resposta) => {
              resposta.json();
            })
            .then((data) => window.location.reload())
            .catch((erro) => console.error(erro));
        });
        let favoriteIcon = document.createElement("i");
        favoriteIcon.className = element.vaccinated ? "fas fa-check-circle" : "fas fa-times-circle";
        buttonVac.appendChild(favoriteIcon);
        itemLinhaVaccinated.appendChild(buttonVac);
    
        const buttonDel = document.createElement("button");
        
        buttonDel.addEventListener("click", function () {
          fetch(`${URL}/${element.id}`, {
            method: "DELETE",
          }).then((data) => {
              var i = this.parentNode.parentNode.rowIndex;
              document.getElementById("table-list").deleteRow(i);
            })
            .catch((erro) => console.error(erro));
        });
  

        let deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-trash";
        buttonDel.appendChild(deleteIcon);
        itemLinhaDelete.appendChild(buttonDel);

        linha.appendChild(itemLinhaId);
        linha.appendChild(itemLinhaNome);
        linha.appendChild(itemLinhaExpectedDate);
        linha.appendChild(itemLinhaVaccinated);
        linha.appendChild(itemLinhaDelete);
        listing_table.appendChild(linha);
    
    });
}
