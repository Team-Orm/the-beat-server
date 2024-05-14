# 🤝 MeetUP

<p align="center">
 <img width=300 src="https://github.com/MeetUp1/Meet_UP-client/assets/107290583/e2152e3a-900a-4b93-ac82-62101a277a3a" />
</p>
<p align="center">MeetUP 프로젝트는 전 세계의 다양한 지역에서 미팅을 개최하고 참가할 수 있는 Mobile application 입니다.</p>
<br>
<p align="center"><a href="https://www.youtube.com/watch?v=bhVkFiCH_gU">MeetUP 시연영상</a></p>

[Deployment🏠](https://thebeat.fun)

<br>

# 📖 Table of Contents

- [💪 Motivation](#💪-motivation)
- [🎥서비스 화면](#🎥-서비스-화면)
- [기능 및 작업 기여도](#기능-및-작업-기여도)
- [🔥 Issue Points](#🔥-issue-points)
  - [Canvas API를 통해 어떻게 리듬게임을 구현할 수 있을까?](#canvas-api를-통해-어떻게-리듬게임을-구현할-수-있을까)
    - [Canvas API를 선택한 이유](#canvas-api를-선택한-이유)
    - [델타 타임의 적용](#델타-타임의-적용)
    - [다음 프레임 호출은 setTimeout과 requestAnimationFrame중 무엇을 써야 할 까?](#다음-프레임-호출은-settimeout과-requestanimationframe중-무엇을-써야-할-까)
    - [Miss처리](#miss-처리)
  - [Web Audio API와 Canvas API의 싱크를 어떻게 맞출 수 있을까?](#web-audio-api와-canvas-api의-싱크를-어떻게-맞출-수-있을까)
    - [Web Audio API를 선택한 이유](#web-audio-api를-선택한-이유)
    - [Web Audio API 기본 원리](#web-audio-api-기본-원리)
    - [Web Audio API와 Canvas API 연결하기](#web-audio-api와-canvas-api-연결하기)
  - [실시간 콤보, 이펙트, 결과창의 구현](#실시간-콤보-이펙트-결과창의-구현)
    - [실시간으로 어떻게 표시해줄 수 있을까?](#실시간으로-어떻게-표시해줄-수-있을까)
    - [useLayoutEffect의 적용](#uselayouteffect의-적용)
  - [Socket.IO를 더 효율적으로 사용해보기](#socketio를-더-효율적으로-사용해보기)
    - [Socket.IO 프레임워크를 사용한 이유](#socketio-프레임워크를-사용한-이유)
    - [Socket.IO 최적화의 중요성](#socketio-최적화의-중요성)
    - [우리 프로젝트에서 Socket.IO를 어떻게 최적화 할 수 있을까?](#우리-프로젝트에서-socketio를-어떻게-최적화-할-수-있을까)
- [🗓 Schedule](#-schedule)
- [🔗 Repository Link](#-repository-link)
- [🛠 Tech Stacks](#-tech-stacks)
- [✅ Test](#✅-test)
- [🚀 Deployment](#🚀-deployment)
- [🏠 Members](#-members)

  <br>

# 💪 Motivation

이번 프로젝트의 목표는 부트캠프 교육 기간동안 학습하였던 지식들을 react native를 사용하여 프로젝트를 진행해보자! 라는 목표를 가지고 주제를 탐색해 보았습니다.

이러한 목표에 적합한 아이디어를 탐색하다가 미팅을 요청하거나 수락할때 불필요한 커뮤니케이션이 발생하는 것을 줄일 수 있는 프로젝트를 진행해보자 라는 아이디어가 떠올랐고 이 주제에 관한 자료 조사와 계획을 수립하였습니다.

계획한 프로젝트에서는 react native를 처음 사용해 보는것이므로 react native에대한 사전 조사가 필요하였고, react native로 미팅을 요청하고 수락하는 사용자들의 지역이 다르더라도 서로의 시간정보가 유저의 지역시간에 맞도록 미팅을 수락, 요청 할 수 있도록 구현한다면 프론트엔드와 백엔드 에서의 챌린지 요소를 해결해가면서 프로젝트가 완성했을때 프로젝트의 목표가 달성될 수 있을것이라고 판단하여 이프로젝트를 진행하였습니다.

# 📌 Feature

<details>
  <summary>원하는 미팅 시간 설정</summary>

![Jun-20-2023 13-56-17](https://github.com/MeetUp1/Meet_UP-client/assets/107290583/c6e8fb48-9008-44c7-8d58-c70cd5e9037d)

</details>
<details>
  <summary>미팅 신청하기 및 푸시알림</summary>

![Jun-20-2023 14-05-59](https://github.com/MeetUp1/Meet_UP-client/assets/107290583/10fe19f6-4c21-416e-8bb9-220e4cb5de8d)

</details>
<details>
  <summary>요청 대기 중인 미팅 - 수락</summary>

![Jun-20-2023 14-11-29](https://github.com/MeetUp1/Meet_UP-client/assets/107290583/48574575-0ab1-4ac9-9551-04c7401db193)

</details>
<details>
  <summary>요청 대기 중인 미팅 - 거절</summary>

![Jun-20-2023 14-13-50](https://github.com/MeetUp1/Meet_UP-client/assets/107290583/8d226069-7793-4270-823c-965b669c08d5)

</details>
<details>
  <summary>거절 대기 중인 미팅 - 미팅취소</summary>

![Jun-20-2023 14-16-56](https://github.com/MeetUp1/Meet_UP-client/assets/107290583/797575b2-7b6b-4b25-aec4-56cef33ad742)

</details>
<details>
  <summary>거절 대기 중인 미팅 - 재신청</summary>

![Jun-20-2023 14-22-18](https://github.com/MeetUp1/Meet_UP-client/assets/107290583/fd116860-b5bf-4108-b249-48225b584e64)

</details>
<details>
  <summary>미팅 일정 확인 및 주소 복사</summary>

![Jun-20-2023 14-25-50](https://github.com/MeetUp1/Meet_UP-client/assets/107290583/1587ed59-60eb-4f57-ae16-c296579b9847)

</details>
<br>

# 🔥 challenges

프로젝트를 진행하며 여러 Challenges가 있었지만 주요 Challenges는 다음과 같은 요소가 있었습니다.

<br>

## 1. 미팅요청 하는 유저와 수락하는 유저의 지역 정보가 다르다면 시간을 어떻게 표시 해야할까?

미팅요청 하는 유저와 수락하는 유저의 지역 정보가 다르다면 시간을 동적으로 표시하는데 아래의 어려움이 있었습니다.

<br>

### 1) 어떻게 위치기반의 캘린더를 만들수 있을까?

<br>

**문제: 위치 기반의 동적 캘린더 생성을 어떻게 하지?**

이 프로젝트의 목표 중 하나는 위치 기반의 동적인 캘린더를 만드는 것이었습니다. 이를 위해 선택할 수 있는 두 가지 기술적 방법이 있었는데, 바로 JavaScript의 내장 Date 객체와 Google Calendar API였습니다.

<br>

**대안: 내장 Date 객체 vs Google Calendar API**

내장 Date 객체는 간단한 날짜 및 시간 처리 기능을 제공하며, 인터넷 연결이 필요하지 않고 외부 의존성이 없다는 장점이 있습니다.
Google Calendar API는 다양한 기능을 제공하며, 이를 통해 캘린더 동기화, 사용자 인증 및 권한 관리가 가능합니다. 또한 지속적인 업데이트를 통한 신기능 도입과 플랫폼 간 호환성이 가능하다는 장점이 있습니다.
시도: 외부 의존성 최소화를 위한 선택

프로젝트에서는 외부 의존성을 최소화하고자 하는 방향을 선택했습니다. 이는 Google Calendar API를 사용할 경우 구글 서비스의 변경사항이나 장애에 영향 받을 수 있기 때문입니다.

<br>

**결과: 내장 Date 객체의 활용**

따라서 위치 기반의 캘린더를 만들기 위해 내장 Date 객체를 활용하였습니다. 이를 통해 외부 서비스의 변경사항이나 장애에 영향 받지 않고 프로젝트를 안정적으로 유지할 수 있었습니다. 또한, 필요한 캘린더 기능은 직접 구현하였고, 캘린더 부분에서는 내장 Date 객체를 사용하여 로컬 시간을 처리하였습니다.

<br>

### 2) 사용자의 지역에 따른 로컬시간이 다르다면 서로의 시간은 어떻게 표시해야 하지?

서로 다른 지역의 사용자들이 일정 시간을 표시 및 확인 할 때, 각 사용자의 지역의 TimeZone에 맞추어 일정 시간을 표시해 하기위한 어려움이 있었습니다.

<br>

<<<<<<< HEAD

### 2-1) 사용자의 지역에 따른 로컬시간이 다른경우 어떻게 시간을 통일화 해서 DB에 저장해야 할까?

=======

### `Web Audio API` 기본 원리

<hr>

`Web Audio API`를 통해 오디오를 다루는 원리는 다음과 같습니다.

1. 먼저 Audio Input을 입력받습니다.
2. `AudioContext` 인터페이스를 통해 오디오 관련 작업을 진행합니다.
3. Destination으로 출력합니다.

<img width="350" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/c2cfa1fd-27a5-4fc7-a0ba-1cf432fe014e">

우선 S3에서 받은 오디오 데이터를 Buffer 데이터로 변환 시키는 것부터 해주어야 했습니다.

<img width="596" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/021c3f59-a773-4b92-93c7-cee4b260ce11">

여기서 Buffer가 무엇인지 알 필요가 있습니다.

`Buffer`란? RAM에 작은 영역인 `Buffer`란 이름의 버스 정류장을 만들어 일련의 데이터 스트림이 모이면 (출발 시간이 되면) 처리되기 위해 내보내어 집니다.

이 `Buffer`에 Audio Data를 **8비트의 정수 배열로 변환 시켜 담아** 이걸 `AudioContext`의 시작 지점인 `SoucrNode`와 연결 시킵니다.

다음은 `AudioBuffer` 예시입니다.

<p>
  <img width="750" alt="image" src="https://user-images.githubusercontent.com/115068443/228592960-d7eba3c8-d267-4e9a-9a5c-f57c5f71c5ed.png">
</p>

<img width="350" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/1c2254de-72f5-4e88-bfc8-ccfda806d192">

<br>

이렇게 연결된 `SourceNode`와 일련의 작업 노드들의 가공을 통해 `Destination`(output)으로 출력이 됩니다.

<br>

<img width="200" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/45ac2cf1-7a88-4d7f-94c6-e9ad197ffd71">
>>>>>>> 7ed2c43c6cb5b3255d4c2cf37a0f7bc89e3fa9d1

<br>

**문제: 서로 다른 시간대의 사용자 간 일정, 시간 동기화 문제**

다양한 지역에서 사용하는 사용자들이 앱을 사용할 때, 각자의 지역 시간에 따른 일정 표시의 차이로 인해 혼란이 발생할 수 있습니다. 이 때문에 시간을 표준화하여 모든 사용자가 동일한 시점의 일정을 확인할 수 있도록 하는 문제에 직면하게 되었습니다. 이를 해결하기 위해서는 모든 사용자에게 일정 시간을 동일하게 표시하되, 각 사용자의 로컬 시간대를 고려하는 방법이 필요하였습니다.

<br>

**대안,시도: 시간 정보의 표준화**

이 문제를 해결하기 위한 대안으로, 사용자가 미팅을 생성하거나 신청할 때 해당 일정의 시간 정보를 UTC (협정 세계시)로 변환하여 저장하는 방법을 생각해 보았습니다. 이를 통해 다양한 지역에서 사용하는 사용자들의 일정 시간을 표준화하고, 사용자 간의 시간 차이를 고려할 수 있습니다. 이렇게 통일화된 UTC를 DB에 저장해 주었습니다.

```javascript
const convertToUTCDate = (localDate, hour) => {
  const date = new Date(localDate);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};
```

위의 함수를 사용하여, 주어진 로컬 날짜와 시간을 UTC 형태의 시간으로 변환하는 함수를 만들어 주었습니다.

그 다음 Task는 나 자신의 점수와 스코어, 콤보를 관리하고 실시간으로 상대방에게 넘겨주는 것을 해결해야 했습니다.

나 자신의 정보를 관리하기 위해서는 하나의 Resource에서 전부 관리해주는 것이 옳다고 판단하였고, 전역 상태 관리 툴인 `Redux`를 선택하게 되었습니다.

2. `date` 객체의 시간을 주어진 `hour`로 설정하고, 분, 초, 밀리초를 0으로 초기화합니다. 이렇게 하면, 원하는 시간을 가진 새로운 날짜 및 시간 객체가 생성됩니다.
   <br>

<p>
  <img width="250" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/dffd50de-0da9-495a-9a66-e329e4599446">
</p>

2. 상대방한테 내 정보를 표시하는 것은 `Redux`를 통해 관리한 내 정보를 `Socket`을 통해 전송하면 `Socket`에서는 `BattleUser`의 정보로 전달 받음.

<p>
  <img width="400" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/b8da00b0-e326-4606-b59b-30c0173a36ad">
</p>
<p>
  <img width="600" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/198354eb-9b35-45a3-9f0b-438fb7e48c45">
</p>

3. `GameController`에서는 `BattleUser`의 정보가 `props`로 있을 경우 `BattleUser`의 정보를 표시, **아닐 경우 현재 `currentCombo`를** 표시!

<p>
  <img width="450" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/8e347417-82f1-4900-9550-68dd7ed6b1b0">
</p>
<p>
  <img width="300" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/fd303846-c5db-442c-98e4-504b44cc594d">
</p>
<p>
  <img width="500" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/a541ed42-1667-4140-8e23-192eab1b5aff">
</p>

### **useLayoutEffect의 적용**

<hr>

이제는 노래가 끝날 때 결과창을 표시해주면 됐습니다. 그러나 **결과 값이 원하는 대로 표시되지 않는 이슈**가 있었습니다.

처음 해결 방법은 입력된 정보들을 결과창으로 그대로 보내주면 되지 않을까? 라고 단순히 생각하여,

**단순히 노래의 길이와 현재 시작한 시간이 같아질 때** 저장한 정보를 `dispatch`하면 되겠다 라는 생각을 했으나,

1. `console.log(콤보)`를 확인해 보니 두번 렌더링이 되며 값이 제대로 들어오지 않는 것을 알 수 있었습니다.

<p>
  <img width="435" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/334bab14-0c08-467a-8aaf-e45f5e9bdbf1">
</p>

그 이유에 대해 조사를 해보며 이유를 알 수 있었습니다.

1. `useEffect`와 `requestAnimationFrame`을 같이 이용.
2. `requestAnimationFrame`은 `Repaint` 이전 주어진 콜백을 실행한 후 `Layout`과 `Paint`를 진행 합니다.
3. `useEffect`의 `cleanup`이 브라우저의 `Paint` 이후에 실행되며 requestAnimationFrame을 한 번 더 호출해 값이 초기화되는 것이었습니다.

<p>
  <img width="300" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/4117410a-239c-410c-82e6-3ff66efaa262">
</p>

위 이미지처럼 한 프레임 안에서 콜백을 먼저 호출한 뒤 `Painting`을 진행합니다.

반면, `useEffect`는 실제로 `DOM`이 업데이트된 후 동기적으로 실행되는 것이 아니라, **나중에 실행**된다는 것이 문제였습니다.

<br>

### 2-2) UTC(협정 세계시)로 저장되어 있는 데이터를 로컬시간으로 변환

<br>

그래서 `useEffect`가 실행되기 전에, `requestAnimationFrame`이 스케쥴을 선점해 `Repaint` 할 수 있다는 것이 문제였습니다.

<p>
  <img width="400" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/0dc3b5fd-63a1-4f3d-8218-ba7201cf3d36">
</p>

- 이 말은 `useEffect`의 `cleanup`이 나중에 실행되기 때문에, `rAF`가 한번 더 호출되고 `cleanup`이 실행되어 값이 원하는 값으로 들어오지 않았습니다.
- 이를 해결하기 위해 `useEffect` 외에도 `DOM`이 업데이트 된 후 동기적으로 실행된다는 점을 제외하면 동일한 방식인 `useLayoutEffect`를 도입해 해결해보고자 하였습니다.

<p>
  <img width="400" alt="image" src="https://github.com/Team-Orm/the-beat-client/assets/113571767/368363d5-6aaf-4425-af29-8846f4a4d323">
</p>

두 `Hook` 다 `React`가 `DOM`과 `Refs`를 최신화 시킨 뒤 실행이 되지만 차이가 있었습니다.

- `useLayoutEffect`는 `React`가 `DOM`을 최신화 시킨 뒤 곧 바로 `Paint` 이전에 실행하고 정리합니다.
- `useEffect`는 `React`가 `Paint`를 한 직 후 `Effect`를 실행하고 정리합니다.

이를 적용해 `requestAnimationFrame`의 호출이 이루어지기 전에 `dispatch`를 통해 값을 받음으로써 원하는 결과값을 얻어 이슈를 해결하였습니다.

<br>
<br>

## **Socket.IO를 더 효율적으로 사용해보기**

노트에 대한 많은 정보가 전달될 때 상대의 키값 또한 전달되므로 순간적으로 Latency의 증가가 발견되어 Socket.IO를 통한 실시간 배틀에서의 최적화를 고민하게 되었습니다.

The Beat 리듬게임 프로젝트에서는 Socket.IO을 사용하여 서버와 여러 클라이언트 간의 실시간 통신을 합니다. 따라서 저희는 Socket.IO 통신의 효율성과 성능이 중요하다고 판단했습니다.
그리고 다음과 같은 다양한 방안을 고안하여 Socket.IO 최적화를 하고자 노력하였습니다.

<br>

### Socket.IO 프레임워크를 사용한 이유

<hr>

저장된 UTC 시간 정보를 사용자의 로컬 시간대로 변환하여 보여주는 방법을 고려했습니다. UTC 시간 정보를 로컬시간으로 변환해주는 방법은 간단하게 해결되었습니다.

저희는 WebSocket을 단독으로 사용할지 아니면 Socket.IO 프레임워크를 사용할지 고민해봤습니다.

**Socket.IO를 선택한 이유**
<br>
Socket.IO는 양방향 통신을 하기위해 WebSocket 기술을 활용하는 라이브러리입니다.
<br>
WebSocket만 사용해도 실시간 양방향 통신을 제공하지만, 아래와 같은 Socket.IO가 제공하는 몇몇 기능들은 기본적으로 제공하지 않습니다.

- **실시간 이벤트 기반 통신**: 음악 게임에서는 사용자의 입력에 따라 실시간으로 게임이 반응해야 합니다. Socket.IO는 이벤트 기반의 통신을 지원하므로, 사용자의 각각의 액션을 이벤트로 취급하고 서버에 실시간으로 전달하는 것이 가능합니다.

- **자동 재연결 지원**: 게임 중 네트워크 상태가 불안정할 경우, 플레이어의 경험을 저해할 수 있습니다. Socket.IO는 연결이 끊어졌을 때 자동으로 재연결을 시도하므로, 사용자의 게임 경험이 중단되는 것을 최소화할 수 있습니다.

- **네임스페이스와 룸 기능**: Socket.IO는 네임스페이스와 룸을 지원하여 다수의 사용자가 동시에 게임을 즐길 수 있도록 만듭니다. 또한, 룸을 사용하면 여러 플레이어가 동일한 게임 세션에 참여할 수 있으며, 서버는 특정 룸의 모든 클라이언트에게 쉽게 메시지를 전송할 수 있습니다

- **환경 호환성 보장**: 모든 웹 브라우저나 네트워크 환경이 WebSocket을 지원하지 않는 경우, Socket.IO의 HTTP Long-Polling fallback기능은 어떠한 환경에서도 실시간 통신을 가능하게 합니다. 따라서, 저희 프로젝트는 어떠한 웹 브라우저에서도 실시간 통신이 가능합니다.

<br>
위와 같은 특징이 저희 프로젝트에 필요하여 Socket.IO를 선택하였습니다.

<br>

**시도: 로컬 시간 변환 함수의 구현**

<hr>

소켓 최적화는 컴퓨터 네트워크에서 소켓 통신의 성능과 효율성을 향상시키는 프로세스를 말하며, 소켓 최적화는 응용 프로그램과 장치 간의 데이터 전송 속도와 안정성을 크게 향상시킬 수 있기 때문에 중요합니다.
<br>

1. 빈 객체 `meetingsByDate`를 생성합니다. 이 객체는 각 날짜별로 미팅 목록을 저장하기 위한 목적으로 사용됩니다.
   <br>

2. 미팅 시작 시간`startTime`을 기반으로 내로컬 시간에 맞도록 새로운 `Date` 객체를 생성합니다.
   <br>

3. 생성된 `meetingDate` 객체의 월과 연도가 주어진 `month`와 `year`와 일치하는지 확인합니다. 일치하는 경우에만 다음 단계를 진행합니다.
   <br>

4. `meetingDate` 객체의 일`day`를 가져와 `dateKey`로 저장합니다.
   <br>

5. `meetingsByDate` 객체에 `dateKey`에 해당하는 키가 없다면, 빈 배열을 할당하여 초기화합니다.
   <br>

6. `meetingsByDate` 객체의 `dateKey`에 해당하는 배열에 미팅 추가합니다.

<br>

<<<<<<< HEAD
**결과: 시간대를 고려한 일정 시간 표시의 성공**
=======

### 우리 프로젝트에서 Socket.IO를 어떻게 최적화 할 수 있을까?

<hr>
>>>>>>> 7ed2c43c6cb5b3255d4c2cf37a0f7bc89e3fa9d1

이 방법을 통해, 사용자의 지역정보에 따른 시간대가 달라도 로컬 시간에 맞게 일정 시간을 표시할 수 있었습니다. 모든 날짜를 UTC 형태로 저장하고 사용자의 로컬 시간에 맞도록 변환하여, 각 사용자에게 맞는 시간대로 일정을 표시할 수 있었습니다. 이를 통해 서로 다른 지역의 사용자 간에 시간 표시의 혼동을 최소화하고, 사용자에게 정확한 일정 정보를 제공할 수 있었습니다.

<img width="700" src="https://user-images.githubusercontent.com/107290583/236911449-fa16a702-6691-4178-a02d-3f9b81f6f5d1.png">

<img width="700" alt="스크린샷 2023-06-07 오전 10 08 27" src="https://github.com/MeetUp1/Meet_UP-client/assets/107290583/e5b047bd-d886-4eb0-b5c2-2d1a8f6ce172">

(좌측 한국 TimeZone 우측 브라질 TimeZone) <br>
현재 프로젝트에서 지역에 따른 TimeZone이 다르더라도 자신의 지역정보의 TimeZone으로 변환되어 나타나는것을 확인할 수 있습니다.

<br>

### 3) 미팅이 특정 시간만큼 지나야지만 미팅완료를 할 수 있게 하고싶은데 어떻게 해야하지?

<br>

**Socket.IO 최적화 적용**
<br>

**대안: 미팅 시작 시간 기준 특정 시간 경과 후에 미팅 완료 버튼 활성화**

이 문제를 해결하기 위해, 미팅 시작 시간으로부터 특정 시간이 경과한 경우에만 미팅 완료 버튼을 활성화하는 방법을 생각하였습니다. 하지만, 여기서 또 다른 문제가 발생했습니다. 서로 다른 지역의 사용자들이 있기 때문에, 각 지역의 시간대를 고려하여 이 특정 시간을 계산해야 하는 문제였습니다.

<br>

**시도: getTimezoneOffset()을 이용한 시간 차이 계산**

- **효율적인 메시지 전송**: 최적화된 소켓 구조를 사용하면, 필요한 클라이언트에게만 메시지를 전송할 수 있어 트래픽이 줄어들고 통신이 효율적으로 이루어집니다.
- **성능 향상**: 불필요한 메시지 전송이 줄어들어 클라이언트의 메시지 처리 부하가 감소하고, 전체적인 성능이 향상됩니다.
- **유지 보수성**: 소켓 구조를 최적화하면 아래의 프로젝트에 사용한 코드처럼 구조가 명확해져서 유지 보수와 확장이 쉬워집니다.

<br>
  <img width="400" src="https://github.com/Team-Orm/the-beat-client/assets/107290583/059fc0fe-1eec-446f-b1f6-74a867161784">

<br>
<img width="650" src="https://github.com/Team-Orm/the-beat-client/assets/107290583/88d75dce-87f2-4786-a8cc-2446dc3cea76">

<br>
<br>

# 🗓 Schedule

### 프로젝트 기간 : 2023.04.03 ~ 2023.04.23 / 기획 7일 개발 14일

- 1 주차 : 기획 및 설계
  - 아이디어 수집
  - 기술 스택 선정
  - Figma를 사용한 Mockup 제작
  - MongoDb를 이용한 DB Schema 설계
  - Notion을 이용한 칸반 작성
- 2주차, 3주차 : 기능 개발
  - 백엔드 서버 구현
  - 프로잭트 기능 구현
  - 테스트 코드
  - 리팩토링 및 버그 수정

<br>

# 🔗 Repository Link

- [Meet UP Client](https://github.com/MeetUp1/Meet_UP-client)
- [Meet UP Server](https://github.com/MeetUp1/Meet_UP-server)

<br>

# 🛠 Tech Stacks

### Frontend

- React
- Redux
- React Router
- Styled Components
- Web Audio API
- Canvas API
- Socket.io
- ESLint
- Firebase
- Netlify

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Socket.io
- ESLint
- AWS S3
- AWS Elastic Beanstalk

<br>
<br>

# ✅ Test

- Frontend: React Testing Library, Jest
- Backend: Jest, Supertest
- E2E: Puppeteer

<br>
<br>

# 🚀 Deployment

- Server: [AWS Elastic Beanstalk](https://docs.aws.amazon.com/ko_kr/elasticbeanstalk/latest/dg/Welcome.html)
- Client: [Netlify](https://www.netlify.com/)

<br>
<br>

# 🏠 Members

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/oyobbeb">
        <img src="https://avatars.githubusercontent.com/u/113571767?v=4" alt="정영빈 프로필" width="200px" height="200px" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/HyukE">
	      <img src="https://avatars.githubusercontent.com/u/107290583?v=4" alt="이상혁 프로필" width="200px" height="200px" />
    </td>
    <td align="center">
      <a href="https://github.com/shuh319">
	      <img src="https://avatars.githubusercontent.com/u/115068443?v=4" alt="허수빈 프로필" width="200px" height="200px" />
    </td>
  </tr>
  <tr>
    <td>
      <ul>
        <li><a href="https://avatars.githubusercontent.com/u/113571767?v=4">Yeongbin Jeong 정영빈</a></li>
        <li>oyobbeb@gmail.com</li>
      </ul>
    </td>
    <td>
      <ul>
        <li><a href="https://avatars.githubusercontent.com/u/107290583?v=4">Sanghyuk Lee 이상혁</a></li>
        <li>mign2ki2@gmail.com</li>
      </ul>
    </td>
    <td>
      <ul>
        <li><a href="https://avatars.githubusercontent.com/u/115068443?v=4">Subin Heo</a></li>
        <li>shuh319@gmail.com</li>
      </ul>
    </td>
  </tr>
</table>
