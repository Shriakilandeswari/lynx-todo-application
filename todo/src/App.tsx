import { useCallback, useEffect, useState } from '@lynx-js/react';
import './App.css';

export function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTodo = useCallback(() => {
    'background only';
    if (newTodo.trim()) {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo('');
    }
  }, [newTodo, todos]);

  const handleDeleteTodo = useCallback((index: number) => {
    'background only';
    setTodos(todos.filter((_, i) => i !== index));
  }, [todos]);

  const toggleMenu = useCallback(() => {
    'background only';
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const navigateTo = useCallback((view: string) => {
    'background only';
    setCurrentView(view);
    setMenuOpen(false);
  }, []);

  // Auth functions
  const handleLogin = useCallback(() => {
    setErrorMessage('');
    if (username === 'Demo' && password === 'Demo123') {
      setIsAuthenticated(true);
    } else {
      setErrorMessage('Invalid username or password');
    }
  }, [username, password]);

  const handleLogout = useCallback(() => {
    'background only';
    setIsAuthenticated(false);
    setCurrentView('home');
    setMenuOpen(false);
    setUsername('');
    setPassword('');
  }, []);

  if (!isAuthenticated) {
    return (
      <view className="App">
        <view className="Content">
        <view className="AuthContainer">
          <text className="AuthTitle">Login to Lynx Todoss</text>

          <input
            className="LoginInput"
            value={username}
            type="text"
            // @ts-ignore
            bindinput={(e) => setUsername(e.detail.value)}
            placeholder="Username"
            style={{
              color: '#000000',
              backgroundColor: '#ffffff',
              padding: '12px',
              borderRadius: '4px'
            }}
          />
          <input
            className='LoginInput'
            value={password}
            type='password'
            // @ts-ignore
            bindinput={(e) => setPassword(e.detail.value)}
            placeholder="Password"
            style={{
              color: '#000000',
              backgroundColor: '#ffffff',
              padding: '12px',
              borderRadius: '4px'
            }}
          />
          {errorMessage && <text className="ErrorText">{errorMessage}</text>}

          <text className="LoginButton" bindtap={handleLogin}>Login</text>
        </view>
        </view>
      </view>
    );
  }

  return (
    <view className="App">
      {/* Navigation */}
      <view className="NavBar">
        <text className="NavTitle">Lynx Todos</text>
        <view className="UserMenu">
          <text className="UserBadge">{username}</text>
          <text className="MenuButton" bindtap={toggleMenu}>☰</text>
        </view>
      </view>

      {menuOpen && (
        <view className="MobileMenu">
          <text className="MobileMenuText" bindtap={() => navigateTo('home')}>Tasks</text>
          <text className="MobileMenuText" bindtap={() => navigateTo('about')}>About</text>
          <text className="MobileMenuText" bindtap={handleLogout}>Logout</text>
        </view>
      )}

      {currentView === 'home' && (
        <view className="Content">
          <view className="TodoInputSection">
            <input
              className='TodoInput'
              value={newTodo}
              // @ts-ignore
              bindinput={(e) => setNewTodo(e.detail.value)}
              placeholder="Enter new todo"
              style={{
                color: '#000000',
                backgroundColor: '#ffffff',
                padding: '12px',
                borderRadius: '4px'
              }}
            />
            <text className="AddButton" bindtap={handleAddTodo}>Add Todo</text>

          </view>

          <view className="TodoList">
              {todos.map((todo, index) => (
                <view key={index} className="TodoItem">
                  <text className='TodoText'>{todo}</text>
                  <text className="DeleteButton" bindtap={() => handleDeleteTodo(index)}>❌</text>
                </view>
              ))}
          </view>
        </view>
      )}

      {currentView === 'about' && (
        <view className="Content">
          <text className="AboutTitle">About Lynx Todos</text>
          <text>This is a simple todo app using Lynx framework.</text>
        </view>
      )}
    </view>
  );
}
