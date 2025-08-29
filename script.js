const categorySelect = document.getElementById("categorySelect");
const menuCards = document.getElementById("menuCards");

function getData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        callback(data);
        }
    };
    xhr.send();
}

function loadCategories() {
    getData("https://www.themealdb.com/api/json/v1/1/categories.php", function (data) {
        data.categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.strCategory;
        option.textContent = category.strCategory;
        categorySelect.appendChild(option);
        });
    });
}

function loadMealsByCategory(category) {
    getData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, function (data) {
        menuCards.innerHTML = "";
        data.meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        `;
        menuCards.appendChild(card);
        });
    });
}

categorySelect.addEventListener("change", function () {
    if (this.value) {
        loadMealsByCategory(this.value);
    }
});

window.onload = loadCategories;
