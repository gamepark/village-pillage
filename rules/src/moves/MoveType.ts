/**
 * Enumeration of all the types of Move in you game.
 * Even though it is not strictly required to use a type like that, it helps a lot in practice!
 */
enum MoveType {
  PlayCard, RevealCards, GainTurnips, ChangeResolveStep, BankTurnips,
  StealTurnips, FlipChicken, SpendStockTurnips, SpendBankTurnips, TakeRelic, ChooseCard,
  TakeMarketCard, AddPendingAction, GivePriorityToBuyCard
}

export default MoveType