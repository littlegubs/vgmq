import { Injectable, Inject } from '@nestjs/common'
import { RedisClientType } from 'redis'
import { Lobby } from '../entities/lobby.entity'

@Injectable()
export class LobbyStatService {
    constructor(@Inject('RedisClient') private readonly redisClient: RedisClientType) {}

    async getValue(key: string): Promise<string | null> {
        return this.redisClient.get(key)
    }

    async setValue(key: string, value: string): Promise<void> {
        await this.redisClient.set(key, value)
    }

    async rpush(key: string, value: number) {
        await this.redisClient.rPush(key, value.toString())
    }

    async increment(key: string, field: string, value: number = 1) {
        await this.redisClient.hIncrBy(key, field, value)
    }

    async hget(key: string, field: string): Promise<string | undefined> {
        return this.redisClient.hGet(key, field)
    }

    async lRange(key: string) {
        return this.redisClient.lRange(key, 0, -1)
    }

    async deleteLobbyStatsKeys(lobbyCode: string) {
        const pattern = `lobby${lobbyCode}:stats:*`
        const cursor = 0

        do {
            const result = await this.redisClient.scan(cursor, {
                MATCH: pattern,
                COUNT: 100,
            })

            if (result.keys.length > 0) {
                await this.redisClient.del(result.keys)
            }
        } while (cursor !== 0)
    }

    async retrieveResultData(lobby: Lobby) {
        const average = (array: number[]) => array.reduce((a, b) => a + b) / array.length

        let bestCorrectAnswer
        let worstCorrectAnswer
        let bestWrongAnswer
        let worstWrongAnswer
        let bestTries
        let worstTries
        let bestFirstTries
        let worstFirstTries
        let bestHint
        let worstHint
        let bestShortestTime
        let worstShortestTime
        let bestLongestTime
        let worstLongestTime
        let bestAverageTime
        let worstAverageTime

        for (const lobbyUser of lobby.lobbyUsers) {
            const correct = await this.hget(
                `lobby${lobby.code}:stats:user:${lobbyUser.id}`,
                'correct',
            )
            const wrong = await this.hget(`lobby${lobby.code}:stats:user:${lobbyUser.id}`, 'wrong')
            const redisTries = await this.hget(
                `lobby${lobby.code}:stats:user:${lobbyUser.id}`,
                'tries',
            )
            const redisFirstTries = await this.hget(
                `lobby${lobby.code}:stats:user:${lobbyUser.id}`,
                'firstTry',
            )
            const redisHint = await this.hget(
                `lobby${lobby.code}:stats:user:${lobbyUser.id}`,
                'hint',
            )
            const redisTimes = await this.lRange(
                `lobby${lobby.code}:stats:user:${lobbyUser.id}:time`,
            )
            const times = redisTimes.map((time) => Number(time))

            const correctAnswers = correct ? Number(correct) : 0
            if (bestCorrectAnswer === undefined || bestCorrectAnswer < correctAnswers) {
                bestCorrectAnswer = correctAnswers
            }
            if (worstCorrectAnswer === undefined || worstCorrectAnswer > correctAnswers) {
                worstCorrectAnswer = correctAnswers
            }

            const wrongAnswers = wrong ? Number(wrong) : 0
            if (bestWrongAnswer === undefined || bestWrongAnswer > wrongAnswers) {
                bestWrongAnswer = wrongAnswers
            }
            if (worstWrongAnswer === undefined || worstWrongAnswer < wrongAnswers) {
                worstWrongAnswer = wrongAnswers
            }

            const tries = redisTries ? Number(redisTries) : 0
            if (bestTries === undefined || bestTries > tries) {
                bestTries = tries
            }
            if (worstTries === undefined || worstTries < tries) {
                worstTries = tries
            }

            const firstTries = redisFirstTries ? Number(redisFirstTries) : 0
            if (bestFirstTries === undefined || bestFirstTries < firstTries) {
                bestFirstTries = firstTries
            }
            if (worstFirstTries === undefined || worstFirstTries > firstTries) {
                worstFirstTries = firstTries
            }
            const hint = redisHint ? Number(redisHint) : 0
            if (bestHint === undefined || bestHint > hint) {
                bestHint = hint
            }
            if (worstHint === undefined || worstHint < hint) {
                worstHint = hint
            }

            const longestTime = times.length > 0 ? Math.max(...times) : undefined
            if (longestTime !== undefined) {
                if (bestLongestTime === undefined || bestLongestTime > longestTime) {
                    bestLongestTime = longestTime
                }
                if (worstLongestTime === undefined || worstLongestTime < longestTime) {
                    worstLongestTime = longestTime
                }
            }
            const shortestTime = times.length > 0 ? Math.min(...times) : undefined
            if (shortestTime !== undefined) {
                if (bestShortestTime === undefined || bestShortestTime > shortestTime) {
                    bestShortestTime = shortestTime
                }
                if (worstShortestTime === undefined || worstShortestTime < shortestTime) {
                    worstShortestTime = shortestTime
                }
            }
            const averageTime = times.length > 0 ? average(times) : undefined
            if (averageTime !== undefined) {
                if (bestAverageTime === undefined || bestAverageTime > averageTime) {
                    bestAverageTime = averageTime
                }
                if (worstAverageTime === undefined || worstAverageTime < averageTime) {
                    worstAverageTime = averageTime
                }
            }
            lobbyUser.stats = {
                correctAnswers: { value: correctAnswers },
                wrongAnswers: { value: wrongAnswers },
                tries: { value: tries },
                firstTries: { value: firstTries },
                hint: { value: hint },
                longestTime: { value: longestTime },
                shortestTime: { value: shortestTime },
                averageTime: { value: averageTime },
            }
        }
        for (const lobbyUser of lobby.lobbyUsers) {
            if (lobbyUser.stats.correctAnswers.value === bestCorrectAnswer) {
                lobbyUser.stats.correctAnswers.color = 'best'
            }
            if (lobbyUser.stats.correctAnswers.value === worstCorrectAnswer) {
                lobbyUser.stats.correctAnswers.color = 'worst'
            }
            if (
                lobbyUser.stats.correctAnswers.value === bestCorrectAnswer &&
                lobbyUser.stats.correctAnswers.value === worstCorrectAnswer
            ) {
                lobbyUser.stats.correctAnswers.color = undefined
            }

            if (lobbyUser.stats.wrongAnswers.value === bestWrongAnswer) {
                lobbyUser.stats.wrongAnswers.color = 'best'
            }
            if (lobbyUser.stats.wrongAnswers.value === worstWrongAnswer) {
                lobbyUser.stats.wrongAnswers.color = 'worst'
            }
            if (
                lobbyUser.stats.wrongAnswers.value === bestWrongAnswer &&
                lobbyUser.stats.wrongAnswers.value === worstWrongAnswer
            ) {
                lobbyUser.stats.wrongAnswers.color = undefined
            }

            if (lobbyUser.stats.tries.value === bestTries) {
                lobbyUser.stats.tries.color = 'best'
            }
            if (lobbyUser.stats.tries.value === worstTries) {
                lobbyUser.stats.tries.color = 'worst'
            }
            if (
                lobbyUser.stats.tries.value === bestTries &&
                lobbyUser.stats.tries.value === worstTries
            ) {
                lobbyUser.stats.tries.color = undefined
            }

            if (lobbyUser.stats.firstTries.value === bestFirstTries) {
                lobbyUser.stats.firstTries.color = 'best'
            }
            if (lobbyUser.stats.firstTries.value === worstFirstTries) {
                lobbyUser.stats.firstTries.color = 'worst'
            }
            if (
                lobbyUser.stats.firstTries.value === bestFirstTries &&
                lobbyUser.stats.firstTries.value === worstFirstTries
            ) {
                lobbyUser.stats.firstTries.color = undefined
            }

            if (lobbyUser.stats.hint.value === bestHint) {
                lobbyUser.stats.hint.color = 'best'
            }
            if (lobbyUser.stats.hint.value === worstHint) {
                lobbyUser.stats.hint.color = 'worst'
            }
            if (
                lobbyUser.stats.hint.value === bestHint &&
                lobbyUser.stats.hint.value === worstHint
            ) {
                lobbyUser.stats.hint.color = undefined
            }

            if (lobbyUser.stats.longestTime.value === bestLongestTime) {
                lobbyUser.stats.longestTime.color = 'best'
            }
            if (lobbyUser.stats.longestTime.value === worstLongestTime) {
                lobbyUser.stats.longestTime.color = 'worst'
            }
            if (
                lobbyUser.stats.longestTime.value === bestLongestTime &&
                lobbyUser.stats.longestTime.value === worstLongestTime
            ) {
                lobbyUser.stats.longestTime.color = undefined
            }

            if (lobbyUser.stats.shortestTime.value === bestShortestTime) {
                lobbyUser.stats.shortestTime.color = 'best'
            }
            if (lobbyUser.stats.shortestTime.value === worstShortestTime) {
                lobbyUser.stats.shortestTime.color = 'worst'
            }
            if (
                lobbyUser.stats.shortestTime.value === bestShortestTime &&
                lobbyUser.stats.shortestTime.value === worstShortestTime
            ) {
                lobbyUser.stats.shortestTime.color = undefined
            }

            if (lobbyUser.stats.averageTime.value === bestAverageTime) {
                lobbyUser.stats.averageTime.color = 'best'
            }
            if (lobbyUser.stats.averageTime.value === worstAverageTime) {
                lobbyUser.stats.averageTime.color = 'worst'
            }
            if (
                lobbyUser.stats.averageTime.value === bestAverageTime &&
                lobbyUser.stats.averageTime.value === worstAverageTime
            ) {
                lobbyUser.stats.averageTime.color = undefined
            }
        }
    }
}
