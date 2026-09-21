type ToolCardProps = {
    icon: string
    title: string
    description: string
    buttonText: string
}


function ToolCard({
    icon,
    title,
    description,
    buttonText,
}: ToolCardProps) {

    return (
        <article className="tool-card">
            <div className="tool-icon">
                {icon}
            </div>

            <h2>{title}</h2>
            <p>{description}</p>

            <button type="button">
                {buttonText}
            </button>
        </article>
    )
}

export default ToolCard