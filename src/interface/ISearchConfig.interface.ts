interface IsearchConfig {
    bookName?: string;
    bookNumber?: string;
    bookHref?: string;
}

interface IspiderAction {
    type: string;
    playload:  IsearchConfig;
}

export {
    IsearchConfig,
    IspiderAction,
};