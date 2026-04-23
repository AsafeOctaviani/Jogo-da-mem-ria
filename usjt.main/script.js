const { useState, useEffect } = React;

// ==========================================
// COMPONENTES AUXILIARES DO QUIZ
// ==========================================
function BotaoOpcao({ texto, aoClicar, selecionado }) {
    return (
        <button 
            className={`btn ${selecionado ? 'btn-primary' : 'btn-outline-primary'} btn-lg w-100 mb-3 text-start shadow-sm py-3`} 
            onClick={aoClicar}
        >
            {texto} {selecionado && " ✅"}
        </button>
    );
}

function ResultadoQuiz({ pontos, total, aoVoltarMenuQuiz, aoIrParaMemoria }) {
    return (
        <div className="text-center p-5 card shadow border-0 rounded-4">
            <h2 className="display-4 mb-4 text-primary">Well Done! 🎓</h2>
            <p className="lead fs-3">Sua pontuação: <strong>{pontos}</strong> / {total}</p>
            <br />
            <button className="btn btn-primary btn-lg mt-2 px-5 me-2" onClick={aoVoltarMenuQuiz}>Novo Quiz</button>
            <button className="btn btn-outline-secondary mt-2 px-5" onClick={aoIrParaMemoria}>Voltar para Memória</button>
        </div>
    );
}

// ==========================================
// COMPONENTE: MODULO QUIZ (COM 30 PERGUNTAS)
// ==========================================
function ModuloQuiz({ aoSairParaMemoria }) {
    const [todasPerguntas, setTodasPerguntas] = useState([]);
    const [perguntasFiltradas, setPerguntasFiltradas] = useState([]);
    const [indice, setIndice] = useState(0);
    const [respostasUsuario, setRespostasUsuario] = useState({});
    const [finalizado, setFinalizado] = useState(false);
    const [pontos, setPontos] = useState(0);
    const [jogoIniciado, setJogoIniciado] = useState(false);

    useEffect(() => {
        const bancoCompleto = [
            // EASY (10)
            { nivel: "easy", pergunta: "No desenvolvimento de software, qual termo descreve o código 'puro', sem frameworks?", opcoes: ["Raw", "Vanilla", "Pure", "Basic"], correta: 1 },
            { nivel: "easy", pergunta: "Qual substantivo se refere a um calafrio ou sensação leve de frio?", opcoes: ["Chill", "Cool", "Freeze", "Wind"], correta: 0 },
            { nivel: "easy", pergunta: "Como chamamos o 'desgaste natural' de um equipamento pelo uso constante?", opcoes: ["Broken", "Wear and tear", "Used part", "Old tech"], correta: 1 },
            { nivel: "easy", pergunta: "Se um semáforo sofre uma pane técnica ou falha súbita, como chamamos?", opcoes: ["Breakout", "Breakdown", "Breakup", "Breakoff"], correta: 1 },
            { nivel: "easy", pergunta: "Qual termo descreve uma funcionalidade 'firula' sem utilidade real?", opcoes: ["Tool", "Feature", "Gimmick", "Hack"], correta: 2 },
            { nivel: "easy", pergunta: "Qual peça de roupa é feita de lã, aberta na frente e com botões?", opcoes: ["Hoodie", "Cardigan", "Jacket", "Sweater"], correta: 1 },
            { nivel: "easy", pergunta: "Como se chama a parte do corpo entre as costelas e os quadris?", opcoes: ["Waist", "Wrist", "Shoulder", "Hip"], correta: 0 },
            { nivel: "easy", pergunta: "Qual termo significa produto de limpeza (alvejante) ou descolorir?", opcoes: ["Soap", "Bleach", "Brush", "Detergent"], correta: 1 },
            { nivel: "easy", pergunta: "Como se diz 'Aparelho Ortodôntico' em inglês?", opcoes: ["Braces", "Breaks", "Brackets", "Bridges"], correta: 0 },
            { nivel: "easy", pergunta: "Qual palavra descreve a versão pura de um software (sem mods)?", opcoes: ["Chocolate", "Vanilla", "Strawberry", "Classic"], correta: 1 },
            // MEDIUM (10)
            { nivel: "medium", pergunta: "Qual verbo descreve a ação de 'abrir um caminho novo' ou inovar?", opcoes: ["To open", "To blaze", "To start", "To fix"], correta: 1 },
            { nivel: "medium", pergunta: "Como se diz 'descolorir o cabelo' ou 'remover a cor'?", opcoes: ["To paint", "To bleach", "To wash", "To dye"], correta: 1 },
            { nivel: "medium", pergunta: "Qual é o passado do verbo 'To Think' (pensar)?", opcoes: ["Thanked", "Thought", "Thinked", "Thaught"], correta: 1 },
            { nivel: "medium", pergunta: "Se você aceita fazer uma tarefa de boa vontade, você é alguém...", opcoes: ["Willing", "Waiting", "Wanting", "Working"], correta: 0 },
            { nivel: "medium", pergunta: "Qual verbo descreve morrer/parar um motor ou 'enrolar' para ganhar tempo?", opcoes: ["To stall", "To stop", "To slow", "To stay"], correta: 0 },
            { nivel: "medium", pergunta: "Qual verbo descreve a ação de vestir ou usar algo no corpo?", opcoes: ["To Use", "To Wear", "To Put", "To Dress"], correta: 1 },
            { nivel: "medium", pergunta: "Se você exagerar ou fizer algo em excesso, você está...", opcoes: ["Overdoing", "Overworking", "Overreacting", "Overloading"], correta: 0 },
            { nivel: "medium", pergunta: "Qual verbo descreve o brilho intenso de uma luz ou chama?", opcoes: ["To Shine", "To Glow", "To Blaze", "To Spark"], correta: 2 },
            { nivel: "medium", pergunta: "Qual verbo significa 'evitar' ou 'esquivar-se' de algo?", opcoes: ["To Avoid", "To Advise", "To Admit", "To Adopt"], correta: 0 },
            { nivel: "medium", pergunta: "Qual o gerúndio do verbo 'vestir'?", opcoes: ["Wearing", "Weared", "Wore", "Wears"], correta: 0 },
            // HARD (10)
            { nivel: "hard", pergunta: "O que significa dizer que um processador é 'Blazing fast'?", opcoes: ["Pegando fogo", "Extremamente rápido", "Super aquecido", "Lento"], correta: 1 },
            { nivel: "hard", pergunta: "Se alguém diz que uma pessoa tem 'No chill', o que significa?", opcoes: ["Pessoa fria", "Pessoa sem noção/exagerada", "Pessoa calma", "Pessoa doente"], correta: 1 },
            { nivel: "hard", pergunta: "Qual expressão descreve algo funcional, mas simples e sem atrativos?", opcoes: ["Plain vanilla", "Simple cake", "Easy sugar", "Basic water"], correta: 0 },
            { nivel: "hard", pergunta: "Quando algo funciona perfeitamente e segue as regras éticas?", opcoes: ["Halal", "Kosher", "Perfect", "Clean"], correta: 1 },
            { nivel: "hard", pergunta: "No trabalho, se alguém está 'Stalling for time', o que está fazendo?", opcoes: ["Trabalhando duro", "Enrolando para ganhar tempo", "Adiantando o serviço", "Pedindo demissão"], correta: 1 },
            { nivel: "hard", pergunta: "Qual expressão iídiche refere-se a 'alma gêmea' ou 'destino'?", opcoes: ["Mazel", "Chutzpah", "Bashert", "Kvell"], correta: 2 },
            { nivel: "hard", pergunta: "O que significa a expressão 'Chill out'?", opcoes: ["Sair para fora", "Relaxar / Acalmar-se", "Sentir frio", "Dormir"], correta: 1 },
            { nivel: "hard", pergunta: "'Taytays' é um apelido informal para qual cantora?", opcoes: ["Taylor Swift", "Taye Diggs", "Tia Mowry", "Taylor Lautner"], correta: 0 },
            { nivel: "hard", pergunta: "O que significa 'To bark up the wrong tree'?", opcoes: ["Gritar com alguém", "Estar enganado sobre algo", "Subir em árvores", "Perder o cachorro"], correta: 1 },
            { nivel: "hard", pergunta: "Qual termo é usado para um truque apenas para atrair atenção?", opcoes: ["Hack", "Feature", "Gimmick", "Tool"], correta: 2 }
        ];
        setTodasPerguntas(bancoCompleto);
    }, []);

    const iniciarJogo = (filtro) => {
        let filtradas = todasPerguntas.filter(p => p.nivel === filtro);
        filtradas = filtradas.sort(() => Math.random() - 0.5).slice(0, 5);
        setPerguntasFiltradas(filtradas);
        setRespostasUsuario({});
        setIndice(0);
        setJogoIniciado(true);
        setFinalizado(false);
    };

    const finalizarQuiz = () => {
        let soma = 0;
        perguntasFiltradas.forEach((p, i) => {
            if (respostasUsuario[i] === p.correta) soma++;
        });
        setPontos(soma);
        setFinalizado(true);
    };

    // TELA DE SELEÇÃO (CENTRALIZADA)
    if (!jogoIniciado) {
        return (
            <div className="container container-quiz-central">
                <div className="card shadow p-5 rounded-4 border-0 text-center">
                    <h1 className="mb-5 fw-bold text-primary display-5">Escolha seu nível de desafio 🎓</h1>
                    <div className="d-grid gap-3 d-md-flex justify-content-center mb-4">
                        <button onClick={() => iniciarJogo('easy')} className="btn btn-success btn-lg px-5 shadow">Fácil</button>
                        <button onClick={() => iniciarJogo('medium')} className="btn btn-warning btn-lg px-5 text-white shadow">Médio</button>
                        <button onClick={() => iniciarJogo('hard')} className="btn btn-danger btn-lg px-5 shadow">Difícil</button>
                    </div>
                    <hr />
                    <button onClick={aoSairParaMemoria} className="btn btn-outline-secondary">← Voltar para o Flip & Find</button>
                </div>
            </div>
        );
    }

    if (finalizado) return <div className="container container-quiz-central"><ResultadoQuiz pontos={pontos} total={5} aoVoltarMenuQuiz={() => setJogoIniciado(false)} aoIrParaMemoria={aoSairParaMemoria} /></div>;

    const pAtual = perguntasFiltradas[indice];
    const respondidas = Object.keys(respostasUsuario).length;

    return (
        <div className="container container-quiz-central">
            <div className="card shadow-lg border-0 rounded-4 w-100">
                <div className="card-header bg-dark text-white d-flex justify-content-between py-3">
                    <h5 className="mb-0">Questão {indice + 1} de 5</h5>
                    <span className="badge bg-primary">{respondidas} / 5 respondidas</span>
                </div>
                <div className="card-body p-5">
                    <h2 className="mb-5 text-center fw-bold">{pAtual?.pergunta}</h2>
                    <div className="opcoes-lista">
                        {pAtual?.opcoes.map((op, i) => (
                            <BotaoOpcao key={i} texto={op} selecionado={respostasUsuario[indice] === i} aoClicar={() => setRespostasUsuario({...respostasUsuario, [indice]: i})} />
                        ))}
                    </div>
                </div>
                <div className="card-footer bg-light p-4 d-flex justify-content-between">
                    <button className="btn btn-secondary" disabled={indice === 0} onClick={() => setIndice(indice - 1)}>Anterior</button>
                    {respondidas === 5 ? (
                        <button className="btn btn-success px-4" onClick={finalizarQuiz}>Finalizar Resultado</button>
                    ) : (
                        <button className="btn btn-secondary" disabled={indice === 4} onClick={() => setIndice(indice + 1)}>Próximo / Pular</button>
                    )}
                </div>
                <button onClick={aoSairParaMemoria} className="btn btn-link text-danger mb-3">✖ Sair e voltar ao Menu da Memória</button>
            </div>
        </div>
    );
}

// ==========================================
// COMPONENTE: MODULO MEMORIA
// ==========================================
function Carta({ tipo }) {
    const [virada, setVirada] = useState(false);
    return (
        <div className={virada ? `carta-frente ${tipo}` : "carta-verso"} onClick={() => setVirada(!virada)}></div>
    );
}

function ModuloMemoria({ aoIrParaQuiz }) {
    const [cartas, setCartas] = useState([]);
    const [status, setStatus] = useState('jogando');

    const inicializarJogo = () => {
        const tipos = ['tipo-1', 'tipo-2', 'tipo-3', 'tipo-4', 'tipo-5'];
        const cartasEmbaralhadas = [...tipos, ...tipos]
            .sort(() => Math.random() - 0.5)
            .map((tipo, index) => ({ id: index, tipo: tipo }));
        
        setCartas(cartasEmbaralhadas);
        setStatus('jogando');
    };

    useEffect(() => {
        inicializarJogo();
    }, []);

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
            <div className="text-center p-3">
                <button onClick={aoIrParaQuiz} className="btn btn-primary shadow fw-bold px-4">🏆 Ir para o QUIZ de Inglês →</button>
            </div>

            {status === 'jogando' && (
                <div>
                    <div id="container-titulo"><h1>Flip & Find</h1></div>
                    <div id="tela-jogo">
                        <div id="status-jogo">
                            <div id="tentativas"><span>Boa sorte! Encontre os pares.</span></div>
                        </div>
                        
                        <div className="tabuleiro">
                            {cartas.map((carta) => (
                                <Carta key={carta.id} tipo={carta.tipo} />
                            ))}
                        </div>

                        <div className="d-flex gap-2">
                            <button onClick={() => setStatus('finalizado')} className="botao-finalizar">Finalizar Jogo</button>
                            <button onClick={inicializarJogo} className="botao-reiniciar" style={{backgroundColor: '#3498db'}}>Embaralhar Cartas</button>
                        </div>
                    </div>
                </div>
            )}

            {status === 'finalizado' && (
                <div className="text-center mt-5">
                    <h2 className="text-white">Parabéns! Desafio completo.</h2>
                    <img src="mundo1.png" alt="Sucesso" style={{ width: '250px', borderRadius: '20px', margin: '20px 0' }} />
                    <br />
                    <button onClick={inicializarJogo} className="botao-reiniciar">Jogar Novamente</button>
                </div>
            )}
            
            <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#333', color: 'white', position: 'fixed', bottom: 0, width: '100%' }}>
                <p>© 2026 Flip & Find - USJT. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

// ==========================================
// GERENCIADOR PRINCIPAL
// ==========================================
function App() {
    const [tela, setTela] = useState('memoria'); 

    return (
        <div>
            {tela === 'memoria' ? (
                <ModuloMemoria aoIrParaQuiz={() => setTela('quiz')} />
            ) : (
                <ModuloQuiz aoSairParaMemoria={() => setTela('memoria')} />
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);