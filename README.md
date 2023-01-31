## 📒 Emotion-Diary

<br />

> React.js 학습 목적으로 만든 감정 일기장 프로젝트.
> #### [배포링크](https://wh-emotion-diary-project.web.app/)

<br />

## 💡 적용 기술 및 구현 기능

<br />

### 적용 기술
> React.js, HTML/CSS, Firebase

<br />

### 구현 기능
- [x] 일기 작성 / 수정 / 삭제 기능 구현
- [x] 날짜와 감정을 선택하여 일기 작성 가능
- [x] 작성된 일기 최신순 / 오래된 순으로 정렬 & 좋은 / 나쁜 감정 필터링 기능
- [x] 일기를 선택하면 상세페이지로 이동
- [x] localStorage를 이용하여 일기 저장되도록 구현

<br />

### `일기 상태관리 로직`

```javascript
// src/App.js

...

  const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
      case "INIT": {
        return action.data;
      }
      case "CREATE": {
        newState = [action.data, ...state];
        break;
      }
      case "EDIT": {
        newState = state.map((item) =>
          item.id === action.data.id ? action.data : item
        );
        break;
      }
      case "DELETE": {
        newState = state.filter((item) => item.id !== action.targetId);
        break;
      }
      default:
        return state;
    }

    localStorage.setItem("diaryList", JSON.stringify(newState));
    return newState;
 };
 
 ...

```
- 일기 작성, 수정, 삭제 등 복잡한 상태관리 로직을 `useReducer` 훅을 활용하여 컴포넌트로부터 분할하였습니다.

<br />

### `ContextAPI`

```javascript
// src/App.js

...

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

...
...

return (
  <DiaryStateContext.Provider value={list}>
    <DiaryDispatchContext.Provider value={memoizedDispatches}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DiaryDispatchContext.Provider>
  </DiaryStateContext.Provider>
);

...

```
- `Context`를 만들고, 공급자인 `Provider` 컴포넌트에 데이터와 상태변화 함수들을 공급하게해서 prop drilling 문제를 해결하였습니다.

<br />

### `최적화`

- `React.memo`를 통해 `DiaryItem`, `EmotionItem`, 그리고 `ControlMenu` 컴포넌트의 불필요한 렌더링을 방지하였습니다.
- `props`로 전달받은 함수가 있는 컴포넌트들을, `useCallback` 훅을 사용하여 함수를 재사용 함으로써 재생성되지 않게 하였습니다.
  - 다만, 전달된 함수가 `useState`가 반환하는 상태변화 함수일 경우, 동일한 `id`를 보장하기 때문에 `useCallback` 훅을 따로 적용하지 않았습니다.
