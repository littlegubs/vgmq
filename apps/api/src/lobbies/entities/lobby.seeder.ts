import { Seeder } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { Lobby, LobbyDifficulties, LobbyHintMode } from './lobby.entity'

export default class LobbySeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(Lobby)
        await repository.insert([
            {
                code: 'EASY',
                name: 'EASY',
                difficulty: [LobbyDifficulties.Easy],
                custom: false,
                status: 'waiting',
                guessTime: 20,
                musicNumber: -1,
                allowDuplicates: true,
                gameMode: 'standard',
                playMusicOnAnswerReveal: true,
                hintMode: LobbyHintMode.Allowed,
                showCorrectAnswersDuringGuessTime: true,
                filterMinYear: 0,
                filterMaxYear: 0,
            },
            {
                code: 'MEDIUM',
                name: 'MEDIUM',
                difficulty: [LobbyDifficulties.Medium],
                custom: false,
                status: 'waiting',
                guessTime: 20,
                musicNumber: -1,
                allowDuplicates: true,
                gameMode: 'standard',
                playMusicOnAnswerReveal: true,
                hintMode: LobbyHintMode.Allowed,
                showCorrectAnswersDuringGuessTime: true,
                filterMinYear: 0,
                filterMaxYear: 0,
            },
            {
                code: 'HARD',
                name: 'HARD',
                difficulty: [LobbyDifficulties.Hard],
                custom: false,
                status: 'waiting',
                guessTime: 20,
                musicNumber: -1,
                allowDuplicates: true,
                gameMode: 'standard',
                playMusicOnAnswerReveal: true,
                hintMode: LobbyHintMode.Allowed,
                showCorrectAnswersDuringGuessTime: true,
                filterMinYear: 0,
                filterMaxYear: 0,
            },
            {
                code: 'ALL',
                name: 'ALL DIFFICULTIES',
                difficulty: [
                    LobbyDifficulties.Easy,
                    LobbyDifficulties.Medium,
                    LobbyDifficulties.Hard,
                ],
                custom: false,
                status: 'waiting',
                guessTime: 20,
                musicNumber: -1,
                allowDuplicates: true,
                gameMode: 'standard',
                playMusicOnAnswerReveal: true,
                hintMode: LobbyHintMode.Allowed,
                showCorrectAnswersDuringGuessTime: true,
                filterMinYear: 0,
                filterMaxYear: 0,
            },
        ])
    }
}
