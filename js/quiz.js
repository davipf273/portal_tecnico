const quizQuestions = [
  {
    topic: 'Robótica industrial',
    context: 'Em uma linha de montagem, um robô articulado retira peças de uma esteira e as posiciona em um dispositivo de inspeção. Após a troca do fornecedor, as peças passaram a chegar com pequenas variações de posição.',
    prompt: 'Para manter a precisão da operação sem interromper a linha a cada variação, a solução tecnicamente mais adequada é',
    options: [
      'aumentar a velocidade de todos os eixos para reduzir o tempo de posicionamento.',
      'integrar um sistema de visão que corrija a trajetória com base na posição detectada.',
      'substituir o efetuador por outro mais pesado para estabilizar cada movimento executado.',
      'desativar os sensores de segurança durante a etapa de aproximação do manipulador.'
    ],
    answer: 1,
    explanation: 'Um sistema de visão fornece a posição real da peça ao controlador, permitindo corrigir a trajetória do robô sem comprometer a segurança.'
  },
  {
    topic: 'Sensores',
    context: 'Um reservatório industrial precisa emitir um alerta quando o nível de líquido ultrapassar um ponto definido. O processo necessita apenas da informação “nível normal” ou “nível alto”, sem medir valores intermediários.',
    prompt: 'Nesse caso, a característica mais adequada para o sinal do sensor é',
    options: [
      'uma saída analógica proporcional a toda a altura disponível no reservatório.',
      'uma comunicação serial contínua com valores de nível enviados em pacotes.',
      'uma saída PWM cuja largura de pulso represente o volume armazenado no tanque.',
      'uma saída digital que altere de estado ao atingir o limite estabelecido.'
    ],
    answer: 3,
    explanation: 'Como o sistema precisa identificar somente duas condições, uma saída digital ligada/desligada atende ao requisito com menor complexidade.'
  },
  {
    topic: 'Sensores',
    context: 'Em uma estufa automatizada, um sensor de temperatura está instalado ao lado de uma resistência de aquecimento. As leituras sobem rapidamente, embora plantas mais distantes permaneçam em temperatura adequada.',
    prompt: 'A ação que tende a tornar a medição mais representativa do ambiente é',
    options: [
      'reposicionar o sensor em uma área ventilada e distante da fonte direta de calor.',
      'aumentar por software todas as leituras para compensar a diferença observada.',
      'substituir o sensor por um atuador com faixa elétrica de operação equivalente.',
      'reduzir o intervalo de leitura sem alterar o local onde o sensor está instalado.'
    ],
    answer: 0,
    explanation: 'A posição próxima à resistência cria um viés local. Um ponto ventilado e representativo reduz a influência direta da fonte de calor.'
  },
  {
    topic: 'Multímetro',
    context: 'Durante o diagnóstico de uma placa desligada, um estudante deseja verificar se um cabo está rompido. Ele seleciona a função de continuidade do multímetro antes de encostar as pontas de prova nas extremidades do condutor.',
    prompt: 'Uma indicação de baixa resistência acompanhada de sinal sonoro significa que',
    options: [
      'o cabo apresenta tensão alternada suficiente para alimentar o circuito conectado.',
      'a corrente do circuito excede o limite definido pelo fusível interno do aparelho.',
      'existe caminho elétrico contínuo entre os dois pontos avaliados pelo instrumento.',
      'a polaridade das pontas está invertida em relação ao sentido da corrente elétrica.'
    ],
    answer: 2,
    explanation: 'No teste de continuidade, baixa resistência e sinal sonoro indicam um caminho condutor entre as pontas, sugerindo que o cabo não está rompido.'
  },
  {
    topic: 'Arduino',
    context: 'Um protótipo usa um botão para comandar uma lâmpada representada por um LED. O botão informa uma condição ao microcontrolador, enquanto o LED deve responder ao comando recebido.',
    prompt: 'A configuração coerente dos pinos no Arduino é',
    options: [
      'configurar botão e LED como entradas para que ambos enviem dados ao controlador.',
      'configurar o botão como entrada e o LED como saída para receber o comando.',
      'configurar o botão como saída e o LED como entrada para inverter o fluxo elétrico.',
      'configurar botão e LED como saídas para que compartilhem o mesmo estado lógico.'
    ],
    answer: 1,
    explanation: 'O botão fornece informação ao Arduino e deve ser entrada; o LED recebe uma ação do Arduino e deve ser saída.'
  },
  {
    topic: 'Arduino',
    context: 'Um sensor de luminosidade entrega tensão variável entre 0 V e 5 V. O projeto precisa diferenciar diversos níveis de iluminação, e não apenas identificar claro ou escuro.',
    prompt: 'Para obter essa variação no Arduino Uno, o sensor deve ser ligado a',
    options: [
      'uma porta digital configurada como saída, usando somente os estados HIGH e LOW.',
      'uma porta PWM configurada como entrada, medindo diretamente a frequência do sinal.',
      'uma porta serial de transmissão, convertendo a tensão em caracteres para leitura.',
      'uma entrada analógica, usando o conversor para representar diferentes níveis de tensão.'
    ],
    answer: 3,
    explanation: 'A entrada analógica utiliza o conversor A/D do Arduino Uno para transformar a tensão variável em valores numéricos.'
  },
  {
    topic: 'ESP',
    context: 'Uma sala precisa enviar pela rede sem fio os dados de temperatura para um painel remoto. O projeto deve ter baixo custo e executar a leitura do sensor e a comunicação em uma única placa.',
    prompt: 'Uma vantagem do ESP32 para esse projeto é',
    options: [
      'disponibilizar Wi-Fi integrado e pinos de entrada e saída no mesmo microcontrolador.',
      'medir qualquer grandeza física diretamente, dispensando sensores externos no circuito.',
      'operar todos os seus pinos em 5 V, eliminando cuidados com níveis de tensão.',
      'armazenar dados permanentemente sem memória ou serviço adicional de registro.'
    ],
    answer: 0,
    explanation: 'O ESP32 combina conectividade Wi-Fi com recursos de processamento e pinos de entrada e saída, adequados a dispositivos IoT compactos.'
  },
  {
    topic: 'Análise de código',
    context: 'Um estudante montou um sistema em que um botão ligado ao pino 2 deve acender um LED no pino 8. O circuito está correto, mas o LED não responde ao comando.',
    code: `void setup() {
  pinMode(2, INPUT_PULLUP);
  pinMode(8, INPUT);
}

void loop() {
  int botao = digitalRead(2);
  if (botao == LOW) {
    digitalWrite(8, HIGH);
  } else {
    digitalWrite(8, LOW);
  }
}`,
    prompt: 'Ao analisar o programa, qual alteração corrige o erro de configuração?',
    options: [
      'trocar digitalRead(2) por analogRead(2) para obter o estado do botão.',
      'substituir INPUT_PULLUP por OUTPUT para alimentar o botão pelo pino 2.',
      'configurar o pino 8 como OUTPUT para que ele possa comandar o LED.',
      'alterar a condição para botao == HIGH e manter os modos atuais dos pinos.'
    ],
    answer: 2,
    explanation: 'O programa usa digitalWrite no pino 8, portanto esse pino precisa estar configurado como OUTPUT. O botão com INPUT_PULLUP está coerente com a condição LOW ao pressionar.'
  },
  {
    topic: 'Depuração de código',
    context: 'O programa deveria medir a luminosidade em A0 e acender o LED do pino 9 quando o ambiente estivesse escuro. Porém, a compilação é interrompida antes do envio para a placa.',
    code: `void loop() {
  int luz = analogRead(A0)
  if (luz < 300) {
    digitalWrite(9, HIGH);
  } else {
    digitalWrite(9, LOW);
  }
}`,
    prompt: 'Qual elemento ausente provoca o erro de compilação mostrado nesse trecho?',
    options: [
      'uma chave de fechamento depois da instrução digitalWrite do bloco else.',
      'um par de parênteses envolvendo o nome da variável declarada como luz.',
      'uma vírgula separando analogRead(A0) da estrutura condicional seguinte.',
      'um ponto e vírgula ao final da linha que executa a leitura de analogRead.'
    ],
    answer: 3,
    explanation: 'A declaração “int luz = analogRead(A0)” precisa terminar com ponto e vírgula. As chaves e os parênteses exibidos já estão balanceados.'
  },
  {
    topic: 'Lógica de programação',
    context: 'Um alarme deve tocar somente quando o sensor de movimento no pino 2 estiver ativo e a janela no pino 4 estiver aberta. O código atual toca quando apenas uma das condições ocorre.',
    code: `bool movimento = digitalRead(2);
bool janelaAberta = digitalRead(4);

if (movimento || janelaAberta) {
  tone(9, 1000);
} else {
  noTone(9);
}`,
    prompt: 'Qual mudança faz o alarme respeitar exatamente o comportamento desejado?',
    options: [
      'substituir o operador || por && para exigir que as duas condições sejam verdadeiras.',
      'trocar as variáveis booleanas por inteiros para comparar os dois sinais recebidos.',
      'mover noTone(9) para dentro do bloco if antes de executar a função tone(9, 1000).',
      'inverter os pinos 2 e 4 para que a leitura da janela aconteça antes do movimento.'
    ],
    answer: 0,
    explanation: 'O operador lógico && só produz verdadeiro quando movimento e janelaAberta forem verdadeiros ao mesmo tempo, como exige a situação.'
  }
];

const letters = ['A', 'B', 'C', 'D'];
const form = document.getElementById('quiz-form');
const quizList = document.getElementById('quiz-list');
const resultPanel = document.getElementById('quiz-result');
const progressText = document.getElementById('quiz-progress-text');
const progressBar = document.getElementById('quiz-progress-bar');

function renderQuiz() {
  quizList.innerHTML = '';
  quizQuestions.forEach((question, index) => {
    const article = document.createElement('article');
    article.className = 'quiz-question';
    article.dataset.question = String(index);

    const header = document.createElement('div');
    header.className = 'quiz-question-head';
    header.innerHTML = `<span class="quiz-number">${String(index + 1).padStart(2, '0')}</span><span class="quiz-topic">${question.topic}</span>`;
    article.appendChild(header);

    const context = document.createElement('p');
    context.className = 'quiz-context';
    context.textContent = question.context;
    article.appendChild(context);

    if (question.code) {
      const codeFigure = document.createElement('figure');
      codeFigure.className = 'quiz-code';
      const caption = document.createElement('figcaption');
      caption.textContent = 'Trecho para análise';
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = question.code;
      pre.appendChild(code);
      codeFigure.append(caption, pre);
      article.appendChild(codeFigure);
    }

    const prompt = document.createElement('h2');
    prompt.className = 'quiz-prompt';
    prompt.textContent = question.prompt;
    article.appendChild(prompt);

    const fieldset = document.createElement('fieldset');
    fieldset.className = 'quiz-options';
    fieldset.setAttribute('aria-label', `Alternativas da questão ${index + 1}`);

    question.options.forEach((option, optionIndex) => {
      const label = document.createElement('label');
      label.className = 'quiz-option';
      label.innerHTML = `<input type="radio" name="question-${index}" value="${optionIndex}"><span class="option-letter">${letters[optionIndex]}</span><span class="option-text"></span>`;
      label.querySelector('.option-text').textContent = option;
      fieldset.appendChild(label);
    });

    article.appendChild(fieldset);
    const feedback = document.createElement('div');
    feedback.className = 'quiz-feedback';
    feedback.setAttribute('aria-live', 'polite');
    article.appendChild(feedback);
    quizList.appendChild(article);
  });
  updateProgress();
}

function updateProgress() {
  const answered = quizQuestions.filter((_, index) => form.querySelector(`input[name="question-${index}"]:checked`)).length;
  progressText.textContent = `${answered} de ${quizQuestions.length} respondidas`;
  progressBar.style.width = `${(answered / quizQuestions.length) * 100}%`;
}

form.addEventListener('change', updateProgress);

form.addEventListener('submit', event => {
  event.preventDefault();
  const unanswered = quizQuestions.findIndex((_, index) => !form.querySelector(`input[name="question-${index}"]:checked`));
  if (unanswered !== -1) {
    const pending = quizList.querySelector(`[data-question="${unanswered}"]`);
    pending.classList.add('needs-answer');
    pending.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => pending.classList.remove('needs-answer'), 1800);
    return;
  }

  let score = 0;
  quizQuestions.forEach((question, index) => {
    const article = quizList.querySelector(`[data-question="${index}"]`);
    const selected = Number(form.querySelector(`input[name="question-${index}"]:checked`).value);
    const labels = article.querySelectorAll('.quiz-option');
    labels.forEach((label, optionIndex) => {
      label.classList.toggle('is-correct', optionIndex === question.answer);
      label.classList.toggle('is-wrong', optionIndex === selected && selected !== question.answer);
      label.querySelector('input').disabled = true;
    });
    if (selected === question.answer) score += 1;
    const feedback = article.querySelector('.quiz-feedback');
    feedback.className = `quiz-feedback show ${selected === question.answer ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = `<strong>${selected === question.answer ? 'Resposta correta.' : `Resposta incorreta. Alternativa correta: ${letters[question.answer]}.`}</strong><span></span>`;
    feedback.querySelector('span').textContent = question.explanation;
  });

  const percentage = score * 10;
  document.getElementById('quiz-score').textContent = `${score}/10`;
  document.getElementById('quiz-percentage').textContent = `${percentage}% de aproveitamento`;
  document.getElementById('quiz-result-message').textContent = percentage >= 70
    ? 'Bom desempenho. Revise as explicações para consolidar os conceitos.'
    : 'Revise os conteúdos indicados nas explicações e tente novamente.';
  resultPanel.hidden = false;
  document.getElementById('submit-quiz').hidden = true;
  resultPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

document.getElementById('reset-quiz').addEventListener('click', () => {
  form.reset();
  resultPanel.hidden = true;
  document.getElementById('submit-quiz').hidden = false;
  renderQuiz();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

renderQuiz();
