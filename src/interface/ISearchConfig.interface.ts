interface IsearchConfig {
    bookName?: string;
    bookNumber?: string;
    bookHref?: string;
    bookList?: Array<any>;
}

interface IspiderAction {
    type: string;
    playload:  IsearchConfig;
}

export {
    IsearchConfig,
    IspiderAction,
};