/// <reference types="react-scripts" />

// 메타마스크를 설치하면 window 객체에 ethereum Obj 가 생성되는데
// 이를 리액트에선 인식하지 못하기에 강제로 import 타입을 넣어줌
interface Window {
  ethereum: any;
}
