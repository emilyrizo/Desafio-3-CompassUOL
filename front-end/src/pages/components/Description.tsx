import '../../styles/description.css'

interface DescriptionProps {
  large_description: string;
}

const Description = ({ large_description }: DescriptionProps) => {
  return (
    <div className='description-container'>
      <div className="description-title">
        <h2>Description</h2>
        <h3>Additional Information</h3>
      </div>
      <div className="description-text">
        <p>{large_description}</p>
      </div>
    </div>
  )
}

export default Description;