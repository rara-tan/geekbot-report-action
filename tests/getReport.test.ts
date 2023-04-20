import fetch, { FetchMock } from 'jest-fetch-mock';
import { getReport } from '../src/getReport';
import { GeekbotReport, GeekbotReportContents } from '../src/interfaces/geekbot';

const mockedFetch = global.fetch as FetchMock;

describe('getReport', () => {
  afterEach(() => {
    mockedFetch.resetMocks();
  });

  const requestParams = {
    memberIds: ['1', '2'],
    questionIds: ['10', '20'],
    standupId: '100',
    dateAfter: 1627855200,
    geekbotApiKey: 'xxx',
  };

  test('returns correct report on successful fetch', async () => {
    const firstApiRes = {
      userId: '1',
      result: {
        isSuccess: true,
        contents: [],
      }
    };
    const secondApiRes = {
      userId: '2',
      result: {
        isSuccess: true,
        contents: [],
      }
    };
    mockedFetch.mockResponses(
      [JSON.stringify(firstApiRes.result.contents), { status: 200 }],
      [JSON.stringify(secondApiRes.result.contents), { status: 200 }]
    );

    const result = await getReport(requestParams);
    expect(mockedFetch).toHaveBeenCalledTimes(2);
    expect(result).toEqual([firstApiRes, secondApiRes]);
  });

	test('handles server error correctly', async () => {
		const firstApiRes = {
			userId: '1',
			result: {
				isSuccess: false,
				errorMessage: 'server error',
			},
		};
		const secondApiRes = {
			userId: '2',
			result: {
				isSuccess: false,
				errorMessage: 'server error',
			},
		};
		mockedFetch.mockResponses(
			['', { status: 500 }],
			['', { status: 500 }],
		);

		const result = await getReport(requestParams);
		expect(mockedFetch).toHaveBeenCalledTimes(2);
		expect(result).toEqual([firstApiRes, secondApiRes]);
	});

	test('handles JSON error correctly', async () => {
		const firstApiRes = {
			userId: '1',
			result: {
				isSuccess: false,
				errorMessage: 'json error',
			},
		};
		const secondApiRes = {
			userId: '2',
			result: {
				isSuccess: false,
				errorMessage: 'json error',
			},
		};
		mockedFetch.mockResponses(
			'invalid-json',
			'invalid-json',
		);

		const result = await getReport(requestParams);
		expect(mockedFetch).toHaveBeenCalledTimes(2);
		expect(result).toEqual([firstApiRes, secondApiRes]);
	});

	test('handles network error correctly', async () => {
		const firstApiRes = {
			userId: '1',
			result: {
				isSuccess: false,
				errorMessage: 'network error',
			},
		};
		const secondApiRes = {
			userId: '2',
			result: {
				isSuccess: false,
				errorMessage: 'network error',
			},
		};
		mockedFetch.mockReject(new Error('network error'));

		const result = await getReport(requestParams);
		expect(mockedFetch).toHaveBeenCalledTimes(2);
		expect(result).toEqual([firstApiRes, secondApiRes]);
	});


});

