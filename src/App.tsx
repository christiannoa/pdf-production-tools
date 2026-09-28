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
  const [splitFile, setSplitFile] = useState<File | null>(null)

async function handleMerge() {
  
  // Makes sure both PDFs have been selected.
  if (!frontFile || !backFile) {
    alert('Please select both a front pdf and a back PDF.')
    return
  }
    // coverts the selected browser files into raw binary data.
    const frontPdfBytes = await frontFile.arrayBuffer()
    const backPdfBytes = await backFile.arrayBuffer()

    // Loads both PDFs into pdf-lib
    const frontPdf = await PDFDocument.load(frontPdfBytes)
    const backPdf = await PDFDocument.load(backPdfBytes)

    // creates one new empty pdf
    const mergedPdf = await PDFDocument.create()

    // Get the page indexes from both PDFs
    const frontPageIndices = frontPdf.getPageIndices()
    const backPageIndices = backPdf.getPageIndices()

    // Copy all front pages into new PDF document
    const frontPages = await mergedPdf.copyPages(
      frontPdf,
      frontPageIndices
    )

    // Copy all back pages into new PDF documents as well
    const backPages = await mergedPdf.copyPages (
      backPdf,
      backPageIndices
    )

    // Determines which PDF has more pages
    const totalPages = Math.max (
      frontPages.length,
      backPages.length
    )

    //-------------
    // Builds THE PDF
    //-------------

    // Go through every front/back pair
    for (let i = 0; i < totalPages; i++) {
      
      // adds front page first
      if (i < frontPages.length) {
        mergedPdf.addPage(frontPages[i])
      }

      // adds corresponding back page second
      if (i < backPages.length) {
        mergedPdf.addPage(backPages[i])
      }
    } //Loops ends here


      // Save run ones time, only reaches here after the loops has
      // finished add all front + back pages.
      const mergedPdfBytes = await mergedPdf.save()

      const mergedPdfData = new Uint8Array(mergedPdfBytes)

      // Turn the finished PDF data into a browser blob
      const mergedBlob = new Blob(
        [mergedPdfData],
        { type: 'application/pdf' }
      )

      // creates temporary URL pointing to our PDF
      const downloadUrl = URL.createObjectURL(mergedBlob)

      // Creates a temporary download link
      const downloadLink = document.createElement('a')

      downloadLink.href = downloadUrl

      downloadLink.download = 'merged_output.pdf'

      // download one finished PDF
      downloadLink.click()

      // Remove the temp URL from memory
      URL.revokeObjectURL(downloadUrl)

    }


  async function handleSplit() {

      if(!splitFile) {
        alert('Please select a PDF to split.')
        return
      }

      const splitPdfBytes = await splitFile.arrayBuffer()

      const sourcePdf = await PDFDocument.load(splitPdfBytes)

      const pageCount = sourcePdf.getPageCount()

      for (let i = 0; i < pageCount; i++) {

        const newPdf = await PDFDocument.create()

        const [copiedPage] = await newPdf.copyPages(
          sourcePdf,
          [i]
        )

        newPdf.addPage(copiedPage)

        const newPdfBytes = await newPdf.save()

        const newPdfData = new Uint8Array(newPdfBytes)

        const pdfBlob = new Blob(
          [newPdfData],
          { type: 'application/pdf' }
        )

        const downloadUrl = URL.createObjectURL(pdfBlob)

        const downloadLink = document.createElement('a')

        downloadLink.href = downloadUrl

        downloadLink.download = `page-${i + 1}.pdf`

        downloadLink.click()

        URL.revokeObjectURL(downloadUrl)

      }

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

  if(activeTool === 'split') {
    return (
      <div className="app">

        <main className="app-content">
          
          <button
            type="button"
            onClick={() => setActiveTool('home')}
            >
            </button>

            <header className="app-header">

                <h1>Split PDF</h1>

                <p>
                  upload. a multi-page PDF and 
                  split each page into it's own individual PDF file.
                </p>
            </header>

            <section className="upload-grid">
              <FileUpload
                label="PDF File"
                description="select the PDF you want to split."
                file={splitFile}
                onFileSelect={setSplitFile}
              />
            </section>

            <button
              type="button"
              onClick={handleSplit}
              >
                Split PDF
              </button>
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