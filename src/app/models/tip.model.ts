import { Brand } from "./brand.model"
import { Channel } from "./channel.model"
import { Model } from "./model.model"
import { Part } from "./part.model"
import { System } from "./system.model"
import { Video } from "./video.model"

export interface Tip {
    id: string
    title: string
    summary: string
    channel: Channel
    publishedAt: Date

    brands: Brand[]
    models: Model[]
    systems: System[]
    parts: Part[]
    
    onlyWithProduct: boolean
    video: Video
}