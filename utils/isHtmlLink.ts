// Check if the URL has a valid HTML extension
export function isHtmlLink(url: string): boolean {
    const invalidExtensions = ['.jpg', '.png', '.gif', '.css', '.js', '.pdf', '.docx', '.mp4', '.zip'];
    const validExtensions = ['.html', '.htm', '.php', '.asp', '.jsp', '/'];
    return validExtensions.some(ext => url.endsWith(ext)) && !invalidExtensions.some(ext => url.endsWith(ext));
}