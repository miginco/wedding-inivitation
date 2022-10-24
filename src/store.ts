import {InjectionKey, reactive} from 'vue'
import {galleryItem} from '@/typing/thunbType'


export interface StateDataInterface {
    currentGalleryImage: galleryItem|null

}

export const storeKey: InjectionKey<StateDataInterface> = Symbol(
    'storeDataKey'
)

export const storeData = () => {
    return reactive({
        currentGalleryImage: null
    })
}
