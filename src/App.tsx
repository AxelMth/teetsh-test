import './App.css';
import { useProgrammation } from './hooks/useProgrammation';
import { Periode } from './intefaces/programmation';
import { Matiere } from './intefaces/programmation';


function App() {
  const { data, isLoading, error } = useProgrammation('d7tfhdcchm1bom0df2z6s8zv');

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  if (error) {
    return <div className="App">Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{data?.data.name}</h1>
        <p>{data?.data.shortDescription}</p>
        <div>
          <h2>Périodes ({data?.data.periodes.length})</h2>
          <ul>
            {data?.data.periodes.map((periode: Periode) => (
              <li key={periode.id}>
                {periode.name} - {periode.color}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Matières ({data?.data.matieres.length})</h2>
          <ul>
            {data?.data.matieres.map((matiere: Matiere) => (
              <li key={matiere.id}>
                {matiere.name} ({matiere.domaines.length} domaines)
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;