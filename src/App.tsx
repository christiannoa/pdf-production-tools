import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

import './App.css'
import ToolCard from './components/ToolCard'
import FileUpload from './components/FileUpload'

// This file contains the main component of the application, which serves as the entry point for rendering the app's UI. It imports necessary dependencies and sets up the initial state and layout of the application. The component is responsible for managing global state, routing, and rendering child components based on the current route or user interactions.

function App() {
  // A react component "returns" what should appear on the sreen.
  // THe code below is JSX
  // JSX looks like HTML but is actually JavaScript. It allows you to write HTML-like syntax directly in your JavaScript code, 
  // which React then transforms into actual DOM elements.

  const [activeTool, setActiveTool] = useState<'home' | 'merge' | 'split'>('home')
  const [frontFile, setFrontFile] = useState<File | null>(null)
  const [backFile, setBackFile] = useState<File | null>(null)

async function handleMerge() {
  
  if (!frontFile || !backFile) {
    alert('Please select both a frontpdf and a back PDF')
    return
  }

    const frontPdfBytes = await frontFile.arrayBuffer()
    const backPdfBytes = await backFile.arrayBuffer()

    const frontPdf = await PDFDocument.load(frontPdfBytes)
    const backPdf = await PDFDocument.load(backPdfBytes)

    console.log('Front pages:', frontPdf.getPageCount())
    console.log('Back pages:', backPdf.getPageCount())
}

  if (activeTool === 'merge') {
    return (
      <div className="app">
        <main className="app-content">

          <button type="button" onClick={() => setActiveTool('home')}>
            back
          </button>

          <header className="app-header">
            <h1>Merge Front + Back PDFs</h1>

            <p>
              upload separate front and back PDF files.
              We'll combine them into a single PDF file for you.
            </p>
          </header>
        
          <section className="upload-grid">

            {/* Front PDF Upload */}
          
            <FileUpload
              label="Front PDF"
              description="Select the PDF containing the front pages."
              file={frontFile}
              onFileSelect={setFrontFile}
            />

            {/* Back PDF Upload */}

            <FileUpload
              label="Back PDF"
              description="Select the PDF containing the back pages."
              file={backFile}
              onFileSelect={setBackFile}
            />

            <button
              type="button"
              onClick={handleMerge}
            >
              Merge PDFs
            </button>

          </section>
        </main>
      </div>
    )
  }

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
            onClick={() => setActiveTool('merge')}
            />
          {/* Split PDF Tool */}

          <ToolCard
            icon="**"
            title="Split PDF"
            description="Split a single PDF into individual files."
            buttonText="Split PDF"
            onClick={() => setActiveTool('split')}
            />


        </section>

      </main>

    </div>

  )
}

export default App
//makes the App component available to the rest of the project.