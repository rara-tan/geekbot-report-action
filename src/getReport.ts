// import fetch from 'node-fetch';
import { GeekbotReportContents, GeekbotReport } from './interfaces/geekbot';

export async function getReport({
  memberIds,
  questionIds,
  standupId,
  dateAfter,
  geekbotApiKey,
}: {
  memberIds: string[];
  questionIds: string[];
  standupId: string;
  dateAfter: number;
  geekbotApiKey: string;
}): Promise<GeekbotReport[]> {
  return await Promise.all(
    memberIds.map(async (userId) => {
      const query = new URLSearchParams({
        question_ids: questionIds.join(','),
        standup_id: standupId,
        user_id: userId,
        after: dateAfter.toString(),
      }).toString()
      const url = `https:api.geekbot.com/v1/reports?${query}`;
      try {
        const res = await fetch(url, { headers: { Authorization: geekbotApiKey } });
        if (!res.ok) {
          return {
            userId,
            result: {
              isSuccess: false,
              errorMessage: 'server error',
            },
          };
        }
        let contents;
        try {
          contents = await res.json() as GeekbotReportContents[]
        } catch (err) {
          return {
            userId,
            result: {
              isSuccess: false,
              errorMessage: 'json error',
            },
          };
        }
        return {
          userId,
          result: {
            isSuccess: true,
            contents,
          },
        };
      } catch (err) {
        return {
          userId,
          result: {
            isSuccess: false,
            errorMessage: 'network error',
          },
        };
      }
    }),
  );
}

