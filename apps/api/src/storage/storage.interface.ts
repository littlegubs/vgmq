export abstract class StorageService {
    abstract putObject(filePath: string, file: Buffer): Promise<void>
    abstract getObject(filePath: string): Promise<Buffer>
    abstract deleteObject(filePath: string): Promise<void>
    abstract getPublicUrl(filePath: string): Promise<string>
}
