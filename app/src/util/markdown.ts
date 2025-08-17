export function replaceEmailWithMarkdown(
text: string,
): string {
    return text.replace(
        /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
        (email) => `[${email}](mailto:${email})`
    );
}

export function replaceRawLinkWithMarkdown(
    text: string,
): string {
    return `[${text}](${text})`;
}