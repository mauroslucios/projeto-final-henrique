let listaCervejas = [];
var listaTeste=[];
let page = 1;
let endpoint_url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=80"`

// Preenche o Vetor de cervejas com TODAS as cervejas

endpoint_url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=80`
$.getJSON(endpoint_url, function (data) {
    data.forEach(element => {
        listaCervejas.push(element)
    });
    // console.log()
    lista(listaCervejas);
    console.log(listaCervejas)
});

$(window).scroll(function () {
    if(page<6){
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            // ajax call get data from server and append to the div
            page++;
            endpoint_url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=80`;
            $.getJSON(endpoint_url, function (data) {
                data.forEach(element => {
                    listaTeste.push(element)
                });
                // console.log()
                listaCervejas=listaTeste;
                lista(listaCervejas);
                console.log(listaCervejas);
                console.log(page);
            });
        }
    }
});

function lista(vetor) {
    vetor.forEach(element => {
        beerHtml =
            `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <figure class="card hoverrable">
                    <i class="fa fa-star favorited" aria-hidden="true"></i>  
                    <img class="card-img-top" src="${element.image_url}" alt="Imagem da Cerveja"/>
                    <div class="card-body">
                        <h5 class="card-title" style="color:orange">${element.name}</h4>
                        <h6 class="card-title">${element.tagline}</h5>
                    </div>
                </figure>
            </div>
            `
        $("#painel").append(beerHtml);
    });
}





/*
function loadData(digitado) {
    $("#painel").empty();
    if (!digitado) {
        for (page = 1; page < 6; page++) {
            endpoint_url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=80`
            console.log(endpoint_url)
            $.getJSON(endpoint_url, function (data) {
                listaCervejas = data;
                console.log(data);
                function lista() {
                    listaCervejas.forEach(element => {
                        beerHtml =
                            `
                                <div class="col-lg-4 col-md-6 col-sm-12">
                                <figure class="card hoverrable">
                                    <i class="fa fa-star favorited" aria-hidden="true"></i>
                                    <img class="card-img-top" src="${element.image_url}" alt="Imagem da Cerveja"/>
                                    <div class="card-body">
                                        <h5 class="card-title" style="color:orange">${element.name}</h4>
                                        <h6 class="card-title">${element.tagline}</h5>
                                    </div>
                                </figure>
                                </div>
                                `
                        $("#painel").append(beerHtml);
                    });

                }
                lista(listaCervejas);
            });
        }
    }
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.responseText);
            resposta.forEach(element => {
                let beerHtml =
                    `
                <div class="col-lg-4 col-md-6 col-sm-12">
                            <figure class="card hoverrable">
                                <i class="fa fa-star favorited" aria-hidden="true"></i>
                                <img class="card-img-top" src="${element.image_url}" alt="Imagem da Cerveja"/>
                                <div class="card-body">
                                    <h5 class="card-title" style="color:orange">${element.name}</h4>
                                    <h6 class="card-title">${element.tagline}</h5>
                                </div>
                            </figure>

                        </div>
                `;
                $("#painel").append(beerHtml);
            });
            console.log(resposta);
        }
    };

    xhttp.open("GET", "https://api.punkapi.com/v2/beers?beer_name=" + digitado, true)
    xhttp.send();
} */