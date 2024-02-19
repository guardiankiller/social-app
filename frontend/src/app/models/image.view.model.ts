
import { Image } from './image.model'

export interface ImageView {
    imageURL: string
    imageinfo: Image
    prev?: string
    next?: string
    error?: string
}