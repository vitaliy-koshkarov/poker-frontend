import gameCss from "../../assets/css/game/PlayersTable.module.css";
import type {PlayerTableProps} from "./PlayerTableProps.ts";

export function PlayersTable({players}: PlayerTableProps) {
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
