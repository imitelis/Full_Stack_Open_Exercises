import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../queries'

import SetBirthyear from './SetBirthyear'

const Authors = () => {

  const result = useQuery(ALL_AUTHORS, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (result.loading) {
    return (
      <div>
      <h2>Authors</h2>
      <em>loading...</em>
      </div>
      )
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthyear authors={authors} />
    </div>
  )
}

export default Authors
