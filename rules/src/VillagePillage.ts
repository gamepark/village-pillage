import { SecretInformation, SimultaneousGame } from '@gamepark/rules-api'
import shuffle from 'lodash.shuffle'
import { marketCards, startingCards } from './Card'
import { getCardsResolveAutomaticMoves } from './CardColor'
import GameState, { getPlayerState } from './GameState'
import GameView from './GameView'
import { addPendingAction } from './moves/AddPendingAction'
import { bankTurnips } from './moves/BankTurnips'
import { changeResolveStep, changeResolveStepMove, getNextResolveStep } from './moves/ChangeResolveStep'
import { canChooseCard, chooseCard, chooseCardMove } from './moves/ChooseCard'
import { flipChickenMove } from './moves/FlipChicken'
import { gainTurnips } from './moves/GainTurnips'
import { givePriorityToBuyCard, givePriorityToBuyCardMove } from './moves/GivePriorityToBuyCard'
import Move from './moves/Move'
import MoveType from './moves/MoveType'
import MoveView from './moves/MoveView'
import { playCard, playCardMove } from './moves/PlayCard'
import { revealCards, revealCardsMove } from './moves/RevealCards'
import { spendBankTurnips } from './moves/SpendBankTurnips'
import { spendStockTurnips } from './moves/SpendStockTurnips'
import { stealTurnips } from './moves/StealTurnips'
import { canTakeMarketCard, takeMarketCard, takeMarketCardMove } from './moves/TakeMarketCard'
import { takeRelic } from './moves/TakeRelic'
import Phase from './Phase'
import PlayerState from './PlayerState'
import PlayerView from './PlayerView'
import Side from './Side'
import { isGameState, VillagePillageOptions } from './VillagePillageOptions'

/**
 * Your Board Game rules must extend either "SequentialGame" or "SimultaneousGame".
 * When there is at least on situation during the game where multiple players can act at the same time, it is a "SimultaneousGame"
 * If the game contains information that players does not know (dices, hidden cards...), it must implement "IncompleteInformation".
 * If the game contains information that some players know, but the other players does not, it must implement "SecretInformation" instead.
 * Later on, you can also implement "Competitive", "Undo", "TimeLimit" and "Eliminations" to add further features to the game.
 */
export default class VillagePillage extends SimultaneousGame<GameState, Move>
  implements SecretInformation<GameState, GameView, Move, MoveView> {
  /**
   * This constructor is called when the game "restarts" from a previously saved state.
   * @param state The state of the game
   */
  constructor(state: GameState)
  /**
   * This constructor is called when a new game is created. If your game has options, or a variable number of players, it will be provided here.
   * @param options The options of the new game
   */
  constructor(options: VillagePillageOptions)
  /**
   * In here you must code the construction of your class. Use a "typeguard" to distinguish a new game from a restored game.
   * @param arg The state of the game, or the options when starting a new game
   */
  constructor(arg: GameState | VillagePillageOptions) {
    if (!isGameState(arg)) {
      const deck = shuffle(marketCards)
      super({
        players: [...Array(arg.players)].map((_,index) => ({
          id: index + 1,
          hand: startingCards,
          stock: 1,
          bank: 1,
          relics: 0,
          pendingActions: []
        })),
        phase: Phase.PLAN,
        nextMoves: [],
        deck,
        market: deck.splice(0, 4)
      })
    } else {
      super(arg)
    }
  }

  /**
   * @return True when game is over
   */
  isOver(): boolean {
    return this.state.players.some(p => p.relics === 3)
  }

  isTurnToPlay(playerId: number): boolean {
    const player = this.getPlayer(playerId)
    switch (this.state.phase) {
      case Phase.PLAN: 
        return player.leftCard == undefined || player.rightCard == undefined
      case Phase.RESOLVE:
        return player.pendingActions.some(action => !action.wait)
      case Phase.REFRESH:
        return false
    }
  }

  getPlayer(playerId: number): PlayerState {
    return getPlayerState(this.state, playerId)
  }

  /**
   * Return the exhaustive list of moves that can be played by the active player.
   * This is used for 2 features:
   * - security (preventing unauthorized moves from being played);
   * - "Dummy players": when a player leaves a game, it is replaced by a "Dummy" that plays random moves, allowing the other players to finish the game.
   * In a SimultaneousGame, as multiple players can be active you will be passed a playedId as an argument.
   * If the game allows a very large (or infinite) number of moves, instead of implementing this method, you can implement instead:
   * - isLegal(move: Move):boolean, for security; and
   * - A class that implements "Dummy" to provide a custom Dummy player.
   */
  getLegalMoves(playerId: number): Move[] {
    const moves: Move[] = []
    const player = this.getPlayer(playerId)
    switch (this.state.phase) {
      case Phase.PLAN: 
        if (player.leftCard === undefined) {
          player.hand.forEach(card => moves.push(playCardMove(playerId, card, Side.LEFT)))
        }
        if (player.rightCard === undefined) {
         player.hand.forEach(card => moves.push(playCardMove(playerId, card, Side.RIGHT)))
        }
        break
      case Phase.RESOLVE:
        if (canChooseCard(this.state,playerId)) {   // Phase.Resolve
          moves.push(chooseCardMove(playerId, player.leftCard!))
          moves.push(chooseCardMove(playerId, player.rightCard!))
        }
        else if (canTakeMarketCard(this.state, playerId)) {
          for (const marketCard of marketCards) {
            moves.push(takeMarketCardMove(playerId, marketCard))
          }
     
        }


        break
    }
    return moves
  }

  /**
   * This is the one and only play where you will update the game's state, depending on the move that has been played.
   *
   * @param move The move that should be applied to current state.
   */
  play(move: Move): void {
    if (this.state.nextMoves.length && this.state.nextMoves[0].type === move.type) {
      this.state.nextMoves.shift()
    }
    switch (move.type) {
      case MoveType.PlayCard:
        playCard(this.state, move)
        break
      case MoveType.RevealCards:
        revealCards(this.state)
        break

      case MoveType.GainTurnips:
        gainTurnips(this.state, move)
        break
      case MoveType.ChangeResolveStep:
        changeResolveStep(this.state)
        break
      case MoveType.StealTurnips:
        stealTurnips(this.state, move)
        break
      case MoveType.BankTurnips:
        bankTurnips(this.state, move)
        break
      case MoveType.SpendStockTurnips:
        spendStockTurnips(this.state, move)
        break
      case MoveType.SpendBankTurnips:
        spendBankTurnips(this.state, move)
        break
      case MoveType.ChooseCard:
        chooseCard(this.state, move)
        break
      case MoveType.TakeRelic:
        takeRelic(this.state, move)
        break
      case MoveType.AddPendingAction:
        addPendingAction(this.state, move)
        break
      case MoveType.GivePriorityToBuyCard:
        givePriorityToBuyCard(this.state, move)
        break
      case MoveType.TakeMarketCard:
        takeMarketCard(this.state, move)
        break
    }
  }

  /**
   * Here you can return the moves that should be automatically played when the game is in a specific state.
   * Here is an example from monopoly: you roll a dice, then move you pawn accordingly.
   * A first solution would be to do both state updates at once, in a "complex move" (RollDiceAndMovePawn).
   * However, this first solution won't allow you to animate step by step what happened: the roll, then the pawn movement.
   * "getAutomaticMove" is the solution to trigger multiple moves in a single action, and still allow for step by step animations.
   * => in that case, "RollDice" could set "pawnMovement = x" somewhere in the game state. Then getAutomaticMove will return "MovePawn" when
   * "pawnMovement" is defined in the state.
   * Of course, you must return nothing once all the consequences triggered by a decision are completed.
   * VERY IMPORTANT: you should never change the game state in here. Indeed, getAutomaticMove will never be called in replays, for example.
   *
   * @return The next automatic consequence that should be played in current game state.
   */
  getAutomaticMoves(): Move[] {
    if (this.state.nextMoves.length) {
      return this.state.nextMoves
    }
    if (this.state.phase === Phase.PLAN && this.state.players.every(player => player.leftCard && player.rightCard)) {
      return [revealCardsMove]
    }
    if (this.state.phase === Phase.RESOLVE) {
      for (const player of this.state.players) {
        const chooseCardAction = player.pendingActions.find(action => !action.wait && action.type === MoveType.ChooseCard && action.card)
        if (chooseCardAction) {
          return [chooseCardMove(player.id, chooseCardAction.card!)]
        }
      }
      const nextStep = getNextResolveStep(this.state.resolveStep)
      const moves = nextStep ? getCardsResolveAutomaticMoves(this.state, nextStep) : []
      if (!this.state.players.some(player => player.pendingActions.length > 0 )) {
        moves.push(changeResolveStepMove)
      } else if (this.state.players.every(player => player.pendingActions.every(action => action.type === MoveType.TakeMarketCard && action.wait))) {
        const buyingCardPlayers = this.state.players.filter(player => player.pendingActions.some(action => action.type === MoveType.TakeMarketCard))
        const lessTurnipsPlayers = buyingCardPlayers.reduce<PlayerState[]>((players, player) => {
          if (players.length === 0 || player.stock + player.bank < players[0].stock + players[0].bank) return [player]
          if (player.stock + player.bank === players[0].stock + players[0].bank) {
            players.push(player)
          }
          return players
        },[])
        const player = lessTurnipsPlayers.length === 1 ? lessTurnipsPlayers[0] : lessTurnipsPlayers[Math.floor(Math.random()*lessTurnipsPlayers.length)]
        if (lessTurnipsPlayers.length > 1) {
          moves.push(flipChickenMove(player.id))
        }
        moves.push(givePriorityToBuyCardMove(player.id))
      }
      return moves
    }
    return []
  }

  /**
   * If you game has incomplete information, you must hide some of the game's state to the players and spectators.
   * @return What a person can see from the game state
   */
  getView(): GameView {
    return {
      ...this.state, deck: this.state.deck.length,
      players: this.state.players.map(player => this.getOtherPlayerView(player))
    }
  }

  /**
   * If you game has "SecretInformation", you must also implement "getPlayerView", returning the information visible by a specific player.
   * @param playerId Identifier of the player
   * @return what the player can see
   */
  getPlayerView(playerId: number): GameView {
    
    // Here we could, for example, return a "playerView" with only the number of cards in hand for the other player only.
    return {
      ...this.state, deck: this.state.deck.length,
      players: this.state.players.map(player => player.id === playerId ? player : this.getOtherPlayerView(player))
    }
  }

  getOtherPlayerView(player: PlayerState): PlayerView {
    const {leftCard, rightCard, hand, ...visibleInfo} = player
    const playerView: PlayerView = {...visibleInfo, hand: player.hand.length, leftCardPlayed: !!leftCard, rightCardPlayed: !!rightCard}
    if (this.state.phase !== Phase.PLAN) {
      playerView.leftCard = leftCard
      playerView.rightCard = rightCard
    }
    return playerView
  }

  /**
   * If you game has incomplete information, sometime you need to alter a Move before it is sent to the players and spectator.
   * For example, if a card is revealed, the id of the revealed card should be ADDED to the Move in the MoveView
   * Sometime, you will hide information: for example if a player secretly choose a card, you will hide the card to the other players or spectators.
   *
   * @param move The move that has been played
   * @return What a person should know about the move that was played
   */
  getMoveView(move: Move, playerId? : number): MoveView {
    if (move.type === MoveType.PlayCard && move.playerId !== playerId) {
      const {card, ...moveView} = move;
      return moveView
    }
    else if (move.type === MoveType.RevealCards) {
      return {...move, players: this.state.players.map(p => ({leftCard: p.leftCard!, rightCard: p.rightCard!}))}
    }
    return move
  }

  /**
   * If you game has secret information, sometime you need to alter a Move depending on which player it is.
   * For example, if a card is drawn, the id of the revealed card should be ADDED to the Move in the MoveView, but only for the played that draws!
   * Sometime, you will hide information: for example if a player secretly choose a card, you will hide the card to the other players or spectators.
   *
   * @param move The move that has been played
   * @param playerId Identifier of the player seeing the move
   * @return What a person should know about the move that was played
   */
  getPlayerMoveView(move: Move , playerId : number): MoveView {
    return this.getMoveView(move, playerId)
  }
}