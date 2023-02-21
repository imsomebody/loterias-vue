import iLotofacil from "@/assets/images/caixa/lotofacil.png";
import iQuina from "@/assets/images/caixa/quina.png";
import iMegasena from "@/assets/images/caixa/megasena.png";

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
        "A Lotofácil é, como o próprio nome diz, fácil de apostar e principalmente de ganhar. Você marca entre 15 e 20 números, dentre os 25 disponíveis no volante, e fatura prêmio se acertar 11, 12, 13, 14 ou 15 números. Pode ainda deixar que o sistema escolha os números para você por meio da Surpresinha, ou concorrer com a mesma aposta por 3, 6, 12, 18 ou 24 concursos consecutivos através da Teimosinha.",
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
        "Mega-Sena paga milhões para o acertador dos 6 números sorteados. Ainda é possível ganhar prêmios ao acertar 4 ou 5 números dentre os 60 disponíveis no volante de a​postas. Para realizar o sonho de ser milionário, você deve marcar de 6 a 20 números do volante, podendo deixar que o sistema escolha os números para você (Surpresinha) e/ou concorrer com a mesma aposta por 2, 4 ou 8 concursos consecutivos (Teimosinha).",
    },
  },

  {
    icon: iQuina,
    id: "quina",
    name: "Quina",
    iconType: "url",
    profile: {
      minBetSize: 5,
      maxBetSize: 15,
      minimum: 1,
      maximum: 80,
      description: "Descrição será adicionada em breve.",
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
