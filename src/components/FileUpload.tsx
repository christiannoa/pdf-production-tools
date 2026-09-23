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

            <h2>{label}</h2>

            <p>{description}</p>

            <input
                type="file"

                accept="application/pdf"

                onChange={(event) => {

                    const selectedFile = 
                        event.target.files?.[0] ?? null

                    onFileSelect(selectedFile)
                }}
            />

        {file && (
            <p className="selected-file">
                selected: {file.name}
            </p>
        )} 

        </div>
    )
}

export default FileUpload