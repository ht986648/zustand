import { useState } from 'react'
import { useTodoStore } from './store'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodoStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo)
      setNewTodo('')
    }
  }

  return (
    <div style={{ 
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Todo App</h1>
      
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          style={{
            flex: 1,
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button type="submit">Add</button>
      </form>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.5rem',
              background: todo.completed ? '#f0f0f0' : 'white',
              borderRadius: '4px',
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ flex: 1 }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>

      {todos.some(todo => todo.completed) && (
        <button 
          onClick={clearCompleted}
          style={{ 
            marginTop: '1rem',
            width: '100%'
          }}
        >
          Clear Completed
        </button>
      )}
    </div>
  )
}

export default App
