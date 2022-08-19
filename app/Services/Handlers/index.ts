import type WebsocketServer from '../Ws'
import BattleHandler from './Battle'
import BioHandler from './Bio'
import ChatsHandler from './Chats'
import DefaultHandler from './DefaultHandler'
import EmotesHandler from './Emotes'
import GiveEmotesHandler from './GiveEmotes'
import JoinChatHandler from './JoinChat'
import LeaveChatHandler from './LeaveChat'
import MatchHandler from './Match'
import MismatchHandler from './Mismatch'
import PingHandler from './Ping'
import ProfileHandler from './Profile'
import ProfilesHandler from './Profiles'
import RegisterHandler from './Register'
import RollMatchHandler from './RollMatch'
import UnmatchHandler from './Unmatch'
import WelcomeHandler from './Welcome'

export default function (ws: typeof WebsocketServer): DefaultHandler[] {
  return [
    new BattleHandler(ws),
    new BioHandler(ws),
    new ChatsHandler(ws),
    new EmotesHandler(ws),
    new GiveEmotesHandler(ws),
    new JoinChatHandler(ws),
    new LeaveChatHandler(ws),
    new MatchHandler(ws),
    new MismatchHandler(ws),
    new PingHandler(ws),
    new ProfileHandler(ws),
    new RegisterHandler(ws),
    new RollMatchHandler(ws),
    new UnmatchHandler(ws),
    new WelcomeHandler(ws),
    new ProfilesHandler(ws)
  ]
}
