import bank from './bank.jpg'
import bankDuelFr from './bank-duel-fr.jpg'
import bankDuel from './bank-duel.jpg'
import bankFr from './bank-fr.jpg'
import bard from './bard.jpg'
import bardFr from './bard-fr.jpg'
import berserker from './berserker.jpg'
import berserkerFr from './berserker-fr.jpg'
import burglar from './burglar.jpg'
import burglarFr from './burglar-fr.jpg'
import cardBack from './card-back.jpg'
import cathedral from './cathedral.jpg'
import cathedralFr from './cathedral-fr.jpg'
import cutpurse from './cutpurse.jpg'
import cutpurseFr from './cutpurse-fr.jpg'
import doctor from './doctor.jpg'
import doctorFr from './doctor-fr.jpg'
import dungeon from './dungeon.jpg'
import dungeonFr from './dungeon-fr.jpg'
import farmer from './farmer.jpg'
import farmerFr from './farmer-fr.jpg'
import florist from './florist.jpg'
import floristFr from './florist-fr.jpg'
import innkeeper from './innkeeper.jpg'
import innkeeperFr from './innkeeper-fr.jpg'
import labyrinth from './labyrinth.jpg'
import labyrinthFr from './labyrinth-fr.jpg'
import mason from './mason.jpg'
import masonFr from './mason-fr.jpg'
import merchant from './merchant.jpg'
import merchantFr from './merchant-fr.jpg'
import miner from './miner.jpg'
import minerFr from './miner-fr.jpg'
import moat from './moat.jpg'
import moatFr from './moat-fr.jpg'
import monastery from './monastery.jpg'
import monasteryFr from './monastery-fr.jpg'
import outlaw from './outlaw.jpg'
import outlawFr from './outlaw-fr.jpg'
import pickler from './pickler.jpg'
import picklerFr from './pickler-fr.jpg'
import raider from './raider.jpg'
import raiderFr from './raider-fr.jpg'
import ratCatcher from './rat-catcher.jpg'
import ratCatcherFr from './rat-catcher-fr.jpg'
import shepherd from './shepherd.jpg'
import shepherdFr from './shepherd-fr.jpg'
import smuggler from './smuggler.jpg'
import smugglerFr from './smuggler-fr.jpg'
import tollBridge from './toll-bridge.jpg'
import tollBridgeFr from './toll-bridge-fr.jpg'
import trapper from './trapper.jpg'
import trapperFr from './trapper-fr.jpg'
import treasury from './treasury.jpg'
import treasuryFr from './treasury-fr.jpg'
import turncoat from './turncoat.jpg'
import turncoatFr from './turncoat-fr.jpg'
import veteran from './veteran.jpg'
import veteranFr from './veteran-fr.jpg'
import wall from './wall.jpg'
import wallFr from './wall-fr.jpg'

const Images = {
  cardBack, bank, bankDuel, bard, berserker, burglar, cathedral, cutpurse, doctor, dungeon, farmer, florist, innkeeper, labyrinth, mason, merchant, miner,
  moat, monastery, outlaw, pickler, raider, ratCatcher, shepherd, smuggler, tollBridge, trapper, treasury, turncoat, veteran, wall
}

const query = new URLSearchParams(window.location.search)
const locale = query.get('locale')

if (locale?.toLowerCase() === 'fr') {
  Images.bank = bankFr
  Images.bankDuel = bankDuelFr
  Images.bard = bardFr
  Images.berserker = berserkerFr
  Images.burglar = burglarFr
  Images.cathedral = cathedralFr
  Images.cutpurse = cutpurseFr
  Images.doctor = doctorFr
  Images.dungeon = dungeonFr
  Images.farmer = farmerFr
  Images.florist = floristFr
  Images.innkeeper = innkeeperFr
  Images.labyrinth = labyrinthFr
  Images.mason = masonFr
  Images.merchant = merchantFr
  Images.miner = minerFr
  Images.moat = moatFr
  Images.monastery = monasteryFr
  Images.outlaw = outlawFr
  Images.pickler = picklerFr
  Images.raider = raiderFr
  Images.ratCatcher = ratCatcherFr
  Images.shepherd = shepherdFr
  Images.smuggler = smugglerFr
  Images.tollBridge = tollBridgeFr
  Images.trapper = trapperFr
  Images.treasury = treasuryFr
  Images.turncoat = turncoatFr
  Images.veteran = veteranFr
  Images.wall = wallFr
}

export default Images