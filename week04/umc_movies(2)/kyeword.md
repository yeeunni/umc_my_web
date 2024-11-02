component는 function과 class로 구현할 수 있음

class component는 다음과 같은 함수로 life cycle을 구분할 수 있음

```jsx
componentDidMount(){}
componentDidUpdate(){}
componentWillUnmount(){}
```

function component의 경우 useEffect라는 hook로 life cycle을 구분할 수 있음.

useEffect는 함수이다. useEffect의 두번째 인자에 빈 배열을 넣으면, 맨처음 mount될 때만 실행된다. 두번째 인자에 원하는 변수를 넣으면, 그 변수가 update될 때+맨처음 mount될  useEffect가 실행된다. 

return () ⇒ {//code for cleaning up} 을 하면 component 해체 되기 직전에 run되는 code

- `구독이란?`
    
    React에서 "구독(subscription)"은 컴포넌트가 특정 데이터 소스를 "관찰"하여 데이터의 변화가 있을 때 자동으로 업데이트되도록 하는 것을 의미해요. 예를 들어, 데이터베이스나 API, 웹 소켓 등에서 데이터를 가져와 상태(state)에 반영하거나, 컴포넌트가 다시 렌더링되도록 하여 사용자에게 최신 정보를 제공하는 것이죠.
    
    구독의 대표적인 예는 `useEffect`를 이용해 컴포넌트가 마운트될 때 특정 데이터를 가져오거나 이벤트를 설정하는 것입니다. React에서 `useEffect`와 함께 구독을 설정하고 컴포넌트가 언마운트될 때 구독을 해제하여 불필요한 데이터 흐름을 막고 성능을 관리하는 방식으로 많이 사용됩니다.
    
    다음과 같은 구조로 이루어질 수 있어요:
    
    ```jsx
    javascript
    코드 복사
    import React, { useState, useEffect } from 'react';
    
    function MyComponent() {
      const [data, setData] = useState(null);
    
      useEffect(() => {
        // 예시: 데이터 구독을 시작하는 코드
        const unsubscribe = subscribeToData(newData => {
          setData(newData);
        });
    
        // 컴포넌트가 언마운트될 때 구독 해제
        return () => unsubscribe();
      }, []);
    
      return <div>{data}</div>;
    }
    
    ```
    
    여기서 `subscribeToData`는 데이터를 구독하는 함수라고 할 수 있어요.
    
- `try, catch, finally` 구문  🍠
    
    [https://velog.io/@double29/JSReact-뒤늦게-정리하는-예외-처리-방식-중-하나인-trycatchfinally](https://velog.io/@double29/JSReact-%EB%92%A4%EB%8A%A6%EA%B2%8C-%EC%A0%95%EB%A6%AC%ED%95%98%EB%8A%94-%EC%98%88%EC%99%B8-%EC%B2%98%EB%A6%AC-%EB%B0%A9%EC%8B%9D-%EC%A4%91-%ED%95%98%EB%82%98%EC%9D%B8-trycatchfinally)
    
    ```jsx
    try {
    	//일반적으로 실행되는 코드
      	// 예외가 발생할 수도 있고, 아닐 수도 있다.
    } catch(error) {
    	// try 블록에서 예외가 발생할 경우 실행
      	// 지역 변수 error (e 여도 되고)를 사용해서 예외를 처리한다.
        // 필요에 따라 또 다른 예외를 발생시키거나, 예외를 무시하기도 한다.
    } finally {
    	// try 블록이 종료되면 실행되는 부분
        // try 블록과 관계없이 무조건 실행된다.
    }
    -----예시코드------
    function sum(a, b) {
      try {
      		if (a !== number || b !== number) {
    			throw new Error('a와 b는 모두 숫자여야 합니다.')
    		}
      
    		return a + b
        
      } catch(error){
      		console.log('함수 sum', error);
      } finally{
      		console.log('함수 동작 완료')
      }
    
    }
    
    console.log(sum(5, 3)) // 8, '함수 동작 완료'
    console.log(sum('5', 3))
    // 함수 sum에서 에러 발생: Error: 'a와 b는 모두 숫자여야 합니다.'
    // '함수 동작 완료'
    ```
    
- `axios`  🍠
    
    Axios는 브라우저, Node.js를 위한 **Promise API를 활용하는 HTTP 비동기 통신 라이브러리이다.**
    
    (백엔드와 프론트엔드와 통신을 쉽게하기 위해 AJAX도 더불어 사용하기도 한다.)
    HTTP 요청 취소 및 요청과 응답을 JSON 형태로 자동 변경
    
    ```jsx
    //axios
    const option ={
      url ='http://localhost3000/test`
       method:'POST',
       header:{
         'Accept':'application/json',
         'Content-Type':'application/json';charset=UTP-8'
      },
      data:{
      	name:'sewon',
        	age:20
      }
    
      axios(options)
      	.then(response => console.log(response))
    ```
    
- `fetch`  🍠
    
    [https://velog.io/@daybreak/React-Fetch함수](https://velog.io/@daybreak/React-Fetch%ED%95%A8%EC%88%98)
    
    [https://velog.io/@choco1drink/React-API와-React의-fetch](https://velog.io/@choco1drink/React-API%EC%99%80-React%EC%9D%98-fetch)
    
    `fetch()`기본 문법은 다음과 같다.
    
    ```
    let promise = fetch(url, [options])
    ```
    
    - `url`접근하고자 하는 URL
    - `options` - 선택 매개변수, mehtod나 header 등을 지정할 수 있다.
- `axios` vs `fetch` (차이점)  🍠
    - `Fetch()`는 **body** 프로퍼티를 사용하고,`axios`는 **data** 프로퍼티를 사용한다.
    - `Fetch`의 url이 `Fetch()`함수의 인자로 들어가고, `axios`에서는 url이 `option`객체로 들어간다.
    - `Fetch`에서 **body**부분은 stringify()로 되어진다.
    
    > 이처럼 axios는 HTTP 통신의 요구사항을 컴팩트한 패키지로써 사용하기 쉽게 설계 되었다.
    > 
- `.env` 파일에는 어떤 내용들을 관리할까요?  🍠
    
    [https://velog.io/@hoho_0815/env-파일에-대하여](https://velog.io/@hoho_0815/env-%ED%8C%8C%EC%9D%BC%EC%97%90-%EB%8C%80%ED%95%98%EC%97%AC)
    
    - 웹,앱 개발을 하다보면 포트, DB관련 정보, API_KEY등.. 개발자 혼자서 또는 팀만 알아야 하는 값 즉, git, 오픈소스에 올리면 안되는 값들이 있습니다. 이때 필요한 것이 **dotenv 패키지** 이며 환경변수 파일을 외부에 만들어 URL,포트, API_KEY등.. 을 저장시켜 소스코드 내에 하드코딩하지 않고 사용 할 수 있습니다.
    - .env 파일은 프로젝트의 최상위 루트에 파일을 만듭니다.
- **`custom hook ?`**
    
    우선 커스텀 훅의 핵심 키워드는 반복되는 로직이다. 반복되는 로직은 즉 재사용을 의미한다. 커스텀 훅을 왜 사용할까를 누군가 물어본다면 **"반복되는 로직을 하나로 묶어 재사용하기 위함이다"** 라고 대답해도 무방하다. 
    
    https://ko.react.dev/learn/reusing-logic-with-custom-hooks