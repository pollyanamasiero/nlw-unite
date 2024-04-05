// array
let participantes = [
  {
    nome: 'Kendrya Koch',
    email: 'kendryakm@gmail.com',
    dataInscricao: new Date(2024, 3, 2, 22, 0),
    dataCheckIn: new Date(2024, 3, 4, 15, 40)
  },
  {
    nome: 'Pollyana Masiero Torquato',
    email: 'pollyanamasiero@hotmail.com',
    dataInscricao: new Date(2024, 0, 26, 7, 40),
    dataCheckIn: new Date(2024, 5, 16, 12, 35)
  },
  {
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    dataInscricao: new Date(2024, 2, 15, 12, 30),
    dataCheckIn: null
  },
  {
    nome: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    dataInscricao: new Date(2024, 1, 10, 10, 0),
    dataCheckIn: new Date(2024, 2, 20, 14, 20)
  },
  {
    nome: 'Pedro Santos',
    email: 'pedro.santos@example.com',
    dataInscricao: new Date(2024, 3, 1, 8, 45),
    dataCheckIn: new Date(2024, 3, 5, 11, 10)
  },
  {
    nome: 'Ana Rodrigues',
    email: 'ana.rodrigues@example.com',
    dataInscricao: new Date(2024, 2, 18, 16, 20),
    dataCheckIn: null
  },
  {
    nome: 'Carlos Ferreira',
    email: 'carlos.ferreira@example.com',
    dataInscricao: new Date(2024, 1, 5, 9, 10),
    dataCheckIn: new Date(2024, 1, 28, 10, 30)
  },
  {
    nome: 'Juliana Costa',
    email: 'juliana.costa@example.com',
    dataInscricao: new Date(2024, 0, 30, 14, 55),
    dataCheckIn: new Date(2024, 3, 3, 16, 45)
  },
  {
    nome: 'Felipe Sousa',
    email: 'felipe.sousa@example.com',
    dataInscricao: new Date(2024, 1, 20, 11, 25),
    dataCheckIn: null
  },
  {
    nome: 'Amanda Lima',
    email: 'amanda.lima@example.com',
    dataInscricao: new Date(2024, 0, 10, 18, 30),
    dataCheckIn: new Date(2024, 1, 15, 15, 0)
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  // condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
      >
      Confirmar check-in
    </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>
        ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
  output = output + criarNovoParticipante(participante)
}

  //substituir informação HTML
  document
  .querySelector('tbody')
  .innerHTML = output
} //arrow function

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

// verificar se o participante já existe
const participanteExiste = participantes.find(
  (p) => p.email == participante.email
)

if(participanteExiste) {
  alert('Email já cadastrado!')
  return
}

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

// limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o checkin
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 

  if(confirm(mensagemConfirmacao) == false) {
    return 
  }

  //encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  //atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  //atualizar a lista de participantes
  atualizarLista(participantes)
  
}