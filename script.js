'use strict';
// DOM Strings
const ds = {
  btnNovoJogo: document.querySelector('.btn--novo'),
  btnPassar: document.querySelector('.btn--passar'),
  btnRolar: document.querySelector('.btn--rolar'),
  jogador0: document.querySelector('.jogador--0'),
  jogador1: document.querySelector('.jogador--1'),
  pontos0: document.getElementById('pontos--0'),
  pontos1: document.getElementById('pontos--1'),
  atual0: document.getElementById('atual--0'),
  atual1: document.getElementById('atual--1'),
  nome0: document.getElementById('nome--0'),
  nome1: document.getElementById('nome--1'),
  dado: document.querySelector('.dado'),
  pontosAtual: function (jogador) {
    document.getElementById(`atual--${jogador}`).textContent =
      pontosAtual[jogador];
  },
  pontosTotal: function (jogador) {pontosTotal[jogador] += pontosAtual[jogador];
    document.getElementById(`pontos--${jogador}`).textContent =
      pontosTotal[jogador];
      pontosAtual[jogador]=0;
  },
};
let pontosAtual, pontosTotal, jogador, dado, jogoAtivo;
const pontosTermino = prompt(
  'JOGO DE DADOS\n\n\nRole os dados, se der 1, você perde os pontos da rodada e passa a vez.\nSe der 6 duas vezes consecutivas, você perde todos os pontos\n\nAté quantos pontos você quer jogar?\n\nO padão é 100\n\n',100
);

const iniciar = () => {

  pontosAtual = [0, 0];
  pontosTotal = [0, 0];
  jogador = 0;
  jogoAtivo = true;
  ds.atual0.textContent = pontosAtual[0];
  ds.atual1.textContent = pontosAtual[1];
  ds.pontos0.textContent = pontosTotal[0];
  ds.pontos1.textContent = pontosTotal[1];
  ds.dado.classList.add('esconder');
  ds.jogador0.classList.remove("jogador--vencedor")
  ds.jogador1.classList.remove("jogador--vencedor")  
  ds.jogador0.classList.add("jogador--ativo")
  ds.jogador1.classList.remove('jogador--ativo');
   document.querySelector('.avatar1').classList.remove('esconder');
   document.querySelector('.avatar2').classList.remove('esconder');
   ds.jogador0.classList.remove('jv');
   ds.jogador1.classList.remove('jd1');
   ds.jogador0.classList.remove('jd0');
   ds.jogador1.classList.remove('jv');
};
iniciar();
const rolarDados = () => {
  dado = Math.trunc(Math.random() * 6) + 1;
  ds.dado.classList.remove('esconder');
  ds.dado.src = `img/dado-${dado}.png`;
};
const trocarJogador = () => {
    pontosAtual[jogador] = 0;
    ds.pontosAtual(jogador);
    ds.jogador0.classList.toggle('jogador--ativo');
    ds.jogador1.classList.toggle('jogador--ativo');
    jogador = jogador === 0 ? 1 : 0;
}
//btn rolar dados
const btnRolarDados = () => {
    if (jogoAtivo) {
      rolarDados();
      if (dado !== 6) {
        pontosAtual[jogador] += dado;
        ds.pontosAtual(jogador);
      } else {
        trocarJogador();
      }
    }}

//btn passar

const btnPassar = () => {
    if (jogoAtivo) {
      ds.pontosTotal(jogador);
      if (pontosTotal[jogador] >= pontosTermino) {
        ds.dado.classList.add('esconder');
        document
          .querySelector(`.jogador--${jogador}`)
          .classList.remove('jogador--ativo');
        ds.dado.classList.add('esconder');
        /* document
          .getElementById(`nome--${jogador}`)
          .textContent = 'ganhou';*/
        document
          .querySelector(`.jogador--${jogador}`)
          .classList.add('jogador--vencedor');

        document.querySelector('.avatar1').classList.add('esconder');
        document.querySelector('.avatar2').classList.add('esconder');

        document.querySelector(`.jogador--${jogador}`).classList.add(`jv`);
        jogador = jogador === 0 ? 1 : 0;
        document
          .querySelector(`.jogador--${jogador}`)
          .classList.add(`jd${jogador}`);
        jogoAtivo = false;
      } else {
        trocarJogador();
      }
    }
}
//Eventos
ds.btnRolar.addEventListener('click', btnRolarDados);
ds.btnPassar.addEventListener('click', btnPassar);
//btn novo jogo
ds.btnNovoJogo.addEventListener('click', iniciar);