export async function executaQuery(conexao, query){
    const resultado_query = await conexao.query(query)
    const resposta = resultado_query[0]
    return resposta
}