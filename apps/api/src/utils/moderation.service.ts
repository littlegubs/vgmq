import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ModerationService {
    constructor(private configService: ConfigService) {}

    private readonly logger = new Logger(ModerationService.name)
    private readonly apiKey = this.configService.get('OPEN_AI_MODERATION_API_KEY')
    private readonly apiUrl = 'https://api.openai.com/v1/moderations'

    async isToxic(text: string): Promise<boolean> {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify({ input: text }),
            })

            if (!response.ok) {
                throw new Error(`OpenAI responded with status: ${response.status}`)
            }

            const data = await response.json()

            return data.results[0]?.flagged || false
        } catch (error) {
            this.logger.error('Failed to reach OpenAI Moderation API', error)
            return false
        }
    }
}
