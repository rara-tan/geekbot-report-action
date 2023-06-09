import { slackMessages } from '../src/slackMessages';
import { GeekbotReport } from '../src/interfaces/geekbot';
import { SlackMessage } from '../src/interfaces/slack';

describe('slackMessages', () => {
  it('should generate correct Slack messages for given Geekbot reports', () => {
    const geekbotReports: GeekbotReport[] = [
      {
        userId: 'user1',
        result: {
          isSuccess: false,
          errorMessage: 'Error',
        },
      },
      {
        userId: 'user2',
        result: {
          isSuccess: true,
          contents: [],
        },
      },
      {
        userId: 'user3',
        result: {
          isSuccess: true,
          contents: [
            {
              id: 1,
              slack_ts: '-',
              standup_id: 10,
              timestamp: 100,
              channel: 'general',
              is_anonymous: false,
              is_confidential: false,
              member: {
                id: 'user3',
                username: 'user3',
                realname: 'User Three',
                profileImg: 'https://example.com/user3.jpg',
              },
              questions: [],
            },
          ],
        },
      },
      {
        userId: 'user4',
        result: {
          isSuccess: true,
          contents: [
            {
              id: 2,
              slack_ts: '-',
              standup_id: 20,
              timestamp: 200,
              channel: 'general',
              is_anonymous: false,
              is_confidential: false,
              member: {
                id: 'user4',
                username: 'user4',
                realname: 'User Four',
                profileImg: 'https://example.com/user4.jpg',
              },
              questions: [
                {
                  id: 1,
                  question: 'question sentence', 
                  question_id: 101,
                  color: 'yellow',
                  answer: 'answer sentence',
                  images: [],
                },
              ],
            },
          ],
        },
      },
    ];

    const messages: SlackMessage[] = slackMessages(geekbotReports);
    expect(messages).toHaveLength(2);

    const message1 = messages[0];

    if (message1) {
      expect(message1.text).toBe('Failed to get Contents. Due to Error');
    }

    const message2 = messages[1];

    if (message2) {
      expect(message2.text).toBeUndefined();
      expect(message2.author_name).toBe('User Four');

      if (message2.fields) {
        expect(message2.fields).toHaveLength(1);
        expect(message2.fields[0]!.title).toMatch(/【\d{4}\/\d{1,2}\/\d{1,2}】/);
        expect(message2.fields[0]!.value).toBe('answer sentence');
        expect(message2.fields[0]!.short).toBe(false);
      } else {
        throw new Error('message2.fields is undefined');
      }
    }
  });
});

