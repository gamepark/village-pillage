import Card from "./Card";
import EffectType from "./EffectType";
import GameState from "./GameState";
import BankTurnips, { bankTurnipsMove } from "./moves/BankTurnips";
import { flipChickenMove } from "./moves/FlipChicken";
import GainTurnips, { gainTurnipsMove } from "./moves/GainTurnips";
import Move from "./moves/Move";
import { stealTurnipsMove } from "./moves/StealTurnips";
import Phase from "./Phase";
import PlayerState from "./PlayerState";
import ResolveStep from "./ResolveStep";
import Side, { sides } from "./Side";

enum CardColor {
  Green = 1, Blue, Red, Yellow
}

export default CardColor

// Fonctions utilitaires sur Cartes et Couleurs
export function getCardColor(card : Card) : CardColor {
  return Math.floor(card/100)
}
function getOpponentCard(players: PlayerState[], activePlayerIndex: number, side: Side): Card {
  if(side===Side.LEFT) {
    const leftOpponent = players[activePlayerIndex+1 % players.length]
    return leftOpponent.rightCard!
  } else {
    const rightOpponent = players[activePlayerIndex-1 + players.length % players.length]
    return rightOpponent.leftCard!
  }
}
function getOpponentCardColor(players: PlayerState[], index: number, side: Side): CardColor {
  return getCardColor (getOpponentCard(players,index,side))
}


// Fonction Principale
export function getCardsResolveAutomaticMoves(state : GameState, resolveStep : ResolveStep) : Move[] {
  switch (resolveStep.effectType) {
    case EffectType.Gain : return getGainMoves(state.players, resolveStep.cardColor)
    case EffectType.Steal : return getStealMoves(state.players, resolveStep.cardColor)
    case EffectType.Bank : return getBankMoves(state.players, resolveStep.cardColor)
    case EffectType.Buy : return getBuyMoves(state.players, resolveStep.cardColor)
  }
}


function getGainMoves(players: PlayerState[], cardColor: CardColor) : GainTurnips[] {
  return players.flatMap((player, index) => getPlayerGainMoves(player, cardColor, side => getOpponentCard(players, index, side)))
}
  function getPlayerGainMoves(player: PlayerState, cardColor: CardColor, getOpposingCardBySide : (side: Side) => Card): GainTurnips[] {
    const moves: GainTurnips[] = []
    for (const side of sides) {
      const card = side===Side.LEFT ? player.leftCard : player.rightCard
      const opposingCard = getOpposingCardBySide(side)

      if (card && getCardColor(card) === cardColor) {                       // carte joueur
        const gain = getCardGain(card, getCardColor(opposingCard))
        if (gain > 0) moves.push(gainTurnipsMove(player.id, gain))
      }
      if (card && getCardColor(opposingCard) === cardColor) {               // carte adversaire
        const gain = getCardOpponentGain(opposingCard, getCardColor(card))
        if (gain > 0) moves.push(gainTurnipsMove(player.id, gain))
      }
    }
    return moves
  }

    function getCardGain(card: Card, opposingCardColor: CardColor, phase = Phase.RESOLVE) : number {                   // On contrôle la carte opposée dans TOUS les cas (notamment pour MOAT)
      if(phase===Phase.RESOLVE) {
        switch (card) {
          case Card.Farmer: return 3
          case Card.Florist: return 5
          case Card.Innkeeper: return opposingCardColor === CardColor.Yellow ? 5 : 4
          case Card.Mason:
          case Card.Pickler: return 4 
          case Card.Miner: return opposingCardColor === CardColor.Blue ? 5 : 4
          case Card.RatCatcher: return opposingCardColor === CardColor.Green ? 6 : 4
          case Card.Wall:
          case Card.Treasury:
          case Card.Labyrinth: return opposingCardColor === CardColor.Red ? 0 : 1
          case Card.Dungeon: return 1
          case Card.Monastery: return 2

          case Card.Moat: return opposingCardColor === CardColor.Red ? 2 : 0
          case Card.Trapper: return opposingCardColor === (CardColor.Green | CardColor.Yellow) ? 1 : 0
          // case Card.Bard: return 1         // si pas d'achat relique possible  -> TODO EffectType.Buy
          // case Card.Doctor: return 2       // si pas d'achat relique possible  -> TODO EffectType.Buy
          default: return 0
        }
      } else {
        return (phase===Phase.REFRESH && card === Card.Shepherd) ? 4 : 0
      }
    }
    function getCardOpponentGain(card: Card, opposingCard: CardColor) {
      if(card === Card.Moat) return opposingCard === CardColor.Green ? 1 : 0
      else return 0
    }

function getStealMoves(players: PlayerState[], _cardColor: CardColor) : Move[] {
  const moves: Move[] = []
  for (let victimIndex= 0; victimIndex < players.length; victimIndex++) {
    const victim = players[victimIndex]
    if (!victim.stock && !victim.bank) continue

        const leftPlayerIndex = victimIndex + 1 % players.length;
        const rightPlayerIndex = victimIndex - 1 + players.length % players.length;
        let leftSteal = getStealValue(getOpponentCard(players, victimIndex, Side.LEFT), victim.leftCard!)
        let rightSteal = getStealValue(getOpponentCard(players, victimIndex, Side.RIGHT), victim.rightCard!)

    if (leftSteal > 0 && rightSteal > 0 && leftSteal+rightSteal > victim.stock) {     // si les 2 joueurs adverses volent une somme sup au stock!
      if (victim.stock % 2 == 1) {
        if (leftSteal > rightSteal) {
          leftSteal = Math.ceil(victim.stock/2)
          rightSteal = Math.floor(victim.stock/2)
        } else if (leftSteal < rightSteal) {
          leftSteal = Math.floor(victim.stock/2)
          rightSteal = Math.ceil(victim.stock/2)
        } else {
          if(Math.random() < 0.5) {
            leftSteal = Math.ceil(victim.stock/2)
            rightSteal = Math.floor(victim.stock/2)
            moves.push(flipChickenMove(leftPlayerIndex +1))  // LeftPlayer win duel
          } else {
            leftSteal = Math.floor(victim.stock/2)
            rightSteal = Math.ceil(victim.stock/2)
            moves.push(flipChickenMove(rightPlayerIndex +1))  // RightPlayer win duel
          }
        }
      } else {
        leftSteal = victim.stock/2
        rightSteal = victim.stock/2
      }
    }
    if (leftSteal) moves.push(stealTurnipsMove(leftPlayerIndex +1, Math.min(leftSteal,victim.stock), victimIndex +1))
    if (rightSteal) moves.push(stealTurnipsMove(rightPlayerIndex +1, Math.min(rightSteal,victim.stock), victimIndex +1))
  }
  return moves
}

  function getStealValue(robberCard : Card, victimCard : Card) {
    return getCardSteal(robberCard, getCardColor(victimCard)) + getCardOpponentSteal(victimCard, getCardColor(robberCard))
  }
    function getCardSteal(card: Card, opposingCardColor: CardColor) {                                           // On contrôle la carte opposée dans TOUS les cas.
      switch(card) {
        case Card.Raider: return opposingCardColor === (CardColor.Green | CardColor.Yellow) ? 4 : 0
        case Card.Turncoat:
        case Card.Veteran:
        case Card.Cutpurse:
        case Card.Berserker: return opposingCardColor === (CardColor.Green | CardColor.Yellow) ? 6 : 0
        case Card.Labyrinth:
        case Card.Moat:
        case Card.Cathedral: return opposingCardColor === CardColor.Red ? 3 : 0
        case Card.Wall: return opposingCardColor === CardColor.Red ? 1 : 0
        case Card.Dungeon: return opposingCardColor === (CardColor.Red | CardColor.Blue) ? 1 : 0
        case Card.Mason: return opposingCardColor === CardColor.Blue ? 1 : 0
        case Card.Outlaw: return opposingCardColor === CardColor.Green ? 5 : (opposingCardColor === CardColor.Yellow ? 4 : 0)
        case Card.Trapper: return opposingCardColor === (CardColor.Green | CardColor.Yellow) ? 4 : (opposingCardColor === CardColor.Red ? 1 : 0)
        case Card.Treasury: return opposingCardColor === CardColor.Red ? 2 : 0

        case Card.Burglar: return opposingCardColor === (CardColor.Green | CardColor.Yellow) ? 4 : 0           // TODO : Peut voler dans la banque !
        case Card.TollBridge: return opposingCardColor === (CardColor.Red | CardColor.Yellow) ? 2 : 0          // TODO : Peut voler dans la banque !
        default: return 0
      }
    }
    function getCardOpponentSteal(card: Card, opposingCardColor: CardColor) {
      switch(card) {
        case Card.Berserker: return opposingCardColor === CardColor.Blue ? 1 :0
        case Card.Cutpurse: return opposingCardColor === CardColor.Red ? 1 : 0
        case Card.Florist: return opposingCardColor === CardColor.Red ? 2 : 0
        default: return 0
      }
    }

function getBankMoves(players: PlayerState[], cardColor: CardColor) : BankTurnips[] {
  return players.flatMap((player, index) => getPlayerBankMoves(player, cardColor, side => getOpponentCardColor(players, index, side)))
}
  function getPlayerBankMoves(player: PlayerState, cardColor: CardColor, getOpposingCardColorBySide : (side: Side) => CardColor): BankTurnips[] {
    const moves: BankTurnips[] = []
    for (const side of sides) {
      const card = side===Side.LEFT ? player.leftCard : player.rightCard
      if (card && getCardColor(card) === cardColor) {
        const gain = getCardBank(card, () => getOpposingCardColorBySide(side))
        if (gain > 0) moves.push(bankTurnipsMove(player.id, gain))
      }
    }
    return moves
  }

  function getCardBank(card: Card, getOpposingCardColor: () => CardColor) : number {              // On ne contrôle pas la carte opposée pour TOUS les cas. Que si c'est nécessaire !
    switch (card) {
      case Card.Cathedral: return getOpposingCardColor() === CardColor.Red ? 1 : 0
      case Card.Dungeon: return getOpposingCardColor() === (CardColor.Red | CardColor.Blue) ? 1 : 2
      case Card.Pickler:
      case Card.Labyrinth: return getOpposingCardColor() === CardColor.Red ? 0 : 2
      case Card.Mason: return getOpposingCardColor() === CardColor.Blue ? 2 : 0
      case Card.Moat: return getOpposingCardColor() === (CardColor.Blue | CardColor.Yellow) ? 2 : 0
      case Card.TollBridge: return getOpposingCardColor() === (CardColor.Green | CardColor.Blue) ? 2 : 0
      case Card.Treasury: return 4
      case Card.Wall: return 1
      default: return 0
    }
  }

function getBuyMoves(_players: PlayerState[], _cardColor: CardColor) {
  // Achat de relique
  
  return []
}









/* function wallMoves(state : GameState, playerId : number) : Move[] {
  const moves : Move[] = []
  moves.push(gainTurnipsMove(playerId, 1))

  // deuxième action
  const player = getPlayerState(state, playerId)
  const bank = Math.min(1,player.stock,maxBankable(player,state.players.length))
  if (bank > 0) moves.push(bankTurnipsMove(playerId, bank))
  return moves
} */






/* function getRedCardsAutomaticMoves(players: PlayerState[]) {
  const moves : Move[] = []
  for (var playerIndex = 0 ; playerIndex < players.length; playerIndex++) {
    const player = players[playerIndex]
    if (player.leftCard === Card.Raider) {
      moves.push(stealTurnipsMove(playerIndex+1, 4, Side.LEFT))
    }
    if (player.rightCard === Card.Raider) {
      moves.push(stealTurnipsMove(playerIndex+1, 4, Side.RIGHT))
    }
  }
  return moves
} */


/*   const moves : Move[] = []
  for (var playerIndex = 0 ; playerIndex < state.players.length; playerIndex++) {
    const player = state.players[playerIndex]
    if(player.leftCard && getCardColor(player.leftCard)===resolveStep.cardColor) {
      moves.push(...getCardAutomaticMoves(player.leftCard, playerIndex))
    }
    if(player.rightCard && getCardColor(player.rightCard)===resolveStep.cardColor) {
      moves.push(...getCardAutomaticMoves(player.rightCard, playerIndex))
    }
  }
  return moves */