// Consumi a API OpenWheater, pois além de ser grátis e não ter limites diários de requisição, permitia pegar previsões de até uma semana afrente. Eu só mostrei 5 previsões pois
// achei que seria desnecessário mostrar mais.

// Coloque a sua Key do OpenWeather dentro das variáveis "keyAPI"

const api = {
    climas: () => {
        // Essa função é executada quando o site inicia. 

        document.getElementById('climaPesquisar').addEventListener('click', api.pesquisarClima)

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPositionInit);
        } else {
            console.log('deu erro aqui cara...')
        }

        // A localização atual é adquirida por meio dessa função.

        function setPositionInit (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let keyAPI = '5dee83e7d5ca0fb40543746683e00655';
            let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${keyAPI}&units=metric&lang=pt_br`

        // Aqui é feita a chamada da API.    

            fetch(url)
            .then(resposta => {
            if(!resposta.ok) throw new Error(resposta.statusText);
            return resposta.json();
            })
            .then(dados => {
            api.mostrar(dados);
            })
            .catch(console.err)
        }
    },   
    cidadeAtual: () => {
        // Mostra o nome da cidade atual do usuário adquirindo sua localização atual.
        // Essa função só é executada se nenhuma cidade tiver sido pesquisada.

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setCidade);
        } else {
            console.log('deu erro aqui cara...')
        }

        function setCidade (position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let keyAPI = '5dee83e7d5ca0fb40543746683e00655';
            let sUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyAPI}&units=metric&lang=pt_br`

            // Aqui é feita a chamada da API.

            fetch(sUrl)
            .then(resposta => {
            return resposta.json();
            })
            .then(dados => {
            let nome = document.getElementById('nome');

            let array = [dados];
            
            nome.innerHTML = array.map((nome, key) => {
            return (
            nome.name
            );
            })
            })
            .catch(console.err) 
        }
    },
    pesquisarClima: () => {
        // Essa função fica responsável por descobrir as localização geografica da cidade pesquisada por meio do seu nome.

        let q = document.getElementById('q');
        let cidade = q.value;
        let keyAPI = '5dee83e7d5ca0fb40543746683e00655';
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&appid=${keyAPI}`

        q.value = '';

        // Aqui é feita a chamada da API.   

        fetch(url)
        .then(resposta => {
        if(!resposta.ok) throw new Error(resposta.statusText);
        return resposta.json();
        })
        .then(dados => {
        api.setandoClima(dados);
        })
        .catch(console.err)
    },
    setandoClima: (dados) => {
        // Essa função fica responsável por pegar as informações do clima da cidade que foi pesquisada.

        dados.map((dado) => {
            let lat = dado.lat;
            let lon = dado.lon;
            let keyAPI = '5dee83e7d5ca0fb40543746683e00655'
            let sUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${keyAPI}&units=metric&lang=pt_br`

            // Aqui é feita a chamada da API.   
        
            fetch(sUrl)
            .then(resposta => {
            if(!resposta.ok) throw new Error(resposta.statusText);
            return resposta.json();
            })
            .then(dados => {
            // "teste" é utilizado para a função "saber" se as informações são da cidade atual ou de alguma cidade pesquisada.

            let teste = 1;

            api.mostrar(dados, teste, lat, lon)
            })
            .catch(console.err)
        })
    },
    cidadePesquisada: (lat, lon) => {
            // Mostra o nome da cidade que está sendo pesquisada por meio da latitude e longitude que foram recebidas do array.

            let keyAPI = '5dee83e7d5ca0fb40543746683e00655';

            let sUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyAPI}&units=metric&lang=pt_br`

            fetch(sUrl)
            .then(resposta => {
            return resposta.json();
            })
            .then(dados => {
            let nome = document.getElementById('nome');

            let array = [dados];
            
            nome.innerHTML = array.map((nome, key) => {
            return (
            nome.name
            );
            })
            })
            .catch(console.err)
    },
    mostrar: (dados, teste, lat, lon) => {
        // Essa função fica responsável por mostrar as informações.

        let atual = document.getElementById('main');
        let previsoes = document.getElementById('previsoes');

        // Converti para um array, para permitir a.

        let array = [dados];

        atual.innerHTML = array.map((day, id) => {
            if (id === 0) {
                let data = new Date(day.current.dt * 1000);
                let direcaoVento;

                // Estrutura de condição para determinar a direção do vento por meio do ângulo.

                if (day.current.wind_deg === 0 || day.current.wind_deg === 360) {
                    direcaoVento = "Norte";
                } else if (day.current.wind_deg > 0 && day.current.wind_deg < 90) {
                    direcaoVento = "Nordeste";
                } else if (day.current.wind_deg === 90) {
                    direcaoVento = "Leste";
                } else if (day.current.wind_deg > 90 && day.current.wind_deg < 180) {
                    direcaoVento = "Sudeste";
                } else if (day.current.wind_deg === 180) {
                    direcaoVento = "Sul";
                } else if (day.current.wind_deg > 180 && day.current.wind_deg < 270) {
                    direcaoVento = "Sudoeste";
                } else if (day.current.wind_deg === 270) {
                    direcaoVento = "Oeste";
                } else if (day.current.wind_deg > 270 && day.current.wind_deg < 360) {
                    direcaoVento = "Noroeste";
                }

                return (
                // Aqui são mostradas as informações do dia atual.

                    `<div class="data">
                    <p>Hoje - ${data.toDateString()}</p>
                </div>

                <div class="localizacao">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Localização</title><path d="M256 32c-88.22 0-160 68.65-160 153 0 40.17 18.31 93.59 54.42 158.78 29 52.34 62.55 99.67 80 123.22a31.75 31.75 0 0051.22 0c17.42-23.55 51-70.88 80-123.22C397.69 278.61 416 225.19 416 185c0-84.35-71.78-153-160-153zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z"/></svg>
                    <p id="nome"></p>
                </div>

                <div class="infos">
                    <div class="imagem">
                        <img src="http://openweathermap.org/img/wn/${day.current.weather[0].icon}@4x.png"></img>
                    </div>

                    <div class="tempo">
                        <p>${day.current.weather[0].description}</p>
                    </div>

                    <div class="temperatura">
                        <article class="temp-atual">${day.current.temp.toFixed(1)}°C</article>
                        <div class="maxmin">
                            <article class="max">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="100" height="100" fill="white"/>
                                    <path d="M68.0899 27.43H79.7099C80.0839 27.43 80.4425 27.2814 80.707 27.017C80.9714 26.7526 81.1199 26.3939 81.1199 26.02C81.1199 25.646 80.9714 25.2874 80.707 25.023C80.4425 24.7585 80.0839 24.61 79.7099 24.61H68.0899C67.716 24.61 67.3573 24.7585 67.0929 25.023C66.8285 25.2874 66.6799 25.646 66.6799 26.02C66.6799 26.3939 66.8285 26.7526 67.0929 27.017C67.3573 27.2814 67.716 27.43 68.0899 27.43Z" fill="#ED6C3A"/>
                                    <path d="M72.49 20.21V31.83C72.49 32.0152 72.5265 32.1985 72.5973 32.3696C72.6682 32.5406 72.772 32.6961 72.903 32.827C73.0339 32.9579 73.1893 33.0618 73.3604 33.1327C73.5315 33.2035 73.7148 33.24 73.9 33.24C74.0852 33.24 74.2685 33.2035 74.4396 33.1327C74.6106 33.0618 74.7661 32.9579 74.897 32.827C75.0279 32.6961 75.1318 32.5406 75.2027 32.3696C75.2735 32.1985 75.31 32.0152 75.31 31.83V20.21C75.31 20.0248 75.2735 19.8415 75.2027 19.6704C75.1318 19.4993 75.0279 19.3439 74.897 19.213C74.7661 19.082 74.6106 18.9782 74.4396 18.9073C74.2685 18.8365 74.0852 18.8 73.9 18.8C73.7148 18.8 73.5315 18.8365 73.3604 18.9073C73.1893 18.9782 73.0339 19.082 72.903 19.213C72.772 19.3439 72.6682 19.4993 72.5973 19.6704C72.5265 19.8415 72.49 20.0248 72.49 20.21Z" fill="#ED6C3A"/>
                                    <path d="M50.0001 85.4C49.3754 85.4016 48.7511 85.3682 48.1301 85.3C44.6088 84.9033 41.3026 83.4054 38.6826 81.0195C36.0626 78.6337 34.2625 75.4818 33.5388 72.013C32.8151 68.5441 33.2048 64.9354 34.6523 61.701C36.0997 58.4666 38.5312 55.7716 41.6001 54V23.84C41.601 22.5919 41.8798 21.3597 42.4161 20.2327C42.9524 19.1057 43.7328 18.1122 44.7007 17.3242C45.6687 16.5363 46.7999 15.9737 48.0122 15.6772C49.2246 15.3807 50.4878 15.3577 51.7101 15.61C53.63 16.032 55.3449 17.1048 56.5642 18.6467C57.7834 20.1885 58.4321 22.1046 58.4001 24.07V54C61.6126 55.8479 64.1249 58.7051 65.5466 62.1277C66.9683 65.5503 67.2198 69.3466 66.2621 72.9268C65.3043 76.507 63.1909 79.6707 60.2502 81.9262C57.3095 84.1818 53.7062 85.403 50.0001 85.4ZM50.0001 19.93C48.9656 19.9353 47.9752 20.3492 47.2447 21.0817C46.5141 21.8141 46.1027 22.8056 46.1001 23.84V56.84L44.8001 57.44C42.2545 58.624 40.1892 60.6413 38.9456 63.1584C37.7021 65.6754 37.3547 68.5415 37.9611 71.2827C38.5674 74.0239 40.091 76.4762 42.2801 78.234C44.4692 79.9918 47.1926 80.9499 50.0001 80.9499C52.8076 80.9499 55.531 79.9918 57.7201 78.234C59.9091 76.4762 61.4328 74.0239 62.0391 71.2827C62.6454 68.5415 62.2981 65.6754 61.0545 63.1584C59.811 60.6413 57.7457 58.624 55.2001 57.44L53.9001 56.84V24.07C53.9266 23.1438 53.637 22.2362 53.079 21.4965C52.521 20.7568 51.7279 20.229 50.8301 20C50.5566 19.9479 50.2784 19.9244 50.0001 19.93Z" fill="#ED6C3A"/>
                                    <path d="M50.01 72.41C52.6334 72.41 54.76 70.2833 54.76 67.66C54.76 65.0366 52.6334 62.91 50.01 62.91C47.3867 62.91 45.26 65.0366 45.26 67.66C45.26 70.2833 47.3867 72.41 50.01 72.41Z" fill="#ED6C3A"/>
                                    <path d="M50 66C49.6685 66 49.3505 65.8683 49.1161 65.6339C48.8817 65.3995 48.75 65.0815 48.75 64.75V35.13C48.75 34.7985 48.8817 34.4805 49.1161 34.2461C49.3505 34.0117 49.6685 33.88 50 33.88C50.3315 33.88 50.6495 34.0117 50.8839 34.2461C51.1183 34.4805 51.25 34.7985 51.25 35.13V64.71C51.2554 64.8775 51.227 65.0443 51.1666 65.2006C51.1062 65.357 51.0149 65.4995 50.8983 65.6199C50.7817 65.7402 50.6421 65.8359 50.4878 65.9012C50.3335 65.9665 50.1676 66.0001 50 66Z" fill="#ED6C3A"/>
                                </svg>
                                ${day.daily[0].temp.max.toFixed(1)}°C
                            </article>
                            
                            <article class="min">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="100" height="100" fill="white"/>
                                    <path d="M67.2 27.43H77.57C77.944 27.43 78.3026 27.2814 78.5671 27.017C78.8315 26.7526 78.98 26.3939 78.98 26.02C78.98 25.646 78.8315 25.2874 78.5671 25.023C78.3026 24.7585 77.944 24.61 77.57 24.61H67.2C66.8261 24.61 66.4674 24.7585 66.203 25.023C65.9386 25.2874 65.79 25.646 65.79 26.02C65.79 26.3939 65.9386 26.7526 66.203 27.017C66.4674 27.2814 66.8261 27.43 67.2 27.43Z" fill="#4469E4"/>
                                    <path d="M50.0001 85.4C49.3754 85.4016 48.7511 85.3682 48.1301 85.3C44.6088 84.9033 41.3026 83.4054 38.6826 81.0195C36.0626 78.6337 34.2625 75.4818 33.5388 72.013C32.8151 68.5441 33.2048 64.9354 34.6523 61.701C36.0997 58.4666 38.5312 55.7716 41.6001 54V23.84C41.601 22.5919 41.8798 21.3597 42.4161 20.2327C42.9524 19.1057 43.7328 18.1122 44.7007 17.3242C45.6687 16.5363 46.7999 15.9737 48.0122 15.6772C49.2246 15.3807 50.4878 15.3577 51.7101 15.61C53.63 16.032 55.3449 17.1048 56.5642 18.6467C57.7834 20.1885 58.4321 22.1046 58.4001 24.07V54C61.6126 55.8479 64.1249 58.7051 65.5466 62.1277C66.9683 65.5503 67.2198 69.3466 66.2621 72.9268C65.3043 76.507 63.1909 79.6707 60.2502 81.9262C57.3095 84.1818 53.7062 85.403 50.0001 85.4ZM50.0001 19.93C48.9656 19.9353 47.9752 20.3492 47.2447 21.0817C46.5141 21.8141 46.1027 22.8056 46.1001 23.84V56.84L44.8001 57.44C42.2545 58.624 40.1892 60.6413 38.9456 63.1584C37.7021 65.6754 37.3547 68.5415 37.9611 71.2827C38.5674 74.0239 40.091 76.4762 42.2801 78.234C44.4692 79.9918 47.1926 80.9499 50.0001 80.9499C52.8076 80.9499 55.531 79.9918 57.7201 78.234C59.9091 76.4762 61.4328 74.0239 62.0391 71.2827C62.6454 68.5415 62.2981 65.6754 61.0545 63.1584C59.811 60.6413 57.7457 58.624 55.2001 57.44L53.9001 56.84V24.07C53.9266 23.1438 53.637 22.2362 53.079 21.4965C52.521 20.7568 51.7279 20.229 50.8301 20C50.5566 19.9479 50.2784 19.9244 50.0001 19.93Z" fill="#4469E4"/>
                                    <path d="M50.01 72.41C52.6334 72.41 54.76 70.2833 54.76 67.66C54.76 65.0366 52.6334 62.91 50.01 62.91C47.3867 62.91 45.26 65.0366 45.26 67.66C45.26 70.2833 47.3867 72.41 50.01 72.41Z" fill="#4469E4"/>
                                    <path d="M50 66C49.6685 66 49.3505 65.8683 49.1161 65.6339C48.8817 65.3995 48.75 65.0816 48.75 64.75V48.28C48.75 47.9485 48.8817 47.6306 49.1161 47.3961C49.3505 47.1617 49.6685 47.03 50 47.03C50.3315 47.03 50.6495 47.1617 50.8839 47.3961C51.1183 47.6306 51.25 47.9485 51.25 48.28V64.71C51.2554 64.8775 51.227 65.0444 51.1666 65.2007C51.1062 65.357 51.0149 65.4995 50.8983 65.6199C50.7817 65.7402 50.6421 65.8359 50.4878 65.9012C50.3335 65.9665 50.1676 66.0001 50 66Z" fill="#4469E4"/>
                                </svg>
                                ${day.daily[0].temp.min.toFixed(1)}°C
                            </article>
                        </div>
                    </div>

                    <div class="vento">
                        Vento: <div class="velocidade">${day.current.wind_speed} m/s</div><div class="direcao"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512" style="transform: rotate(${day.current.wind_deg}deg);"><title>Direção</title><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm80.09 224L272 208.42V358h-32V208.42L175.91 272l-22.54-22.7L256 147.46 358.63 249.3z"/></svg>${direcaoVento}</div>
                    </div>

                    <div class="umidade">
                        Umidade: ${day.current.humidity}%
                    </div>

                    <div class="visibilidade">
                        Visibilidade: ${day.current.visibility / 1000} km
                    </div>

                    <div class="pressao">
                        Pressão do Ar: ${day.current.pressure} hPa
                    </div>
                </div>`
                );
            };
        }).join(' ');

        // Aqui são mostradas as previsões.

        previsoes.innerHTML = dados.daily.map((day, id) => {
            if (id !== 0 && id <= 5) {
                let data = new Date(day.dt * 1000);

                return (
                `<li>
                    <div class="imagem">
                        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"></img>
                    </div>
                    
                    <div class="temps">
                        <article class="max">${day.temp.max.toFixed(1)}°C</article>
                        <article class="min">${day.temp.min.toFixed(1)}°C</article>
                    </div>

                    <div class="data">
                        ${day.weather[0].description} - ${data.toDateString()}
                    </div>
                </li>`
                );
            };
         }).join(' ');

        // "teste" será não nulo se algo for pesquisado.

        if (teste == null) {
            api.cidadeAtual();
        } else if (teste != null) {
            api.cidadePesquisada(lat, lon)
        }
         
    }
};

export default api;