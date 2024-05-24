import { render, screen } from '@testing-library/react-native'
import { NativeRouter } from 'react-router-native'

import { formatNumber } from '../../utils/formatNumber'
import { RepositoryListContainer } from './index'

describe('RepositoryList', () => {
  const order = ''
  const searchWord = ''
  const setOrder = jest.fn()
  const setSearchWord = jest.fn()
  const onEndReach = jest.fn()

  describe('RepositoryListContainer', () => {
    it('renders repository list information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      }

      // Add your test code here
      render(
        <NativeRouter>
          <RepositoryListContainer
            repositories={repositories}
            order={order}
            setOrder={setOrder}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            onEndReach={onEndReach}
          />
        </NativeRouter>,
      )

      screen.debug()

      for (let i = 0; i < repositories.edges.length; i++) {
        expect(
          screen.getByText(repositories.edges[i].node.fullName),
        ).toBeDefined()
        expect(
          screen.getByText(repositories.edges[i].node.description),
        ).toBeDefined()
        expect(
          screen.getByText(repositories.edges[i].node.language),
        ).toBeDefined()
        expect(
          screen.getAllByText(
            formatNumber(repositories.edges[i].node.forksCount),
          ),
        ).toBeDefined()
        expect(
          screen.getAllByText(
            formatNumber(repositories.edges[i].node.stargazersCount),
          ),
        ).toBeDefined()
        expect(
          screen.getAllByText(
            formatNumber(repositories.edges[i].node.ratingAverage),
          ),
        ).toBeDefined()
        expect(
          screen.getAllByText(
            formatNumber(repositories.edges[i].node.reviewCount),
          ),
        ).toBeDefined()
      }

      expect(screen.queryAllByText('Stars')).toHaveLength(
        repositories.edges.length,
      )
      expect(screen.queryAllByText('Forks')).toHaveLength(
        repositories.edges.length,
      )
      expect(screen.queryAllByText('Reviews')).toHaveLength(
        repositories.edges.length,
      )
      expect(screen.queryAllByText('Rating')).toHaveLength(
        repositories.edges.length,
      )
    })
  })
})
