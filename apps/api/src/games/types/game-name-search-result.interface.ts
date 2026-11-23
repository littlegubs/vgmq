import GameNameSearchBody from './game-name-search-body.interface'

export default interface GameNameSearchResult {
    hits: {
        total: number
        hits: Array<{
            _source: GameNameSearchBody
            highlight: {
                suggest_highlight: string[]
            }
        }>
    }
}
