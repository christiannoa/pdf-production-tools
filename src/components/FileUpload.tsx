type FileUploadProps = {
    label: string
    description: string
    file: File | null

    onFileSelect: (file: File | null) => void
}

function FileUpload({
    label,
    description,
    file,
    onFileSelect,
}: FileUploadProps) {

    return (
        <div className="upload-card">


        <div className="upload-card-header">
            <h2>{label}</h2>
            <p>{description}</p>
        </div>

        <label className="file-dropzone">
            <div className="upload-icon">
            </div>

            {file ? (
            <>
                <span className="file-name">
                    {file.name}
                </span>

                <span className="file-action">
                    Click to replace file
                </span>
            </>
            ) : (
            <>
                <span className="upload-title">
                    Choose PDF
                </span>

                <span className="file-action">
                    click to select a file
                </span>
            </>

            )}

            <input
                className="file-input"

                type="file"
                accept="application/pdf"

                onChange={(event) => {

                    const selectedFile = 
                        event.target.files?.[0] ?? null

                    onFileSelect(selectedFile)
                }}
            />

        </label>
        </div>
    )
}

export default FileUpload