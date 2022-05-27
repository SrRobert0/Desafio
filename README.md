# Desafio Concluído

## Primeiro projeto em React

Essa foi uma aplicação bem simples que fiz em React. <br>
Utilizei poucos recursos e, como sou iniciante, devo ter cometido vários erros. <br>
E além disso, o front-end ficou bem fraquinho. Nunca fui bom em front-end.

Fiz esse projeto com o objetivo de completar um desafio e, com isso, acabei aprendendo muito sobre React e como consumir APIs.


## Requisitos para rodar o projeto

Para instalar as dependências do projeto: 
### `npm install`

Para rodar o projeto:
### `npm start`

## Descrição do projeto

O projeto é um site que permite mostrar o clima atual de uma cidade, além da previsão de até os proximos 5 dias. <br>
Por padrão, o clima aprensentado é da cidade em que o usuário está localizado, mas há a possibilidade de pesquisar o nome de alguma cidade específica. Infelizmente, por limitações da API que utilizei, muitas cidades podem não aparecer quando são pesquisadas, como ocorreu com a minha.

Sobre o dia atual, é mostrado um ícone referente ao clima da cidade, data, temperatura atual, minima e máxima, velocidade e direção do vento, umidade do ar, visibilidade(não sei se a API está marcando isso corretamente) e pressão atmosférica. 

Nas previsões, é mostrado o ícone referente ao clima da cidade, temperatura mínima e máxima e a data.

Obs: A data está com o dia da semana e o mês em inglês e não consegui achar uma maneira de traduzir.

A API utilizada foi a da <a href="https://openweathermap.org/api">OpenWheater</a> <br>
Escolhi ela pois foi a mais completa que consegui encontrar, além de que a mesma é gratis e que tem um limite de requisições bem "extenso".
Acabei deixando a key da minha conta no código pois não pretendo utiliza-lo mais, mas recomendo que faça uma conta e coloque sua própria key se for utilizar a mesma API em algum projeto.

## Como funciona o código
Essa parte eu deixei documentada no código.

Obs: Talvez o código não tenha ficado bem documentado pois é minha primeira vez nisso.
