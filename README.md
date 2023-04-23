# Geekbot Report Sync to Slack
This repository is for GitHub Actions to notify Slack of the content posted on Geekbot.
Specifically, it monitors activities performed on Geekbot and sends notifications to a Slack channel, aiming to facilitate communication and sharing within the team.

## Example
```yaml
steps:
  - name: Geekbot Slack Sync
    uses: rara-tan/geekbot-sync-to-slack@v1.0
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

