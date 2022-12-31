import { Component } from 'react'
import { connect } from 'react-redux'
import { Todo, fetchTodos, deleteTodo } from '../actions'
import { StoreState } from '../reducers'

interface AppProps {
  todos: Todo[]
  fetchTodos: Function
  deleteTodo: typeof deleteTodo
}

interface AppState {
  fetching: boolean
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.state = { fetching: false }
  }

  componentDidUpdate(prevProps: AppProps) {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false })
    }
  }

  onBtnClick = (): void => {
    this.props.fetchTodos()
    this.setState({ fetching: true })
  }

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id)
  }

  renderList = (): JSX.Element[] => {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div key={todo.id} onClick={() => this.onTodoClick(todo.id)!}>
          {todo.title}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.onBtnClick}>Fetch</button>
        {this.state.fetching && 'Loading...'}
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos }
}

export default connect(mapStateToProps, { fetchTodos, deleteTodo })(App)
