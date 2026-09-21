type ToolCardProps = {
    icon: string
    title: string
    description: string
    buttonText: string
    
    onClick: () => void
}


function ToolCard({
    icon,
    title,
    description,
    buttonText,
    onClick,
}: ToolCardProps) {

    return (
        <article className="tool-card">
            <div className="tool-icon">
                {icon}
            </div>

            <h2>{title}</h2>
            <p>{description}</p>

            <button type="button" onClick={onClick}>
                {buttonText}
            </button>
        </article>
    )
}

export default ToolCard