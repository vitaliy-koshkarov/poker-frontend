import gameCss from "../../assets/css/game/PlayersTable.module.css";
import type {PlayerTableProps} from "./PlayerTableProps.ts";
import {PlayerActionBtn} from "./buttons/PlayerActionBtn.tsx";
import {playerActionPath} from "../../auth/paths.ts";

export function PlayersTable({stompClient, gameId, players}: PlayerTableProps) {
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
                {players?.map(player => (
                    <tr key={player.id}>
                        <td className={gameCss.td}>{player.id}</td>
                        <td className={gameCss.td}>{player.nickname}</td>
                        <td className={gameCss.td}>{player.status}</td>
                        <td className={gameCss.td}>{player.chips}</td>
                        <td className={gameCss.td}>{player.currentBet}</td>
                        <td className={gameCss.td}>
                            <PlayerActionBtn stompClient={stompClient} path={`${playerActionPath}/${gameId}`} name={'Fold'} playerId={player.id}/>
                            <PlayerActionBtn stompClient={stompClient} path={`${playerActionPath}/${gameId}`} name={'Check'} playerId={player.id}/>
                            <PlayerActionBtn stompClient={stompClient} path={`${playerActionPath}/${gameId}`} name={'Bet'} playerId={player.id}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
