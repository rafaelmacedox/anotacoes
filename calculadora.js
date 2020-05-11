'use strict';

const e = React.createElement;
  
class Calculadora extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeQuadril = this.handleChangeQuadril.bind(this);
    this.handleChangeComprimento = this.handleChangeComprimento.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.previouStep = this.previouStep.bind(this);

    this.state = {
      cintura: 0,
      quadril: 0,
      comprimento: 0,
      enabledStep: 1,
      tamanho: '',
    }
  }

  tableTamanhos = {
    pp: {
      cintura: { min: 64, max: 70 },
      quadril: { min: 85, max: 100 },
      comprimento: { min: 30, max: 30 }
    },
    p: {
      cintura: { min: 71, max: 79 },
      quadril: { min: 95, max: 115 },
      comprimento: { min: 30, max: 30 }
    },
    m: {
      cintura: { min: 80, max: 90 },
      quadril: { min: 111, max: 120 },
      comprimento: { min: 30, max: 30 }
    },
    g: {
      cintura: { min: 91, max: 100 },
      quadril: { min: 120, max: 130 },
      comprimento: { min: 32, max: 32 }
    },
    gg: {
      cintura: { min: 101, max: 110 },
      quadril: { min: 128, max: 138 },
      comprimento: { min: 32, max: 32 }
    },
    egg: {
      cintura: { min: 111, max: 123 },
      quadril: { min: 135, max: 150 },
      comprimento: { min: 34, max: 34 }
    },
    ex: {
      cintura: { min: 124, max: 130 },
      quadril: { min: 151, max: 160 },
      comprimento: { min: 36, max: 36 }
    },
  }

  handleChange(event) {
    this.setState({cintura: event.target.value});
  }

  handleChangeQuadril(event) {
    this.setState({quadril: event.target.value});
  }

  handleChangeComprimento(event) {
    this.setState({comprimento: event.target.value});
  }

  nextStep() {
    const enabledStep = this.state.enabledStep;

    if(enabledStep <=3){
      if(enabledStep == 1 && this.state.cintura == 0){
        return;
      }

      if(enabledStep == 2 && this.state.quadril == 0){
        return;
      }

      if(enabledStep == 3){
        this.calc();
      }

      this.setState({ enabledStep: enabledStep+1 })
    }
  }

  previouStep() {
    const enabledStep = this.state.enabledStep;

    if(enabledStep > 1){
      this.setState({ enabledStep: enabledStep-1 });
    }
  }

  calc() {

    const cintura = this.state.cintura;
    const quadril = this.state.quadril;
    const comprimento = this.state.comprimento;

    const tamanhos = ['pp','p','m','g','gg','egg','ex'];

    let finalCintura = '';

    tamanhos.forEach(tamanho => {
      const fixedTamanhos = this.tableTamanhos[tamanho];

      if(fixedTamanhos){
        if(fixedTamanhos.cintura.min <= cintura && fixedTamanhos.cintura.max >= cintura){
          finalCintura = tamanho;
        }
      }
    })

    if(
      this.tableTamanhos[finalCintura].quadril.min <= quadril &&
      this.tableTamanhos[finalCintura].quadril.max >= quadril &&
      this.tableTamanhos[finalCintura].comprimento.max == comprimento
    ){
      this.setState({ tamanho: finalCintura });
    }else{
      this.setState({ tamanho: 'Sob Medida' });
    }

  }

  render(){

    const stepOne = <article>
      <div className="calc__left">
        <header>
          <h2>Passo 1</h2>
          <h1>Medida da Cintura</h1>
        </header>
        <div className="calc__size">
          <input type="number" value={this.state.cintura} onChange={this.handleChange} disabled/>
          <p>cm</p>
        </div>
        <div className="calc__slider">
          <input type="range" min="64" max="130" value={this.state.cintura} onChange={this.handleChange} className="slider" />
        </div>
      </div>
      <div className="calc__right">
        <img src="https://cdn.dooca.store/485/files/cintura.png?v=1589209086" />
      </div>
    </article>;

    const stepTwo = <article>
      <div className="calc__left">
        <header>
          <h2>Passo 2</h2>
          <h1>Medida do Quadril</h1>
        </header>
        <div className="calc__size">
          <input type="number" value={this.state.quadril} onChange={this.handleChangeQuadril} disabled/>
          <p>cm</p>
        </div>
        <div className="calc__slider">
          <input type="range" min="85" max="160" value={this.state.quadril} onChange={this.handleChangeQuadril} className="slider" />
        </div>
      </div>
      <div className="calc__right">
        <img src="https://cdn.dooca.store/485/files/quadril.png?v=1589209086" />
      </div>
    </article>;

    const stepThree = <article>
      <div className="calc__left">
        <header>
          <h2>Passo 3</h2>
          <h1>Medida do Comprimento</h1>
        </header>
        <div className="calc__size">
          <input type="number" value={this.state.comprimento} onChange={this.handleChangeComprimento} disabled/>
          <p>cm</p>
        </div>
        <div className="calc__slider">
          <input type="range" min="25" max="40" value={this.state.comprimento} onChange={this.handleChangeComprimento} className="slider" />
        </div>
      </div>
      <div className="calc__right">
        <img src="https://cdn.dooca.store/485/files/comprimento.png?v=1589209086" />
      </div>
    </article>;

    const stepFinal = <article>
      <div className="calc__left">
        <header>
          <h2>Resultado</h2>
          <h1>Seu tamanho é: { this.state.tamanho }</h1>
        </header>
        <div className="result">
          <span>
            <label>Cintura:</label>
            <p>{this.state.cintura}cm</p>
          </span>
          <span>
            <label>Quadril:</label>
            <p>{this.state.quadril}cm</p>
          </span>
          <span>
            <label>Comprimento:</label>
            <p>{this.state.comprimento}cm</p>
          </span>

          <a
           href={"https://api.whatsapp.com/send?phone=5519983488491&text=Olá, gostaria de um orçamento, meu manequim é "+this.state.tamanho+". Minhas medidas são: Cintura: "+this.state.cintura+"cm, Quadril: "+this.state.quadril+"cm, Comprimento: "+this.state.comprimento+"cm."}
           target="_blank">Solicitar Orçamento</a>
        </div>
      </div>
      <div className="calc__right">
        <img src="https://cdn.dooca.store/485/files/comprimento.png?v=1589209086" />
      </div>
    </article>

    const displayStep = (step) => {
      switch(step){
        case 1:
          return stepOne;
        case 2:
          return stepTwo;
        case 3:
          return stepThree;
        case 4:
          return stepFinal;
      }
    }

    const displayBtns = (step) => {
      if(step != 4){
        return <div className="next">
          <a className="previous" onClick={this.previouStep}>Voltar</a>
          <a onClick={this.nextStep}>Próximo</a>
        </div>
      }else{
        return <div className="next-two">
          <a className="previous" onClick={this.previouStep}>Voltar</a>
        </div>
      }
    }

    return (
      <div className="calculadora">
        <h1>Descubra aqui o seu Manequim</h1>
        <h2>Insira suas medidas em nossa calculadora e saiba o tamanho correto da sua modeladora.</h2>

        <div className="calc__container">
          <ul className="calc__steps">
            <li className={((this.state.enabledStep == 1) ? 'calc_active' : 'calc_hidden')+ " " +((this.state.enabledStep > 1) ? 'aplicado' : '')}>
              <p>Cintura</p>
              <span>1</span>
            </li>
            <li className={((this.state.enabledStep == 2) ? 'calc_active' : '')+ " " +((this.state.enabledStep > 2) ? 'aplicado' : '')}>
              <p>Quadril</p>
              <span>2</span>
            </li>
            <li className={((this.state.enabledStep == 3) ? 'calc_active' : 'calc_hidden')}>
              <p>Comprimento</p>
              <span>3</span>
            </li>
          </ul>

          <div className="calc__content">
            { displayStep(this.state.enabledStep) }
            { displayBtns(this.state.enabledStep) }
          </div>
        </div>
      </div>
    );

  }

}

ReactDOM.render(e(Calculadora), document.querySelector('#calculadora'));