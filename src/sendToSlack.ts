import fetch from 'node-fetch';
import * as core from '@actions/core';
import { SlackMessage } from './interfaces/slack';

export async function sendToSlack({
  slackBotToken,
  slackMessages,
  syncPeriod,
  slackChannelName,
}: {
  slackBotToken: string;
  slackMessages: SlackMessage[];
  syncPeriod: number;
  slackChannelName: string;
}): Promise<void> {
  try {
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${slackBotToken}`
      },
      body: JSON.stringify({
        channel: slackChannelName,
        attachments: [
          {
            mrkdwn_in: ['text'],
            text: `:robot_face: Hello! The completed tasks of the team members over the past ${syncPeriod} days are as follows`
          },
          ...slackMessages,
        ],
      })
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }
  } catch (err) {
    core.error(err as Error);
  }
}

