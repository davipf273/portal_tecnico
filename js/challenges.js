const challenges = [
  {
    id: "iluminacao",
    title: "Desafio 1 – Iluminação Inteligente",
    shortTitle: "Iluminação Inteligente",
    icon: "💡",
    summary: "Controle automático de LED combinando sensor de presença (PIR) e sensor de luminosidade (LDR).",
    components: [
      "Arduino Uno",
      "LED + resistor de 220Ω",
      "Sensor de presença/movimento PIR",
      "Sensor de luminosidade LDR",
      "Resistor de 10kΩ para divisor de tensão",
      "Protoboard e fios jumper"
    ],
    logic: [
      "Pessoa presente + ambiente escuro → LED ligado",
      "Pessoa presente + ambiente claro → LED desligado",
      "Sem pessoa → LED desligado"
    ],
    wiring: [
    ],
    circuitImage: "images/circuitos/iluminacao.png",
    code: `// Desafio 1 - Iluminação Inteligente

const byte LED = 13;
const byte PING = 7;
const byte AJUSTE = A0;

float medirDistancia() {

  pinMode(PING, OUTPUT);

  digitalWrite(PING, LOW);
  delayMicroseconds(2);

  digitalWrite(PING, HIGH);
  delayMicroseconds(5);

  digitalWrite(PING, LOW);

  pinMode(PING, INPUT);

  return pulseIn(PING, HIGH) / 58.0;
}

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {

  int limite = map(analogRead(AJUSTE), 0, 1023, 20, 70);
  float distancia = medirDistancia();

  Serial.print("Leitura = ");
  Serial.print(distancia);
  Serial.print("cm | Configurado = ");
  Serial.print(limite);
  Serial.println("cm");

  if (distancia >= limite) {

    digitalWrite(LED, LOW);
    Serial.println("STATUS: LIVRE");

  } 
  else if (distancia >= limite * 0.45) {

    digitalWrite(LED, HIGH);
    delay(180);

    digitalWrite(LED, LOW);
    delay(180);

    Serial.println("STATUS: ATENCAO");

  } 
  else {

    digitalWrite(LED, HIGH);
    Serial.println("STATUS: PARE");

  }
}`,
    video: {
      title: "Vídeo da Iluminação Inteligente",
      source: "local",
      url: "videos/desafio-1-iluminacao.mp4",
      caption: "Demonstração do circuito funcionando e explicação de como o PIR e o LDR são utilizados no sistema."
    }
  },
  {
    id: "estacionamento",
    title: "Desafio 2 – Estacionamento Inteligente",
    shortTitle: "Estacionamento Inteligente",
    icon: "🚗",
    summary: "Sistema de alerta visual para estacionamento usando sensor ultrassônico e potenciômetro para definir a distância de segurança.",
    components: [
      "Arduino Uno",
      "LED + resistor de 220Ω",
      "Sensor ultrassônico HC-SR04",
      "Potenciômetro 10kΩ",
      "Protoboard e fios jumper"
    ],
    logic: [
      "Objeto distante → LED desligado",
      "Objeto se aproximando → LED piscando",
      "Objeto dentro da distância definida → LED ligado",
      "Desafio adicional: LED pisca mais rápido conforme o objeto se aproxima"
    ],
    wiring: [
      
    ],
    circuitImage: "images/circuitos/estacionamento.png",
    code: `// Desafio 2 - Estacionamento Inteligente
// Pinos dos LEDs
const int LED_VERDE = 8;
const int LED_VERMELHO = 9;
const int LED_AMARELO = 10;

// Pinos dos sensores
const int SENSOR_TEMP = A0;
const int SENSOR_UMIDADE = A1;

// Valores de referência
const float LIMITE_TEMP = 30.0;
const int LIMITE_UMIDADE = 40;

void setup() {

  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_VERMELHO, OUTPUT);
  pinMode(LED_AMARELO, OUTPUT);

  Serial.begin(9600);
}

void loop() {

  // Leitura dos sensores
  int leituraTemp = analogRead(SENSOR_TEMP);
  int leituraUmidade = analogRead(SENSOR_UMIDADE);
  
  Serial.print("Leitura bruta: ");
  Serial.println(leituraUmidade);

  // Conversão da leitura do TMP para temperatura
  float temperatura = (leituraTemp * 5.0 / 1023.0 - 0.5) * 100.0;

  // Conversão da leitura do sensor de umidade para porcentagem
  int umidade = map(leituraUmidade, 512, 880, 0, 100);
  umidade = constrain(umidade, 0, 100);

  // Verifica as condições
  bool temperaturaAlta = temperatura > LIMITE_TEMP;
  bool umidadeBaixa = umidade < LIMITE_UMIDADE;

  // Primeiro desligamos todos os LEDs
  digitalWrite(LED_VERDE, LOW);
  digitalWrite(LED_VERMELHO, LOW);
  digitalWrite(LED_AMARELO, LOW);

  // Temperatura alta
  if (temperaturaAlta) {
    digitalWrite(LED_VERMELHO, HIGH);
  }

  // Umidade baixa
  if (umidadeBaixa) {
    digitalWrite(LED_AMARELO, HIGH);
  }

  // Condição normal
  if (!temperaturaAlta && !umidadeBaixa) {
    digitalWrite(LED_VERDE, HIGH);
  }

  // Monitor Serial
  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.print(" C | Umidade: ");
  Serial.print(umidade);
  Serial.println("%");

  if (temperaturaAlta && umidadeBaixa) {
    Serial.println("ALERTA: Temperatura alta + Umidade baixa!");
  }
  else if (temperaturaAlta) {
    Serial.println("ALERTA: Temperatura acima do limite!");
  }
  else if (umidadeBaixa) {
    Serial.println("ALERTA: Umidade abaixo do limite!");
  }
  else {
    Serial.println("AMBIENTE NORMAL");
  }

  Serial.println("-----------------------------");

  delay(1000);
}`,
    video: {
      title: "Vídeo do Estacionamento Inteligente",
      source: "local",
      url: "videos/desafio-2-estacionamento.mp4",
      caption: "Testes com diferentes distâncias, ajustes do potenciômetro e explicação de como ele altera o funcionamento do sistema."
    }
  },
  {
    id: "ambiente",
    title: "Desafio 3 – Ambiente Inteligente",
    shortTitle: "Ambiente Inteligente",
    icon: "🌱",
    summary: "Monitoramento de temperatura e umidade de uma estufa com LEDs como indicadores visuais das condições ambientais.",
    components: [
      "Arduino Uno",
      "LEDs: verde, vermelho e amarelo + resistores 220Ω",
      "Sensor de temperatura e umidade DHT22",
      "Resistor de 10kΩ (pull-up do DHT22)",
      "Protoboard e fios jumper"
    ],
    logic: [
      "Temperatura e umidade dentro dos limites → LED verde ligado",
      "Temperatura acima do limite → LED vermelho ligado",
      "Umidade abaixo do limite → LED amarelo ligado",
      "Mais de uma condição fora do ideal → LEDs indicam simultaneamente"
    ],
    wiring: [
    ],
    circuitImage: "images/circuitos/ambiente.png",
    code: `// Desafio 3 - Ambiente Inteligente
const int pinoPIR = 2;
const int pinoLDR = A0;
const int pinoLED = 8;

int limiteLuz = 500;

void setup() {

  pinMode(pinoPIR, INPUT);
  pinMode(pinoLED, OUTPUT);

  Serial.begin(9600);
}

void loop() {

  int movimento = digitalRead(pinoPIR);
  int luminosidade = analogRead(pinoLDR);

  bool escuro = luminosidade < limiteLuz;

  if (movimento == HIGH && escuro) {

    digitalWrite(pinoLED, HIGH);

    Serial.println("Presenca detectada - ambiente escuro - LED LIGADO");
  }
  else {

    digitalWrite(pinoLED, LOW);

    Serial.println("LED DESLIGADO");
  }

  Serial.print("Movimento: ");
  Serial.print(movimento);

  Serial.print(" | Luminosidade: ");
  Serial.print(luminosidade);

  Serial.print(" | Limite: ");
  Serial.println(limiteLuz);

  delay(500);
}`,
    video: {
      title: "Vídeo do Ambiente Inteligente",
      source: "local",
      url: "videos/desafio-3-ambiente.mp4",
      caption: "Testes simulando diferentes temperaturas e níveis de umidade, além da explicação da lógica utilizada no programa."
    }
  }
];
