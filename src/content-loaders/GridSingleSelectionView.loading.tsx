import React from "react"
import ContentLoader from "react-content-loader" 

const MyLoader = () => (
  <ContentLoader
    style={{
      height: '250px',
      width: '800px'
    }}
    height={250}
    width={800}
    speed={2}
    primaryColor="#ffffff"
    secondaryColor="#d9d9d9"
  >
    <rect x="0" y="0" rx="0" ry="0" width="180" height="250" /> 
    <rect x="210" y="0" rx="0" ry="0" width="180" height="250" /> 
    <rect x="420" y="0" rx="0" ry="0" width="180" height="250" />
  </ContentLoader>
)

export default MyLoader