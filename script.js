const { useState } = React;

// 1. COMPONENTE CARTA
function Carta({ tipo }) {
    const [virada, setVirada] = useState(false);

    return (
        <div 
            className={virada ? `carta-frente ${tipo}` : "carta-verso"} 
            onClick={() => setVirada(!virada)}
        >
        </div>
    );
}

// 2. COMPONENTE PRINCIPAL
function App() {
    const [status, setStatus] = useState('jogando');

    const finalizarJogo = () => {
        setStatus('finalizado');
    };

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '80px', position: 'relative' }}>
            
            {status === 'jogando' && (
                <div>
                    <div id="container-titulo">
                        <h1>Flip & Find</h1>
                    </div>

                    <div id="tela-jogo">
                        <div id="status-jogo">
                            <div id="tentativas">
                            <span>Tentativas: <strong>0</strong></span>
                            </div>
                            <div id="pares">
                            <span>Pares encontrados: <strong>0/5</strong></span>
                            </div>
                        </div>

                        <div className="tabuleiro">
                            {/* Pares distribuídos */}
                            <Carta tipo="tipo-1" /> <Carta tipo="tipo-1" />
                            <Carta tipo="tipo-2" /> <Carta tipo="tipo-2" />
                            <Carta tipo="tipo-3" /> <Carta tipo="tipo-3" />
                            <Carta tipo="tipo-4" /> <Carta tipo="tipo-4" />
                            <Carta tipo="tipo-5" /> <Carta tipo="tipo-5" />
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

            {/* RODAPÉ (Fora dos blocos de status para aparecer em ambos) */}
            <footer style={{ 
                textAlign: 'center', 
                padding: '20px', 
                backgroundColor: '#333', 
                color: 'white', 
                position: 'fixed', 
                bottom: 0, 
                left: 0, 
                width: '100%' 
            }}>
                <p>© 2026 Flip & Find - USJT. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
} 

// 3. RENDERIZAÇÃO
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);