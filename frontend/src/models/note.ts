export interface Note {
    _id: string,
    title: string,
    text?: string,
    pinned: boolean,
    createdAt: string,
    updatedAt: string,
}