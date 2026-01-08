import { Brand } from "./brand.model"
import { Channel } from "./channel.model"
import { Model } from "./model.model"
import { Part } from "./part.model"
import { System } from "./system.model"

export interface Tip {
    id: string
    title: string
    summary: string
    channel: Channel
    publishedAt: Date

    brand: Brand
    model: Model

    system: System
    part: Part
    
    onlyWithProduct: boolean
    videoUrl: string
}