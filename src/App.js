
import './App.css';
import Movies from './components/movies';

//in jsx, if there is nothing between the opening and closing tag, you should use the self closing syntax <Movies />, not <Movies></Movies>
function App() {
  return (
   <main className="container">
    <Movies />
   </main>
  );
}

export default App;
