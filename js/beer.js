let allBeers;
$(document).ready(function(){
    //const endpoint = "https://api.punkapi.com/v2/beers";
    $.get("https://api.punkapi.com/v2/beers",  function (data) {
        console.log(data);
        allBeers = data;
        Display(allBeers);

        function Display(name, tagline){
            //build html with filted data
                let beerHtml = name.map(
                    item => `
                  
                       <div class="card">
                            <div class='beer-wrapper'>
                                <div class="beer">
                                   <i class="fa fa-star favorited" aria-hidden="true"></i>  
                                    <h3 class="berr__name"></h3> 
                                    <img class="card-img-top" src="${item.image_url}" alt="Beer">
                                    <div class="card-body">
                                        <h5 class="card-title">${item.name}</h5>  
                                        <p class="card-text">${item.tagline}</p>  
                                        <a href="#" class="btn btn-primary">Visitar</a> 
                                    </div>  
                                </div>
                            </div>
                        </div>
                    
                        
                        <div class="pop-up">
                            <i class="fas fa-window-close-o" aria-hidden="true"></i>
                            <h3 class="title">Descrição</h3>
                            <p>${item.description}</p>
                            <h3 class="title">Food Pairing</h3>
                            <ul>
                                ${item.food_pairing.map(ingredient => `<li>${ingredient}</li>`).join("")}    
                            </ul>
                        </div>
                    `
                    
                );
                $(".beers").append(beerHtml);
        }
    });
});

 