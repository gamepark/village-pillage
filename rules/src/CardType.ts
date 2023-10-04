import Card from './material/Card'
import EffectType from './EffectType'
import GameState from './GameState'
import { getBankSize } from './moves/BankTurnips'
import { getRelicsPrice } from './moves/TakeRelic'
import { getOpponentCard, getOpponentCardColor } from './Neighbor'
import PlayerState from './PlayerState'
import ResolveStep from './ResolveStep'
import Side from './rules/Side'
import { MaterialMove } from '@gamepark/rules-api'

export enum CardType {
  Farm = 1, Wall, Raider, Merchant
}

export default CardType

// Fonctions utilitaires sur Cartes et Couleurs
export function getCardType(card : Card) : CardType {
  return Math.floor(card/100)
}
// Fonction Principale
export function getCardsResolveAutomaticMoves(state : GameState, resolveStep : ResolveStep) : MaterialMove[] {
  switch (resolveStep.effectType) {
    case EffectType.Gain : return getGainMoves(state.players, resolveStep.cardColor)
    case EffectType.Steal : return getStealMoves(state.players, resolveStep.cardColor)
    case EffectType.Bank : return getBankMoves(state.players, resolveStep.cardColor, getBankSize(state))
    case EffectType.Buy : return getBuyMoves(state.players, resolveStep.cardColor, getRelicsPrice(state))
  }
}

//  Fonctions Secondaires
function getGainMoves(players: PlayerState[], cardColor: CardType) : MaterialMove[] {
  return players.flatMap((player, index) => getPlayerGainMoves(player, cardColor, side => getOpponentCard(players, index, side)))
}
  function getPlayerGainMoves(_player: PlayerState, _cardColor: CardType, _getOpposingCardBySide : (side: Side) => Card): MaterialMove[] {
    // const moves: GainTurnips[] = []
    // for (const side of sides) {
    //   const card = side===Side.LEFT ? player.leftCard : player.rightCard
    //   const opposingCard = getOpposingCardBySide(side)
    //
    //   if (card && getCardType(card) === cardColor) {                       // carte joueur donnant un gain
    //     const gain = getCardRules(card).getGain(getCardType(opposingCard))
    //     if (gain > 0) moves.push(gainTurnipsMove(player.id, gain))
    //   }
    //   if (card && getCardType(opposingCard) === cardColor) {               // carte adversaire donnant un gain
    //     const gain = getCardRules(opposingCard).getOpponentGain(getCardType(card))
    //     if (gain > 0) moves.push(gainTurnipsMove(player.id, gain))
    //   }
    // }
    return []
  }

/*     function getCardGain(card: Card, opposingCardColor: CardColor, phase = Phase.RESOLVE) : number {                   // On contrôle la carte opposée dans TOUS les cas (notamment pour MOAT)
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
          case Card.Trapper: return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Yellow) ? 1 : 0
          default: return 0
        }
      } else {
        return (phase===Phase.REFRESH && card === Card.Shepherd) ? 4 : 0
      }
    } 
    function getCardOpponentGain(card: Card, opposingCard: CardColor) {
      if(card === Card.Moat) return opposingCard === CardColor.Green ? 1 : 0
      else return 0
    } */

function getStealMoves(_players: PlayerState[], _cardColor: CardType) : MaterialMove[] {     // Dans cette fonction on regarde les ColorCard des adversaires
   // const moves: Move[] = []
  // for (let victimIndex= 0; victimIndex < players.length; victimIndex++) {
  //   const victim = players[victimIndex]
  //   if (!victim.stock && !victim.bank) continue
  //
  //   const leftPlayerIndex = (victimIndex + 1) % players.length;
  //   const rightPlayerIndex = (victimIndex - 1 + players.length) % players.length;
  //   const leftOpponentCard = getOpponentCard(players, victimIndex, Side.LEFT)
  //   const rightOpponentCard = getOpponentCard(players, victimIndex, Side.RIGHT)
  //   // let leftSteal = getCardColor(leftOpponentCard) === cardColor ? getStealValue(leftOpponentCard, victim.leftCard!) : 0
  //   // let rightSteal = getCardColor(rightOpponentCard) === cardColor ? getStealValue(rightOpponentCard, victim.rightCard!) : 0
  //   let leftSteal = getCardType(leftOpponentCard) === cardColor ? getCardRules(leftOpponentCard).getSteal(getCardType(victim.leftCard!))
  //                                                                + getCardRules(victim.leftCard!).getStealToOpponent(getCardType(leftOpponentCard))   : 0
  //   let rightSteal = getCardType(rightOpponentCard) === cardColor ? getCardRules(rightOpponentCard).getSteal(getCardType(victim.rightCard!))
  //                                                                  + getCardRules(victim.rightCard!).getStealToOpponent(getCardType(rightOpponentCard)) : 0
  //
  //   if (leftSteal > 0 && rightSteal > 0 && leftSteal+rightSteal > victim.stock) {     // si les 2 joueurs adverses volent une somme sup au stock!
  //     if (victim.stock % 2 == 1) {
  //       if (leftSteal > rightSteal) {
  //         leftSteal = Math.ceil(victim.stock/2)
  //         rightSteal = Math.floor(victim.stock/2)
  //       } else if (leftSteal < rightSteal) {
  //         leftSteal = Math.floor(victim.stock/2)
  //         rightSteal = Math.ceil(victim.stock/2)
  //       } else {
  //         if(Math.random() < 0.5) {
  //           leftSteal = Math.ceil(victim.stock/2)
  //           rightSteal = Math.floor(victim.stock/2)
  //           moves.push(flipChickenMove(leftPlayerIndex +1))  // LeftPlayer win duel
  //         } else {
  //           leftSteal = Math.floor(victim.stock/2)
  //           rightSteal = Math.ceil(victim.stock/2)
  //           moves.push(flipChickenMove(rightPlayerIndex +1))  // RightPlayer win duel
  //         }
  //       }
  //     } else {
  //       leftSteal = victim.stock/2
  //       rightSteal = victim.stock/2
  //     }
  //   }
  //   if (leftSteal) moves.push(stealTurnipsMove(leftPlayerIndex +1, Math.min(leftSteal,victim.stock), victimIndex +1))
  //   if (rightSteal) moves.push(stealTurnipsMove(rightPlayerIndex +1, Math.min(rightSteal,victim.stock), victimIndex +1))
  // }
  return []
}

/*  function getStealValue(robberCard : Card, victimCard : Card) {
    return getCardSteal(robberCard, getCardColor(victimCard))
           + getCardOpponentSteal(victimCard, getCardColor(robberCard))
  }
    function getCardSteal(card: Card, opposingCardColor: CardColor) {                                           // On contrôle la carte opposée dans TOUS les cas.
      switch(card) {
        case Card.Raider: return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Yellow) ? 4 : 0
        case Card.Turncoat:
        case Card.Veteran:
        case Card.Cutpurse:
        case Card.Berserker: return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Yellow) ? 6 : 0
        case Card.Labyrinth:
        case Card.Moat:
        case Card.Cathedral: return opposingCardColor === CardColor.Red ? 3 : 0
        case Card.Wall: return opposingCardColor === CardColor.Red ? 1 : 0
        case Card.Dungeon: return (opposingCardColor === CardColor.Red || opposingCardColor === CardColor.Blue) ? 1 : 0
        case Card.Mason: return opposingCardColor === CardColor.Blue ? 1 : 0
        case Card.Outlaw: return opposingCardColor === CardColor.Green ? 5 : (opposingCardColor === CardColor.Yellow ? 4 : 0)
        case Card.Trapper: return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Yellow) ? 4 : (opposingCardColor === CardColor.Red ? 1 : 0)
        case Card.Treasury: return opposingCardColor === CardColor.Red ? 2 : 0

        case Card.Burglar: return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Yellow) ? 4 : 0           // TODO : Peut voler dans la banque !
        case Card.TollBridge: return (opposingCardColor === CardColor.Red || opposingCardColor === CardColor.Yellow) ? 2 : 0          // TODO : Peut voler dans la banque !
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
    } */

function getBankMoves(players: PlayerState[], cardColor: CardType, bankSize: number) : MaterialMove[] {
  return players.flatMap((player, index) => getPlayerBankMoves(player, cardColor, side => getOpponentCardColor(players, index, side), bankSize))
}
  function getPlayerBankMoves(_player: PlayerState, _cardColor: CardType, _getOpposingCardColorBySide : (side: Side) => CardType , _bankSize: number): MaterialMove[] {
    // if (player.bank >= bankSize || player.stock == 0) return []
    // const moves: BankTurnips[] = []
    // let bankable = Math.min(bankSize - player.bank, player.stock)
    // for (const side of sides) {
    //   const card = side===Side.LEFT ? player.leftCard : player.rightCard
    //   if (card && getCardType(card) === cardColor) {
    //     // const cardBank = getCardBank(card, () => getOpposingCardColorBySide(side))
    //     const cardBank = getCardRules(card).getBank(getOpposingCardColorBySide(side))
    //     const toBank = Math.min(cardBank, bankable)
    //     if (toBank > 0) {
    //       moves.push(bankTurnipsMove(player.id, toBank))
    //       if(bankable === toBank) break       // on ne fait même pas le calcul et on ne passe pas à la carte suivante
    //       bankable -= toBank
    //     }
    //   }
    // }
    // return moves
    return []
  }

/*  function getCardBank(card: Card, getOpposingCardColor: () => CardColor) : number {              // En passant cette fonction anonyme en paramètre, on ne contrôle pas la carte opposée pour TOUS les cas. On le fait que si nécessaire !
    switch (card) {
      case Card.Cathedral: return getOpposingCardColor() === CardColor.Red ? 1 : 0
      case Card.Dungeon: return getOpposingCardColor() === (CardColor.Red | CardColor.Blue) ? 1 : 2
      case Card.Pickler:
      case Card.Labyrinth: return getOpposingCardColor() === CardColor.Red ? 0 : 2
      case Card.Mason: return getOpposingCardColor() === CardColor.Blue ? 2 : 0
      case Card.Moat: 
          switch(getOpposingCardColor()) {
            case CardColor.Blue:
            case CardColor.Yellow: return 2
            default: return 0
          }
      case Card.TollBridge:
          switch(getOpposingCardColor()) {
            case CardColor.Green:
            case CardColor.Blue: return 2
            default: return 0
          }
      case Card.Treasury: return 4
      case Card.Wall: return 1
      default: return 0
    }
  } */

function getBuyMoves(players: PlayerState[], cardColor: CardType, relicsPrice: number[]) : MaterialMove[] {
  return players.flatMap((player) => getPlayerBuyMoves(player, cardColor, relicsPrice))
}
  /**     ALGO   de GET_BUY_MOVES() *
   *  1. Vérifier si au moins un des joueurs a jouer 2 YellowCard (renseigner une variable)
   *      -> Si Oui, on sort des AutomaticMoves pour que le joueur choisisse la carte à déclencher
   *      -> Si Non, on continue
   *  2. Vérifier si le joueur getCardCanBuyRelic et peut acheter une relique fct(stock + bank , relics)
   *      -> Si Oui, le joueur SpendTurnips (construit avec gainturnip() et spendBankTurnip()) et TakeARelic et on attend tous les autres joueurs
   *      -> Si Non, on attend tous les autres joueurs. Puis passer au second effet de la carte (généralement on s'arrête)
   *  3. Déclencher les effets des deuxième YellowCard et refaire le 2. avec celle-ci.
   **/ 

  // Achat de relique
  
  function getPlayerBuyMoves(_player: PlayerState, _cardColor: CardType, _relicsPrice: number[]): MaterialMove[] {
    // // Postulat : On considère que toutes les cartes qui ont un achat de relique l'ont en première action.
    // if (player.rightCard && getCardType(player.rightCard) === CardType.Merchant
    //     && player.leftCard && getCardType(player.leftCard) === CardType.Merchant) return [] // on doit choisir une carte avec ChooseCard
    // const moves: Move[] = []
    // for (const side of sides) {
    //   const card = side===Side.LEFT ? player.leftCard : player.rightCard
    //   if (card && getCardType(card) === cardColor) {
    //     moves.push(...getCardBuyMoves(player, card, relicsPrice))
    //   }
    // }
    // return moves
    return []
  }



/* SI ON AVAIT EU L'IDEE DE FAIRE UNE FONCTION PAR CARTE... Mauvaise idée, mieux vaut leur donner des attributs. 
  function wallMoves(state : GameState, playerId : number) : Move[] {
  const moves : Move[] = []
  moves.push(gainTurnipsMove(playerId, 1))

  // deuxième action
  const player = getPlayerState(state, playerId)
  const bank = Math.min(1,player.stock,maxBankable(player,state.players.length))
  if (bank > 0) moves.push(bankTurnipsMove(playerId, bank))
  return moves
} */

/* FONCTION PAR COULEUR DE CARTE...  
  function getRedCardsAutomaticMoves(players: PlayerState[]) {
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


/* PREMIERE APPROCHE POUR GENERER LES AUTOMATICMOVES
  const moves : Move[] = []
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