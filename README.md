# Geekbot Report Action
The geekbot-report-action is a GitHub Actions action that sends a summary of the Geekbot Report to a designated Slack channel.
By configuring various parameters, such as Standup ID, API Key, and Member ID, you can effortlessly send Geekbot Reports to your Slack channel.

## Example
```yaml
steps:
  - name: Geekbot Report Action
    uses: rara-tan/geekbot-report-action@v1.0
    with:
      geekbot_api_key: "..."
      slack_bot_token: "..."
      slack_channel_name: "notify-geekbot"
      question_ids: "1111111"
      standup_id: "1111111"
      member_ids: "UAAAAAAAA,UBBBBBBBB"
```

the explanations of parameters are follows

- geekbot_api_key
  - required
  - Geekbot API Key that can be created on Geekbot User Page
- slack_bot_token
  - required
  - SlackBotToken (be careful, it is not webhook url)
- slack_channel_name
  - required
  - The name of Slack Channnel to notify
- question_ids
  - required
  - The Geekbot Question IDs (separated by comma)
- standup_id
  - required
  - The Geekbot Standup ID
- member_ids
  - required
  - The Member ID of Slack (separated by comma)
- sync_period
  - optional (default is 7)
  - The period of Geekbot Report

