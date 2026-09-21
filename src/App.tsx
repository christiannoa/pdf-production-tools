import './App.css'
import ToolCard from './components/ToolCard'

// This file contains the main component of the application, which serves as the entry point for rendering the app's UI. It imports necessary dependencies and sets up the initial state and layout of the application. The component is responsible for managing global state, routing, and rendering child components based on the current route or user interactions.

function App() {
  // A react component "returns" what should appear on the sreen.
  // THe code below is JSX
  // JSX looks like HTML but is actually JavaScript. It allows you to write HTML-like syntax directly in your JavaScript code, 
  // which React then transforms into actual DOM elements.

  return (

    <div className="app">
      <main className="app-content">
        <header className="app-header">
          <h1>PDF Production Tools</h1>

          <p>
            Simple tools for common production tasks.
            No Technical Knowledge required. Just drag and drop your files and click the buttons to perform the tasks.
          </p>
        </header>

        {/* this section will hold our availale PDF tools */}
        <section className="tool-grid">
          
          {/* MERGE TOOLS */}
          
          <ToolCard
            icon="**"
            title="Merge Front + back PDFs"
            description="Combine seperate front and back PDFs into a single PDF file."
            buttonText="Merge PDFs"
            />
          {/* Split PDF Tool */}

          <ToolCard
            icon="**"
            title="Split PDF"
            description="Split a single PDF into individual files."
            buttonText="Split PDF"
            />

        </section>

      </main>

    </div>

  )
}

export default App
//makes the App component available to the rest of the project.