import ErrorBoundary from './ErrorBoundary.js';
import ColumnLeft from './columns/ColumnLeft.js';
import ColumnRight from './columns/ColumnRight.js';

function App() {
  return (
    <main className="page">
      <header className="page-header">Error boundaries in React</header>
      <div className="columns">
        <ColumnLeft />
        <ErrorBoundary>
          <ColumnRight />
        </ErrorBoundary>
      </div>
    </main>
  );
}

export default App;
