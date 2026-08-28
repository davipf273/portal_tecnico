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

// C++ code
//
const int trigPin = 12;
const int echoPin = 11;
const int ledPin = 10;
const int potPin = A0;
const int lumPin = A1;
void setup()
{
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}
void loop()
{
  // Lê a luminosidade
  int luminosidade = analogRead(A1);

  // Dispara o sensor ultrassônico
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Calcula a distância em centímetros
  long duracao = pulseIn(echoPin, HIGH);
  int distancia = duracao * 0.017;
  // Comportamento do LED
  mudarLed(distancia, 250, luminosidade);

  // Mostra os valores importantes no monitor serial
  Serial.print("Distancia: ");
  Serial.print(distancia);
  Serial.print("cm");
  delay(200);
}
void mudarLed(int distancia, int limite, int luminosidade)
{

  // Comportamento do LED
  if (distancia <= limite) { // Se a distância for baixa,
    if (luminosidade < 850) { // E tiver luz o suficiente,
      digitalWrite(ledPin, HIGH); // O LED acende.
    }else{
      digitalWrite(ledPin, LOW); // Se não, apaga.
    }
  }else{
      digitalWrite(ledPin, LOW);
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
// C++ code
//

const int trigPin = 12;
const int echoPin = 11;
const int ledPin = 10;
const int potPin = A0;

void setup()
{
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  // Lê o potenciômetro e converte numa distância limite
  int potValue = analogRead(potPin);
  int limiteDistancia = map(potValue, 0, 1023, 2, 200);
  
  
  // Dispara o sensor ultrassônico
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Calcula a distância em centímetros
  long duracao = pulseIn(echoPin, HIGH);
  int distancia = duracao * 0.017;

  // Comportamento do LED
  mudarLed(distancia, limiteDistancia);
  
  // Mostra os valores importantes no monitor serial
  Serial.print("Distancia: ");
  Serial.print(distancia);
  Serial.print("cm | Limite do potenciometro: ");
  Serial.print(limiteDistancia);
  Serial.println("cm");
  
  delay(150);
}

void mudarLed(int distancia, int limite)
{
    
  // Comportamento do LED
  if (distancia <= limite) {
    if (distancia <= limite / 2) {
      if (digitalRead(ledPin) == LOW){
        digitalWrite(ledPin, HIGH);
      }else{
         digitalWrite(ledPin, LOW);
      }
    }else{
      delay(250);
      if (digitalRead(ledPin) == LOW){
        digitalWrite(ledPin, HIGH);
      }else{
         digitalWrite(ledPin, LOW);
      }
    }
  }else{
  	digitalWrite(ledPin, LOW);
  }
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
// C++ code
//
void setup()
{
  pinMode(A0, INPUT);
  Serial.begin(9600);
  pinMode(A1, INPUT);
  pinMode(11, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(9, OUTPUT);
  pinMode(6, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(3, OUTPUT);
}

void loop()
{
  Serial.println((-40 + 0.488155 * (analogRead(A0) - 20)));
  delay(1000); // Wait for 1000 millisecond(s)
  Serial.println(analogRead(A1));

  delay(50); // Wait for 50 millisecond(s)
  if ((-40 + 0.488155 * (analogRead(A0) - 20)) > 35) {
    analogWrite(11, 204);
    analogWrite(10, 0);
    analogWrite(9, 0);
  }
  if ((-40 + 0.488155 * (analogRead(A0) - 20)) > 26 && (-40 + 0.488155 * (analogRead(A0) - 20)) <= 35) {
    analogWrite(11, 255);
    analogWrite(10, 204);
    analogWrite(9, 0);
  }
  if ((-40 + 0.488155 * (analogRead(A0) - 20)) >= 18 && (-40 + 0.488155 * (analogRead(A0) - 20)) <= 26) {
    analogWrite(11, 51);
    analogWrite(10, 255);
    analogWrite(9, 51);
  }
  if ((-40 + 0.488155 * (analogRead(A0) - 20)) < 18 && (-40 + 0.488155 * (analogRead(A0) - 20)) > 0) {
    analogWrite(11, 0);
    analogWrite(10, 204);
    analogWrite(9, 204);
  }
  if ((-40 + 0.488155 * (analogRead(A0) - 20)) <= 0) {
    analogWrite(11, 102);
    analogWrite(10, 255);
    analogWrite(9, 255);
  }

  delay(50); // Wait for 50 millisecond(s)
  if (analogRead(A1) < 303) {
    analogWrite(6, 255);
    analogWrite(5, 0);
    analogWrite(3, 0);
  }
  if (analogRead(A1) >= 303 && analogRead(A1) <= 563) {
    analogWrite(6, 51);
    analogWrite(5, 255);
    analogWrite(3, 51);
  }
  if (analogRead(A1) > 563) {
    analogWrite(6, 51);
    analogWrite(5, 102);
    analogWrite(3, 255);
  }
}`,
    video: {
      title: "Vídeo do Ambiente Inteligente",
      source: "local",
      url: "videos/desafio-3-ambiente.mp4",
      caption: "Testes simulando diferentes temperaturas e níveis de umidade, além da explicação da lógica utilizada no programa."
    }
  }
];
