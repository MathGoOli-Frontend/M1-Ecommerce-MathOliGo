// filtros
// função para filtrar a lista:
function databaseFilter(data, tag){
    if (tag === undefined){
        return data
    }
    return data.filter(function(wear){
        return wear.tag.includes(tag)
    })
}

//card
// função para fazer o card
function createCard(cardInfo){
    const deck = document.getElementsByClassName('deck')[0]
    console.log(deck)
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
    price.innerText = 'R$ ' + cardInfo.value + ",00" // não foi implementado os centavos
    // adicionar ao carrinho
    let addToCart = document.createElement("a")
    addToCart.innerHTML = 'Adicionar ao carrinho'
    // função para a ancora
    addToCart.addEventListener('click', function(e){
        e.preventDefault()
        console.log('teste')
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
createCard({
    id: 1,
    img: "./images/jaqueta.svg",
    nameItem: "Lightweight Jacket",
    description:
      "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
    value: 100,
    addCart: "Adicionar ao carrinho",
    tag: ["Camisetas"],
  })

// função para apagar/desenhar cards na tela

// Carrinho de compras
// função para fazer o item do carrinho de compras

