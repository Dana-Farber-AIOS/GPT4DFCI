export const numLineBreaks = (text: string) => {
    const pattern = /\n|\r\n|\r/g;
    const matches = text.match(pattern) || [];

    return matches.length;
};

export const numRows = (text: string, maxRows: number) => {
    return Math.min(Math.max(numLineBreaks(text) + 1, 1), maxRows);
};
