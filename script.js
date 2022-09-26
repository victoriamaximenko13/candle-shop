const items = [
  {
    title: "Большая свеча Black Viper",
    description: "лилия, розовый перец, уд, ирис, кожа, сандал, табак, фиалка",
    price: 5000,
    img: "./img/black-viper.jpeg",
    rating: 4.4,
  },
  {
    title: "Свеча Coconut Grove",
    description: "кокос, листья пальмы, бобы тонка, жасмин, лайм, мандарин",
    price: 9000,
    img: "./img/coconut-grove.jpeg",
    rating: 3.1,
  },
  {
    title: "Ароматический диффузор",
    description: "кокос, инжир, кедр, корица, фиалка, эвкалипт",
    price: 3000,
    img: "./img/fig-tree.jpeg",
    rating: 5.0,
  },
  {
    title: "Аромаванна Fig Tree",
    description: "кокос, инжир, кедр, корица, фиалка, эвкалипт",
    price: 6600,
    img: "./img/shower-fig-tree.jpeg",
    rating: 4.7,
  },
  {
    title: "Сменный рефилл для диффузора",
    description: "фиалковый корень, лаванда, лимон, мускус, мята, шалфей",
    price: 4000,
    img: "./img/green-lavender.jpeg",
    rating: 4.9,
  },
  {
    title: "Большая свеча Notorious Neroli",
    description: "липа, бергамот, ветивер, лаванда, лимон, мандарин, мох, нероли",
    price: 2000,
    img: "./img/notorious-neroli.jpeg",
    rating: 3.2,
  },
  {
    title: "Диффузор Oriental Noir",
    description: "ваниль, пачули, розовый перец, кедр, кофе, мускатный орех, орхидея",
    price: 3000,
    img: "./img/oriental-noir.jpeg",
    rating: 2.9,
  },
  {
    title: "Набор Velvet Peony",
    description: "амбра, иланг-иланг, малина, персик, пион, роза, фиалка",
    price: 10000,
    img: "./img/velvet-peony.jpeg",
    rating: 3.4,
  },
  {
    title: "Спрей для дома Ouhd Geranium",
    description: "пачули, пралине, амбра, ветивер, герань, дерево уд",
    price: 1500,
    img: "./img/ouhd-geranium.jpeg",
    rating: 4.8,
  },
  {
    title: "Средняя свеча White Tea",
    description: "белый чай, бергамот, жасмин, имбирь, кедр, лайм",
    price: 2000,
    img: "./img/white-tea.jpeg",
    rating: 3.2,
  },
  {
    title: "Travel-свеча Fig Tree",
    description: "кокос, инжир, кедр, корица, фиалка, эвкалипт",
    price: 3500,
    img: "./img/travel-candle.jpeg",
    rating: 3.7,
  },
  {
    title: "Спрей для дома Oriental Noir",
    description: "ваниль, пачули, розовый перец, кедр, кофе, мускатный орех",
    price: 1800,
    img: "./img/s-noir.jpeg",
    rating: 4.1,
  },
];


const cardContainer = document.querySelector("#shop-items");
const cardTemplate = document.querySelector("template");
const nothingFound = document.querySelector("#nothing-found");


function makeShopItem(shopItem) {
  const item = cardTemplate.content.cloneNode(true);
  const { title, description, price, img, rating } = shopItem;
  item.querySelector("h1").textContent = title;
  item.querySelector("p").textContent = description;
  item.querySelector(".price").textContent = `${price}P`;
  item.querySelector("img").src = img;

  for (let i = 0; i < rating; i++) {
    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-star");
    item.querySelector(".rating").append(icon);
  }

  cardContainer.append(item);
  return item;
}

let currentItems = [...items];

function showResultItems(array) {
  nothingFound.textContent = "";
  cardContainer.textContent = "";
  array.forEach((value) => {
    makeShopItem(value);
  });
  if (!array.length) {
    nothingFound.textContent = "No results";

  }
}



function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  return 0;
}

showResultItems(currentItems.sort((a, b) => sortByAlphabet(a, b)));

const sortValue = document.querySelector("#sort");
sortValue.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  switch (selectedOption) {
    case "expensive": {
      currentItems.sort((a, b) => b.price - a.price);
      break;
    }
    case "cheap": {
      currentItems.sort((a, b) => a.price - b.price);
      break;
    }
    case "rating": {
      currentItems.sort((a, b) => b.rating - a.rating);
      break;
    }
    case "alphabet": {
      currentItems.sort((a, b) => sortByAlphabet(a, b));
      break;
    }

  }
  showResultItems(currentItems);
});

const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");


function applySearch() {
  const searchValue = searchInput.value.trim().toUpperCase();
  currentItems = items.filter((string) => {
    return string.title.toUpperCase().includes(searchValue)
  });
  currentItems.sort((a, b) => sortByAlphabet(a, b));
  sortValue.selectedIndex = 0;
  showResultItems(currentItems);
}

searchBtn.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);