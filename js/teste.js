let listaCervejas = [];
var listaTeste = [];
let listaFavoritos = [];
let page = 1;
let param = 80;
let endpoint_url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${param}"`
let valor_busca = '';
lista(param);
// console.log(addFavoritos());
if (valor_busca == '') {
    $(window).scroll(function () {
        if (page < 6) {
            if ($(window).scrollTop() == $(document).height() - $(window).height() && $("#busca").val() == '') {
                // listaTeste = [];
                page++;
                lista(param);
            }
        }
    });
}

function lista(param = 80) {
    listaCervejas = [];
    endpoint_url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${param}`
    $.getJSON(endpoint_url, function (data) {
        data.forEach(element => {
            // console.log(element.image_url);
            if (element.image_url === null) {
                element.image_url = "https://cdn.awsli.com.br/600x450/91/91186/produto/3172537/3bd879a51f.jpg";
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
            <div class="card">
            <a><i class="fas fa-star favorited" onclick="addFavoritos(${element.id})"></i></a>
            <img class="card-img-top img-fluid" src="${element.image_url}" alt="${element.name}" data-dismiss="modal" data-toggle="modal" data-target="#popup" onclick="formataModal(${element.id})"/>
            <div class="card-body">
                <h4 class="card-title" style="font-size:14px; font-weight:bold">${element.name}</h4>
                <p class="card-text">${element.tagline}</p>
            </div>
            </div>
            `
        $("#painel").append(beerHtml);
    });
}

function formataModal(element){
    let listaModal = [];
    listaModal.push(element);
    let modal = listaCervejas.filter(item => { return listaModal.includes(item.id) });
    modalHtml=
    `
    <div class="modal-content">
        <!--Header-->
        <div class="modal-header">
            <h1 class="heading lead" id="cabeca">${modal[0].name}</h1>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="white-text">&times;</span>
            </button>
        </div>
        <!--Body-->
        <div class="modal-body">
            <div class="text-center">
                <!-- <i class="fas fa-check fa-4x mb-3 animated rotateIn"></i> -->
                <img class="card-img-top" src="${modal[0].image_url}" alt="Card image cap" style="width:30%; margin:0px auto; text-align:center;">
                <h4 class="text-left">Descrição</h4>
                <p class="text-left">${modal[0].description}</p>
                    <div class="col-md-8 text-left offset-md-4">
                        <h5>Food Pairing</h5>
                        <ul>
                            <li>${modal[0].food_pairing[0]}</li>
                            <li>${modal[0].food_pairing[1]}</li>
                            <li>${modal[0].food_pairing[2]}</li>
                        </ul>
                  </div>
            </div>
        </div>
    </div>
    
    `;
    $("#interior_popup").empty();
    $("#interior_popup").append(modalHtml);
    
    /* modalHtml = 
    `
    ${modal[0].name}    
    `;
    $("#cabeca").empty();
    $("#cabeca").append(modalHtml); */
}

function buscaCerveja(digitado) {
    $("#painel").empty();
    if (!digitado) {
        listaCervejas = [];
        lista(param);

    }
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.responseText);
            formataLista(resposta);
            console.log(resposta);
        }
    };
    if (digitado != '') {
        xhttp.open("GET", "https://api.punkapi.com/v2/beers?beer_name=" + digitado, true)
        xhttp.send();
    }
}

function addFavoritos(element) {
    if (typeof (Storage) !== "undefined") {
        if (sessionStorage.listaFavoritos) {
            listaFavoritos = JSON.parse(sessionStorage.getItem("listaFavoritos"));
        } else {
            listaFavoritos = [];
        }
        if (listaFavoritos.includes(element)) {
            listaFavoritos.splice(listaFavoritos.indexOf(element), 1);
        } else {
            listaFavoritos.push(element);
        }
        sessionStorage.listaFavoritos = JSON.stringify(listaFavoritos);

        var fav = listaCervejas.filter(item => { return listaFavoritos.includes(item.id) });
        // formataLista(fav);
        console.log(fav);

    }
    return fav;
}

function listaFav(vetor = addFavoritos()) {
    $("#painel").empty();
    page = 6;
    listaCervejasFavoritas = vetor;
    $.getJSON(endpoint_url, function (data) {
        formataLista(listaCervejasFavoritas);
        console.log(listaCervejasFavoritas)
    });
}