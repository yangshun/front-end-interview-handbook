export async function sendGoogleChatMessage({
  additionalInfo,
  projectName,
  subreddits,
}: {
  additionalInfo: string;
  projectName: string;
  subreddits: Array<string>;
}) {
  const webhookUrl = process.env.GOOGLE_CHAT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn('No Google Chat webhook URL configured.');

    return;
  }

  const message = {
    text: `📢 *Reddit fetch completed*

*Project:* ${projectName}
*Additional info:* ${additionalInfo}

*Subreddits searched:* ${subreddits.join(', ')}
*Time:* ${new Date().toLocaleString()}`,
  };

  try {
    await fetch(webhookUrl, {
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  } catch (err) {
    console.error('Failed to send Google Chat message:', err);
  }
}
