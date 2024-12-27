function checkDisallowedForBot(robotsTxt: string, botName: string): boolean {
    const botRegex = new RegExp(`User-agent:.*${botName}`, 'i');
    const disallowRegex = /Disallow:.*\S+/g;

    const botUserAgentMatch = robotsTxt.match(botRegex);
    if (botUserAgentMatch) {
        const botSectionStart = robotsTxt.indexOf(botUserAgentMatch[0]);
        const botSection = robotsTxt.slice(botSectionStart);

        const disallowMatches = botSection.match(disallowRegex);
        if (disallowMatches && disallowMatches.length > 0) {
            return true; // The bot is disallowed
        }
    }
    return false; // The bot is not disallowed
}

 export async function isCrawlable(url: string, _options: object): Promise<boolean> {
    try {
        const response = await fetch(`${url}/robots.txt`, _options);
        if (!response.ok) return true; // If robots.txt is not found, crawl

        const robotsTxt = await response.text();
        const googlebotDisallowed = checkDisallowedForBot(robotsTxt, 'Googlebot');
        const allBotsDisallowed = checkDisallowedForBot(robotsTxt, '*');

        // If either Googlebot or all bots are disallowed, return false
        return !(googlebotDisallowed || allBotsDisallowed);
    } catch (error) {
        return true; // Default to crawlable in case of error
    }
}