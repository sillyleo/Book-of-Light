import React from 'react';
import ContentLoader from "react-content-loader"

export const Loader = props => (
  <ContentLoader
    height={600}
    width={375}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}>
    <rect x="156" y="101.59" rx="8" ry="8" width="77.49" height="13.5642"/>
    <rect x="188" y="74.59" rx="8" ry="8" width="14" height="103.95"/>
  </ContentLoader>
)

export const LoaderText = props => (
  <ContentLoader
    height={600}
    width={375}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}>
    <rect x="38" y="190" rx="8" ry="8" width="310" height="22"/>
    <rect x="38" y="230" rx="8" ry="8" width="310" height="22"/>
    <rect x="38" y="270" rx="8" ry="8" width="310" height="22"/>
    <rect x="38" y="310" rx="8" ry="8" width="310" height="22"/>
    <rect x="38" y="350" rx="8" ry="8" width="310" height="22"/>
    <rect x="38" y="390" rx="8" ry="8" width="310" height="22"/>
  </ContentLoader>
)