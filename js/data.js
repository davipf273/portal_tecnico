const robots = [
  {
    id: "cartesian",
    name: "Robôs Cartesianos (Pórtico/Gantry)",
    concept: "Robô industrial cujos eixos principais de movimento são lineares (X, Y, Z), traçando um envelope de trabalho retangular. Cinemática: PPP (Prismático-Prismático-Prismático), desacoplamento total de eixos, sem singularidades cinemáticas.",
    workingPrinciple: "Move-se linearmente ao longo de trilhos de precisão; cada eixo é acionado independentemente por servomotores acoplados a fusos de esferas ou correias sincronizadas. Alta rigidez estrutural distribui cargas de flexão e torção ao longo das vigas estruturais.",
    specs: { speed: "Baixa-Média (0.5-1.5 m/s)", payload: "Muito alta (100-5000+ kg)", precision: "Alta (±0.01-0.05mm)", relativeCost: "Baixo-Médio", implementationComplexity: "Baixa" },
    applications: ["Paletização e logística de fim de linha", "Usinagem CNC (corte a laser/plasma/jato de água)", "Alimentação de prensas e linhas de montagem em larga escala", "Impressão 3D industrial"],
    integration: "A cinemática inversa trivial direta permite integração simples com PLCs e controladores de borda; muito adequado para redes de controle de movimento determinísticas (EtherCAT, Profinet).",
    models: ["Festo CMSH Linear Cartesian System", "Bosch Rexroth EasyHandling Multi-axis System", "Güdel ZP-4 Linear Gantry Robot"],
    image: "images/cartesian.jpg"
  },
  {
    id: "scara",
    name: "Robôs SCARA",
    concept: "Configuração cinemática híbrida com duas juntas rotativas paralelas seguidas por uma junta prismática (RRP), 4 graus de liberdade. Complacência seletiva: flexível no plano horizontal (X-Y), rígido verticalmente (Z).",
    workingPrinciple: "A complacência mecânica permite que o braço faça microajustes em desalinhamentos concêntricos durante a inserção de pinos ou componentes, evitando travamentos. Envelope de trabalho em forma de rosca/cilindro truncado. A baixa inércia do elo permite altas acelerações horizontais.",
    specs: { speed: "Alta (3-10 m/s)", payload: "Baixa-Média (1-50kg)", precision: "Excelente (±0.005-0.02mm)", relativeCost: "Médio", implementationComplexity: "Média" },
    applications: ["Montagem de eletrônicos (SMT), posicionamento preciso de semicondutores/PCBs", "Inserção de componentes mecânicos (parafusamento, vedação, encaixes por pressão)", "Linhas de embalagem secundária (triagem rápida em indústrias farmacêuticas e alimentícias)"],
    integration: "Ciclos de alta velocidade se beneficiam de fieldbus em tempo real; integração comum de pick-and-place guiada por visão com câmeras de IA na borda (edge AI).",
    models: ["Epson G3 Series", "Omron i4H SCARA", "FANUC SR-3iA Series"],
    image: "images/scara.jpg"
  },
  {
    id: "articulated",
    name: "Robôs Articulados (Braços Antropomórficos)",
    concept: "Configuração industrial mais versátil; tipicamente 6 juntas rotativas (6 DoF - RRRRRR) imitando um braço humano: base, elo inferior, elo superior e pulso esférico (3 eixos rotativos concorrentes para orientação da ferramenta).",
    workingPrinciple: "A cinemática inversa utiliza matrizes complexas de transformação homogênea não linear, resolvidas numericamente ou através do método geométrico de Pieper. Sujeito a singularidades cinemáticas (determinante Jacobiano = 0) exigindo velocidades angulares de junta infinitas para manter trajetórias lineares.",
    specs: { speed: "Média-Alta (2-5 m/s)", payload: "Muito baixa a muito alta (1-2300kg)", precision: "Boa-Excelente (±0.03-0.1mm)", relativeCost: "Alto-Muito alto", implementationComplexity: "Alta" },
    applications: ["Soldagem automotiva (ponto e arco MIG/MAG/TIG)", "Pintura/revestimento de superfícies automotivas 3D complexas", "Manuseio de cargas pesadas e trabalho em fundição", "Alimentação de fornos e forjamento"],
    integration: "A rica fusão de sensores (torque, visão) alimenta a IA na borda; interfaces padrão como KUKA RSI permitem correção de movimento externa em tempo real a partir de dados de sensores IoT.",
    models: ["KUKA KR QUANTEC Industrial Arm", "ABB IRB 6700 Industrial Robot", "Yaskawa Motoman GP25 High-Speed Robot"],
    image: "images/articulated.jpg"
  },
  {
    id: "cylindrical",
    name: "Robôs Cilíndricos",
    concept: "Junta rotativa na base seguida por duas juntas prismáticas lineares (RPP). A rotação da base define a orientação azimutal; as juntas prismáticas controlam a altura vertical e a extensão radial.",
    workingPrinciple: "Cinemática direta e simplificada, pois as coordenadas das juntas mapeiam diretamente para coordenadas cilíndricas (θ, z, r). O envelope de trabalho é um cilindro oco. Alta rigidez vertical; a extensão radial do braço introduz momentos de flexão na base de articulação.",
    specs: { speed: "Baixa-Média (1-2 m/s)", payload: "Média (5-100kg)", precision: "Razoável (±0.05-0.1mm)", relativeCost: "Médio", implementationComplexity: "Média" },
    applications: ["Manuseio de wafers de semicondutores em salas limpas", "Carregamento/descarregamento de máquinas-ferramenta (tornos, fresadoras)", "Rebarbação/polimento de componentes tubulares ou concêntricos"],
    integration: "Comum em fábricas integradas via SCADA/MES em salas limpas, onde o modelo de coordenadas cilíndricas mapeia naturalmente para células de automação de carregamento de ferramentas.",
    models: ["Brooks Automation MagnaTran 8 Vacuum Wafer Handler", "Rorze RR701 High-Precision Atmosphere Robot", "Hirata AR-C Cylindrical Series"],
    image: "images/cylindrical.jpg"
  },
  {
    id: "delta",
    name: "Robôs Delta (Robôs Paralelos)",
    concept: "Máquina de Cinemática Paralela (PKM). Diferente das cadeias seriais onde o erro posicional se acumula elo por elo, o Delta conecta o atuador final a uma base superior fixa via três ou quatro cadeias cinemáticas paralelas formadas por paralelogramos articulados.",
    workingPrinciple: "Os atuadores permanecem fixos na base superior estacionária, transmitindo movimento via braços de fibra de carbono de baixa massa. O efetuador final mantém uma orientação estritamente translacional (paralelo à base) com 3 DoF puros (X, Y, Z). A inércia de massa móvel muito baixa permite acelerações extremas (10G+ / ~98 m/s²), com taxas de ciclo acima de 150 picks/minuto.",
    specs: { speed: "Extrema (10+ m/s)", payload: "Muito baixa (0.5-15kg)", precision: "Muito alta (±0.005-0.01mm)", relativeCost: "Médio-Alto", implementationComplexity: "Alta" },
    applications: ["Triagem/orientação/embalagem primária ultrarrápida de alimentos", "Alimentação de alta velocidade de blisters farmacêuticos", "Montagem de microcomponentes e triagem de componentes eletrônicos"],
    integration: "Frequentemente pareado com sistemas de visão de alta velocidade e inferência na borda (edge inference) para envio em tempo real de coordenadas de captura sobre redes industriais determinísticas.",
    models: ["ABB IRB 360 FlexPicker", "FANUC M-3iA High-Speed Delta Robot", "Codian Robotics D4-1300 Open-Frame Delta Robot"],
    image: "images/delta.jpg"
  },
  {
    id: "polar",
    name: "Robôs Polares (Esféricos)",
    concept: "Uma das topologias industriais maduras mais antigas. Duas juntas rotativas e uma junta prismática (RRP). O movimento é baseado em coordenadas esféricas: rotação em torno do eixo central da base, elevação angular do braço pivotante, extensão telescópica do elo linear final.",
    workingPrinciple: "Envelope de trabalho em forma de esfera truncada. Apresenta desafios na variação drástica do momento de inércia à medida que a junta linear se estende, exigindo algoritmos de controle dinâmico compensatórios para ajustar os ganhos dos servomotores em tempo real, de acordo com o deslocamento radial.",
    specs: { speed: "Baixa (0.5-1 m/s)", payload: "Muito alta (100-1000kg)", precision: "Baixa-Razoável (±0.1-0.5mm)", relativeCost: "Alto (Customizado)", implementationComplexity: "Alta" },
    applications: ["Processos pesados de fundição/forjamento (remoção de peças incandescentes de moldes de injeção metálica)", "Alimentação de prensas de estampagem com movimento linear telescópico", "Aplicações de manutenção industrial legadas ou retrofit"],
    integration: "Retrofits modernos adicionam sensores de torque/posição e controladores de borda a células polares legadas para fazer interface com sistemas SCADA da planta.",
    models: ["Unimation Unimate 2000 Series (histórico/legado)", "Prab Heavy Duty Foundry Series", "Reis Robotics (KUKA) V15 Series"],
    image: "images/polar.jpg"
  },
  {
    id: "cobot",
    name: "Robôs Colaborativos (Cobots)",
    concept: "Mudança de paradigma dos robôs industriais tradicionais (isolados atrás de proteções físicas) para robôs projetados para compartilhar o espaço de trabalho diretamente com operadores humanos, sem grades.",
    workingPrinciple: "A arquitetura predominante é a serial articulada com 6 ou 7 DoF. A 7ª junta redundante permite que o braço altere sua configuração interna sem alterar a posição/orientação do efetuador final, permitindo o desvio dinâmico de obstáculos em tempo real ao redor de humanos. O design minimiza a energia cinética de impacto: carcaças arredondadas convexas, motores de baixa inércia com redutores harmônicos, fiação totalmente interna.",
    specs: { speed: "Limitada por segurança (≤1 m/s em modo PFL)", payload: "Baixa-Média (3-30kg)", precision: "Alta (±0.02-0.05mm)", relativeCost: "Médio", implementationComplexity: "Muito baixa" },
    applications: ["Alimentação de máquinas CNC adaptáveis e inspeção óptica", "Embalagem final e paletização colaborativa", "Processos de montagem mista lado a lado com humanos"],
    integration: "Integração plug-and-play focada na facilidade. Alta conectividade IoT nativa no controlador base para interfaces de fábrica.",
    models: ["Universal Robots UR10e", "FANUC CRX-10iA Collaborative Industrial Robot", "ABB GoFa CRB 15000 Collaborative Robot"],
    image: "images/cobot.jpg",
    extraSections: [
      {
        title: "Normas de Segurança e Modos",
        content: [
          "ISO 10218-1 e ISO 10218-2 definem quatro modos de operação colaborativa:",
          "1. Parada Segura Monitorada: o robô para quando um operador entra no espaço colaborativo e retoma automaticamente quando ele sai.",
          "2. Guiamento Manual: operador controla diretamente a trajetória/velocidade via uma interface física no pulso do braço em modo de força zero.",
          "3. Monitoramento de Velocidade e Separação: sensores externos criam zonas de segurança dinâmicas; a velocidade do cobot diminui linearmente à medida que a distância do operador diminui.",
          "4. Limitação de Potência e Força (PFL): o robô pode contatar diretamente um humano; sensores internos limitam forças de impacto a limites definidos pela ISO/TS 15066."
        ]
      },
      {
        title: "Sensores de Força/Torque e Mitigação",
        content: [
          "Sensores de torque extensométricos em cada junta rotativa medem a micro-deformação a partir das forças de reação. O cálculo vetorial reverte as divergências do modelo dinâmico acionando paradas Categoria 0 ou 1 em milissegundos.",
          "Sensores de corrente em servomotores como alternativa de menor custo (embora mais lentos e com menor precisão).",
          "Sensores capacitivos de superfície (\"pele robótica\") identificam aproximação biológica para desaceleração preventiva."
        ]
      },
      {
        title: "Análise de ROI e Programação",
        content: [
          "Elimina infraestrutura de segurança custosa (grades, relés) e engenharia complexa. Break-even frequentemente alcançado em 6-12 meses vs 24-36 de sistemas tradicionais.",
          "Programação Direct Teaching (Lead-Through): dispensa código. Pressiona-se o botão no pulso para guiamento manual físico, registrando waypoints, democratizando a operação para chão de fábrica."
        ]
      }
    ]
  }
];

const sensors = [
  {
    id: "dht22",
    name: "DHT22 (AM2302)",
    category: "Temperatura e Umidade",
    signalType: "Digital (protocolo proprietário de fio único)",
    concept: "Sensor digital de alta precisão para medição combinada de temperatura do ar e umidade relativa, amplamente utilizado em sistemas de controle climático HVAC e estufas automatizadas devido à sua saída digital pré-calibrada.",
    workingPrinciple: "Mede a umidade do ar via um elemento capacitivo polimérico cuja permissividade varia com a absorção de vapor d'água. A temperatura é medida via um termistor NTC (a resistência cai à medida que o calor aumenta). Um microcontrolador interno de 8 bits processa essas quantidades analógicas e transmite um pacote digital estruturado de 40 bits sobre um barramento de fio único.",
    specs: { range: "Umidade: 0-100% RH | Temperatura: -40°C a +80°C", accuracy: "Umidade: ±2% RH | Temperatura: ±0.5°C", operatingVoltage: "3.3-5.5V DC (corrente máxima de 1.5mA durante leitura)" },
    applications: ["Monitoramento ambiental de Datacenters", "Controle climático de silos agrícolas", "Estações meteorológicas urbanas/residenciais IoT"],
    models: ["AM2302", "DHT22", "AOSONG Electronics"],
    image: "images/dht22.jpg",
    codeExample: `// Projeto de Aquisição Climática com DHT22
#include "DHT.h"
const int DHTPIN = 2;        // Pino digital conectado aos DADOS do sensor
#define DHTTYPE DHT22        // Define o modelo do sensor
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  Serial.println("Sensor DHT22 Inicializado!");
}

void loop() {
  delay(2000); // O DHT22 exige um intervalo mínimo de 2s entre leituras
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Falha ao ler o sensor DHT22!");
    return;
  }
  Serial.print("Umidade: "); Serial.print(humidity); Serial.print(" % | ");
  Serial.print("Temp: "); Serial.print(temperature); Serial.println(" C");
}`
  },
  {
    id: "ds18b20",
    name: "DS18B20",
    category: "Temperatura (Sonda Impermeável)",
    signalType: "Digital (Protocolo 1-Wire)",
    concept: "Termômetro digital com resolução programável de 9 a 12 bits, comumente encapsulado em uma sonda impermeável de aço inoxidável, ideal para monitorar líquidos e processos químicos úmidos.",
    workingPrinciple: "Utiliza transdutores internos de temperatura baseados na variação de frequência de osciladores de cristal de quartzo, altamente dependente do calor. O chip interno traduz os dados e comunica via barramento 1-Wire da Dallas Semiconductor, permitindo que dezenas de sensores compartilhem o mesmo pino do Arduino, já que cada um possui um endereço físico de 64 bits gravado a laser na fábrica.",
    specs: { range: "-55°C a +125°C", accuracy: "±0.5°C na faixa de -10°C a +85°C", operatingVoltage: "3.0-5.5V DC (suporta modo de alimentação parasita)" },
    applications: ["Controle térmico de tanques de mostura em cervejarias", "Chillers e resfriadores industriais", "Pasteurizadores industriais", "Monitoramento de dutos hidráulicos"],
    models: ["Maxim Integrated (Analog Devices)"],
    image: "images/ds18b20.jpg",
    codeExample: `// Leitura do DS18B20 (requer resistor pull-up de 4.7k ohms no pino de sinal)
#include <OneWire.h>
#include <DallasTemperature.h>
const int ONE_WIRE_BUS = 4;
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

void setup() {
  Serial.begin(9600);
  sensors.begin();
  Serial.println("Sensor DS18B20 Inicializado!");
}

void loop() {
  sensors.requestTemperatures();
  float tempC = sensors.getTempCByIndex(0);
  if (tempC == DEVICE_DISCONNECTED_C) {
    Serial.println("Erro: sensor desconectado!");
  } else {
    Serial.print("Temperatura do Tanque: "); Serial.print(tempC); Serial.println(" C");
  }
  delay(1000);
}`
  },
  {
    id: "ldr",
    name: "LDR (Fotorresistor)",
    category: "Luminosidade",
    signalType: "Analógico (Tensão contínua)",
    concept: "Resistor variável controlado pela incidência de luz sobre sua superfície sensível, amplamente utilizado para atuação automática baseada na luz do dia natural.",
    workingPrinciple: "Feito de Sulfeto de Cádmio (CdS), um material semicondutor com alta resistência intrínseca. Quando fótons de luz incidente atingem o material, eles liberam elétrons livres na banda de condução, reduzindo drástica e não linearmente a resistência elétrica. Lido via um circuito divisor de tensão resistivo: Vout = Vcc × (RLDR / (Rfixo + RLDR)).",
    specs: { range: "N/A (Luminosidade ambiente)", operatingVoltage: "Tensão máxima 150V AC/DC pico (dependente do encapsulamento)", other: "Resistência no escuro: ~1MΩ | Resistência na luz (10 Lux): ~10-20kΩ" },
    applications: ["Controle inteligente de iluminação pública/industrial (fotocélulas)", "Detecção de obstrução de passagens", "Automação residencial (Cidades Inteligentes)"],
    models: ["LDR 5mm GL5516", "GL5528"],
    image: "images/ldr.jpg",
    codeExample: `// Divisor de tensão LDR no A0 (GND - Resistor 10K - A0 - LDR - 5V)
const int ldrPin = A0;
const int relayPin = 13;

void setup() {
  Serial.begin(9600);
  pinMode(relayPin, OUTPUT);
}

void loop() {
  int ldrRaw = analogRead(ldrPin);
  float voltage = ldrRaw * (5.0 / 1023.0);
  Serial.print("Leitura ADC: "); Serial.print(ldrRaw);
  Serial.print(" | Tensão: "); Serial.print(voltage); Serial.println(" V");
  if (ldrRaw < 400) {
    digitalWrite(relayPin, HIGH); // Acende as luzes
    Serial.println("Ambiente escuro detectado -> Iluminação LIGADA");
  } else {
    digitalWrite(relayPin, LOW);
  }
  delay(1000);
}`
  },
  {
    id: "hcsr04",
    name: "HC-SR04",
    category: "Distância (Ultrassônico)",
    signalType: "Digital (Pulso PWM temporal)",
    concept: "Transdutor ultrassônico amplamente utilizado para medir distâncias físicas e detectar obstáculos sem contato mecânico direto com os objetos medidos.",
    workingPrinciple: "Funciona como a ecolocalização de morcegos (tempo de voo do som). O microcontrolador envia um pulso digital de disparo (trigger) de 10 microssegundos; o transdutor emite uma rajada de ultrassom de 8 pulsos a 40kHz. As ondas sonoras viajam pelo ar, atingem o obstáculo e retornam; o pino ECHO fica em estado ALTO durante o tempo exato de ida e volta. Distância = (Tempo do pulso ALTO × 0.0343) / 2, usando a velocidade do som ~343 m/s a 20°C.",
    specs: { range: "2cm a 400cm", accuracy: "Resolução efetiva: 3mm (ângulo ideal do cone <15°)", operatingVoltage: "5V DC (Corrente em standby <2mA)" },
    applications: ["Medição de nível em silos de grãos", "Monitoramento volumétrico em esteiras de triagem", "Navegação segura para AGVs (Veículos Guiados Automaticamente) em galpões"],
    models: ["AOSONG", "HC-SR04 original", "RCWL"],
    image: "images/hc-sr04.jpg",
    codeExample: `const int trigPin = 5;
const int echoPin = 6;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  float distance = (duration * 0.0343) / 2;

  if (distance >= 400 || distance <= 2) {
    Serial.println("Leitura fora do alcance ou erro!");
  } else {
    Serial.print("Distância: "); Serial.print(distance); Serial.println(" cm");
  }
  delay(500);
}`
  },
  {
    id: "pir",
    name: "PIR HC-SR501",
    category: "Movimento / Presença (Infravermelho Passivo)",
    signalType: "Digital (Binário ALTO/BAIXO)",
    concept: "Detecta movimento monitorando a energia infravermelha (calor corporal) emitida por seres vivos no ambiente, fundamental para sistemas de segurança modernos.",
    workingPrinciple: "Utiliza um elemento piroelétrico (cristal que gera carga elétrica quando exposto ao calor), dividido em duas fendas medindo a temperatura de radiação do ambiente. Quando uma fonte de calor (humano/animal) cruza o campo de visão, passa de uma fenda para a outra. Uma lente de Fresnel foca a luz infravermelha dispersa; o amplificador integrado emite um pulso digital ALTO indicando movimento ativo.",
    specs: { range: "Distância de detecção 3-7m (ajustável via potenciômetro)", operatingVoltage: "4.5-20V DC (Saída lógica de 3.3V)", other: "Tempo de atraso na saída: 5-200s (ajustável) | Modos: L (sem re-acionamento) ou H (com re-acionamento)" },
    applications: ["Sistemas anti-intrusão para edifícios inteligentes", "Automação de iluminação residencial/corporativa", "Ativação de portas automáticas", "Displays comerciais interativos"],
    models: ["Família de módulos HC-SR501"],
    image: "images/pir.jpg",
    codeExample: `// Sistema IoT de alarme de intrusão
const int pirPin = 7;
const int alarmLED = 8;

void setup() {
  Serial.begin(9600);
  pinMode(pirPin, INPUT);
  pinMode(alarmLED, OUTPUT);
  Serial.println("Calibrando sensor PIR (aguardando estabilização)...");
  delay(30000); // Aguarda 30s para o PIR mapear o ambiente estático
  Serial.println("Sistema ativo!");
}

void loop() {
  int motion = digitalRead(pirPin);
  if (motion == HIGH) {
    digitalWrite(alarmLED, HIGH);
    Serial.println("ALERTA: INTRUSO DETECTADO NO CAMPO COBERTO!");
  } else {
    digitalWrite(alarmLED, LOW);
  }
  delay(200);
}`
  },
  {
    id: "lj12a3",
    name: "LJ12A3-4-Z/BX",
    category: "Proximidade / Fim de Curso (Indutivo)",
    signalType: "Digital (Coletor aberto NPN)",
    concept: "Sensor indutivo robusto de grau industrial, comumente usado em máquinas de corte CNC, braços robóticos e esteiras para contagem ou posicionamento de peças metálicas, sem desgaste físico.",
    workingPrinciple: "Contém uma bobina interna que, quando energizada, emite um campo eletromagnético de alta frequência em sua cabeça de detecção. Quando um objeto metálico entra nesse campo, correntes de Foucault são induzidas em sua superfície. Essas correntes drenam energia do circuito ressonante, enfraquecendo a oscilação. Um circuito Schmitt Trigger integrado detecta essa queda de amplitude e comuta o sinal do transistor interno (modelo BX: NPN Normalmente Aberto).",
    specs: { range: "Até 4mm (ideal para ferro magnético, reduzido para alumínio/cobre)", operatingVoltage: "6-36V DC", other: "Frequência de comutação: 500Hz | Saída: Transistor NPN Normalmente Aberto (comuta para GND). Requer divisor de tensão para proteger entrada 5V." },
    applications: ["Controle de fim de curso em eixos de tornos e impressoras 3D", "Contagem de latas metálicas em linhas de envase", "Tacômetro indireto para medição de velocidade de eixos rotativos"],
    models: ["Família de sensores de proximidade indutivos LJ12A3-4-Z/BX"],
    image: "images/lj12a3.jpg",
    codeExample: `// Sensor industrial NPN 24V com divisor de tensão protegendo o pino 3
const int limitPin = 3;
const int statusLED = 13;

void setup() {
  Serial.begin(9600);
  pinMode(limitPin, INPUT_PULLUP); // Saída NPN puxa para BAIXO na detecção
  pinMode(statusLED, OUTPUT);
  Serial.println("Sistema de proteção indutiva pronto!");
}

void loop() {
  int sensorState = digitalRead(limitPin);
  if (sensorState == LOW) { // BAIXO = metal detectado (NPN)
    digitalWrite(statusLED, HIGH);
    Serial.println("AVISO: Peça metálica identificada!");
  } else {
    digitalWrite(statusLED, LOW);
  }
  delay(100);
}`
  },
  {
    id: "mq135",
    name: "MQ-135",
    category: "Qualidade do Ar / Gás",
    signalType: "Analógico e Digital (limite por comparador)",
    concept: "Sensor de gás altamente sensível para compostos orgânicos voláteis (VOCs), amônia, benzeno, álcool e fumaça, central para medição da qualidade do ar e ventilação inteligente.",
    workingPrinciple: "Baseado em um elemento sensor de Dióxido de Estanho (SnO2) aquecido eletricamente por uma bobina interna de platina-níquel. Em ar limpo, a condutividade elétrica é muito baixa. Na presença de gases nocivos ou vapores combustíveis, estes interagem quimicamente com o oxigênio adsorvido na superfície do SnO2, liberando elétrons na banda de condução do cristal; a resistência cai exponencialmente em relação à concentração de gás.",
    specs: { range: "10-1000 ppm (dependente do composto alvo)", operatingVoltage: "Aquecedor: 5V DC (~800mW consumo, corrente 150mA)", other: "Resistência do sensor (Rs): 2-20kΩ. Recomendado 24h de pré-aquecimento para uso de precisão estável." },
    applications: ["Detectores de poluição do ar urbano", "Sistemas de exaustão/purificação de cozinhas industriais", "Alertas de fumaça industriais", "Monitoramento indireto de CO2 em edifícios inteligentes"],
    models: ["Família de módulos sensores MQ-135"],
    image: "images/mq135.jpg",
    codeExample: `// Medição de concentração de gás nocivo e alarme
const int mq135AnalogPin = A1;
const int mq135DigitalPin = 9; // Saída de limiar via comparador trimpot na placa
const int buzzer = 10;

void setup() {
  Serial.begin(9600);
  pinMode(mq135DigitalPin, INPUT);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  int rawValue = analogRead(mq135AnalogPin);
  int gasThresholdExceeded = digitalRead(mq135DigitalPin);
  Serial.print("Qualidade do ar (nível relativo): "); Serial.print(rawValue);

  if (gasThresholdExceeded == HIGH) {
    digitalWrite(buzzer, HIGH);
    Serial.println(" [ALERTA: AR TÓXICO DETECTADO! ATIVANDO EXAUSTOR]");
  } else {
    digitalWrite(buzzer, LOW);
    Serial.println(" [Condições de ar seguras]");
  }
  delay(1000);
}`
  },
  {
    id: "yfs201",
    name: "YF-S201",
    category: "Fluxo / Volume de Água (Efeito Hall)",
    signalType: "Digital (Pulsos de frequência)",
    concept: "Medidor eletrônico de água/fluxômetro que detecta o volume de fluxo dinâmico de líquido dentro de tubulações residenciais ou industriais leves, ideal para evitar desperdícios e automação hidráulica.",
    workingPrinciple: "Consiste em um corpo de válvula de plástico de 1/2 polegada, um rotor interno com pás e um circuito magnético de Efeito Hall. À medida que o líquido flui pelo tubo, ele gira o rotor interno. Um pequeno ímã de neodímio fixado nas pás cruza repetidamente o sensor de Efeito Hall, induzindo flutuações locais do campo magnético que produzem um pulso elétrico quadrado a cada rotação. Frequência: f = 7.5 × Q (Q = fluxo em L/min).",
    specs: { range: "1 a 30 L/min", operatingVoltage: "5-18V DC (Sinal digital de nível lógico de 5V)", other: "Pressão máxima suportada: ≤1.75 MPa (~17.5 bar)" },
    applications: ["Sistemas inteligentes de irrigação agrícola automática", "Controle de dosagem industrial de substâncias aquosas neutras", "Medição de consumo de água doméstico integrado a dashboards IoT na Web"],
    models: ["Família de sensores de fluxo YF-S201"],
    image: "images/yf-s201.jpg",
    codeExample: `// Contagem de fluxo usando interrupção externa no pino 2 (interrupção 0)
const int flowPin = 2;
volatile int pulseCount = 0;
float flowLitersPerMinute = 0.0;

void countPulse() {
  pulseCount++;
}

void setup() {
  Serial.begin(9600);
  pinMode(flowPin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(flowPin), countPulse, FALLING);
}

void loop() {
  pulseCount = 0;
  interrupts();
  delay(1000); // Amostra o fluxo por exatamente 1 segundo
  noInterrupts();

  flowLitersPerMinute = pulseCount / 7.5;
  Serial.print("Fluxo: "); Serial.print(flowLitersPerMinute); Serial.println(" L/min");
}`
  },
  {
    id: "acs712",
    name: "ACS712",
    category: "Corrente Elétrica (Efeito Hall)",
    signalType: "Analógico (Sensibilidade em mV/A)",
    concept: "Transdutor integrado projetado para monitorar com segurança correntes elétricas AC ou DC com isolamento dielétrico de até 2.1kV.",
    workingPrinciple: "A corrente que flui através da linha de cobre integrada no chip cria um campo eletromagnético proporcional. O chip da Allegro MicroSystems detecta esse campo através do Efeito Hall interno e converte a força do campo magnético em uma saída de tensão contínua linear. No modelo de 20A, em corrente zero a saída fica em Vcc/2 (tipicamente 2.5V no Arduino); a sensibilidade linear é de 100mV/A.",
    specs: { range: "Faixas de trabalho: ±5A, ±20A, ou ±30A", accuracy: "Sensibilidade (modelo de 20A): 100mV por Ampère", operatingVoltage: "5V DC estabilizado (~10mA de consumo)" },
    applications: ["Medição de consumo em painéis elétricos inteligentes", "Proteção de sobrecorrente para motores de indução trifásicos", "Monitoramento de geração de painéis solares fotovoltaicos", "Monitoramento de inversores industriais"],
    models: ["Allegro MicroSystems (fabricante original)"],
    image: "images/acs712.jpg",
    codeExample: `// Medição de corrente DC com ACS712 20A
const int pinACS712 = A2;
const float sensitivity = 0.100;      // 100 mV/A para a versão de 20A
const float Vref_ZeroCurrent = 2.5;   // Vcc/2 (ideal)

void setup() {
  Serial.begin(9600);
}

void loop() {
  int adcValue = analogRead(pinACS712);
  float measuredVoltage = adcValue * (5.0 / 1023.0);
  float current = (measuredVoltage - Vref_ZeroCurrent) / sensitivity;

  Serial.print("Tensão do sensor: "); Serial.print(measuredVoltage); Serial.print(" V | ");
  Serial.print("Corrente real: "); Serial.print(current); Serial.println(" Amperes (A)");
  delay(1000);
}`
  },
  {
    id: "mfrc522",
    name: "MFRC522",
    category: "Identificação / Controle de Acesso (RFID)",
    signalType: "SPI (Digital)",
    concept: "Módulo digital para leitura/escrita de tags RFID a 13.56 MHz, essencial para controle de acesso de pessoal e rastreamento logístico inteligente.",
    workingPrinciple: "Utiliza modulação avançada para protocolos de comunicação por proximidade. O módulo emite um campo RF eletromagnético através de sua antena impressa na PCB. Quando uma tag passiva (chaveiro/cartão com uma microbobina interna) entra neste campo, ela é energizada por acoplamento indutivo. O chip da tag responde modulando a impedância do sinal do campo, transmitindo de volta um identificador único (UID) e dados armazenados, que o módulo envia ao Arduino via SPI.",
    specs: { range: "Distância de leitura ~3-5cm (sem obstruções metálicas densas)", operatingVoltage: "3.3V DC (Pinos de sinal toleram 5V, mas alimentação estritamente 3.3V)", other: "Frequência: 13.56MHz (banda livre industrial ISM). Cartões suportados: Mifare1 S50, Mifare1 S70, Mifare UltraLight, Mifare Pro." },
    applications: ["Relógio de ponto eletrônico/controle de acesso para funcionários", "Rastreabilidade de pacotes/paletes em esteiras logísticas automatizadas", "Bloqueio/liberação de acesso físico para salas de servidores e maquinário crítico"],
    models: ["Família de chips NXP Semiconductors MFRC522"],
    image: "images/mfrc522.jpg",
    codeExample: `// Exemplo de leitura de chaveiro RFID usando a biblioteca MFRC522
#include <SPI.h>
#include <MFRC522.h>
#define SS_PIN 10
#define RST_PIN 9
MFRC522 rfid(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
  Serial.println("Leitor RFID MFRC522 ativo. Aproxime sua tag...");
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial()) return;

  Serial.print("Código UID identificado: ");
  for (byte i = 0; i < rfid.uid.size; i++) {
    Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
    Serial.print(rfid.uid.uidByte[i], HEX);
  }
  Serial.println();
  rfid.PICC_HaltA();
}`
  }
];

