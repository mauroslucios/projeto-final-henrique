let listaCervejas = [];
var listaTeste = [];
let page = 1;
let param = 80;
let endpoint_url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${param}"`
let valor_busca = ''//document.getElementById("#busca").value;

lista(param);

if (valor_busca=='') {
    $(window).scroll(function () {
        if (page < 6) {
            if ($(window).scrollTop() == $(document).height() - $(window).height() && $("#busca").val()==='') {
                // listaTeste = [];
                page++;
                lista(param);
            }
        }
    });
}

function lista(param) {
    listaTeste = [];
    listaCervejas = listaTeste;
    endpoint_url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${param}`
    $.getJSON(endpoint_url, function (data) {
        data.forEach(element => {
            // console.log(element.image_url);
            if(element.image_url===null){
                element.image_url = "https://www.bebidasfamosas.com.br/media/catalog/product/cache/19/image/650x/040ec09b1e35df139433887a97daa66f/2/9/2918_coquetel_corote_lim_o_500ml.png";
            }
            listaCervejas.push(element)
        });
        
        formataLista(listaCervejas);
        console.log(listaCervejas)
    });

}

function formataLista(vetor) {
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


function buscaCerveja(digitado) {
    $("#painel").empty();
    if (!digitado) {
        listaCervejas = [];
        lista(param);
        /* for (page = 1; page < 6; page++) {
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
        } */
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
} 