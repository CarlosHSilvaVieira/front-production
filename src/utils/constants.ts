
const Constants = {

    URL: {
        id: 'id',
        idFuncionario: 'idFuncionario',
        inicio: 'inicio',
        fim: 'fim',
        ano: 'ano',
        mes: 'mes',
        turno: 'turno',
    },

    RH: {
        address: 'https://sigerh.azurewebsites.net',
        routes: {
            HorasTrabalhadas: '/api/HorasTrabalhadas',
            Treinamentos: '/api/Treinamentos',
            Values: '/api/Values',
            Funcionarios: '/api/Funcionarios',
        },
    },
    Production: {
        address: 'https://sigepm.azurewebsites.net',
        routes: {
            getProducaoByUsuario: '/getProducaoByUsuario',
            getProducaoByTurno: '/getProducaoByTurno',
            getProducaoByAno: '/getProducaoByAno',
            getProducaoByAnoMes: '/getProducaoByAnoMes',
            getDescricaoProduto: '/getDescricaoProduto',
            getAllProdutos: '/getAllProdutos',
            getProdutoById: '/getProdutoById',
            getQtdItemNegociado: '/getQtdItemNegociado',
            getOrigemItem: '/getOrigemItem',
            getAllItens: '/getAllItens',
            getAllNotas: '/getAllNotas',
            getNotasByUsuario: '/getNotasByUsuario',
            getAllValoresNotas: '/getAllValoresNotas',
            getNotasByTipoMovimentacao: '/getNotasByTipoMovimentacao',
            getAllProducaoPorMesTurno: '/getAllProducaoPorMesTurno',
            getEstoqueMP: '/getEstoqueMP',
        },
    },
    Sales: {
        address: 'https://sigemv.azurewebsites.net',
        routes: {
            EventosClasses: '/api/EventosClasses/',
            Vendas: '/api/Vendas/',
            Values: '/api/Values/',
            Pedidos: '/api/Pedidos/',
            PedidosPeriodo: '/PedidosPeriodo/',
        },
    },
    Financial: {
        address: 'http://trabalhosige.azurewebsites.net',
        routes: {
            Produto: '/api/Produto',
            Registro_De_Venda: '/api/Registro_De_Venda',
            Solicitacao_de_Compra: '/api/Solicitacao_de_Compra',
            Setors: '/api/Setors',
            GastosProducao: '/api/GastosProducao',
            Conta_Pagar: '/api/Conta_Pagar',
            CustoMateriaPrima: '/api/CustoMateriaPrima',
            SuprimentoDeCaixa: '/api/SuprimentoDeCaixa',
        },
    },
}

export default Constants
