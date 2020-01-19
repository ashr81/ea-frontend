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
    <rect x="0" y="0" rx="0" ry="0" width="240" height="50" /> 
    <rect x="270" y="0" rx="0" ry="0" width="240" height="50" /> 
    <rect x="540" y="0" rx="0" ry="0" width="240" height="50" />
  </ContentLoader>
)

export default MyLoader