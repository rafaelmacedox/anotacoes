'use strict';

const e = React.createElement;

class TrocaDevolucao extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        nomeCompleto: '',
        numeroPedido: '',
        dataRecebimento: '',
        endereco: '',
        cidade: '',
        telefone: '',
        email: '',
        motivo: {
            tamanhoErrado: false,
            produtoComDefeito: false,
            produtoDiferenteDaCompra: false,
            outroMotivo: false
        },
        motivoDetalhes: '',
        solicitacao: {
            mesmoProduto: false,
            outroProduto: false,
            devolucaoProduto: false,
        },
        solicitacaoDetalhes: '',
        message: {
            error: false,
            msg: ''
        },
    }
  }

  render(){

    const changeMotivo = (checked, name) => {
        const motivo = { 
            tamanhoErrado: false,
            produtoComDefeito: false,
            produtoDiferenteDaCompra: false,
            outroMotivo: false
        };

        const objKeys = Object.keys(motivo);

        objKeys.forEach(key => {
            if(key == name){
                motivo[key] = checked;
            }
        })
        
        this.setState({ motivo });
    }

    const changeSolicitacao = (checked, name) => {
        const solicitacao = { 
            mesmoProduto: false,
            outroProduto: false,
            devolucaoProduto: false,
        };

        const objKeys = Object.keys(solicitacao);

        objKeys.forEach(key => {
            if(key == name){
                solicitacao[key] = checked;
            }
        })
        
        this.setState({ solicitacao });
    }

    const changePergunta = (pergunta) => {
        this.setState({ pergunta })
    }

    const perguntas = () => {
        if(this.state.solicitacao.mesmoProduto){
            return <div className="perguntas">
            <label>Qual tamanho?</label>
            <input type="text" onChange={ (e) => { changePergunta(e.target.value); }} value={this.state.pergunta} />
            </div>
        }

        if(this.state.solicitacao.outroProduto){
            return <div className="perguntas">
            <label>Qual produto?</label>
            <input type="text" onChange={ (e) => { changePergunta(e.target.value); }} value={this.state.pergunta} />
            </div>
        }

        if(this.state.solicitacao.devolucaoProduto){
            return <div className="perguntas">                
            <label>Qual Conta Bancária (Nome Completo, Número da Agência e da Conta)?</label>
            <input type="text" onChange={ (e) => { changePergunta(e.target.value); }} value={this.state.pergunta} />
            </div>
        }
    }

    const mostraSolicitao = () => {
        if(this.state.solicitacao.devolucaoProduto){
            return 'Devolução do produto / Estorno da compra'
        }

        if(this.state.solicitacao.outroProduto){
            return 'Outro produto'
        }

        if(this.state.solicitacao.mesmoProduto){
            return 'Mesmo produto, em outro tamanho'
        }
    }

    const mostraMotivo = () => {
        if(this.state.motivo.tamanhoErrado){
            return 'Tamanho Errado'
        }

        if(this.state.motivo.produtoComDefeito){
            return 'Produto com Defeito'
        }

        if(this.state.motivo.produtoDiferenteDaCompra){
            return 'Produto diferente do que comprei'
        }

        if(this.state.motivo.outroMotivo){
            return 'Outro Motivo'
        }
    } 

    const valido = () => {
        const solicitacao = this.state.solicitacao;

        if(!solicitacao.devolucaoProduto && !solicitacao.mesmoProduto && !solicitacao.outroProduto){
            return false;
        }

        const motivo = this.state.motivo;

        if(!motivo.outroMotivo && !motivo.produtoComDefeito && !motivo.produtoDiferenteDaCompra && !motivo.tamanhoErrado){
            return false;
        }

        return true;
    }

    const enviar = (e) => {

        e.preventDefault();
    
        var template_params = {
            "email": this.state.email,
            "numeropedido": this.state.numeroPedido,
            "dataRecebimento": this.state.dataRecebimento,
            "nomeCompleto": this.state.nomeCompleto,
            "endereco": this.state.endereco,
            "cidade": this.state.cidade,
            "telefone": this.state.telefone,
            "motivo": mostraMotivo(),
            "motivoDetalhes": this.state.motivoDetalhes,
            "solicitacao": mostraSolicitao(),
            "solicataoInfos": this.state.pergunta,
            "solicitacaoDetalhes": this.state.solicitacaoDetalhes
         }
         
         var service_id = "default_service";
         var template_id = "troca_e_devolucoes";

         emailjs.send(service_id, template_id, template_params)
            .then(result => {
                this.setState({ message: { error: false, msg: 'Solicitação encaminhada com sucesso!' } })
            })
            .catch(error => {
                this.setState({ message: { error: true, msg: 'Ocorreu um erro ao realizar a solicitação. Tente novamente.' } })
            });
    }

    const displayError = () => {
        if(this.state.message.msg !== '') {
            if(this.state.message.error){
                return <div className="message errorMsg">{ this.state.message.msg }</div>
            }else{
                return <div className="message">{ this.state.message.msg }</div>
            }
        }
    }

    return (
      <form className="troca-devolucao" onSubmit={enviar}>
        <h1>Nova solicitação de <br/> <b>Troca ou Devolução de Produtos</b></h1>

        <div className="infosNormais">
            <div className="input">
                <label>Nome Completo:</label>
                <input type="text" value={this.state.nomeCompleto} onChange={ (e) => { this.setState({ nomeCompleto: e.target.value }) }} required />
            </div>
            <div className="two-inputs">
                <div className="input">
                    <label>N° do Pedido:</label>
                    <input type="text" value={this.state.numeroPedido} onChange={ (e) => { this.setState({ numeroPedido: e.target.value }) }} required />
                </div>
                <div className="input">
                    <label>Data do Recebimento:</label>
                    <input id="dataRecebe" type="text" value={this.state.dataRecebimento} onChange={ (e) => { this.setState({ dataRecebimento: e.target.value }) }} required />
                </div>
            </div>
            <div className="input">
                <label>Endereço:</label>
                <input type="text" value={this.state.endereco} onChange={ (e) => { this.setState({ endereco: e.target.value }) }} required />
            </div>
            <div className="two-inputs">
                <div className="input">
                    <label>Cidade:</label>
                    <input type="text" value={this.state.cidade} onChange={ (e) => { this.setState({ cidade: e.target.value }) }} required />
                </div>
                <div className="input">
                    <label>Telefone:</label>
                    <input type="text" id="telefone" value={this.state.telefone} onChange={ (e) => { this.setState({ telefone: e.target.value }) }} required />
                </div>
            </div>
            <div className="input">
                <label>Email:</label>
                <input type="text" value={this.state.email} onChange={ (e) => { this.setState({ email: e.target.value }) }} required />
            </div>
        </div>

        <div className="options__content">
            <label className="two-label">Motivo:</label>
            <ul>
                <li><input onChange={ (e) => changeMotivo(e.target.checked, 'tamanhoErrado')} checked={this.state.motivo.tamanhoErrado} type="checkbox" name="tamanhoErrado" id="tme"></input><label for="tme">Tamanho Errado</label></li>
                <li><input onChange={ (e) => changeMotivo(e.target.checked, 'produtoComDefeito')} checked={this.state.motivo.produtoComDefeito} type="checkbox" name="motivo" id="pd"></input><label for="pd">Produto com Defeito</label></li>
                <li><input onChange={ (e) => changeMotivo(e.target.checked, 'produtoDiferenteDaCompra')} checked={this.state.motivo.produtoDiferenteDaCompra} type="checkbox" name="motivo" id="dif"></input><label for="dif">Produto diferente do que comprei</label></li>
                <li><input onChange={ (e) => changeMotivo(e.target.checked, 'outroMotivo')} checked={this.state.motivo.outroMotivo} type="checkbox" name="motivo" id="out"></input><label for="out">Outro Motivo</label></li>
            </ul>
            <span>
                <label>Detalhes</label>
                <textarea onChange={ (e) => { this.setState({ motivoDetalhes: e.target.value }) }} value={this.state.motivoDetalhes}></textarea>
            </span>
        </div>

        <div className="options__content">
            <label className="two-label">Solicitação:</label>
            <ul>
                <li><input onChange={ (e) => changeSolicitacao(e.target.checked, 'mesmoProduto')} checked={this.state.solicitacao.mesmoProduto} type="checkbox" id="tam"></input><label for="tam">Mesmo produto, em outro tamanho</label></li>
                <li><input onChange={ (e) => changeSolicitacao(e.target.checked, 'outroProduto')} checked={this.state.solicitacao.outroProduto} type="checkbox" id="val"></input><label for="val">Outro produto</label></li>
                <li><input onChange={ (e) => changeSolicitacao(e.target.checked, 'devolucaoProduto')} checked={this.state.solicitacao.devolucaoProduto} type="checkbox" id="est"></input><label for="est">Devolução do produto / Estorno da compra</label></li>
            </ul>

            {perguntas()}

            <span>
                <label>Detalhes</label>
                <textarea onChange={ (e) => { this.setState({ solicitacaoDetalhes: e.target.value }) }} value={this.state.solicitacaoDetalhes}></textarea>
            </span>
        </div>

        <span className="footer">
            {displayError()}
            <button className="submit" type="submit" disabled={!valido()}>Enviar solicitação</button>
            <p>** Um email será enviado para {this.state.email} confirmando a sua solicitação.</p>
        </span>

        <div className="loj_termos">
            
            <h1>Devoluções</h1>
            <p>A desistência da compra de qualquer produto só pode ser feita no prazo de até 7 (sete) dias, a contar da data de entrega. <br/> Art. 49 Código de Defesa do Consumidor.</p>


            <h1>Solicitações de Troca</h1>
            <p>A troca de qualquer produto só pode ser feita no prazo de 30 dias corridos, se o produto apresentar defeito, ou se você não estiver satisfeito(a) com a compra. Art.26 Código de Defesa do Consumidor.</p>

            <p>Para trocar um produto, as seguintes condições deverão ser observadas: <br/>
                - o produto deverá ser encaminhado na embalagem original, sem indícios de uso, sem violação do lacre original do fabricante/etiqueta, acompanhado do DANFE.</p>
        
        </div>
      </form>
    );

  }

}

ReactDOM.render(e(TrocaDevolucao), document.querySelector('#troca-devolucao'));