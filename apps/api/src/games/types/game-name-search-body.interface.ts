export default interface GameNameSearchBody {
    id: number
    name: string
    type: 'game_name' | 'alternative_name' | 'collection_name'
}
