// filtros
// função para filtrar a lista

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

// função para apagar cards na tela

// Carrinho de compras
// função para fazer o item do carrinho de compras

