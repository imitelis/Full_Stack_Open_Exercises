import { NativeRouter } from 'react-router-native'
import { render, screen } from '@testing-library/react-native'

import { formatNumber } from '../../utils/formatNumber'
import RepositoryItem from './RepositoryItem'

describe('RepositoryItem', () => {
  it('renders a repository item based on the repository prop', () => {
    const repository = {
      id: 'jaredpalmer.formik',
      fullName: 'jaredpalmer/formik',
      description: 'Build forms in React, without the tears',
      language: 'TypeScript',
      forksCount: 1619,
      stargazersCount: 21856,
      ratingAverage: 88,
      reviewCount: 3,
      ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
    }
    render(
      <NativeRouter>
        <RepositoryItem repository={repository} />
      </NativeRouter>,
    )

    screen.debug()

    expect(screen.getByText(repository.fullName)).toBeDefined()
    expect(screen.getByText(repository.description)).toBeDefined()
    expect(screen.getByText(repository.language)).toBeDefined()
    expect(
      screen.getByText(formatNumber(repository.stargazersCount)),
    ).toBeDefined()
    expect(screen.getByText('Stars')).toBeDefined()
    expect(screen.getByText(formatNumber(repository.forksCount))).toBeDefined()
    expect(screen.getByText('Forks')).toBeDefined()
    expect(screen.getByText(formatNumber(repository.reviewCount))).toBeDefined()
    expect(screen.getByText('Reviews')).toBeDefined()
    expect(
      screen.getByText(formatNumber(repository.ratingAverage)),
    ).toBeDefined()
    expect(screen.getByText('Rating')).toBeDefined()
  })
})
