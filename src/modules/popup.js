const main = document.querySelector('header');

const urlAPI = 'https://pokeapi.co/api/v2/pokemon';

// create popup with API information
const createPopup = (pokeInfo) => {
  const cards = document.createElement('div');
  cards.className = 'popup-container';
  cards.innerHTML = `
      <div class="cardPopup">
        <span class="material-symbols-outlined close">close</span>      
        <div class="popup-header">
          <h2>${pokeInfo.name}</h2> 
          <img class="pokeImage" src="${pokeInfo.img}" alt="pokeball logo">        
          <ul class="popup-skills">
            <li>Type : ${pokeInfo.type}</type>
            <li>Ability : ${pokeInfo.ability} </li>
            <li>Weight : ${pokeInfo.weight} kg.</li>
            <li>height : ${pokeInfo.height} mts.</type>            
          </ul>
        </div>
        <div class="cardPopup__form">
          <h2>Add a Comment</h2>
          <form>
            <input class='username' type="text" name="username" placeholder="Your Name" required>
            <textarea class='comment' id="text-area" placeholder="Your comments" maxlength="400" name="message" required></textarea>
            <button class="commentButton" data-index="${pokeInfo.id}">Go</button>
          </form>
        </div>      
      </div>`;

  main.appendChild(cards);
  const close = document.querySelector('.close');
  close.addEventListener('click', () => {
    main.removeChild(cards);
  });
};

// fetch API
const getPokemon = async (id) => {
  try {
    const response = await fetch(`${urlAPI}/${id}`);
    const data = await response.json();
    const abilities = data.abilities[0];
    const pokeInfo = {
      img: data.sprites.other.dream_world.front_default,
      name: data.forms[0].name[0].toUpperCase() + data.forms[0].name.substring(1),
      ability: abilities.ability.name[0].toUpperCase() + abilities.ability.name.substring(1),
      weight: (data.weight * 0.1).toFixed(1),
      height: (data.height * 0.1).toFixed(1),
      type: data.types[0].type.name[0].toUpperCase() + data.types[0].type.name.substring(1),
      id,
    };
    createPopup(pokeInfo);
  } catch (error) {
    alert('error.message');
  }
};

// Show Popup
const getPokeInfo = () => {
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('seePokemon')) {
      const { index } = event.target.dataset;
      getPokemon(index);
    }
  });
};


//Working on Involvement API
const idComments = 'BZDVsIE83KOtqyh07flb'

//post comment
const addComment = async (id, username, comment) => {
  try {
    const response = await fetch("https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/zVvcayqMcKSodjVAeGk6/comments", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        "item_id": id,
        "username": username,
        "comment": comment
      })      
    })
    
    const data = await response.text();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error('Game not found!');
  }
};


// Get users comments
const userComments = async (id) => {
  try {
    const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/zVvcayqMcKSodjVAeGk6/comments?item_id=${id}`);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    throw new Error('Not Found!!!.');
  }
};

userComments('item2')





export default getPokeInfo;