import * as core from '@actions/core';

export function validateInputs(
  questionIds: string[],
  standupId: string,
  memberIds: string[],
  geekbotApiKey: string,
  slackBotToken: string,
  slackChannelName: string
): boolean {
  if (questionIds.length === 0) {
    core.setFailed('question_ids cannot be empty');
    return false;
  }

  if (!standupId) {
    core.setFailed('standup_id cannot be empty');
    return false;
  }

  if (memberIds.length === 0) {
    core.setFailed('member_ids cannot be empty');
    return false;
  }

  if (!geekbotApiKey) {
    core.setFailed('geekbot_api_key cannot be empty');
    return false;
  }

  if (!slackBotToken) {
    core.setFailed('slack_bot_token cannot be empty');
    return false;
  }

  if (!slackChannelName) {
    core.setFailed('slack_channel_name cannot be empty');
    return false;
  }

  return true;
}

