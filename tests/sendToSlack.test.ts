import { sendToSlack } from '../src/sendToSlack';
import { SlackMessage } from '../src/interfaces/slack';
import fetch, { FetchMock } from 'jest-fetch-mock';

const mockedFetch = global.fetch as FetchMock;

describe('sendToSlack', () => {
  afterEach(() => {
    mockedFetch.resetMocks();
  });

  const slackMessages: SlackMessage[] = [
    {
      text: 'Message 1',
      mrkdwn_in: ['text'],
      color: '#000000',
      author_name: 'Author 1',
    },
    {
      text: 'Message 2',
      mrkdwn_in: ['text'],
      color: '#000000',
      author_name: 'Author 2',
    },
  ];

  const params = {
    slackBotToken: 'xxx',
    slackMessages: slackMessages,
    syncPeriod: 7,
    slackChannelName: 'general',
  };

  it('sends a request to Slack API with correct payload', async () => {
    mockedFetch.mockResponseOnce('', { status: 200 });

    await sendToSlack(params);

    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch.mock.calls[0]![0]).toEqual('https://slack.com/api/chat.postMessage');
    expect(mockedFetch.mock.calls[0]![1]).toMatchObject({
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${params.slackBotToken}`,
      },
      body: JSON.stringify({
        channel: params.slackChannelName,
        attachments: [
          {
            mrkdwn_in: ['text'],
            text: `:robot_face: Hello! The completed tasks of the team members over the past ${params.syncPeriod} days are as follows`,
          },
          ...params.slackMessages,
        ],
      }),
    });
  });

  it('handles Slack API errors', async () => {
    mockedFetch.mockResponseOnce('', { status: 500 });

    await sendToSlack(params);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
  });

  it('handles network errors', async () => {
    mockedFetch.mockRejectOnce(new Error('Network error'));

    await sendToSlack(params);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
  });
});

