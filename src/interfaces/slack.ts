export interface SlackMessageField {
  title: string
  value: string
  short: boolean
}

export interface SlackMessage {
  mrkdwn_in: string[]
  color: string
  author_name: string
  text?: string
  fields?: SlackMessageField[]
}
