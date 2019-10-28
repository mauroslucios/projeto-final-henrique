const endpoint = "https://api.punkapi.com/v2/beers?per_page=80";

// beers by strength

$.getJSON(endpoint, function (data) {
  // add to favourite
  // click of star
  // beers are added into favourite div
  // favourites can be viewed by clicking favourite
  console.log(data);

  // filter through data 
  let allBeers = data.filter(beer => beer.abv >= 0);
  let weakBeers = data.filter(beer => beer.abv <= 4.5);
  let medBeers = data.filter(beer => beer.abv > 4.5 && beer.abv <= 7.5);
  let strongBeers = data.filter(beer => beer.abv > 7.5 && beer.abv <= 50);
  // pass in filtered data  and class
  function Display(range, percent) {
    // build html with filted data
    let beerHtml = range.map(
      item =>
        `
        <div class = 'card beer-wrapper'>
        <div class = "beer ${percent}" >
          <img class ="beer__img" src = "${item.image_url}">  
          <div class="card-body">
            <i class="fa fa-star" aria-hidden="true"></i>
            <h5 class="card-title beer__name" style="color: orange">${item.name}</h3>
            <h6 class ="card-subtitle mb-2 text-muted beer__tagline">${item.tagline}</h4>
          </div>
         </div>
         <div class ="pop-up">
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="white-text">&times;</span>
          </button>
            <h3 class ="title">Description</h3>
            <p>${item.description}</p>
            <h3 class ="title">Food Pairing</h3>
              <ul>
       
               ${item.food_pairing
          .map(ingredient => `<li>${ingredient}</li>`)
          .join("")}

              </ul>
          </div>
        </div>
       
            `
    );

    $(".beers").append(beerHtml);
  }
  // call filtered html with class names

  Display(weakBeers, "weak");
  Display(medBeers, "medium");
  Display(strongBeers, "strong");
  // Display(allBeers, "all");
  // get favourite info
  $(".beer").one("click", ".fa-star", function () {
    $(this).toggleClass("active-star");
    let favouriteImg = $(this)
      .closest(".beer-wrapper")
      .find(".beer__img")
      .attr("src");
    let favouriteName = $(this)
      .closest(".beer-wrapper")
      .find(".beer__name")
      .text();
    let favouriteTagline = $(this)
      .closest(".beer-wrapper")
      .find(".beer__tagline")
      .text();
    let index = $(".fa-star").index(this);
    let favouriteHTML = `
            <div class='favourites__item' data-index-number=${index}>
              <h4>${favouriteName}</h4>
              <img src = ${favouriteImg} />
              <h5>${favouriteTagline}</h5>
            </div>
      `;

    $(".favourites").append(favouriteHTML);
  });
  // favourite clicks
  $(".favourites").append(
    '<i class="close favourites__close" aria-hidden="true"> <span aria-hidden="true" class="white-text">&times;</span></i>'

  );

  $(".favourites").on("click", ".favourites__close", function () {
    $(".favourites").fadeOut();
  });

  $(".favourites__title").on("click", function () {
    $(".favourites").fadeIn();
  });

  // beer pop up - extra info from data
  $(".beer img").on("click", function () {
    $(this)
      .closest(".beer-wrapper")
      .find(".pop-up")
      .fadeIn();
    $(".bg").fadeIn();
  });

  $(".close").on("click", function () {
    $(".pop-up").fadeOut();
    $(".bg").fadeOut();
  });
  // hide beers apart from medium range

  $(".beer").css("display", "none");

  $(".beers .medium").css("display", "block");
  // filter beers using tabs
  $(".tab__item").on("click", function () {
    $(".tab__item").removeClass("active");
    $(this).addClass("active");
  });

  $(".tab__item.weak").on("click", function () {
    $(".beers .weak").show();

    $(".beers .medium").hide();
    $(".beers .strong").hide();
  });

  $(".tab__item.medium").on("click", function () {
    $(".beers .medium").show();

    $(".beers .weak").hide();
    $(".beers .strong").hide();
  });

  $(".tab__item.strong").on("click", function () {
    $(".beers .strong").show();

    $(".beers .weak").hide();
    $(".beers .medium").hide();
  });
});
