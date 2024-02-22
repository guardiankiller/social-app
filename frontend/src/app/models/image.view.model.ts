
import { Image } from './image.model'
import { UserBasicInfo } from './user.basic.model'

export interface ImageView {
    imageURL: string
    imageinfo: Image
    prev?: string
    next?: string
    error?: string
    userInfo: UserBasicInfo
}