# 🤝 MeetUP

<p align="center">
 <img width=300 src="https://github.com/MeetUp1/Meet_UP-client/assets/107290583/e2152e3a-900a-4b93-ac82-62101a277a3a" />
</p>
<p align="center">MeetUP 프로젝트는 전 세계의 다양한 지역에서 미팅을 개최하고 참가할 수 있는 Mobile application 입니다.</p>
<br>
<p align="center"><a href="https://www.youtube.com/watch?v=bhVkFiCH_gU">MeetUP 시연영상</a></p>

<br>
<br>

# 📖 Table of Contents

- [🤝 MeetUP](#🤝-meetup)
- [💪 Motivation](#💪-motivation)
- [📌 Feature](#📌-feature)
- [🔥 Challenges](#🔥-challenges)
  - [각유저의 지역정보가 다르다면 미팅시간은 어떻게 표시 해야할까?](#1-미팅요청-하는-유저와-수락하는-유저의-지역-정보가-다르다면-시간을-어떻게-표시-해야할까)
    - [어떻게 위치기반의 캘린더를 만들수 있을까?](#1-어떻게-위치기반의-캘린더를-만들수-있을까)
    - [사용자의 지역에 따른 로컬시간이 다르다면 서로의 시간은 어떻게 표시해야 하지?](#2-사용자의-지역에-따른-로컬시간이-다르다면-서로의-시간은-어떻게-표시해야-하지)
    - [미팅이 특정 시간만큼 지나야지만 미팅완료를 할 수 있게 하고싶은데 어떻게 해야하지?](#3-미팅이-특정-시간만큼-지나야지만-미팅완료를-할-수-있게-하고싶은데-어떻게-해야하지)
  - [미팅 이벤트가 발생시 해당유저에게 발생한 이벤트를 어떻게 알려줄 수 있을까?](#2-미팅-이벤트가-발생시-해당유저에게-발생한-이벤트를-어떻게-알려줄-수-있을까)
    - [어떤 Push 알림 서비스 선택 해야할까?](#1-어떤-push-알림-서비스-선택-해야할까)
    - [Push 알림 토큰 관리는 어떻게 해주는 것이 좋을까?](#2-push-알림-토큰-관리는-어떻게-해주는-것이-좋을까)
    - [Push 알림 토큰으로 알림 생성 및 전송은 어떻게 할 수 있을까?](#3-push-알림-토큰으로-알림-생성-및-전송은-어떻게-할-수-있을까)
  - [React Native로 프로젝트를 진행하면서 마주친 Challenges!](#3-react-native로-프로젝트를-진행하면서-마주친-challenges)
    - [React와 다른 React Native UI 구성 요소](#1-react와-다른-react-native-ui-구성-요소)
    - [React와 다른 React Native 레이아웃의 차이](#2-react와-다른-react-native-레이아웃의-차이)
    - [애니메이션을 실행하면서 어떻게 상태를 업데이트 해야할까?](#3-애니메이션을-실행하면서-어떻게-상태를-업데이트-해야할까)
    - [React Native에서의 플랫폼 간의 차이](#4-react-native에서의-플랫폼-간의-차이)
    - [React Native에서는 페이지의 주소가 없는데 어떻게 페이지 이동을 해야하지?](#5-react-native에서는-페이지의-주소가-없는데-어떻게-페이지-이동을-해야하지)
- [🗓 Schedule](#🗓-schedule)
- [🔗 Repository Link](#🔗-repository-link)
- [🛠 Tech Stacks](#🛠-tech-stacks)
- [🏠 Members](#🏠-members)

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

### 2-1) 사용자의 지역에 따른 로컬시간이 다른경우 어떻게 시간을 통일화 해서 DB에 저장해야 할까?

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

<br>
이 함수는 주어진 로컬 날짜`localDate`와 시간`hour`을 기반으로 해당 시간의 UTC 날짜 문자열을 반환합니다.
<br>

1. `localDate` 인자를 기반으로 새로운 `Date` 객체를 생성합니다. 이 객체는 로컬 시간대의 날짜 및 시간 정보를 가지고 있습니다.
   <br>

2. `date` 객체의 시간을 주어진 `hour`로 설정하고, 분, 초, 밀리초를 0으로 초기화합니다. 이렇게 하면, 원하는 시간을 가진 새로운 날짜 및 시간 객체가 생성됩니다.
   <br>

3. `date` 객체의 UTC 날짜 및 시간을 ISO 8601 형식의 문자열로 변환하여 반환합니다. 이 문자열은 "YYYY-MM-DDTHH:mm:ss.sssZ" 형식을 따르며, "Z"는 UTC 시간대를 나타냅니다.

<br>

### 2-2) UTC(협정 세계시)로 저장되어 있는 데이터를 로컬시간으로 변환

UTC(협정 세계시)로 저장되어 있는 데이터를 바로 표시하면 유저가 시간을 파악하기 힘드므로 위저의 경험을 위해 자신의 지역 TimeZone으로 다시 로컬시간으로 변환하는 과정이 필요했습니다.

<br>

**대안: 시간 정보의 표준화**

저장된 UTC 시간 정보를 사용자의 로컬 시간대로 변환하여 보여주는 방법을 고려했습니다. UTC 시간 정보를 로컬시간으로 변환해주는 방법은 간단하게 해결되었습니다.

```javascript
const LocalDate = new Date(UTCDate);
```

`new Date()`에 UTC시간을 넣어주면 UTC시간을 자신의 TimeZone의 로컬시간값을 얻어낼 수 있었습니다.

<br>

**시도: 로컬 시간 변환 함수의 구현**

```javascript
const getMeetingsByDate = (meetingList, month, year) => {
  const meetingsByDate = {};

  meetingList.forEach((meeting) => {
    const meetingDate = new Date(meeting.startTime);
    if (
      meetingDate.getMonth() === month &&
      meetingDate.getFullYear() === year
    ) {
      const dateKey = meetingDate.getDate();
      if (!meetingsByDate[dateKey]) {
        meetingsByDate[dateKey] = [];
      }
      meetingsByDate[dateKey].push(meeting);
    }
  });

  return meetingsByDate;
};
```

위의 함수를 사용하여, DB에서 가져온 UTC 형태로 저장된 미팅의 시작 시간을 사용자의 로컬 시간으로 변환하는 시도를 하였습니다.
<br>
함수에 대한 자세한 설명은 다음과 같습니다.
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

**결과: 시간대를 고려한 일정 시간 표시의 성공**

이 방법을 통해, 사용자의 지역정보에 따른 시간대가 달라도 로컬 시간에 맞게 일정 시간을 표시할 수 있었습니다. 모든 날짜를 UTC 형태로 저장하고 사용자의 로컬 시간에 맞도록 변환하여, 각 사용자에게 맞는 시간대로 일정을 표시할 수 있었습니다. 이를 통해 서로 다른 지역의 사용자 간에 시간 표시의 혼동을 최소화하고, 사용자에게 정확한 일정 정보를 제공할 수 있었습니다.

<img width="700" src="https://user-images.githubusercontent.com/107290583/236911449-fa16a702-6691-4178-a02d-3f9b81f6f5d1.png">

<img width="700" alt="스크린샷 2023-06-07 오전 10 08 27" src="https://github.com/MeetUp1/Meet_UP-client/assets/107290583/e5b047bd-d886-4eb0-b5c2-2d1a8f6ce172">

(좌측 한국 TimeZone 우측 브라질 TimeZone) <br>
현재 프로젝트에서 지역에 따른 TimeZone이 다르더라도 자신의 지역정보의 TimeZone으로 변환되어 나타나는것을 확인할 수 있습니다.

<br>

### 3) 미팅이 특정 시간만큼 지나야지만 미팅완료를 할 수 있게 하고싶은데 어떻게 해야하지?

<br>

**문제: 미팅 완료 버튼의 실시간 제어**

현재 프로젝트에서 유저가 미팅이 아직 완료되지 않았음에도 불구하고 실수로 미팅 완료 버튼을 눌러서 불필요하게 미팅을 재신청하는 경우가 발생할 수 있다는 부분을 인지하였습니다. 이러한 문제를 방지하려면, 미팅 시작 시간으로부터 특정 시간이 지난 후에만 미팅 완료 버튼이 활성화되도록 하는 제어가 필요하였습니다.

<br>

**대안: 미팅 시작 시간 기준 특정 시간 경과 후에 미팅 완료 버튼 활성화**

이 문제를 해결하기 위해, 미팅 시작 시간으로부터 특정 시간이 경과한 경우에만 미팅 완료 버튼을 활성화하는 방법을 생각하였습니다. 하지만, 여기서 또 다른 문제가 발생했습니다. 서로 다른 지역의 사용자들이 있기 때문에, 각 지역의 시간대를 고려하여 이 특정 시간을 계산해야 하는 문제였습니다.

<br>

**시도: getTimezoneOffset()을 이용한 시간 차이 계산**

이 문제를 해결하기 위해 JavaScript의 getTimezoneOffset() 메소드를 사용하여 각 사용자의 시간대에 따른 시간 차이를 계산하였습니다. 이 메소드는 현재 시간과 UTC 시간 사이의 차이를 분 단위로 반환합니다. 따라서 이를 이용해 각 사용자의 시간대에 따른 차이를 계산하고, 그 결과를 밀리초 단위로 변환하여 사용하였습니다.
<br>

`getTimezoneOffset()`메서드는 현재 시간과 UTC 시간(국제 표준시) 사이의 차이를 분 단위로 반환합니다. 이 값은 내가위치해 있는 지역의 시간대와 UTC 시간 간의 차이를 의미합니다.<br>
즉 UTC+9(한국 시간)에 있을 경우 getTimezoneOffset() 메서드는 -540을 반환합니다. 이 값은 한국 시간이 UTC보다 9시간 빠르다는 것을 의미합니다.

<br>

**결과: 실시간으로 미팅 완료 버튼을 제어**

위의 방법을 통해, 미팅 시작 시간으로부터 특정 시간이 경과한 후에만 미팅 완료 버튼이 활성화되도록 할 수 있었습니다. 이 결과, 사용자는 미팅이 실제로 완료된 후에만 미팅 완료 버튼을 누를 수 있게 되어, 불필요한 미팅 재신청을 방지할 수 있게 되었습니다. 또한, 이 기능은 사용자의 현재 시간대를 고려하여 동작하므로, 서로 다른 시간대에서 활동하는 사용자들에게도 동일하게 적용됩니다. 이렇게 해서, 이 문제를 해결하였습니다.
<br>
아래의 함수는 현재의 프로젝트에서 이문제를 해결하기위해 사용한 함수 입니다.

```javascript
const isMinutesPast = (meetingStartTime, minutes) => {
  const now = new Date();
  const meetingTime = new Date(meetingStartTime);
  const nowLocal = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  const meetingTimeLocal = new Date(
    meetingTime.getTime() - meetingTime.getTimezoneOffset() * 60000,
  );
  const minuteDifference = (nowLocal - meetingTimeLocal) / 60000;
  return minuteDifference >= minutes;
};
```

위 함수의 역할은 다음과 같습니다.
<br>

1. `meetingTime` 변수를 선언하여 미팅 시작 시간을 저장합니다. 이는 `new Date(meetingStartTime)`를 사용하여 `meetingStartTime` 문자열을 날짜로 변환합니다.
   <br>

2. `nowLocal` 변수를 선언하여 현재 시간을 UTC에서 로컬 시간으로 변환합니다. <br>이는 `now.getTime() - now.getTimezoneOffset() * 60000`를 사용하여 현재 시간에서 시간대 분 단위를 빼주었습니다.
   <br>

3. `meetingTimeLocal` 변수를 선언하여 미팅 시작 시간을 UTC에서 로컬 시간으로 변환합니다. <br>이는 `meetingTime.getTime() - meetingTime.getTimezoneOffset() \* 60000`를 사용하여 미팅 시작 시간에서 시간대 분 단위를 빼주었습니다.
   <br>

4. `minuteDifference` 변수를 선언하여 현재 시간과 미팅 시작 시간 사이의 차이를 분 단위로 계산합니다. <br>이는 `(nowLocal - meetingTimeLocal) / 60000`를 사용하여 현재 로컬 시간에서 미팅 시작 로컬 시간을 뺀 후, 그 결과를 60000(1분을 밀리초로 변환한 값) 해주었습니다.
   <br>

5. 마지막으로, `minuteDifference`가 `minutes`보다 크거나 같은지 확인합니다. 만약 그렇다면, 함수는 `true`를 반환하고, 그렇지 않다면 `false`를 반환합니다. 이는 `return minuteDifference >= minutes` 문으로 판단됩니다.
   <br>

이러한 방법으로 true 경우 완료버튼을 나타나게 해주고 false라면 완료버튼이 보이지 않도록 해주었습니다.
<br>

<img width="400" alt="스크린샷 2023-06-12 오전 2 05 19" src="https://github.com/MeetUp1/Meet_UP-client/assets/107290583/d3da3ab8-9358-4c64-8380-13f46d1bf9f3">

위 이미지 처럼 현재 시간보다 미팅시작 시간이 특정시간 만큼 지났으면 완료버튼이 나오도록 해주었습니다.

<br>

## 2. 미팅 이벤트가 발생시 해당유저에게 발생한 이벤트를 어떻게 알려줄 수 있을까?

미팅 이벤트가 발생했을 때 해당 사용자에게 알림을 전달하려면 Push 알림, 이메일 알림, SMS 알림 등의 방법이 있었지만 react native로 Mobile application을 만드는 만큼 MeetUp application 에서 사용자의 기기에 Push 알림을 보내는 방법을 가장 적합하다고 판단했습니다. Push 알림은 사용자의 스마트폰에 직접 알림을 보내므로, 사용자가 애플리케이션을 실행하지 않아도 알림을 확인할 수 있습니다. 이러한 이유로, MeetUp 애플리케이션에서는 다음과 같은 과정을 통해 Push 알림 시스템을 구축했습니다.

<br>

### 1) 어떤 Push 알림 서비스 선택 해야할까?

이번 프로젝트에서 Push 알림 서비스를 구현 하기 위해서는 Expo Push Notification과 Firebase Cloud Messaging (FCM) 두가지의 선택지가 있었습니다 두개의 서비스 모두 안드로이드, iOS 지원하지만 현재 expo로 프로젝트를 진행하고 있으므로 expo에 특화된 Expo Push Notification을 사용하기로 하였습니다.

하지만 Expo Push Notification은 Expo 서버를 거쳐 알림을 보내야 하기 때문에, Expo 서버의 성능과 가용성에 영향을 받을 수 있다는 단점이 존재합니다. 하지만 현재 [expo 서버](https://status.expo.dev/)에서 확인해 보면 서버가 안정적으로 운영이 되고 있다는 것을 확인할 수 있습니다.

<br>

### 2) Push 알림 토큰 관리는 어떻게 해주는 것이 좋을까?

사용자의 기기에 알림을 보내려면 기기 토큰을 얻어야 합니다. 애플리케이션에서 사용자가 로그인할 때 기기 토큰을 생성하고, 서버에 전송하여 저장합니다.

```javascript
export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
```

이함수는 현재 프로젝트에서 expo push 알림 토큰을 얻기위해 사용된 함수 입니다. 함수는 설명은 다음과 같습니다.
<br>

1. `Device.isDevice`를 사용하여 현재 기기가 실제 기기인지 확인합니다. 시뮬레이터에서는 푸시 알림을 사용할 수 없습니다.
   <br>

2. `Notifications.getPermissionsAsync()`를 사용하여 앱에 이미 푸시 알림 권한이 부여되어 있는지 확인합니다.
   <br>

3. 권한이 없다면, `Notifications.requestPermissionsAsync()`를 사용하여 사용자에게 푸시 알림 권한을 요청합니다.
   <br>

4. 사용자가 권한을 허용하면, `Notifications.getExpoPushTokenAsync()`를 사용하여 Expo 푸시 토큰을 가져옵니다.
   <br>

5. 안드로이드 플랫폼의 경우, `Notifications.setNotificationChannelAsync()`를 사용하여 푸시 알림 채널을 설정합니다. 이 설정은 중요도, 진동 패턴 및 알림 LED 색상을 포함합니다.
   <br>

6. 마지막으로, 생성된 토큰을 반환합니다. 이렇게 반환된 토큰을 서버에 저장해 주었습니다.

<br>

### 3) Push 알림 토큰으로 알림 생성 및 전송은 어떻게 할 수 있을까?

미팅 이벤트 발생 시 알림을 생성하고 전송하기 위해 expo서버를 사용하였습니다. 알림을 생성할 때 미팅에 참가하는 사용자들의 기기 토큰을 서버에서 가져와 알림을 전송합니다.

```javascript
async function sendNotification(expoPushToken, title, message) {
  const data = {
    to: expoPushToken,
    sound: "default",
    title,
    body: message,
    data: { someData: "goes here" },
  };

  try {
    await axios.post("https://exp.host/--/api/v2/push/send", data);
  } catch (error) {
    console.log(error);
  }
}

export default sendNotification;
```

입력으로 받은 `expoPushToken`, `title`, `message`를 사용하여 알림 데이터 객체를 생성합니다. 여기에는 받는 기기의 Expo 푸시 토큰, 알림의 제목, 알림의 본문, 사운드 및 추가 데이터가 포함됩니다.
<br>
`axios.post()`를 사용하여 Expo 푸시 알림 서비스에 POST 요청을 보냅니다. 이를 통해 Expo 푸시 알림 서비스가 해당 기기에 알림을 전송합니다.
<br>
요청이 성공하면 알림이 보내지고, 실패한 경우 오류를 콘솔에 출력합니다.

![화면_기록_2023-05-07_오후_12_36_22_AdobeExpress](https://user-images.githubusercontent.com/107290583/236910674-63982618-7d96-473f-be00-d86d50f77bdc.gif)

<br>

<img width="700" src="https://user-images.githubusercontent.com/107290583/236910526-720bd8f0-5e30-48aa-bb72-5e3dc0b035ad.png">

<br>

## 3. React Native로 프로젝트를 진행하면서 마주친 Challenges!

지금까지 React를 사용하여 웹을 개발을 진행해보다가 이번 프로젝트를 기회로 React Native로 Mobile application을 만드는 프로젝트를 진행을 해보았는데 이번 프로젝트에서 React Native로 디테일적인 부분을 생각하며 프로젝트를 진행을 하다보니 React Native에서의 여러 Challenges요소들이 있었습니다.

<br>

### 1) React와 다른 React Native UI 구성 요소

React Native는 React와 다른 UI 구성 요소 집합을 사용합니다. 예를 들어 `<div>` 대신 `<View>`를 사용하고 `<p>` 대신 `<Text>`를 사용합니다.
<br>
아래의 코드는 현재 프로젝트에서 사용한 미팅카드 UI 구성 하는 코드입니다.

```javascript
return (
  <TouchableOpacity onPress={toggleExpanded} style={styles.card}>
    <View style={styles.scheduleCardRow}>
      <View style={styles.profileImgContainer}>
        <Image source={{ uri: picture }} style={styles.profileImg} />
      </View>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardTime}>{time}</Text>
    </View>
    {expanded && (
      <View style={styles.cardDetails}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleTitle}>미팅안건</Text>
          <Text style={styles.subtitleContent}>{agenda}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleTitle}>미팅주소</Text>
          <TouchableOpacity
            onLongPress={copyToClipboard}
            delayLongPress={1000}
            style={styles.subtitleContentTouchable}
          >
            <Text style={styles.subtitleContent}>{address}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
  </TouchableOpacity>
);
```

<br>

### 2) React와 다른 React Native 레이아웃의 차이

리액트 웹 애플리케이션에서는 CSS 플렉스 박스, 그리드 또는 다른 레이아웃 시스템을 사용하여 레이아웃을 사용하여 구성하였지만. 리액트 네이티브에서는 기본적으로 플렉스 박스 레이아웃을 사용하여 요소를 정렬하고 크기를 조절한다는 차이점이 있었습니다.

<br>

### 3) 애니메이션을 실행하면서 어떻게 상태를 업데이트 해야할까?

이번 프로젝트를 진행하면서 모바일 앱이라는 특성으로 캘린더를 슬라이드 하면 이전달 다음달로 넘어가는 애니메이션을 구현중에 문제가 발생했습니다. 슬라이드 했을때 부자연 스럽게 다음달 혹은 이전달로 넘어가거나 오류가 발생하는 부분이였습니다. 이문제를 해결하기 위해서 React Native의 애니메이션 상태를 확인해 보았습니다.

React Native의 애니메이션 상태를 알아보기 위해서는 React Native의 UI 스레드와 JS 스레드 알고 넘어가야 합니다.
애플리케이션이 시작되면 시스템은 메인 스레드라고 하는 애플리케이션 실행 스레드를 생성합니다. 이 스레드는 그리기 이벤트를 포함하여 적절한 사용자 인터페이스 위젯에 이벤트를 디스패치하는 역할을 담당합니다.

React-Native 앱이 부팅될 때마다 자바스크립트 코드를 처리하기 위한 스레드가 생성됩니다. 이 스레드에는 자바스크립트 코드를 실행하기 위한 자바스크립트 가상 머신이 포함되어 있으며 이 스레드를 JS 스레드라고 합니다.

UI 또는 해당 속성에 대해 작업을 수행해야 할 때마다 UI 스레드 에서 작업을 수행해야 합니다 . 따라서 JS 스레드는 JSON 메시지를 UI 스레드 로 보내고 UI 에서 필요한 변경을 수행합니다 .

UI 스레드 와 JS 스레드 간의 통신은 브리지에 의해 수행되며 본질적으로 완전히 비동기적입니다.

<img width="700" src="https://github.com/MeetUp1/Meet_UP-client/assets/107290583/c5910773-18e7-4aa2-be56-86e511e57d9f">

React Native에서 애니메이션을 적용하려면 뷰에 애니메이션을 적용할 수 있도록 UI 스레드로 메시지를 보내야 합니다.

useNativeDriver를 true로 설정하면 React Native는 JS 스레드에서 UI로 애니메이션을 시작하기만 하고 애니메이션 값 업데이트를 포함한 모든 애니메이션 계산은 네이티브 측에서 수행됩니다. 즉 애니메이션 연산이 JS 스레드가 아닌 네이티브 스레드에서 직접 수행하여. JavaScript 스레드가 블로킹되거나, 느려질 때 애니메이션 성능에 영향을 주는 것을 방지하여 애니메이션의 성능을 향상시킵니다.

useNativeDriver가 false로 설정되면 react-native는 JS 스레드의 모든 것을 계산하고 여러 메시지를 기본으로 보내 애니메이션 값과 UI를 업데이트합니다.(기본값)

<img width="700" src="https://github.com/MeetUp1/Meet_UP-client/assets/107290583/807ff041-7e00-4e7e-94b6-51d2c9b613e0">

하지만 이러한 장점들도 있지만 단점도 있습니다. 이러한 단점으로 인해 저는 제프로젝트에 이러한 문제가 발생했습니다.
스레드가 많은 메시지로 막히면 애니메이션이 제때 시작되지 않아 지연이 발생하였습니다. 하지만 애니메이션은 사용자 상호 작용의 중요한 부분이기 때문에 매끄러워야 하기때문에 Reanimated 2 라이브러리를 사용하여 문제를 해결 하였습니다.

Reanimated 2는 UI 스레드에 존재하는 스레드를 생성합니다. 이 스레드에는 작은 자바스크립트 코드 조각이 포함되어 있으며 JSI의 도움으로 UI 스레드와 직접 동기적으로 통신하여 UI를 애니메이션할 수 있습니다. Reanimated 2 스레드와 메인 JS 스레드 간의 통신도 JSI로 이루어집니다.

여기서 말하는 작은 자바스크립트 코드는 "worklet"을 의미합니다. Worklet은 Reanimated 2에서 도입한 개념으로, 일반적으로 UI 스레드에서 동작하는 작은 JavaScript 함수를 의미합니다.

현재 발생하는 문제는 복잡한 애니메이션을 만드는 동안 처리해야 할 많은 계산과 제스처가 있으며 기본 JS 스레드가 이미 비즈니스 로직을 실행하는 데 매우 바쁘고 애니메이션이 지연되는 경우가 발생하고 있어 추가 스레드를 사용하여 생성하면 애니메이션과 제스처 기반 로직을 메인 JS 스레드에서 중단 없이 실행할 수 있는 별도의 장소로 옮길 수 있습니다.

<img width="500" src="https://github.com/MeetUp1/Meet_UP-client/assets/107290583/d2139ca7-e8d3-45b9-8eac-3097aa92662b">

마지막으로 애니메이션이 종료된후 날짜의 상태와 데이터를 업데이트 해야하는데 상태 업데이트는 기본 JS 스레드에서만 수행할 수 있습니다. 하지만 Reanimated 2의 runOnJS로 JS 스레드의 함수 호출을 큐에 넣을 수 있습니다. 따라서 runOnJS로 UI 스레드와 JavaScript 스레드 사이에서 동기화 문제를 해결하였습니다.

<img width="700" src="https://github.com/MeetUp1/Meet_UP-client/assets/107290583/41186e8a-fa07-4340-a808-37d14fc3a396">

```javascript
<Animated.View style={animatedStyle}>
  <View style={styles.monthWrapper}>
    <CreateMonthView
      month={month}
      year={year}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
  </View>
</Animated.View>;

const onPrevMonth = () => {
  const newDate = new Date(year, month - 1, 1);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  runOnJS(setDate)(newDate);

  if (
    today.getMonth() === newDate.getMonth() &&
    today.getFullYear() === newDate.getFullYear()
  ) {
    runOnJS(setSelectedDate)(today);
  } else {
    newDate.setHours(0, 0, 0, 0);
    runOnJS(setSelectedDate)(newDate);
  }
};
```

위코드드는 현재 프로젝트 에서 사용된 코드 입니다. 이처럼 애니메이션이 실행하면서 정상적으로 상태가 업데이트 되지않는 문제를 reanimated로 문제를 해결하였습니다.

![화면_기록_2023-06-07_오전_10_14_21_AdobeExpress](https://github.com/MeetUp1/Meet_UP-client/assets/107290583/2e1f451e-4d36-49b8-b41e-2d29d3816ec7)

위와같이 화면을 슬라이드애니메이션을 진행하며 함수가 동작하게 프로그램을 작성해주었습니다.

<br>

### 4) React Native에서의 플랫폼 간의 차이

React Native는 크로스 플랫폼 개발을 목표로 하지만, iOS와 Android 간에는 기본적인 차이가 있습니다. 따라서 코드에서 플랫폼별 차이를 조건문을 통해서 차이점을 처리해 주었습니다.
<br>
이번 프로젝트를 진행하면서 나타났던 차이점중 하나는 iOS와 Android의 `date` 객체가 다르게 화면에 출력된다는 것이였습니다. 이를 해결하기위해 아래 코드와 같이 조건문을 통해서 해결하였습니다.

```javascript
<Text style={styles.cardText}>
  {Platform.OS === "android"
    ? new Date(meeting.startTime).toLocaleString().slice(0, 16)
    : new Date(meeting.startTime).toLocaleString()[20] === "0"
    ? new Date(meeting.startTime).toLocaleString().slice(0, 21)
    : new Date(meeting.startTime).toLocaleString().slice(0, 20)}
</Text>
```

<br>

### 5) React Native에서는 페이지의 주소가 없는데 어떻게 페이지 이동을 해야하지?

React에서는 Router를 사용하여 페이지의 주소로 페이지를 이동했지만 React Native에서는 페이지 이동을 위해서는 Navigation을 사용하여 페이지 이동을 해야 합니다.
<br>
React Native에서의 Navigation을 사용할 수 있는 방법으로는 StackNavigator, TabNavigator, DrawerNavigator 있습니다. 이번 프로젝트에서 사용한 Navigation 방법으로는 StackNavigator을 사용하였습니다.
<br>
StackNavigator을 사용한 이유는 다음과 같습니다.

1. 직관적인 사용자 경험: StackNavigator는 화면을 쌓듯이 새로운 화면을 이전 화면 위에 올림으로써 사용자에게 직관적인 경험을 제공합니다. 사용자가 앱 내에서 원활하게 화면을 이동하고 이전 화면으로 돌아갈 수 있도록 도와줍니다.
   <br>
2. 기본 제공되는 애니메이션 및 전환 효과: StackNavigator는 기본적으로 제공되는 애니메이션 및 전환 효과를 가지고 있어, 별도의 커스터마이징 없이도 앱에서 깔끔한 전환 경험을 제공할 수 있습니다.
   <br>

하지만 StackNavigator을 사용하면서 발생한 문제점이 발생하였습니다. StackNavigator는 화면이 쌓이는 형식의 내비게이션 구조를 제공합니다. 즉, 앱 내에서 한 화면에서 다른 화면으로 이동할 때마다 새로운 화면이 이전 화면 위에 쌓이는 것처럼 표현됩니다.
<br>
StackNavigator는 화면이 mount, unmount되지 않아서 `useEffect`가 원하는 동작을 하지않는 경우가 발생을하였습니다. 이를 해결하기위해 react-navigation/native에서 제공해주는 `useFocusEffect`를 사용했습니다.
<br>
`useFocusEffect`의 역할은 화면이 포커스될 때마다 특정 동작을 실행하도록 합니다. 이를 통해 화면 전환 시에 필요한 데이터 업데이트, API 호출 등의 작업을 적절히 처리할 수 있습니다. 이러한 방법으로 문제를 해결 할 수 있었습니다.
<br>
아래의 코드는 프로젝트에서 `useFocusEffect`를 사용한 코드입니다.

```javascript
useFocusEffect(
  useCallback(() => {
    async function fetchData() {
      const response = await axios.get(
        `${LOGIN_API_URL}/api/users/${currentUser.id}/meetings`,
      );
      const meetings = response.data;
      setMeetingList(meetings);
    }
    fetchData();
  }, []),
);
```

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

- **expo**
  - React Native를 이용한 크로스 플랫폼 앱 개발을 쉽게 하고, 네이티브 코드 작성 없이도 다양한 네이티브 API를 사용할 수 있기 때문에 expo를 사용했습니다.
- **react-navigation**
  - 애플리케이션 내의 화면 전환을 쉽고 직관적으로 관리하면서, 다양한 네비게이션 패턴을 효과적으로 구현하기 위해 사용했습니다.
- **react-redux**
  - 전체 애플리케이션의 상태를 효과적으로 관리하고, 컴포넌트 간의 상태 공유를 간소화하기 위해 사용했습니다.
- **ESLint**
  - 일관된 코딩 스타일을 유지하며, 버그와 문제를 미리 발견하고 방지하기위해 사용했습니다.

### Backend

- **Node.js**
- **Express**
  - Node.js 기반의 웹 애플리케이션 백엔드를 쉽게 구축하고, 라우팅, 미들웨어 설정 등의 복잡한 과정을 간소화하면서, 확장성과 유연성을 유지하기 사용했습니다.
- **MongoDB**
  - 데이터를 저장하고 처리하는데 유용한 NoSQL 데이터베이스로, 스키마리스한 특성을 가지며 확장성과 유연성을 제공하고, JSON 형식의 데이터를 쉽게 저장하고 검색할 수 있기 때문에 사용하였습니다.
- **axios**
  - 웹 브라우저와 Node.js 양측에서 작동하는 효율적인 HTTP 클라이언트 라이브러리이며, fetch에 비해 HTTP 요청을 취소하는 기능, 요청과 응답 데이터를 자동으로 JSON 형식으로 변환하는 기능, 네트워크 에러나 요청 시간 초과 등의 경우에 요청을 자동으로 재시도하는 기능 등의 추가적인 기능들을 제공하기 때문에 사용했습니다.
- **ESLint**

<br>

# 🏠 Members

- [이상혁](https://github.com/HyukE) : mign2ki2@gmail.com
