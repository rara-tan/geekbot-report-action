import * as core from '@actions/core';
import { getReport } from './getReport';
import { validateInputs } from './validateInputs';
import { slackMessages } from './slackMessages';
import { sendToSlack } from './sendToSlack';

(async () => {
  // Get parameters from github actions
  const questionIds = core.getInput('question_ids').trim().split(',').filter(id => id);
  const standupId = core.getInput('standup_id');
  const memberIds = core.getInput('member_ids').trim().split(',').filter(id => id);
  const geekbotApiKey = core.getInput('geekbot_api_key');
  const slackBotToken = core.getInput('slack_bot_token');
  const slackChannelName = core.getInput('slack_channel_name');
  const syncPeriod = Number(core.getInput('sync_period'));

  const d: Date = new Date();
  const dateAfter: number = Math.floor((d.getTime() - syncPeriod * 24 * 60 * 60 * 1000) / 1000);

  try {
    validateInputs(questionIds, standupId, memberIds, geekbotApiKey, slackBotToken, slackChannelName);
    const results = await getReport({ memberIds, questionIds, standupId, dateAfter, geekbotApiKey });
    await sendToSlack({ slackBotToken, syncPeriod, slackChannelName, slackMessages: slackMessages(results) });
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
})();

