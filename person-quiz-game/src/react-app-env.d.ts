// src/react-app-env.d.ts
/// <reference types="react-scripts" />

// 이미지 파일(.jpg, .jpeg, .png, .gif 등)을 모듈로 인식하도록 선언
// 이 부분이 빠지면 TypeScript는 이미지 파일을 이해하지 못하고 에러를 발생시킬 수 있습니다.
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

// SVG 파일도 필요하다면 포함
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}