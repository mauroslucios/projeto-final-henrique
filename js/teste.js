let listaCervejas = [];
var listaTeste = [];
let listaFavoritos=[];
let page = 1;
let param = 80;
let endpoint_url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${param}"`
let valor_busca = ''//document.getElementById("#busca").value;

lista(param);
console.log(addFavoritos());
if (valor_busca=='') {
    $(window).scroll(function () {
        if (page < 6) {
            if ($(window).scrollTop() == $(document).height() - $(window).height() && $("#busca").val()=='') {
                // listaTeste = [];
                page++;
                lista(param);
            }
        }
    });
}

function lista(param=80) {
    listaCervejas = [];
    endpoint_url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${param}`
    $.getJSON(endpoint_url, function (data) {
        data.forEach(element => {
            // console.log(element.image_url);
            if(element.image_url===null){
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
            <div class="col-lg-4 col-md-6 col-sm-12">
                <figure class="card hoverrable">
                   <a style="width:10%;position:absolute; right: 10px;"> <i id ="estrela" class="fa fa-star" onclick='addFavoritos(${element.id})'></i></a>  
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
        
    }
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resposta = JSON.parse(this.responseText);
            formataLista(resposta);
            console.log(resposta);
        }
    };
    if(digitado!=''){
        xhttp.open("GET", "https://api.punkapi.com/v2/beers?beer_name=" + digitado, true)
        xhttp.send();
    }
} 

function addFavoritos(element){
    if(typeof(Storage) !== "undefined") {
        if (sessionStorage.listaFavoritos) {
            listaFavoritos = JSON.parse(sessionStorage.getItem("listaFavoritos"));
        } else {
            listaFavoritos = [];
        }
        if(listaFavoritos.includes(element)){
            listaFavoritos.splice(listaFavoritos.indexOf(element),1);
        }else{
            listaFavoritos.push(element);
        }
        sessionStorage.listaFavoritos = JSON.stringify(listaFavoritos);
        
        var fav = listaCervejas.filter(item => {return listaFavoritos.includes(item.id) });
        // formataLista(fav);
        console.log(fav);
        
    }
    return fav; 
}

 function listaFav(vetor=addFavoritos()){
    $("#painel").empty();
    page=6;
    listaCervejasFavoritas = vetor;
    $.getJSON(endpoint_url, function (data) {        
        formataLista(listaCervejasFavoritas);
        console.log(listaCervejasFavoritas)
    });
}