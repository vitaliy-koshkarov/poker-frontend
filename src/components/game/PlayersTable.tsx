import gameCss from "../../assets/css/game/PlayersTable.module.css";
import type {PlayerTableProps} from "./PlayerTableProps.ts";
import {PlayerActionBtn} from "./buttons/PlayerActionBtn.tsx";
import {playerActionPath} from "../../auth/paths.ts";

export function PlayersTable({stompClient, game, currentPlayerId}: PlayerTableProps) {
    return (
        <div>
            <div className={gameCss.playersTitle}>Players</div>
            <table className={gameCss.playersTable}>
                <thead className={gameCss.thead}>
                <tr>
                    <td className={gameCss.td}>Id</td>
                    <td className={gameCss.td}>Nickname</td>
                    <td className={gameCss.td}>Status</td>
                    <td className={gameCss.td}>Chips</td>
                    <td className={gameCss.td}>Current bet</td>
                    <td className={gameCss.td}>Action</td>
                </tr>
                </thead>

                <tbody>
                {game?.players?.map(player => (
                    <tr key={player.id}>
                        <td className={gameCss.td}>{player.id}</td>
                        <td className={gameCss.td}>{player.nickname}</td>
                        <td className={gameCss.td}>{player.status}</td>
                        <td className={gameCss.td}>{player.chips}</td>
                        <td className={gameCss.td}>{player.currentBet}</td>
                        <td className={gameCss.td}>
                            <PlayerActionBtn btnName={"Fold"}
                                             stompClient={stompClient}
                                             playerId={player.id}
                                             path={`${playerActionPath}/${game.id}/action`}
                                             disabled={ !(player.id == currentPlayerId && player.id == game.activePlayerId) }
                                             actionName={"FOLD"}/>
                            <PlayerActionBtn btnName={"Check"}
                                             stompClient={stompClient}
                                             playerId={player.id}
                                             path={`${playerActionPath}/${game.id}/action`}
                                             disabled={ !(player.id == currentPlayerId && player.id == game.activePlayerId) }
                                             actionName={"CHECK"}/>
                            <PlayerActionBtn btnName={"Bet"}
                                             stompClient={stompClient}
                                             playerId={player.id}
                                             path={`${playerActionPath}/${game.id}/action`}
                                             disabled={ !(player.id == currentPlayerId && player.id == game.activePlayerId) }
                                             actionName={"BET"}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
