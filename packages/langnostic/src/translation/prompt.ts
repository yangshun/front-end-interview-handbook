export const promptVariables = {
  instructions: '[[INSTRUCTIONS]]',
  translationPayload: '[[TRANSLATION_PAYLOAD]]',
};

export const promptTemplate = `You are a professional translator. Maintain the original meaning, tone, and formatting.

- You are given a JSON object containing a list of strings and the target locales within <json> tags
- Translate the source strings within the JSON object from the source locale to the target locales
- Additional instructions are provided within <instructions> tags

<instructions>
${promptVariables.instructions}
</instructions>

<json>
${promptVariables.translationPayload}
</json>
`;
