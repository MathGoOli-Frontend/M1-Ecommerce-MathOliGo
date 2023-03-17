let userCart = []

// filtros
// função para filtrar a lista:
function dataBaseFilter(data, tag){
    if (tag === undefined){
        return data
    }
    return data.filter(function(wear){
        return wear.tag.includes(tag)
    })
}
// filtro por id
function dataBaseFilterById(data, id){
    let newData =[]
    newData = data.filter(function(wear){
        return wear.id == id
    })
    userCart.push(newData[0])
}

// filtro remove id
function dataBaseFilterExcludeById(data, id){
    let newData = []
    let isDelete = false
    
    for(let i = 0; i < data.length; i++){
        if(data[i].id == id && !isDelete){
            
            isDelete = true


            console.log(id)
        }else{
            newData.push(data[i])
        }
    }
    userCart = newData
}

// filtro por nome e tag
function dataBaseFilterNameAndTag(search){
    filterData = []
    if(search == ''){
        return data
    }
    for(let i = 0; i < data.length; i++){
        if((data[i].nameItem.toLowerCase().includes(search.toLowerCase())) 
        || (data[i].tag[0].toLowerCase().includes(search.toLowerCase()))){
            filterData.push(data[i])
        }
    }
    return filterData
}


//card
// função para fazer o card
function createCard(cardInfo){
    const deck = document.getElementsByClassName('deck')[0]
    
    //card
    let card = document.createElement('li')
    card.className = 'card'
    // div da imagem
    let imageDiv = document.createElement('div')
    // imagem
    let image = document.createElement('img')
    image.src = cardInfo.img
    // article das informações
    let article = document.createElement('article')
    // spam das tags
    let tag = document.createElement('span')
    tag.className = "tag"
    tag.innerHTML = cardInfo.tag[0]
    // h3 nome do item
    let title = document.createElement('h3')
    title.innerText = cardInfo.nameItem
    // p descrição
    let description = document.createElement('p')
    description.innerHTML = cardInfo.description
    // span price
    let price = document.createElement("span")
    price.className = 'price'
    price.innerText = 'R$ ' + cardInfo.value.toFixed(2) // não foi implementado os centavos
    // adicionar ao carrinho
    let addToCart = document.createElement("a")
    addToCart.innerHTML = 'Adicionar ao carrinho'
    addToCart.id = 'add_' + cardInfo.id
    // função para a ancora
    addToCart.addEventListener('click', function(e){
        e.preventDefault()
        let id = e.target.id.substring(4)
        dataBaseFilterById(data, id)
        drawCardIten(userCart)
    })

    //hierarquia
    card.appendChild(imageDiv)
    card.appendChild(article)

    imageDiv.appendChild(image)

    article.appendChild(tag)
    article.appendChild(title)
    article.appendChild(description)
    article.appendChild(price)
    article.appendChild(addToCart)

    deck.appendChild(card)

}

// função para apagar/desenhar cards na tela
function drawSelectedCards(data){
    const deck = document.getElementsByClassName('deck')[0]
    deck.innerHTML = ""

    for(let i = 0; i < data.length; i++ ){
        createCard(data[i])
    }
}
// Carrinho de compras
// função para fazer o item do carrinho de compras
function createItem(itemInfo){
    const cart = document.getElementsByClassName('cart-list')[0]

    // cria o item do carrinho
    const cartItem = document.createElement('li')

    const imgDiv = document.createElement('div')
    imgDiv.className = 'cart-img'
    
    const img = document.createElement('img')
    img.src = itemInfo.img

    const infoDiv = document.createElement('li')
    infoDiv.className = 'item-cart-info'
    const name = document.createElement('h3')
    name.className = 'cart-name'
    name.innerText = itemInfo.nameItem
    const price = document.createElement('span')
    price.innerText = "R$" + itemInfo.value.toFixed(2)
    const removeBtn = document.createElement('a')
    removeBtn.innerText = "Remover Produto"
    removeBtn.id = 'remove_' + itemInfo.id
    removeBtn.addEventListener('click', function(event){
        event.preventDefault()
        let id = event.target.id.substring(7)
        dataBaseFilterExcludeById(userCart, id)
        
        drawCardIten(userCart)
    })

    // montando o item cart
    cartItem.appendChild(imgDiv)
    cartItem.appendChild(infoDiv)

    imgDiv.appendChild(img)

    infoDiv.appendChild(name)
    infoDiv.appendChild(price)
    infoDiv.appendChild(removeBtn)
    //
    
    cart.appendChild(cartItem)

}

// função para fazer o carrinho vasio
function emptyCart(){
    let cart = document.querySelector('aside .cart-title')
    
    let div = document.createElement('div')
    div.className = "cart-empty"
    div.innerHTML =`
    <h5>Carrinho Vazio</h5>
    <p>Adicione Itens</p>`

    cart.after(div)

}
//função para fazer o carrinho
function drawCardIten(userCart){

    const contSpan = document.getElementById('cont')
    let cont = userCart.length

    const priceSpan = document.getElementById('total')
    let price = 0

    const cart = document.getElementsByClassName("cart-list")[0]
    cart.innerHTML = ""

    const emptyCartDiv = document.getElementsByClassName("cart-empty")[0]
    if(emptyCartDiv != undefined){
        emptyCartDiv.remove()
    }

    if (userCart.length === 0){
        emptyCart()
    }else{
        for(let i = 0; i < userCart.length; i++){
            createItem(userCart[i])
            price += userCart[i].value
        }
    }
    contSpan.innerText = cont
    priceSpan.innerText = 'R$' + price.toFixed(2)
}

// run

// Eventos
let menu = document.querySelectorAll('.header-menu li')
menu[0].addEventListener('click',function(e){
    drawSelectedCards(dataBaseFilter(data))
})
menu[1].addEventListener('click',function(e){
    drawSelectedCards(dataBaseFilter(data, "Acessórios"))
})
menu[2].addEventListener('click',function(e){
    drawSelectedCards(dataBaseFilter(data,'Camisetas'))
})

document.getElementById('searchBtn').addEventListener('click', function(event){
    let search = document.getElementById("searchBar")
    console.log(search.value)
    drawSelectedCards(dataBaseFilterNameAndTag(search.value))
    
})

document.getElementById('searchBar').addEventListener('keypress', function(event){
    let search = document.getElementById("searchBar")
    console.log(search.value)
    drawSelectedCards(dataBaseFilterNameAndTag(search.value))  

})

// monta as cartas
drawSelectedCards(data)
drawCardIten(userCart)
