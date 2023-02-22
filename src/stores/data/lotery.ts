import iLotofacil from "@/assets/images/caixa/lotofacil.png";
import iQuina from "@/assets/images/caixa/quina.png";
import iLotomania from "@/assets/images/caixa/lotomania.png";
import iMegasena from "@/assets/images/caixa/megasena.png";
import iTimemania from "@/assets/images/caixa/timemania.png";

export type LotteryProfile = {
  minimum: number;
  maximum: number;
  minBetSize: number;
  maxBetSize: number;
  description: string;
};

export type Lottery = {
  icon: any;
  iconType?: "url";
  name: string;
  id: string;
  profile: LotteryProfile;
};

export const lotteries: Lottery[] = [
  {
    icon: iLotofacil,
    id: "lotofacil",
    name: "Lotofacil",
    iconType: "url",
    profile: {
      minBetSize: 15,
      maxBetSize: 20,
      minimum: 1,
      maximum: 25,
      description:
        "<p>A Lotofácil é, como o próprio nome diz, fácil de apostar e principalmente de ganhar. Você marca entre 15 e 20 números, dentre os 25 disponíveis no volante, e fatura prêmio se acertar 11, 12, 13, 14 ou 15 números.</p><p>Pode ainda deixar que o sistema escolha os números para você por meio da Surpresinha, ou concorrer com a mesma aposta por 3, 6, 12, 18 ou 24 concursos consecutivos através da Teimosinha.</p>",
    },
  },

  {
    icon: iLotomania,
    id: "lotomania",
    name: "Lotomania",
    iconType: "url",
    profile: {
      minBetSize: 50,
      maxBetSize: 50,
      minimum: 1,
      maximum: 100,
      description:
        "<p>A Lotomania é fácil de jogar e de ganhar: basta escolher 50 números e então concorrer a prêmios para acertos de 20, 19, 18, 17, 16, 15 ou nenhum número.</p>",
    },
  },

  {
    icon: iMegasena,
    id: "megasena",
    name: "Megasena",
    iconType: "url",
    profile: {
      minBetSize: 6,
      maxBetSize: 20,
      minimum: 1,
      maximum: 60,
      description:
        "<p>A Mega-Sena paga milhões para o acertador dos 6 números sorteados. Ainda é possível ganhar prêmios ao acertar 4 ou 5 números dentre os 60 disponíveis no volante de a​postas.</p><p>Para realizar o sonho de ser milionário, você deve marcar de 6 a 20 números do volante, podendo deixar que o sistema escolha os números para você (Surpresinha) e/ou concorrer com a mesma aposta por 2, 4 ou 8 concursos consecutivos (Teimosinha).</p>",
    },
  },

  {
    icon: iQuina,
    id: "quina",
    name: "Quina",
    iconType: "url",
    profile: {
      minBetSize: 10,
      maxBetSize: 15,
      minimum: 1,
      maximum: 80,
      description:
        "<p>Concorra a prêmios grandiosos com a Quina: basta marcar de 5 a 15 números dentre os 80 disponíveis no volante e torcer. Caso prefira o sistema pode escolher os números para você através da Surpresinha.</p><p>Ganham prêmios os acertadores de 2, 3, 4 ou 5 números. Você ainda pode concorrer com a mesma aposta por 3, 6, 12, 18 ou 24 concursos consecutivos com a Teimosinha.</p>",
    },
  },

  {
    icon: iTimemania,
    id: "timemania",
    name: "Timemania",
    iconType: "url",
    profile: {
      minBetSize: 10,
      maxBetSize: 10,
      minimum: 1,
      maximum: 80,
      description:
        "<p>A Timemania é a loteria para os apaixonados por futebol. Além de o seu palpite valer uma bolada, você ainda ajuda o seu time do coração.</p><p>Você escolhe dez números entre os oitenta disponíveis e um Time do Coração. São sorteados sete números e um Time do Coração por concurso. Se você tiver de três a sete acertos, ou acertar o time do coração, ganha.</p><p>Você pode deixar, ainda, que o sistema escolha os números para você (Surpresinha) ou concorrer com a mesma aposta por 3, 6, 9, ou 12 concursos consecutivos através da Teimosinha.</p>",
    },
  },
];

const times = (x: any) => (f: any) => {
  if (x > 0) {
    f();
    times(x - 1)(f);
  }
};

export function createGame(profile: LotteryProfile, betSize?: number) {
  const game = [] as number[];
  const realBetSize = betSize || profile.minBetSize;
  const xTimesHandler = times(realBetSize);

  function generateANumberToGame() {
    const v1 = Math.floor(Math.random() * profile.maximum) + 1;

    if (!game.includes(v1)) {
      game.push(v1);
    } else {
      generateANumberToGame();
    }
  }

  xTimesHandler(() => {
    generateANumberToGame();
  });

  return game;
}
