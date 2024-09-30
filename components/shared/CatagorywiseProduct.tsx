import React from 'react'
import Image from 'next/image'


const CatagorywiseProduct = ({product}:{product:any}) => {
  

  return (
    <div>
        <div>
            <Image src={product.image} height={200} width={200} alt={product.title}/>
        </div>
    </div>
  )
}

export default CatagorywiseProduct