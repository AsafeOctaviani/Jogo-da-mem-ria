const { useState } = React;

// 1. O COMPONENTE CARTA (A lógica individual de cada carta)
function Carta() {
    // virada começa como falso (azul)
    const [virada, setVirada] = useState(false);

    return (
        <div 
            // Se virada for true, usa classe 'carta-frente'. Se false, 'carta-verso'.
            className={virada ? "carta-frente" : "carta-verso"} 
            onClick={() => setVirada(!virada)}
        >
        </div>
    );
}

function App() {
    const [status, setStatus] = useState('jogando');

    const finalizarJogo = () => {
        setStatus('finalizado');
    };

    return (
        <div>
            {status === 'jogando' && (
                <div>
                    <div id="container-titulo">
                        <h1>Flip & Find</h1>
                    </div>

                    <div id="tela-jogo">
                        <div id="status-jogo">
                            <span>Tentativas: <strong>0</strong></span>
                            <span>Pares encontrados: <strong>0/5</strong></span>
                        </div>

                        <div className="tabuleiro">
                            {/* USANDO O COMPONENTE QUE VOCÊ CRIOU */}
                            {/* Agora cada uma dessas tem seu próprio clique e cor */}
                            <Carta /> <Carta /> <Carta /> <Carta /> <Carta />
                            <Carta /> <Carta /> <Carta /> <Carta /> <Carta />
                        </div>

                        <button onClick={finalizarJogo} className="botao-finalizar">
                            Finalizar Jogo
                        </button>
                    </div>
                </div>
            )}

            {status === 'finalizado' && (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h2 style={{ fontFamily: 'sans-serif' }}>Parabéns! Você completou o desafio.</h2>
                    
                    <img src="mundo1.png" alt="Imagem do Mundo" style={{ width: '300px', borderRadius: '20px' }} />
                    
                    <br />
                    <button 
                        onClick={() => setStatus('jogando')} 
                        className="botao-reiniciar"
                        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
                    >
                        Jogar Novamente
                    </button>
                </div>
            )}
        </div>
    );
} 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);