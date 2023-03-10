## ๐ Emotion-Diary

<br />

> React.js ํ์ต ๋ชฉ์ ์ผ๋ก ๋ง๋  ๊ฐ์  ์ผ๊ธฐ์ฅ ํ๋ก์ ํธ.
> #### [๋ฐฐํฌ๋งํฌ](https://wh-emotion-diary-project.web.app/)

<br />

## ๐ก ์ ์ฉ ๊ธฐ์  ๋ฐ ๊ตฌํ ๊ธฐ๋ฅ

<br />

### ์ ์ฉ ๊ธฐ์ 
> React.js, HTML/CSS, Firebase

<br />

### ๊ตฌํ ๊ธฐ๋ฅ
- [x] ์ผ๊ธฐ ์์ฑ / ์์  / ์ญ์  ๊ธฐ๋ฅ ๊ตฌํ
- [x] ๋ ์ง์ ๊ฐ์ ์ ์ ํํ์ฌ ์ผ๊ธฐ ์์ฑ ๊ฐ๋ฅ
- [x] ์์ฑ๋ ์ผ๊ธฐ ์ต์ ์ / ์ค๋๋ ์์ผ๋ก ์ ๋ ฌ & ์ข์ / ๋์ ๊ฐ์  ํํฐ๋ง ๊ธฐ๋ฅ
- [x] ์ผ๊ธฐ๋ฅผ ์ ํํ๋ฉด ์์ธํ์ด์ง๋ก ์ด๋
- [x] localStorage๋ฅผ ์ด์ฉํ์ฌ ์ผ๊ธฐ ์ ์ฅ๋๋๋ก ๊ตฌํ

<br />

### `์ผ๊ธฐ ์ํ๊ด๋ฆฌ ๋ก์ง`

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
- ์ผ๊ธฐ ์์ฑ, ์์ , ์ญ์  ๋ฑ ๋ณต์กํ ์ํ๊ด๋ฆฌ ๋ก์ง์ `useReducer` ํ์ ํ์ฉํ์ฌ ์ปดํฌ๋ํธ๋ก๋ถํฐ ๋ถํ ํ์์ต๋๋ค.

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
- `Context`๋ฅผ ๋ง๋ค๊ณ , ๊ณต๊ธ์์ธ `Provider` ์ปดํฌ๋ํธ์ ๋ฐ์ดํฐ์ ์ํ๋ณํ ํจ์๋ค์ ๊ณต๊ธํ๊ฒํด์ prop drilling ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ์์ต๋๋ค.

<br />

### `์ต์ ํ`

- `React.memo`๋ฅผ ํตํด `DiaryItem`, `EmotionItem`, ๊ทธ๋ฆฌ๊ณ  `ControlMenu` ์ปดํฌ๋ํธ์ ๋ถํ์ํ ๋ ๋๋ง์ ๋ฐฉ์งํ์์ต๋๋ค.
- `props`๋ก ์ ๋ฌ๋ฐ์ ํจ์๊ฐ ์๋ ์ปดํฌ๋ํธ๋ค์, `useCallback` ํ์ ์ฌ์ฉํ์ฌ ํจ์๋ฅผ ์ฌ์ฌ์ฉ ํจ์ผ๋ก์จ ์ฌ์์ฑ๋์ง ์๊ฒ ํ์์ต๋๋ค.
  - ๋ค๋ง, ์ ๋ฌ๋ ํจ์๊ฐ `useState`๊ฐ ๋ฐํํ๋ ์ํ๋ณํ ํจ์์ผ ๊ฒฝ์ฐ, ๋์ผํ `id`๋ฅผ ๋ณด์ฅํ๊ธฐ ๋๋ฌธ์ `useCallback` ํ์ ๋ฐ๋ก ์ ์ฉํ์ง ์์์ต๋๋ค.
