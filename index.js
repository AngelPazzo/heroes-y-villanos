console.log("Superhero Hunter");

let search = document.getElementById("search");
const ul = document.getElementById("auto-complete");

let hero = [];
let favarray = [];
let heroid = 0;
let favid = 0;

search.onkeyup = function () {
  let searchname = search.value;
  if (searchname !== "") {
    fetch(
      "https://superheroapi.com/api.php/ 3328323083897178/search/" +
        searchname.trim()
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        function showhero() {
          let heronames = data.results;
          console.log(data.results);
          ul.innerText = " ";
          for (let i of heronames) {
            let li = document.createElement("li");
            li.innerHTML = i.name;
            li.id = i.id;

            li.addEventListener("click", function () {
              heroid = this.id;
              console.log(heroid + "this is id");
              loadDetails(heroid);
              ul.innerText = " ";
            });
            li.setAttribute("style", "display: block;");
            ul.appendChild(li);
          }
        }

        showhero();
      })
      .catch((err) => console.log(err));
  }
};

function loadDetails(heroid) {
  fetch(`https://superheroapi.com/api.php/ 3328323083897178/${heroid}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let details = document.getElementById("details");
      details.setAttribute("style", "background-color:rgba(0,0,0,0.8);");

      let img = document.getElementById("img");
      img.setAttribute("src", data.image.url);

      let name = document.getElementById("name");
      name.innerHTML = data.name;

      let bio = document.getElementById("bio");
      bio.innerHTML = " Relatives :" + data.connections.relatives;

      let good = document.getElementById("good");
      good.innerText = "Nature :" + data.biography.alignment;

      let base = document.getElementById("base");
      base.innerHTML = "Work :" + data.work.base;

      let occ = document.getElementById("occupation");
      occ.innerHTML = "Occupation :" + data.work.occupation;

      let powestat = document.getElementById("powerstats");
      powestat.innerHTML =
        "Intelligence : " +
        data.powerstats.intelligence +
        ", Combat : " +
        data.powerstats.combat +
        ", Power : " +
        data.powerstats.power +
        ", Speed : " +
        data.powerstats.speed +
        ", Strength : " +
        data.powerstats.strength;

      let favv = document.getElementById("favbtn");
      favv.setAttribute("style", "display:flex;");
      favv.setAttribute("value", data.id);
    })
    .catch((error) => console.log(error));
}

function favpush(favid) {
  console.log(favid);
  if (favarray.includes(favid)) {
    alert("Already Added to the Favourite List");
    return;
  }
  favarray.push(favid);

  console.log(favarray);
  localStorage.setItem("favlistarr", JSON.stringify(favarray));
}
