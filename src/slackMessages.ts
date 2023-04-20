import { GeekbotReport, GeekbotReportContents } from './interfaces/geekbot';
import { SlackMessage } from './interfaces/slack';

export function slackMessages(reportResults: GeekbotReport[]): SlackMessage[] {
  return reportResults.map((report) => {
    const slackMessage: SlackMessage = {
      mrkdwn_in: ['text'],
      color: Math.floor(Math.random() * 16777215).toString(16), // random color
      author_name: report.userId,
    };

    // Fetch Error
    if (!report.result.isSuccess) {
      slackMessage.text = `Failed to get Contents. Due to ${report.result.errorMessage}`;
      return slackMessage;
    }

    const contents: GeekbotReportContents[] = report.result.contents;
    // No Contents
    if (contents.length === 0) {
      slackMessage.text = `No Contents`;
      return slackMessage;
    }

    // No Questions
    const answeredReports = contents.filter(
      (content) => content.questions.length > 0,
    );
    slackMessage.author_name = contents[0]?.member.realname ?? report.userId;


    if (answeredReports.length === 0) {
      slackMessage.text = `No Questions`;
      return slackMessage;
    }

    slackMessage.fields = answeredReports.flatMap((reportContent) => {
      return reportContent.questions.map((question) => {
        const d = new Date(reportContent.timestamp * 1000);
        return {
          title: `【${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}】`,
          value: `${question.answer}`,
          short: false,
        };
      });
    });
    return slackMessage;
  });
}
