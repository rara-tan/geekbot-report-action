import * as core from '@actions/core';
import { validateInputs } from '../src/validateInputs';

jest.mock('@actions/core', () => ({
  setFailed: jest.fn(),
}));

describe('validateInputs', () => {
  beforeEach(() => {
    (core.setFailed as jest.Mock).mockClear();
  });

  it('should not set failure when all inputs are provided', () => {
    const result = validateInputs(
      ['1', '2'],
      'standup_id_value',
      ['member1', 'member2'],
      'geekbot_api_key_value',
      'slack_bot_token_value',
      'slack_channel_name_value'
    );

    expect(core.setFailed).not.toBeCalled();
    expect(result).toBe(true);
  });

  it('should set failure when questionIds is empty', () => {
    const result = validateInputs(
      [],
      'standup_id_value',
      ['member1', 'member2'],
      'geekbot_api_key_value',
      'slack_bot_token_value',
      'slack_channel_name_value'
    );

    expect(core.setFailed).toBeCalledWith('question_ids cannot be empty');
    expect(result).toBe(false);
  });

  it('should set failure when standupId is empty', () => {
    const result = validateInputs(
      ['1', '2'],
      '',
      ['member1', 'member2'],
      'geekbot_api_key_value',
      'slack_bot_token_value',
      'slack_channel_name_value'
    );

    expect(core.setFailed).toBeCalledWith('standup_id cannot be empty');
    expect(result).toBe(false);
  });

  it('should set failure when memberIds is empty', () => {
    const result = validateInputs(
      ['1', '2'],
      'standup_id_value',
      [],
      'geekbot_api_key_value',
      'slack_bot_token_value',
      'slack_channel_name_value'
    );

    expect(core.setFailed).toBeCalledWith('member_ids cannot be empty');
    expect(result).toBe(false);
  });

  it('should set failure when geekbotApiKey is empty', () => {
    const result = validateInputs(
      ['1', '2'],
      'standup_id_value',
      ['member1', 'member2'],
      '',
      'slack_bot_token_value',
      'slack_channel_name_value'
    );

    expect(core.setFailed).toBeCalledWith('geekbot_api_key cannot be empty');
    expect(result).toBe(false);
  });

  it('should set failure when slackBotToken is empty', () => {
    const result = validateInputs(
      ['1', '2'],
      'standup_id_value',
      ['member1', 'member2'],
      'geekbot_api_key_value',
      '',
      'slack_channel_name_value'
    );

    expect(core.setFailed).toBeCalledWith('slack_bot_token cannot be empty');
    expect(result).toBe(false);
  });

  it('should set failure when slackChannelName is empty', () => {
    const result = validateInputs(
      ['1', '2'],
      'standup_id_value',
      ['member1', 'member2'],
      'geekbot_api_key_value',
      'slack_bot_token_value',
      ''
    );

    expect(core.setFailed).toBeCalledWith('slack_channel_name cannot be empty');
    expect(result).toBe(false);
  });
});
