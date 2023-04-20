export interface GeekbotMember {
  id: string
  username: string
  realname: string
  profileImg: string
}

export interface GeekbotQuestion {
  id: number
  question: string
  question_id: number
  color: string
  answer: string
  images: any[]
}

export interface GeekbotReportContents {
  id: number
  slack_ts: string
  standup_id: number
  timestamp: number
  channel: string
  is_anonymous: boolean
  is_confidential: boolean
  member: GeekbotMember
  questions: GeekbotQuestion[]
}

export interface GeekbotReport {
  userId: string
  result:
    | {
        isSuccess: true
        contents: GeekbotReportContents[]
      }
    | {
        isSuccess: false
        errorMessage: string
      }
}
