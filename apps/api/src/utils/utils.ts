export function shuffle<T>(array: T[]): Array<T> {
    const newArr = [...array]
    let m = newArr.length
    let t: T
    let i = 0

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--)

        // And swap it with the current element.
        t = newArr[m]!
        newArr[m] = newArr[i]!
        newArr[i] = t
    }

    return newArr
}
