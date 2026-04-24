import AlimentacaoSaudavel from '../assets/AlimentacaoSaudavel.png'
import AnimalAmeacado from '../assets/AnimalAmeacado.png'
import Arvore from '../assets/Arvore.png'
import Biodiversidade from '../assets/Biodiversidade.png'
import CaptacaoChuva from '../assets/CaptacaoChuva.png'
import ColetaPilhas from '../assets/ColetaPilhas.png'
import ColetaSeletiva from '../assets/ColetaSeletiva.png'
import Compostagem from '../assets/Compostagem.png'
import ConservacaoSolo from '../assets/ConservacaoSolo.png'
import CorredorEcologico from '../assets/CorredorEcologico.png'
import EconomiaEnergia from '../assets/EconomiaEnergia.png'
import EnergiaEolica from '../assets/EnergiaEolica.png'
import EnergiaSolar from '../assets/EnergiaSolar.png'
import FeiraOrganicos from '../assets/FeiraOrganicos.png'
import HortaComunitaria from '../assets/HortaComunitaria.png'
import Minhocario from '../assets/Minhocario.png'
import MobilidadeEletrica from '../assets/MobilidadeEletrica.png'
import PlantasMedicinais from '../assets/PlantasMedicinais.png'
import Plantio from '../assets/Plantio.png'
import Polinizadores from '../assets/Polinizadores.png'
import ProtecaoCosteira from '../assets/ProtecaoCosteira.png'
import ReciclagemEletronicos from '../assets/ReciclagemEletronicos.png'
import ReciclagemMetal from '../assets/ReciclagemMetal.png'
import ReciclagemPapel from '../assets/ReciclagemPapel.png'
import ReciclagemPlastico from '../assets/ReciclagemPlastico.png'
import ReciclagemVidro from '../assets/ReciclagemVidro.png'
import ReducaoResiduos from '../assets/ReducaoResiduos.png'
import ReutilizacaoCriativa from '../assets/ReutilizacaoCriativa.png'
import TransporteVerde from '../assets/TransporteVerde.png'
import UsoEficienteAgua from '../assets/UsoEficienteAgua.png'
import VidaMarinha from '../assets/VidaMarinha.png'

export const cardPool = [
  { id: 1,  image: AlimentacaoSaudavel,   answer: "Dieta equilibrada com frutas e vegetais" },
  { id: 2,  image: AnimalAmeacado,        answer: "Espécie em risco de extinção" },
  { id: 3,  image: Arvore,                answer: "Ser vivo que produz oxigênio e sombra" },
  { id: 4,  image: Biodiversidade,        answer: "Variedade de seres vivos em um ecossistema" },
  { id: 5,  image: CaptacaoChuva,         answer: "Coletar água da chuva para reutilização" },
  { id: 6,  image: ColetaPilhas,          answer: "Descarte correto de baterias usadas" },
  { id: 7,  image: ColetaSeletiva,        answer: "Separar o lixo por tipo de material" },
  { id: 8,  image: Compostagem,           answer: "Transformar restos orgânicos em adubo" },
  { id: 9,  image: ConservacaoSolo,       answer: "Proteger a terra contra erosão e degradação" },
  { id: 10, image: CorredorEcologico,     answer: "Faixa de vegetação que conecta habitats" },
  { id: 11, image: EconomiaEnergia,       answer: "Usar menos eletricidade no dia a dia" },
  { id: 12, image: EnergiaEolica,         answer: "Gerar eletricidade usando a força do vento" },
  { id: 13, image: EnergiaSolar,          answer: "Painéis que convertem luz do sol em energia" },
  { id: 14, image: FeiraOrganicos,        answer: "Comprar alimentos sem agrotóxicos" },
  { id: 15, image: HortaComunitaria,      answer: "Cultivo coletivo de hortaliças na vizinhança" },
  { id: 16, image: Minhocario,            answer: "Minhocas que decompõem resíduos orgânicos" },
  { id: 17, image: MobilidadeEletrica,    answer: "Veículos movidos a bateria elétrica" },
  { id: 18, image: PlantasMedicinais,     answer: "Ervas naturais usadas como remédio" },
  { id: 19, image: Plantio,              answer: "Colocar sementes na terra para germinar" },
  { id: 20, image: Polinizadores,         answer: "Insetos que ajudam as flores a se reproduzir" },
  { id: 21, image: ProtecaoCosteira,      answer: "Preservar praias e manguezais do litoral" },
  { id: 22, image: ReciclagemEletronicos, answer: "Dar destino correto a aparelhos eletrônicos" },
  { id: 23, image: ReciclagemMetal,       answer: "Reaproveitar latas e objetos metálicos" },
  { id: 24, image: ReciclagemPapel,       answer: "Reutilizar fibras de celulose de papéis usados" },
  { id: 25, image: ReciclagemPlastico,    answer: "Transformar garrafas PET em novos produtos" },
  { id: 26, image: ReciclagemVidro,       answer: "Derreter e remoldar frascos e garrafas" },
  { id: 27, image: ReducaoResiduos,       answer: "Diminuir a quantidade de lixo produzido" },
  { id: 28, image: ReutilizacaoCriativa,  answer: "Dar nova função a objetos que seriam descartados" },
  { id: 29, image: TransporteVerde,       answer: "Usar bicicleta ou caminhar em vez de dirigir" },
  { id: 30, image: UsoEficienteAgua,      answer: "Economizar água evitando desperdícios" },
  { id: 31, image: VidaMarinha,           answer: "Animais e plantas que vivem nos oceanos" },
]

const PHASE_CONFIG = [
  { phase: 1, pairs: 3 },
  { phase: 2, pairs: 4 },
  { phase: 3, pairs: 5 },
  { phase: 4, pairs: 6 },
  { phase: 5, pairs: 7 },
]

export const MAX_ATTEMPTS = 10

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function generatePhases() {
  const shuffledPool = shuffle(cardPool)
  let index = 0

  return PHASE_CONFIG.map(({ phase, pairs }) => {
    const selectedCards = shuffledPool.slice(index, index + pairs)
    index += pairs

    const gameCards = []
    selectedCards.forEach((card) => {
      gameCards.push({
        uid: `img-${card.id}`,
        pairId: card.id,
        type: 'image',
        content: card.image,
        answer: card.answer,
      })
      gameCards.push({
        uid: `txt-${card.id}`,
        pairId: card.id,
        type: 'text',
        content: card.answer,
        answer: card.answer,
      })
    })

    return {
      phase,
      pairs,
      question: `Encontre os ${pairs} pares combinando cada descrição com a imagem correta!`,
      questions: selectedCards.map((c) => c.answer),
      cards: shuffle(gameCards),
    }
  })
}