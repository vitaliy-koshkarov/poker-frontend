import gameCss from "./GameTable.module.css";
import type {GameTableProps} from "./GameTableProps.ts";

export function GameTable({game}: GameTableProps) {
    return (
        <div>
            <div className={gameCss.gameTitle}>Game {game?.name}</div>
            <table className={gameCss.gameTable}>
                <thead>
                <tr>
                    <td className={gameCss.td}>Game ID</td>
                    <td className={gameCss.td}>Name</td>
                    <td className={gameCss.td}>Current players</td>
                    <td className={gameCss.td}>Max players</td>
                    <td className={gameCss.td}>Buy-in</td>
                    <td className={gameCss.td}>Status</td>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td className={gameCss.td}>{game?.id}</td>
                    <td className={gameCss.td}>{game?.name}</td>
                    <td className={gameCss.td}>{game?.currentPlayers}</td>
                    <td className={gameCss.td}>{game?.maxPlayers}</td>
                    <td className={gameCss.td}>{game?.buyIn}</td>
                    <td className={gameCss.td}>{game?.status}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}